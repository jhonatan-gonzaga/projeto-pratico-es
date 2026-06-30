import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

import type { ProfessionalService } from "../../components/profissional/types";
import {
  CustomerAvatar,
  DetailInfoCard,
  DetailTag,
  ProjectHeader,
  StatusBadge,
} from "../../components/profissional/components";
import { ApiError, Contract, api, formatDate, formatMoney } from "../../services/api";

function getContractImages(contract?: Contract | null) {
  return [
    ...(contract?.ad?.images?.map((image) => image.url) ?? []),
    ...(contract?.directRequest?.images?.map((image) => image.url) ?? []),
  ];
}

function getContractCategory(contract?: Contract | null) {
  return (
    contract?.ad?.categories?.map((item) => item.category.name).join(", ") ||
    contract?.ad?.category?.name ||
    contract?.professional.specialties?.map((item) => item.category.name).join(", ") ||
    ""
  );
}

export function ServiceDetailsScreen({
  onBack,
  onMessage,
  onProfilePress,
  onStatusAction,
  participantLabel = "Cliente do servico",
  service,
}: {
  onBack: () => void;
  onMessage: () => void;
  onProfilePress: () => void;
  onStatusAction: () => void;
  participantLabel?: string;
  service: ProfessionalService;
}) {
  const [contract, setContract] = useState<Contract | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const canFetchContract = Boolean(service.order && !service.order.startsWith("CLI-"));

  useEffect(() => {
    if (!canFetchContract) {
      return;
    }

    api.contract(service.order)
      .then((item) => {
        setContract(item);
        setLoadError(null);
      })
      .catch((error) => {
        setLoadError(
          error instanceof ApiError
            ? error.message
            : "Nao foi possivel carregar detalhes atualizados.",
        );
      });
  }, [canFetchContract, service.order]);

  const imageUrls = useMemo(() => {
    const contractImages = getContractImages(contract);
    return contractImages.length ? contractImages : service.imageUrls ?? [];
  }, [contract, service.imageUrls]);
  const description = contract?.description ?? service.description ?? "";
  const categoryText = getContractCategory(contract) || service.category || "Servico";
  const categories = categoryText.split(",").map((item) => item.trim()).filter(Boolean);
  const displayDate = contract?.startDate ? formatDate(contract.startDate) : service.date;
  const displayTime = contract?.ad?.startTime ?? contract?.directRequest?.startTime ?? service.time;
  const displayDeadline =
    contract?.ad?.deadlineDays
      ? `${contract.ad.deadlineDays} dias`
      : contract?.directRequest?.deadlineDays
        ? `${contract.directRequest.deadlineDays} dias`
        : service.deadline;
  const displayPrice = contract ? formatMoney(contract.agreedValue) : service.price;
  const displayAddress = contract?.ad?.location ?? contract?.directRequest?.location ?? service.address;
  const hasReview = Boolean(contract?.review ?? service.hasReview);
  const actionLabel =
    service.status === "completed"
      ? hasReview
        ? "Servico avaliado"
        : "Servico finalizado"
      : service.status === "pending"
        ? "Iniciar Servico"
        : "Enviar mensagem";
  const actionIcon =
    service.status === "completed"
      ? "refresh-outline"
      : service.status === "pending"
        ? "play-outline"
        : "chatbubble-outline";

  return (
    <View className="h-full w-full max-w-[480px] self-center bg-background">
      <ProjectHeader onBack={onBack} onProfilePress={onProfilePress} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-6 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-4 flex-row items-start justify-between gap-3">
          <View className="flex-1">
            <Text className="text-2xl font-bold text-foreground">
              {service.title}
            </Text>
            <Text className="mt-1 text-sm text-muted-foreground">
              Pedido #{service.order}
            </Text>
          </View>
          <StatusBadge status={service.status} />
        </View>

        <View className="mb-4 flex-row items-center gap-3 rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
          <CustomerAvatar name={service.customer} />
          <View className="flex-1">
            <Text className="text-base font-bold text-foreground">
              {service.customer}
            </Text>
            <Text className="text-sm text-muted-foreground">
              {participantLabel}
            </Text>
          </View>
          <Text className="text-lg font-bold text-foreground">
            {displayPrice}
          </Text>
        </View>

        {loadError ? (
          <Text className="mb-3 rounded-[8px] bg-[#fff7f7] px-3 py-2 text-xs font-semibold text-primary">
            {loadError}
          </Text>
        ) : null}

        <View className="mb-4 rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
          <View className="mb-3 flex-row items-center gap-2">
            <Ionicons name="briefcase-outline" size={18} color="#b94b50" />
            <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
              Categoria
            </Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {categories.map((category, index) => (
              <DetailTag
                key={`${category}-${index}`}
                label={category}
                active={index === 0}
              />
            ))}
          </View>
        </View>

        <View className="mb-4 rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
          <View className="mb-2 flex-row items-center gap-2">
            <Ionicons name="reorder-three-outline" size={18} color="#b94b50" />
            <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
              Descricao
            </Text>
          </View>
          <Text className="text-sm leading-6 text-muted-foreground">
            {description || "Descricao nao informada."}
          </Text>
        </View>

        <View className="mb-4 gap-3">
          <View className="flex-row gap-3">
            <DetailInfoCard
              icon="calendar-outline"
              label="Data"
              value={displayDate}
              subtitle="Agendado"
            />
            <DetailInfoCard
              icon="time-outline"
              label="Horario"
              value={displayTime}
              subtitle="Previsto"
            />
          </View>
          <View className="flex-row">
            <DetailInfoCard
              icon="hourglass-outline"
              label="Prazo"
              value={displayDeadline}
              subtitle={`Prazo: ${displayDeadline}`}
            />
          </View>
        </View>

        {displayAddress ? (
          <View className="mb-4 rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
            <View className="mb-2 flex-row items-center gap-2">
              <Ionicons name="location" size={18} color="#b94b50" />
              <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
                Endereco
              </Text>
            </View>
            <Text className="text-sm font-semibold leading-5 text-foreground">
              {displayAddress}
            </Text>
          </View>
        ) : null}

        <View className="mb-5 rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
          <View className="mb-3 flex-row items-center gap-2">
            <Ionicons name="image-outline" size={18} color="#b94b50" />
            <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
              Imagens do servico
            </Text>
          </View>
          {imageUrls.length ? (
            <View className="gap-3">
              <Image
                source={{ uri: imageUrls[0] }}
                className="h-[220px] w-full rounded-[12px]"
                resizeMode="cover"
                accessibilityLabel="Imagem principal do servico"
              />
              {imageUrls.length > 1 ? (
                <ScrollView horizontal contentContainerClassName="gap-2">
                  {imageUrls.slice(1).map((url, index) => (
                    <Image
                      key={`${url}-${index}`}
                      source={{ uri: url }}
                      className="h-24 w-32 rounded-[10px]"
                      resizeMode="cover"
                      accessibilityLabel="Imagem adicional do servico"
                    />
                  ))}
                </ScrollView>
              ) : null}
            </View>
          ) : (
            <View className="h-[170px] w-full items-center justify-center rounded-[12px] bg-[#f5e8e9]">
              <Ionicons name="image-outline" size={34} color="#b94b50" />
              <Text className="mt-2 text-sm font-semibold text-primary">
                Nenhuma imagem cadastrada
              </Text>
            </View>
          )}
        </View>

        <Pressable
          onPress={
            service.status === "completed"
              ? undefined
              : service.status === "inProgress"
                ? onMessage
                : onStatusAction
          }
          disabled={service.status === "completed"}
          className="min-h-[52px] flex-row items-center justify-center gap-2 rounded-[12px] bg-primary px-4"
          accessibilityRole="button"
        >
          <Ionicons name={actionIcon} size={17} color="#ffffff" />
          <Text className="text-base font-semibold text-white">
            {actionLabel}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
