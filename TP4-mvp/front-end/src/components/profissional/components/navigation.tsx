import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, TextInput, View } from "react-native";

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
          <Ionicons name="person" size={22} color="#b94b50" />
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
  return (
    <View className="mx-4 my-4 flex-row rounded-[16px] border border-input-border bg-card p-1">
      <Pressable
        onPress={() => onChangeTab("requests")}
        className={`min-h-[38px] flex-1 flex-row items-center justify-center gap-2 rounded-[12px] px-3 ${
          activeTab === "requests" ? "bg-primary" : "bg-transparent"
        }`}
        accessibilityRole="tab"
        accessibilityState={{ selected: activeTab === "requests" }}
      >
        <Text
          className={`text-sm font-semibold ${
            activeTab === "requests" ? "text-white" : "text-muted-foreground"
          }`}
        >
          Novos Pedidos
        </Text>
        {activeTab === "requests" ? (
          <View className="h-5 w-5 items-center justify-center rounded-full bg-white">
            <Text className="text-xs font-bold text-primary">2</Text>
          </View>
        ) : null}
      </Pressable>
      <Pressable
        onPress={() => onChangeTab("services")}
        className={`min-h-[38px] flex-1 items-center justify-center rounded-[12px] px-3 ${
          activeTab === "services" ? "bg-primary" : "bg-transparent"
        }`}
        accessibilityRole="tab"
        accessibilityState={{ selected: activeTab === "services" }}
      >
        <Text
          className={`text-sm font-semibold ${
            activeTab === "services" ? "text-white" : "text-muted-foreground"
          }`}
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
      badge: "3",
    },
    { area: "projects", icon: "clipboard-outline", label: "Meus Projetos" },
    { area: "settings", icon: "settings-outline", label: "Configuracoes" },
  ];

  return (
    <View className="border-t border-input-border bg-card px-2 py-3">
      <View className="flex-row items-center justify-around">
        {items.map((item) => (
          <Pressable
            key={item.label}
            onPress={() => onSelectArea(item.area)}
            className="items-center gap-1 px-3"
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
                    {item.badge}
                  </Text>
                </View>
              ) : null}
            </View>
            <Text
              className={`text-xs ${
                activeArea === item.area
                  ? "font-semibold text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
