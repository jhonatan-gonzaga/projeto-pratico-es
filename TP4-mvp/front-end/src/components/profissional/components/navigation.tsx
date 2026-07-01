import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

import { api } from "../../../services/api";
import { statusMeta } from "../data";
import type { IconName, ProfessionalArea, ProfessionalService, ProfessionalTab, ProjectItem, ServiceRequest, ServiceStatus } from "../types";

const logo = require("../../../../assets/logotipo.png");

export function ProfessionalHeader({
  onBack,
  onProfilePress,
}: {
  onBack: () => void;
  onProfilePress?: () => void;
}) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    api.me()
      .then((user) => setAvatarUrl(user.avatarUrl ?? null))
      .catch(() => undefined);
  }, []);

  return (
    <>
      <View className="flex-row items-center justify-between bg-background px-4 pb-4 pt-11">
        <Pressable
          onPress={onBack}
          className="h-10 w-10 items-center justify-center rounded-full bg-card shadow-sm"
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={18} color="#0f1720" />
        </Pressable>

        <View className="h-11 flex-1 items-center justify-center px-3">
          <Image
            source={logo}
            className="h-11 w-[170px]"
            resizeMode="contain"
            accessibilityLabel="Conecta Obras Itacoatiara"
          />
        </View>

        <Pressable
          onPress={onProfilePress}
          className="h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-primary bg-[#f7e8e9]"
          accessibilityRole="button"
          accessibilityLabel="Abrir perfil"
        >
          {avatarUrl ? (
            <Image
              source={{ uri: avatarUrl }}
              className="h-full w-full"
              resizeMode="cover"
              accessibilityLabel="Foto do perfil"
            />
          ) : (
            <Ionicons name="person" size={22} color="#b94b50" />
          )}
        </Pressable>
      </View>
      <View className="h-px bg-black/5" />
    </>
  );
}

export function ProfessionalHomeHeader({
  onBack,
  onProfilePress,
}: {
  onBack: () => void;
  onProfilePress?: () => void;
}) {
  return (
    <ProfessionalHeader onBack={onBack} onProfilePress={onProfilePress} />
  );
}

export function ProfessionalTabToggle({
  activeTab,
  onChangeTab,
}: {
  activeTab: ProfessionalTab;
  onChangeTab: (tab: ProfessionalTab) => void;
}) {
  const [pendingRequests, setPendingRequests] = useState(0);

  useEffect(() => {
    api.inboxDirectRequestsSummary()
      .then((summary) => setPendingRequests(summary.pendingDirectRequests))
      .catch(() => undefined);
  }, [activeTab]);

  return (
    <View className="mx-4 my-4 flex-row rounded-[16px] border border-input-border bg-card p-1">
      <Pressable
        onPress={() => onChangeTab("requests")}
        className={`min-h-[40px] min-w-0 flex-1 flex-row items-center justify-center gap-2 rounded-[12px] px-2 ${
          activeTab === "requests" ? "bg-primary" : "bg-transparent"
        }`}
        accessibilityRole="tab"
        accessibilityState={{ selected: activeTab === "requests" }}
      >
        <Text
          className={`text-center text-[13px] font-semibold leading-4 ${
            activeTab === "requests" ? "text-white" : "text-muted-foreground"
          }`}
          numberOfLines={1}
        >
          Novos Pedidos
        </Text>
        {activeTab === "requests" && pendingRequests > 0 ? (
          <View className="h-5 w-5 items-center justify-center rounded-full bg-white">
            <Text className="text-xs font-bold text-primary">
              {pendingRequests > 9 ? "9+" : pendingRequests}
            </Text>
          </View>
        ) : null}
      </Pressable>
      <Pressable
        onPress={() => onChangeTab("services")}
        className={`min-h-[40px] min-w-0 flex-1 items-center justify-center rounded-[12px] px-2 ${
          activeTab === "services" ? "bg-primary" : "bg-transparent"
        }`}
        accessibilityRole="tab"
        accessibilityState={{ selected: activeTab === "services" }}
      >
        <Text
          className={`text-center text-[13px] font-semibold leading-4 ${
            activeTab === "services" ? "text-white" : "text-muted-foreground"
          }`}
          numberOfLines={1}
        >
          Meus Servicos
        </Text>
      </Pressable>
    </View>
  );
}

export function ProjectHeader({
  onBack,
  onProfilePress,
}: {
  onBack: () => void;
  onProfilePress?: () => void;
}) {
  return (
    <ProfessionalHeader onBack={onBack} onProfilePress={onProfilePress} />
  );
}

export function ProfessionalBottomTab({
  activeArea,
  onSelectArea,
}: {
  activeArea: ProfessionalArea;
  onSelectArea: (area: ProfessionalArea) => void;
}) {
  const [opportunityBadge, setOpportunityBadge] = useState(0);

  useEffect(() => {
    Promise.all([api.inboxDirectRequestsSummary(), api.unreadConversations()])
      .then(([requests, messages]) =>
        setOpportunityBadge(requests.pendingDirectRequests + messages.count),
      )
      .catch(() => undefined);
  }, [activeArea]);

  const items: Array<{
    area: ProfessionalArea;
    icon: IconName;
    label: string;
    badge?: string;
  }> = [
    {
      area: "opportunities",
      icon: "hammer-outline",
      label: "Oportunidades",
      badge: opportunityBadge > 0 ? String(opportunityBadge) : undefined,
    },
    { area: "projects", icon: "clipboard-outline", label: "Meus Projetos" },
    { area: "settings", icon: "settings-outline", label: "Configuracoes" },
  ];

  return (
    <View className="rounded-t-[22px] border-t border-input-border bg-card px-2 py-3 shadow-lg shadow-black/10">
      <View className="flex-row items-center justify-between">
        {items.map((item) => (
          <Pressable
            key={item.label}
            onPress={() => onSelectArea(item.area)}
            className="min-w-0 flex-1 items-center gap-1 px-1"
            accessibilityRole="button"
            accessibilityState={{ selected: activeArea === item.area }}
          >
            <View className="relative">
              <Ionicons
                name={item.icon}
                size={24}
                color={activeArea === item.area ? "#b94b50" : "#7a6568"}
              />
              {item.badge && activeArea === item.area ? (
                <View className="absolute -right-2 -top-1 h-4 w-4 items-center justify-center rounded-full bg-primary">
                  <Text className="text-[9px] font-bold text-white">
                    {Number(item.badge) > 9 ? "9+" : item.badge}
                  </Text>
                </View>
              ) : null}
            </View>
            <Text
              className={`text-center text-[10px] leading-3 ${
                activeArea === item.area
                  ? "font-semibold text-primary"
                  : "text-muted-foreground"
              }`}
              numberOfLines={1}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
