import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { ClientBottomNav, type ClientNavKey } from "../../components/cliente";
import { EmptyState, ErrorState, LoadingState } from "../../components/feedback-state";
import { ProjectHeader } from "../../components/profissional/components";
import { ApiError, Contract, ContractStatus, api, formatDate, formatMoney } from "../../services/api";
import { ClientMessageScreen } from "./mensagem-profissional";

export type ClientWorkStatusKey =
  | "em_andamento"
  | "aguardando_aprovacao"
  | "concluido"
  | "reabrir_servico";
type FilterKey = "em_andamento" | "aguardando_aprovacao" | "concluido";

type StatusOption = {
  key: ClientWorkStatusKey;
  label: string;
};

export type ClientWorkService = {
  id: string;
  title: string;
  dateLabel: string;
  dateValue: string;
  professionalName: string;
  professionalId?: string;
  professionalRole: string;
  avatarUri: string;
  conversationId?: string | null;
  unreadMessages?: number;
  status: ClientWorkStatusKey;
  statusOptions: StatusOption[];
  hasReview?: boolean;
  review?: {
    rating: number;
    comment?: string | null;
  } | null;
  description?: string;
  categoryLabel?: string;
  imageUrls?: string[];
  price?: string;
  time?: string;
  deadline?: string;
  address?: string;
};

const STATUS_BADGE: Record<ClientWorkStatusKey, { label: string; bg: string; text: string }> = {
  em_andamento: { label: "Em andamento", bg: "bg-[#f3eced]", text: "text-primary" },
  aguardando_aprovacao: { label: "Aguardando aprovação", bg: "bg-[#fff3cd]", text: "text-[#856404]" },
  concluido: { label: "Concluído", bg: "bg-[#d1fae5]", text: "text-[#065f46]" },
  reabrir_servico: { label: "Reabrir Serviço", bg: "bg-[#f3eced]", text: "text-primary" },
};

const STATUS_OPTIONS: StatusOption[] = [
  { key: "aguardando_aprovacao", label: "Aguardando aprovação" },
  { key: "em_andamento", label: "Em andamento" },
  { key: "concluido", label: "Concluído" },
  { key: "reabrir_servico", label: "Reabrir Serviço" },
];

const WAITING_CLIENT_OPTIONS: StatusOption[] = [
  { key: "concluido", label: "Concluir serviço" },
];

const COMPLETED_WITHOUT_REVIEW_OPTIONS: StatusOption[] = [
  { key: "reabrir_servico", label: "Reabrir serviço" },
];

const contractStatusToClientStatus: Record<ContractStatus, ClientWorkStatusKey> = {
  PENDING_START: "aguardando_aprovacao",
  IN_PROGRESS: "em_andamento",
  WAITING_CLIENT_APPROVAL: "aguardando_aprovacao",
  COMPLETED: "concluido",
  CANCELED: "reabrir_servico",
  REOPENED: "reabrir_servico",
};

const clientStatusToContractStatus: Record<ClientWorkStatusKey, ContractStatus> = {
  aguardando_aprovacao: "WAITING_CLIENT_APPROVAL",
  em_andamento: "IN_PROGRESS",
  concluido: "COMPLETED",
  reabrir_servico: "REOPENED",
};

function mapContract(contract: Contract): ClientWorkService {
  const source = contract.ad ?? contract.directRequest;
  const status = contractStatusToClientStatus[contract.status];
  const hasReview = Boolean(contract.review);
  const sourceCategories =
    contract.ad?.categories?.map((item) => item.category.name).join(", ") ||
    contract.ad?.category?.name ||
    contract.professional.specialties?.map((item) => item.category.name).join(", ") ||
    "Servico";

  return {
    id: contract.id,
    title: contract.title,
    dateLabel: contract.status === "COMPLETED" ? "Finalizado:" : "Início:",
    dateValue: formatDate(contract.startDate),
    professionalName: contract.professional.user.name,
    professionalId: contract.professional.id,
    professionalRole:
      contract.professional.specialties?.map((item) => item.category.name).join(", ") ||
      "Profissional",
    avatarUri: contract.professional.user.avatarUrl ?? "",
    conversationId: contract.conversations?.[0]?.id,
    unreadMessages: contract.conversations?.[0]?.messages?.filter(
      (message) => !message.readAt && message.sender.id !== contract.client.user.id,
    ).length,
    status,
    statusOptions:
      contract.status === "IN_PROGRESS" || contract.status === "WAITING_CLIENT_APPROVAL"
        ? hasReview
          ? []
          : WAITING_CLIENT_OPTIONS
        : contract.status === "COMPLETED" && !hasReview
          ? COMPLETED_WITHOUT_REVIEW_OPTIONS
        : [],
    hasReview,
    review: contract.review
      ? {
          rating: contract.review.rating,
          comment: contract.review.comment,
        }
      : null,
    description: contract.description,
    categoryLabel: sourceCategories,
    imageUrls: source?.images?.map((image) => image.url) ?? [],
    price: formatMoney(contract.agreedValue),
    time: source?.startTime ?? "A combinar",
    deadline: source?.deadlineDays ? `${source.deadlineDays} dias` : "A combinar",
    address: source?.location,
  };
}

function ServiceCard({
  service,
  onChangeStatus,
  onOpenMessages,
  onOpenProfessional,
  onOpenDetail,
  onReview,
}: {
  service: ClientWorkService;
  onChangeStatus: (id: string, status: ClientWorkStatusKey) => void;
  onOpenMessages: (service: ClientWorkService) => void;
  onOpenProfessional?: (professionalId: string) => void;
  onOpenDetail?: (service: ClientWorkService) => void;
  onReview: (service: ClientWorkService, rating: number, comment: string) => void;
}) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(service.review?.rating ?? 0);
  const badge = STATUS_BADGE[service.status];

  return (
    <View className="rounded-xl bg-card p-4 shadow-sm shadow-black/10">
      <View className={`mb-3 self-start rounded-xl px-3 py-1 ${badge.bg}`}>
        <Text className={`text-xs font-bold uppercase ${badge.text}`}>{STATUS_BADGE[service.status].label.toUpperCase()}</Text>
      </View>

      <Text className="mb-1 text-lg font-bold leading-tight text-foreground">{service.title}</Text>
      <Text className="mb-3 text-sm text-muted-foreground">
        {service.dateLabel} {service.dateValue}
      </Text>

      <View className="mb-4 flex-row items-center justify-between rounded-xl bg-background px-3 py-3">
        <Pressable
          onPress={() => {
            if (service.professionalId) {
              onOpenProfessional?.(service.professionalId);
            }
          }}
          disabled={!service.professionalId}
          className="flex-1 flex-row items-center gap-3"
          accessibilityRole="button"
          accessibilityLabel={`Abrir perfil de ${service.professionalName}`}
        >
          {service.avatarUri ? (
            <Image
              source={{ uri: service.avatarUri }}
              className="h-10 w-10 rounded-xl"
              resizeMode="cover"
              accessibilityLabel={service.professionalName}
            />
          ) : (
            <View className="h-10 w-10 items-center justify-center rounded-xl bg-[#f7e8e9]">
              <Ionicons name="person" size={20} color="#b94b50" />
            </View>
          )}
          <View>
            <Text className="text-sm font-bold text-foreground">{service.professionalName}</Text>
            <Text className="text-xs text-muted-foreground">{service.professionalRole}</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => onOpenMessages(service)}
          className="relative h-10 w-10 items-center justify-center rounded-xl bg-card shadow-sm shadow-black/10"
          accessibilityRole="button"
          accessibilityLabel={`Conversar com ${service.professionalName}`}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={20} color="#7a6568" />
          {service.unreadMessages ? (
            <View className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full bg-primary">
              <Text className="text-[11px] font-bold text-white">{service.unreadMessages}</Text>
            </View>
          ) : null}
        </Pressable>
      </View>

      {service.statusOptions.length ? (
        <>
          <Text className="mb-2 text-xs font-bold tracking-wide text-muted-foreground">ATUALIZAR STATUS</Text>
          <View className="mb-4 flex-row flex-wrap gap-2">
            {service.statusOptions.map((option) => {
          const isActive = service.status === option.key;
          const activeBadge = STATUS_BADGE[option.key];

          return (
            <Pressable
              key={option.key}
              onPress={() => onChangeStatus(service.id, option.key)}
              className={`rounded-xl px-4 py-2 ${isActive ? activeBadge.bg : "bg-background"}`}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={option.label}
            >
              <Text className={`text-sm font-medium ${isActive ? activeBadge.text : "text-muted-foreground"}`}>
                {option.label}
              </Text>
            </Pressable>
          );
            })}
          </View>
        </>
      ) : null}

      {service.status === "concluido" && !service.hasReview ? (
        <View className="mb-4">
          <Text className="mb-2 text-sm font-semibold text-foreground">
            Avaliar o serviço
          </Text>
          <View className="mb-3 flex-row gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <Pressable
                key={value}
                onPress={() => setRating(value)}
                accessibilityRole="button"
                accessibilityLabel={`${value} estrela(s)`}
              >
                <Ionicons
                  name={value <= rating ? "star" : "star-outline"}
                  size={26}
                  color="#f59e0b"
                />
              </Pressable>
            ))}
          </View>
          <TextInput
            value={review}
            onChangeText={setReview}
            placeholder="Escreva um comentário sobre o atendimento, prazo e qualidade do serviço."
            placeholderTextColor="#9e8e8f"
            multiline
            className="mb-3 min-h-[64px] rounded-xl bg-background px-4 py-3 text-sm text-foreground"
            accessibilityLabel="Avaliação do serviço"
          />
          <Pressable
            onPress={() => {
              if (rating > 0) {
                onReview(service, rating, review);
              }
            }}
            disabled={rating === 0}
            className="w-full items-center rounded-xl bg-primary py-3"
            accessibilityRole="button"
            accessibilityLabel="Enviar avaliação"
          >
            <Text className="text-sm font-semibold text-primary-foreground">
              Enviar avaliação
            </Text>
          </Pressable>
        </View>
      ) : null}

      <Pressable
        onPress={() => onOpenDetail?.(service)}
        className="w-full items-center rounded-xl border border-input-border bg-background py-3"
        accessibilityRole="button"
        accessibilityLabel="Ver detalhe do serviço"
      >
        <Text className="text-sm font-semibold text-foreground">Detalhe do serviço</Text>
      </Pressable>
    </View>
  );
}

export function ClientMyWorkPage({
  extraServices = [],
  onChangeExtraServiceStatus,
  onNavigate,
  onOpenDetail,
  onOpenProfessional,
  onProfilePress,
  onBack,
}: {
  extraServices?: ClientWorkService[];
  onChangeExtraServiceStatus?: (id: string, status: ClientWorkStatusKey) => void;
  onNavigate?: (key: ClientNavKey) => void;
  onOpenDetail?: (service: ClientWorkService) => void;
  onOpenProfessional?: (professionalId: string) => void;
  onProfilePress?: () => void;
  onBack?: () => void;
}) {
  const [services, setServices] = useState<ClientWorkService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterKey | null>(null);
  const [activeMessageService, setActiveMessageService] = useState<ClientWorkService | null>(null);

  const loadContracts = async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const [user, contracts] = await Promise.all([
        api.me(),
        api.myContracts(),
      ]);
      setServices(
        contracts
          .filter((contract) => contract.client.user.id === user.id)
          .map(mapContract),
      );
    } catch (error) {
      setLoadError(
        error instanceof ApiError
          ? error.message
          : "Nao foi possivel carregar sua obra.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadContracts();
  }, []);

  const handleChangeStatus = async (id: string, status: ClientWorkStatusKey) => {
    if (extraServices.some((service) => service.id === id)) {
      onChangeExtraServiceStatus?.(id, status);
      return;
    }

    try {
      const updated = await api.updateContractStatus(
        id,
        clientStatusToContractStatus[status],
      );
      setServices((current) =>
        current.map((service) =>
          service.id === id ? mapContract(updated) : service,
        ),
      );
    } catch (error) {
      setLoadError(
        error instanceof ApiError
          ? error.message
          : "Nao foi possivel atualizar o status.",
      );
    }
  };

  const handleReview = async (
    service: ClientWorkService,
    rating: number,
    comment: string,
  ) => {
    try {
      await api.createReview(service.id, {
        rating,
        comment: comment.trim() || undefined,
      });
      setServices((current) =>
        current.map((item) =>
          item.id === service.id
            ? {
                ...item,
                hasReview: true,
                review: {
                  rating,
                  comment: comment.trim() || null,
                },
                status: "concluido",
              }
            : item,
        ),
      );
    } catch (error) {
      setLoadError(
        error instanceof ApiError ? error.message : "Nao foi possivel avaliar.",
      );
    }
  };

  const handleToggleFilter = (key: FilterKey) => {
    setFilter((current) => (current === key ? null : key));
  };

  const allServices = services;

  const countByStatus = (key: FilterKey) => allServices.filter((service) => service.status === key).length;

  const visibleServices = filter
    ? allServices.filter((service) => service.status === filter)
    : allServices.filter((service) => service.status !== "concluido");

  if (activeMessageService) {
    return (
      <ClientMessageScreen
        conversationId={activeMessageService.conversationId}
        professionalName={activeMessageService.professionalName}
        onBack={() => setActiveMessageService(null)}
        onProfilePress={onProfilePress}
      />
    );
  }

  return (
    <View className="relative flex-1 w-full max-w-[480px] bg-background">
      <ProjectHeader
        onBack={onBack ?? (() => onNavigate?.("home"))}
        onProfilePress={onProfilePress}
      />

      <View className="px-5 pb-3 pt-4">
        <Text className="text-[28px] font-bold leading-9 text-foreground">
          Minha Obra
        </Text>
      </View>

      <View className="mb-5 flex-row gap-2 px-5">
        <Pressable
          onPress={() => handleToggleFilter("em_andamento")}
          className={`rounded-xl px-4 py-2 ${filter === "em_andamento" ? "bg-foreground" : "bg-card shadow-sm shadow-black/5"}`}
          accessibilityRole="button"
          accessibilityState={{ selected: filter === "em_andamento" }}
          accessibilityLabel="Filtrar serviços em andamento"
        >
          <Text className={`text-sm font-semibold ${filter === "em_andamento" ? "text-white" : "text-muted-foreground"}`}>
            Em andamento ({countByStatus("em_andamento")})
          </Text>
        </Pressable>

        <Pressable
          onPress={() => handleToggleFilter("aguardando_aprovacao")}
          className={`rounded-xl px-4 py-2 ${
            filter === "aguardando_aprovacao" ? "bg-foreground" : "bg-card shadow-sm shadow-black/5"
          }`}
          accessibilityRole="button"
          accessibilityState={{ selected: filter === "aguardando_aprovacao" }}
          accessibilityLabel="Filtrar serviços aguardando aprovação"
        >
          <Text
            className={`text-sm font-semibold ${
              filter === "aguardando_aprovacao" ? "text-white" : "text-muted-foreground"
            }`}
          >
            Aguardando aprovação ({countByStatus("aguardando_aprovacao")})
          </Text>
        </Pressable>

        <Pressable
          onPress={() => handleToggleFilter("concluido")}
          className={`rounded-xl px-4 py-2 ${filter === "concluido" ? "bg-foreground" : "bg-card shadow-sm shadow-black/5"}`}
          accessibilityRole="button"
          accessibilityState={{ selected: filter === "concluido" }}
          accessibilityLabel="Filtrar serviços concluídos"
        >
          <Text className={`text-sm font-semibold ${filter === "concluido" ? "text-white" : "text-muted-foreground"}`}>
            Concluídos ({countByStatus("concluido")})
          </Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-5" contentContainerClassName="gap-4 pb-32" showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <LoadingState label="Carregando contratos..." />
        ) : loadError ? (
          <ErrorState message={loadError} onRetry={loadContracts} />
        ) : visibleServices.length === 0 ? (
          <EmptyState message="Nenhum contrato encontrado para este filtro." />
        ) : visibleServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onChangeStatus={handleChangeStatus}
            onOpenMessages={setActiveMessageService}
            onOpenProfessional={onOpenProfessional}
            onOpenDetail={onOpenDetail}
            onReview={handleReview}
          />
        ))}
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 px-5 pb-2">
        <ClientBottomNav active="work" onSelect={onNavigate} />
      </View>
    </View>
  );
}
