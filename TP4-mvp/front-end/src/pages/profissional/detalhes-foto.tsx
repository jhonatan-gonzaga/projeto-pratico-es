import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, Pressable, Text, TextInput, View } from "react-native";

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

export function PhotoDetailsScreen({ onBack }: { onBack: () => void }) {
  const [selectedType, setSelectedType] = useState("Capa do projeto");
  const photoTypes = [
    {
      label: "Capa do projeto",
      description: "A imagem principal que aparecera primeiro",
    },
    {
      label: "Antes",
      description: "Mostra como era o local antes do servico",
    },
    {
      label: "Depois",
      description: "Mostra o resultado finalizado",
    },
    {
      label: "Imagem adicional",
      description: "Outros angulos e detalhes do projeto",
    },
  ];

  return (
    <View className="min-h-[812px] w-full max-w-[480px] bg-background">
      <ProjectHeader onBack={onBack} />

      <View className="gap-4 px-4 pb-6 pt-5">
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-bold text-foreground">
            Detalhes da Foto
          </Text>
          <Pressable onPress={onBack} accessibilityRole="button">
            <Text className="text-base font-semibold text-primary">Salvar</Text>
          </Pressable>
        </View>

        <View className="relative h-[260px] overflow-hidden rounded-[12px]">
          <Image
            source={{
              uri: "https://storage.googleapis.com/banani-generated-images/generated-images/ed993d53-08a8-4be3-b552-c60fca359c15.jpg",
            }}
            className="h-full w-full"
            resizeMode="cover"
            accessibilityLabel="Foto do projeto"
          />
          <Pressable
            className="absolute bottom-3 right-3 flex-row items-center gap-1.5 rounded-full bg-card px-4 py-2 shadow-md shadow-black/10"
            accessibilityRole="button"
          >
            <Ionicons name="refresh-outline" size={14} color="#0f1720" />
            <Text className="text-sm font-semibold text-foreground">
              Trocar foto
            </Text>
          </Pressable>
        </View>

        <View className="gap-3 rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
          <View className="mb-1 flex-row items-center gap-2">
            <Ionicons name="pricetag-outline" size={17} color="#b94b50" />
            <Text className="text-base font-bold text-foreground">
              Como deseja classificar esta foto?
            </Text>
          </View>
          <View className="gap-3" accessibilityRole="radiogroup">
            {photoTypes.map((type) => (
              <PhotoTypeOption
                key={type.label}
                label={type.label}
                description={type.description}
                selected={selectedType === type.label}
                onPress={() => setSelectedType(type.label)}
              />
            ))}
          </View>
        </View>
      </View>

      <View className="gap-3 px-4 pb-8 pt-2">
        <Pressable
          onPress={onBack}
          className="min-h-[56px] flex-row items-center justify-center gap-2 rounded-[12px] bg-primary px-4"
          accessibilityRole="button"
        >
          <Ionicons name="save-outline" size={18} color="#ffffff" />
          <Text className="text-base font-semibold text-white">
            Salvar alteracoes
          </Text>
        </Pressable>
        <Pressable
          onPress={onBack}
          className="min-h-[56px] flex-row items-center justify-center gap-2 rounded-[12px] bg-[#f5e8e9] px-4"
          accessibilityRole="button"
        >
          <Ionicons name="trash-outline" size={18} color="#b94b50" />
          <Text className="text-base font-semibold text-primary">
            Excluir foto
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
