import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, TextInput, View } from "react-native";

import { statusMeta } from "../data";
import type { IconName, ProfessionalArea, ProfessionalService, ProfessionalTab, ProjectItem, ServiceRequest, ServiceStatus } from "../types";
import { ServiceInfoBox } from "./form-controls";

export function RequestMetaPill({
  icon,
  label,
}: {
  icon: IconName;
  label: string;
}) {
  return (
    <View className="flex-row items-center gap-1 rounded-full bg-[#f7eced] px-3 py-1.5">
      <Ionicons name={icon} size={13} color="#b94b50" />
      <Text className="text-xs font-semibold text-foreground">{label}</Text>
    </View>
  );
}

export function NewRequestCard({
  onDetails,
  request,
}: {
  onDetails: () => void;
  request: ServiceRequest;
}) {
  return (
    <View className="mx-4 mb-4 rounded-[8px] bg-card p-4 shadow-md shadow-black/10">
      <Text className="mb-3 text-xl font-bold leading-6 text-foreground">
        {request.title}
      </Text>

      <View className="mb-3 flex-row flex-wrap gap-2">
        <RequestMetaPill icon="location" label={request.location} />
        <RequestMetaPill icon="calendar" label={request.date} />
      </View>

      <Text className="mb-4 text-sm leading-6 text-muted-foreground">
        {request.description}
      </Text>

      <View className="mb-4 flex-row items-center justify-between rounded-[8px] bg-[#f7eced] p-3">
        <View className="flex-row items-center gap-3">
          <View className="h-9 w-9 items-center justify-center rounded-[8px] bg-primary/10">
            <Ionicons name="wallet-outline" size={18} color="#b94b50" />
          </View>
          <View>
            <Text className="mb-1 text-xs leading-3 text-muted-foreground">
              Valor estimado
            </Text>
            <Text className="text-xl font-bold leading-6 text-foreground">
              {request.price}
            </Text>
          </View>
        </View>

        {request.negotiable ? (
          <View className="rounded-[12px] border border-primary px-3 py-1">
            <Text className="text-xs font-bold text-primary">Negociavel</Text>
          </View>
        ) : null}
      </View>

      <View className="flex-row gap-2">
        <Pressable
          className="min-h-[44px] flex-1 items-center justify-center rounded-[12px] border border-input-border bg-card px-4"
          accessibilityRole="button"
        >
          <Text className="text-sm font-semibold text-muted-foreground">
            Recusar
          </Text>
        </Pressable>
        <Pressable
          className="min-h-[44px] flex-1 items-center justify-center rounded-[12px] bg-primary px-4"
          accessibilityRole="button"
        >
          <Text className="text-sm font-bold text-white">Aceitar</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={onDetails}
        className="mt-2 min-h-[44px] flex-row items-center justify-center gap-2 rounded-[12px] bg-[#f7eced] px-4"
        accessibilityRole="button"
      >
        <Ionicons name="document-text-outline" size={15} color="#b94b50" />
        <Text className="text-sm font-semibold text-primary">Ver detalhes</Text>
      </Pressable>
    </View>
  );
}

export function ServiceFilterChips() {
  const filters = ["Todos (6)", "Em Andamento (1)", "Concluido"];

  return (
    <View className="flex-row gap-2 px-4 pb-4">
      {filters.map((filter, index) => (
        <Pressable
          key={filter}
          className={`rounded-[12px] px-4 py-2 shadow-sm ${
            index === 0 ? "bg-primary" : "bg-card"
          }`}
          accessibilityRole="button"
          accessibilityState={{ selected: index === 0 }}
        >
          <Text
            className={`text-sm font-semibold ${
              index === 0 ? "text-white" : "text-foreground"
            }`}
          >
            {filter}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

export function StatusBadge({ status }: { status: ServiceStatus }) {
  const meta = statusMeta[status];

  return (
    <View
      className={`shrink-0 flex-row items-center gap-1 rounded-[12px] px-3 py-1 ${meta.bg}`}
    >
      <View
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: meta.color }}
      />
      <Text className="text-xs font-semibold" style={{ color: meta.color }}>
        {meta.label}
      </Text>
    </View>
  );
}

export function CustomerAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <View className="h-9 w-9 items-center justify-center rounded-full bg-[#f7e8e9]">
      <Text className="text-xs font-bold text-primary">{initials}</Text>
    </View>
  );
}

export function ServiceOrderCard({
  onDetails,
  onMessage,
  service,
}: {
  onDetails?: () => void;
  onMessage?: () => void;
  service: ProfessionalService;
}) {
  const compact = service.status === "completed";

  return (
    <View className="mx-4 mb-4 rounded-[8px] bg-card p-4 shadow-md shadow-black/10">
      <View className="mb-1 flex-row items-start justify-between">
        <Text className="flex-1 pr-2 text-xl font-bold leading-6 text-foreground">
          {service.title}
        </Text>
        <StatusBadge status={service.status} />
      </View>

      <Text className="mb-4 text-xs text-muted-foreground">
        Pedido #{service.order}
      </Text>

      <View className="mb-4 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <CustomerAvatar name={service.customer} />
          <Text className="text-base font-semibold text-foreground">
            {service.customer}
          </Text>
        </View>
        <Text className="text-xl font-bold text-foreground">
          {service.price}
        </Text>
      </View>

      <View className={`flex-row gap-2 ${compact ? "mb-3" : "mb-2"}`}>
        <ServiceInfoBox icon="calendar" label="DATA" value={service.date} />
        <ServiceInfoBox icon="time-outline" label="HORARIO" value={service.time} />
      </View>

      {service.address ? (
        <View className="mb-4 flex-row items-start gap-2 rounded-[8px] bg-[#f7eced] px-3 py-2">
          <Ionicons name="location" size={14} color="#b94b50" />
          <View className="flex-1">
            <Text className="mb-0.5 text-xs uppercase leading-3 tracking-[0.4px] text-muted-foreground">
              ENDERECO
            </Text>
            <Text className="text-sm font-semibold leading-5 text-foreground">
              {service.address}
            </Text>
          </View>
        </View>
      ) : null}

      <View className="mb-3 mt-1 flex-row gap-2">
        {!compact ? (
          <Pressable
            onPress={onMessage}
            className="relative min-h-[44px] flex-row items-center justify-center gap-2 rounded-[12px] border border-input-border bg-card px-4"
            accessibilityRole="button"
          >
            <Ionicons name="chatbubble-outline" size={18} color="#0f1720" />
            <Text className="text-sm font-semibold text-foreground">
              Mensagem
            </Text>
            {service.messageCount ? (
              <View className="absolute -right-2 -top-2 h-5 w-5 items-center justify-center rounded-full bg-primary">
                <Text className="text-[10px] font-bold text-white">
                  {service.messageCount}
                </Text>
              </View>
            ) : null}
          </Pressable>
        ) : null}
        <Pressable
          className="min-h-[44px] flex-1 items-center justify-center rounded-[12px] bg-primary px-4"
          accessibilityRole="button"
        >
          <Text className="text-sm font-bold text-white">
            {compact ? "Reabrir Servico" : service.action}
          </Text>
        </Pressable>
      </View>

      <Pressable
        onPress={onDetails}
        className="min-h-[44px] flex-row items-center justify-center gap-2 rounded-[12px] bg-[#f7eced] px-4"
        accessibilityRole="button"
      >
        <Ionicons name="document-text-outline" size={16} color="#b94b50" />
        <Text className="text-sm font-semibold text-primary">
          {compact ? "Ver Detalhes" : "Detalhe do Servico"}
        </Text>
      </Pressable>
    </View>
  );
}

export function ProjectPhotoGrid({ onEditPhoto }: { onEditPhoto: () => void }) {
  return (
    <View className="flex-row flex-wrap gap-2">
      <View className="w-[48%]">
        <Image
          source={{
            uri: "https://storage.googleapis.com/banani-generated-images/generated-images/3a22084a-7d43-47ce-bda1-718b62bd262d.jpg",
          }}
          className="h-[130px] w-full rounded-[12px]"
          resizeMode="cover"
          accessibilityLabel="Foto principal do projeto"
        />
        <View className="mt-1.5 flex-row items-center justify-between px-0.5">
          <View>
            <Text className="text-xs font-semibold text-foreground">
              Foto prin...
            </Text>
            <Text className="text-xs text-muted-foreground">
              Capa do projeto
            </Text>
          </View>
          <Pressable
            onPress={onEditPhoto}
            className="h-7 w-7 items-center justify-center rounded-full bg-[#f5e8e9]"
            accessibilityRole="button"
            accessibilityLabel="Editar foto principal"
          >
            <Ionicons name="pencil" size={12} color="#b94b50" />
          </Pressable>
        </View>
      </View>

      <Pressable
        onPress={onEditPhoto}
        className="h-[130px] w-[48%] items-center justify-center gap-1.5 rounded-[12px] border-[1.5px] border-dashed border-primary/30 bg-[#fdf0f0] px-2"
        accessibilityRole="button"
      >
        <Ionicons name="images-outline" size={28} color="#b94b50" />
        <Text className="text-center text-xs font-semibold leading-4 text-foreground">
          Adicionar mais fotos
        </Text>
        <Text className="text-xs text-muted-foreground">Galeria ou camera</Text>
      </Pressable>

      <Pressable
        className="h-[100px] w-[48%] items-center justify-center gap-2 rounded-[12px] bg-primary"
        accessibilityRole="button"
      >
        <Ionicons name="camera-outline" size={26} color="#ffffff" />
        <Text className="text-sm font-semibold text-white">Tirar nova foto</Text>
      </Pressable>
    </View>
  );
}

export function ProjectListCard({
  onEdit,
  onViewResult,
  project,
}: {
  onEdit: () => void;
  onViewResult: () => void;
  project: ProjectItem;
}) {
  return (
    <View className="flex-row items-center gap-3 rounded-[8px] bg-card p-3 shadow-sm shadow-black/5">
      <Image
        source={{ uri: project.image }}
        className="h-20 w-20 rounded-[6px]"
        resizeMode="cover"
        accessibilityLabel={project.title}
      />

      <View className="min-w-0 flex-1">
        <Text
          className="text-base font-semibold text-foreground"
          numberOfLines={1}
        >
          {project.title}
        </Text>
        <View className="mb-3 mt-0.5 flex-row items-center gap-1">
          <Ionicons name="location" size={12} color="#8a8a96" />
          <Text className="text-xs text-muted-foreground">
            {project.location}
          </Text>
        </View>
        <Pressable
          onPress={onViewResult}
          className="self-start flex-row items-center gap-1.5 rounded-full bg-[#f5e8e9] px-3 py-1.5"
          accessibilityRole="button"
        >
          <Ionicons name="image-outline" size={13} color="#b94b50" />
          <Text className="text-xs font-medium text-primary">
            Ver resultado
          </Text>
        </Pressable>
      </View>

      <View className="gap-2">
        <Pressable
          onPress={onEdit}
          className="h-9 w-9 items-center justify-center rounded-full bg-[#f0e8e9]"
          accessibilityRole="button"
          accessibilityLabel={`Editar ${project.title}`}
        >
          <Ionicons name="pencil" size={15} color="#0f1720" />
        </Pressable>
        <Pressable
          className="h-9 w-9 items-center justify-center rounded-full bg-[#f5e8e9]"
          accessibilityRole="button"
          accessibilityLabel={`Excluir ${project.title}`}
        >
          <Ionicons name="trash-outline" size={15} color="#b94b50" />
        </Pressable>
      </View>
    </View>
  );
}

export function ResultImageBadge({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  return (
    <View
      className="absolute left-1.5 top-1.5 rounded-[5px] px-1.5 py-0.5"
      style={{ backgroundColor: color }}
    >
      <Text className="text-[10px] font-semibold text-white">{label}</Text>
    </View>
  );
}

export function SettingsOption({
  icon,
  label,
  onPress,
}: {
  icon: IconName;
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-4 px-4 py-4"
      accessibilityRole="button"
    >
      <View className="h-10 w-10 items-center justify-center rounded-[12px] bg-[#fceaea]">
        <Ionicons name={icon} size={18} color="#b94b50" />
      </View>
      <Text className="flex-1 text-[15px] font-medium text-foreground">
        {label}
      </Text>
      <Ionicons name="chevron-forward" size={18} color="#b94b50" />
    </Pressable>
  );
}

export function SettingsSection({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <>
      <View className="mb-2 px-1">
        <Text className="text-xs font-semibold uppercase tracking-[1.6px] text-muted-foreground">
          {title}
        </Text>
      </View>
      <View className="mb-5 overflow-hidden rounded-[16px] bg-card shadow-sm shadow-black/5">
        {children}
      </View>
    </>
  );
}

export function SettingsDivider() {
  return <View className="mx-4 border-b border-input-border" />;
}

export function EditProjectPhotoGrid({ onEditPhoto }: { onEditPhoto: () => void }) {
  const photos = [
    {
      label: "CAPA",
      color: "#b94b50",
      image:
        "https://storage.googleapis.com/banani-generated-images/generated-images/59b1f7e0-fd40-4144-aa26-a53271da7969.jpg",
    },
    {
      label: "ANTES",
      color: "#5a6a7a",
      image:
        "https://storage.googleapis.com/banani-generated-images/generated-images/bd906ca1-8db2-4c0c-98a8-ca75f63726c7.jpg",
    },
    {
      label: "DEPOIS",
      color: "#3a8a5a",
      image:
        "https://storage.googleapis.com/banani-generated-images/generated-images/8d181b67-7364-44b6-82de-1785a9037616.jpg",
    },
  ];

  return (
    <>
      <View className="mb-2 flex-row gap-2">
        {photos.map((photo) => (
          <View key={photo.label} className="relative flex-1">
            <Image
              source={{ uri: photo.image }}
              className="h-[88px] w-full rounded-[12px]"
              resizeMode="cover"
              accessibilityLabel={`Foto ${photo.label.toLowerCase()}`}
            />
            <View
              className="absolute left-1.5 top-1.5 rounded-full px-1.5 py-0.5"
              style={{ backgroundColor: photo.color }}
            >
              <Text className="text-[9px] font-bold text-white">
                {photo.label}
              </Text>
            </View>
            <Pressable
              onPress={onEditPhoto}
              className="absolute right-1.5 top-1.5 h-5 w-5 items-center justify-center rounded-full bg-card shadow-sm"
              accessibilityRole="button"
              accessibilityLabel={`Editar foto ${photo.label.toLowerCase()}`}
            >
              <Ionicons name="pencil" size={10} color="#b94b50" />
            </Pressable>
          </View>
        ))}
      </View>

      <View className="mt-3 flex-row gap-2">
        <Pressable
          onPress={onEditPhoto}
          className="h-[72px] flex-1 items-center justify-center gap-1.5 rounded-[12px] bg-primary"
          accessibilityRole="button"
          accessibilityLabel="Tirar nova foto do projeto"
        >
          <Ionicons name="camera-outline" size={20} color="#ffffff" />
          <Text className="text-xs font-semibold text-white">
            Tirar nova foto
          </Text>
        </Pressable>
        <Pressable
          onPress={onEditPhoto}
          className="h-[72px] flex-1 items-center justify-center gap-1.5 rounded-[12px] border-[1.5px] border-dashed border-primary/30 bg-[#fdf0f0]"
          accessibilityRole="button"
          accessibilityLabel="Adicionar fotos ao projeto"
        >
          <Ionicons name="images-outline" size={20} color="#b94b50" />
          <Text className="text-xs font-semibold text-foreground">
            Adicionar fotos
          </Text>
        </Pressable>
      </View>
    </>
  );
}
