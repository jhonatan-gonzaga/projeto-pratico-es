import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

import type { ProfessionalService } from "../../components/profissional/types";
import {
  CustomerAvatar,
  DetailInfoCard,
  DetailTag,
  ProjectHeader,
  StatusBadge,
} from "../../components/profissional/components";

export function ServiceDetailsScreen({
  onBack,
  onMessage,
  onProfilePress,
  onStatusAction,
  service,
}: {
  onBack: () => void;
  onMessage: () => void;
  onProfilePress: () => void;
  onStatusAction: () => void;
  service: ProfessionalService;
}) {
  const actionLabel =
    service.status === "completed"
      ? "Reabrir Servico"
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
              Cliente do servico
            </Text>
          </View>
          <Text className="text-lg font-bold text-foreground">
            {service.price}
          </Text>
        </View>

        <View className="mb-4 rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
          <View className="mb-3 flex-row items-center gap-2">
            <Ionicons name="briefcase-outline" size={18} color="#b94b50" />
            <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
              Categoria
            </Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {["Pedreiro", "Eletricista", "Pintor", "Encanador"].map((category) => (
              <DetailTag
                key={category}
                label={category}
                active={category === "Pintor"}
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
            Pintura completa de casa de 3 quartos, incluindo teto e paredes
            internas. Necessario preparar as paredes, proteger os moveis e
            entregar acabamento limpo.
          </Text>
        </View>

        <View className="mb-4 gap-3">
          <View className="flex-row gap-3">
            <DetailInfoCard
              icon="calendar-outline"
              label="Data"
              value={service.date}
              subtitle="Agendado"
            />
            <DetailInfoCard
              icon="time-outline"
              label="Horario"
              value={service.time}
              subtitle="Previsto"
            />
          </View>
          <View className="flex-row">
            <DetailInfoCard
              icon="hourglass-outline"
              label="Prazo"
              value={service.deadline}
              subtitle={`Prazo: ${service.deadline}`}
            />
          </View>
        </View>

        {service.address ? (
          <View className="mb-4 rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
            <View className="mb-2 flex-row items-center gap-2">
              <Ionicons name="location" size={18} color="#b94b50" />
              <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
                Endereco
              </Text>
            </View>
            <Text className="text-sm font-semibold leading-5 text-foreground">
              {service.address}
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
          <Image
            source={{
              uri: "https://storage.googleapis.com/banani-generated-images/generated-images/115f5264-00fb-47c5-8131-0b9c0c0cc1f9.jpg",
            }}
            className="h-[170px] w-full rounded-[12px]"
            resizeMode="cover"
            accessibilityLabel="Imagem do servico"
          />
        </View>

        <Pressable
          onPress={service.status === "inProgress" ? onMessage : onStatusAction}
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
