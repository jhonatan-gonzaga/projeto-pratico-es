import { Ionicons } from "@expo/vector-icons";
import type { ReactNode } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { ClientBottomNav, type ClientNavKey } from "../../components/cliente";
import { ProjectHeader } from "../../components/profissional/components";

type ClientAdsPageProps = {
  onBack?: () => void;
  onNavigate?: (key: ClientNavKey) => void;
  onProfilePress?: () => void;
};

type AdStatus = "active" | "review";

type AdItem = {
  id: string;
  title: string;
  status: AdStatus;
  postedAt: string;
  location: string;
  candidates: number;
  visits: number;
};

const ads: AdItem[] = [
  {
    id: "bathroom-renovation",
    title: "Reforma Completa de Banheiro",
    status: "active",
    postedAt: "Postado ha 2 dias",
    location: "Jardins, Sao Paulo",
    candidates: 8,
    visits: 32,
  },
  {
    id: "electrical-panel",
    title: "Instalacao Eletrica (Quadro)",
    status: "review",
    postedAt: "Postado hoje",
    location: "Centro, Sao Paulo",
    candidates: 0,
    visits: 5,
  },
];

const statusContent: Record<
  AdStatus,
  {
    label: string;
    badgeClassName: string;
    badgeTextClassName: string;
    actionLabel: string;
    actionClassName: string;
    actionTextClassName: string;
  }
> = {
  active: {
    label: "Ativo",
    badgeClassName: "bg-[#e6fbf0]",
    badgeTextClassName: "text-[#067a3f]",
    actionLabel: "Ver Candidatos",
    actionClassName: "bg-primary",
    actionTextClassName: "text-white",
  },
  review: {
    label: "Em Analise",
    badgeClassName: "bg-[#fff4e6]",
    badgeTextClassName: "text-[#8a5a00]",
    actionLabel: "Aguardando",
    actionClassName: "bg-[#ffeff0]",
    actionTextClassName: "text-[#6b2730]",
  },
};

function IconText({
  icon,
  children,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  children: ReactNode;
}) {
  return (
    <View className="flex-row items-center gap-1">
      <Ionicons name={icon} size={14} color="#7a6568" />
      <Text className="text-[13px] text-muted-foreground">{children}</Text>
    </View>
  );
}

function AdCard({ item }: { item: AdItem }) {
  const status = statusContent[item.status];

  return (
    <View className="mb-3 rounded-lg bg-card p-4 shadow-sm shadow-black/5">
      <View className="mb-2 flex-row items-start justify-between gap-2">
        <Text className="flex-1 text-[15px] font-bold leading-5 text-foreground">
          {item.title}
        </Text>
        <View className={`rounded-full px-3 py-1 ${status.badgeClassName}`}>
          <Text className={`text-[11px] font-semibold ${status.badgeTextClassName}`}>
            {status.label}
          </Text>
        </View>
      </View>

      <View className="mb-3 gap-1">
        <IconText icon="calendar-outline">{item.postedAt}</IconText>
        <IconText icon="location-outline">{item.location}</IconText>
      </View>

      <View className="h-px bg-input-border" />

      <View className="mt-3 flex-row items-center gap-5">
        <IconText icon="people-outline">
          <Text className="font-bold text-foreground">{item.candidates}</Text>{" "}
          Candidatos
        </IconText>
        <IconText icon="eye-outline">
          <Text className="font-bold text-foreground">{item.visits}</Text> Visitas
        </IconText>
      </View>

      <View className="mt-3 flex-row gap-2">
        <Pressable
          className="flex-1 items-center rounded-md border border-input-border bg-card py-3"
          accessibilityRole="button"
          accessibilityLabel={`Editar ${item.title}`}
        >
          <Text className="text-sm font-semibold text-foreground">Editar</Text>
        </Pressable>
        <Pressable
          className={`flex-[2] items-center rounded-md py-3 ${status.actionClassName}`}
          accessibilityRole="button"
          accessibilityLabel={status.actionLabel}
        >
          <Text className={`text-sm font-semibold ${status.actionTextClassName}`}>
            {status.actionLabel}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export function ClientAdsPage({
  onBack,
  onNavigate,
  onProfilePress,
}: ClientAdsPageProps) {
  return (
    <View className="relative flex-1 w-full max-w-[480px] bg-background">
      <ProjectHeader
        onBack={onBack ?? (() => onNavigate?.("home"))}
        onProfilePress={onProfilePress}
      />

      <ScrollView
        className="flex-1 px-5"
        contentContainerClassName="pb-32 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-4 text-[22px] font-bold text-foreground">
          Meus Anuncios
        </Text>

        <Pressable
          className="mb-6 items-center gap-2 rounded-lg bg-primary px-5 py-7"
          accessibilityRole="button"
          accessibilityLabel="Criar novo anuncio"
        >
          <View className="h-[42px] w-[42px] items-center justify-center rounded-full bg-white/20">
            <Ionicons name="add" size={24} color="#ffffff" />
          </View>
          <Text className="text-[17px] font-bold text-white">
            Criar Novo Anuncio
          </Text>
          <Text className="text-center text-[13px] leading-5 text-white/85">
            Publique um servico e receba propostas de profissionais qualificados.
          </Text>
        </Pressable>

        <Text className="mb-3 text-[17px] font-bold text-foreground">
          Anuncios Ativos
        </Text>

        {ads.map((item) => (
          <AdCard key={item.id} item={item} />
        ))}
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 px-5 pb-2">
        <ClientBottomNav active="ads" onSelect={onNavigate} />
      </View>
    </View>
  );
}
