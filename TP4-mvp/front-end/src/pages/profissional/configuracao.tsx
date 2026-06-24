import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { professionalServices, projectItems, serviceRequests } from "../../components/profissional/data";
import { formatBRPhone } from "../../components/profissional/utils";
import type { ProfessionalArea, ProfessionalTab } from "../../components/profissional/types";
import {
  ChoiceChip,
  CustomerAvatar,
  DayButton,
  DetailInfoCard,
  DetailTag,
  EditProjectPhotoGrid,
  NewRequestCard,
  PhotoTypeOption,
  ProfessionalBottomTab,
  ProfessionalHomeHeader,
  ProfessionalTabToggle,
  ProjectCategoryChip,
  ProjectHeader,
  ProjectInput,
  ProjectListCard,
  ProjectPhotoGrid,
  ProjectSection,
  ResultImageBadge,
  ServiceFilterChips,
  ServiceOrderCard,
  SettingsDivider,
  SettingsOption,
  SettingsSection,
  SetupSection,
  SetupTextField,
} from "../../components/profissional/components";

export function SettingsScreen({
  onBack,
  onProfilePress,
  onSelectArea,
}: {
  onBack: () => void;
  onProfilePress: () => void;
  onSelectArea: (area: ProfessionalArea) => void;
}) {
  return (
    <View className="h-full w-full max-w-[480px] self-center bg-background">
      <ProjectHeader onBack={onBack} onProfilePress={onProfilePress} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-4 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-6 flex-row items-center gap-4 rounded-[16px] bg-card px-4 py-4 shadow-sm shadow-black/5">
          <View className="h-16 w-16 items-center justify-center rounded-[14px] border-2 border-primary bg-[#f7e8e9]">
            <Ionicons name="person" size={32} color="#b94b50" />
          </View>
          <View>
            <Text className="text-lg font-bold text-foreground">Jhon Souza</Text>
            <Text className="mt-0.5 text-sm text-muted-foreground">
              jhon.souza@email.com
            </Text>
          </View>
        </View>

        <SettingsSection title="Preferencias">
          <SettingsOption icon="notifications-outline" label="Notificacoes" />
          <SettingsDivider />
          <SettingsOption
            icon="lock-closed-outline"
            label="Privacidade e Seguranca"
          />
        </SettingsSection>

        <SettingsSection title="Suporte">
          <SettingsOption icon="help-circle-outline" label="Central de Ajuda" />
          <SettingsDivider />
          <SettingsOption icon="document-text-outline" label="Termos de Uso" />
        </SettingsSection>

        <View className="overflow-hidden rounded-[16px] bg-card shadow-sm shadow-black/5">
          <Pressable
            className="flex-row items-center justify-center gap-2 px-4 py-4"
            accessibilityRole="button"
          >
            <Ionicons name="log-out-outline" size={18} color="#b94b50" />
            <Text className="text-[15px] font-semibold text-primary">
              Sair da Conta
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <ProfessionalBottomTab
        activeArea="settings"
        onSelectArea={onSelectArea}
      />
    </View>
  );
}
