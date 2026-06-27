import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { ClientBottomNav, type ClientNavKey } from "../../components/cliente";
import { ClientMessageScreen } from "./mensagem-profissional";

export type ClientWorkStatusKey =
  | "em_andamento"
  | "aguardando_aprovacao"
  | "concluido"
  | "reabrir_servico";
type FilterKey = "em_andamento" | "aguardando_aprovacao";

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
  professionalRole: string;
  avatarUri: string;
  unreadMessages?: number;
  status: ClientWorkStatusKey;
  statusOptions: StatusOption[];
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

const initialServices: ClientWorkService[] = [
  {
    id: "1",
    title: "Reforma Completa de Banheiro",
    dateLabel: "Início:",
    dateValue: "05 de dez. de 2023",
    professionalName: "Marcos Almeida",
    professionalRole: "Pedreiro",
    avatarUri: "https://storage.googleapis.com/banani-avatars/avatar/female/25-35/European/2",
    unreadMessages: 2,
    status: "em_andamento",
    statusOptions: STATUS_OPTIONS,
  },
  {
    id: "2",
    title: "Pintura Externa",
    dateLabel: "Início:",
    dateValue: "08 de dez. de 2023",
    professionalName: "João Souza",
    professionalRole: "Empreiteiro",
    avatarUri: "https://storage.googleapis.com/banani-avatars/avatar/male/35-50/European/4",
    status: "aguardando_aprovacao",
    statusOptions: STATUS_OPTIONS,
  },
  {
    id: "3",
    title: "Instalação Elétrica",
    dateLabel: "Finalizado:",
    dateValue: "02 de dez. de 2023",
    professionalName: "Roberto Carlos",
    professionalRole: "Eletricista",
    avatarUri: "https://storage.googleapis.com/banani-avatars/avatar/male/35-50/African/3",
    status: "concluido",
    statusOptions: STATUS_OPTIONS,
  },
];

function ServiceCard({
  service,
  onChangeStatus,
  onOpenMessages,
  onOpenDetail,
}: {
  service: ClientWorkService;
  onChangeStatus: (id: string, status: ClientWorkStatusKey) => void;
  onOpenMessages: (service: ClientWorkService) => void;
  onOpenDetail?: (service: ClientWorkService) => void;
}) {
  const [review, setReview] = useState("");
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
        <View className="flex-row items-center gap-3">
          <Image
            source={{ uri: service.avatarUri }}
            className="h-10 w-10 rounded-xl"
            resizeMode="cover"
            accessibilityLabel={service.professionalName}
          />
          <View>
            <Text className="text-sm font-bold text-foreground">{service.professionalName}</Text>
            <Text className="text-xs text-muted-foreground">{service.professionalRole}</Text>
          </View>
        </View>

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

      {service.status === "concluido" ? (
        <View className="mb-4">
          <Text className="mb-2 text-sm font-semibold text-foreground">Avaliar o serviço</Text>
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
            onPress={() => setReview("")}
            className="w-full items-center rounded-xl bg-primary py-3"
            accessibilityRole="button"
            accessibilityLabel="Enviar avaliação"
          >
            <Text className="text-sm font-semibold text-primary-foreground">Enviar avaliação</Text>
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
  onNavigate,
  onOpenDetail,
  onBack,
}: {
  onNavigate?: (key: ClientNavKey) => void;
  onOpenDetail?: (service: ClientWorkService) => void;
  onBack?: () => void;
}) {
  const [services, setServices] = useState<ClientWorkService[]>(initialServices);
  const [filter, setFilter] = useState<FilterKey | null>(null);
  const [activeMessageProfessional, setActiveMessageProfessional] = useState<string | null>(null);

  const handleChangeStatus = (id: string, status: ClientWorkStatusKey) => {
    setServices((current) => current.map((service) => (service.id === id ? { ...service, status } : service)));
  };

  const handleToggleFilter = (key: FilterKey) => {
    setFilter((current) => (current === key ? null : key));
  };

  const countByStatus = (key: FilterKey) => services.filter((service) => service.status === key).length;

  const visibleServices = filter ? services.filter((service) => service.status === filter) : services;

  if (activeMessageProfessional) {
    return (
      <ClientMessageScreen
        professionalName={activeMessageProfessional}
        onBack={() => setActiveMessageProfessional(null)}
      />
    );
  }

  return (
    <View className="relative flex-1 w-full max-w-[480px] bg-background">
      <View className="flex-row items-center justify-between px-5 pt-5 pb-3">
        <Pressable
          onPress={onBack}
          className="h-9 w-9 items-center justify-center rounded-full bg-card shadow-sm shadow-black/10"
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={18} color="#0f1720" />
        </Pressable>

        <Text className="text-base font-bold text-foreground">Minha Obra</Text>

        <View className="h-9 w-9" />
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
      </View>

      <ScrollView className="flex-1 px-5" contentContainerClassName="gap-4 pb-32" showsVerticalScrollIndicator={false}>
        {visibleServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onChangeStatus={handleChangeStatus}
            onOpenMessages={(item) => setActiveMessageProfessional(item.professionalName)}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 px-5 pb-2">
        <ClientBottomNav active="work" onSelect={onNavigate} />
      </View>
    </View>
  );
}
