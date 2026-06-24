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

export function PhotoDetailsScreen({
  onBack,
  onProfilePress,
}: {
  onBack: () => void;
  onProfilePress: () => void;
}) {
  const [selectedType, setSelectedType] = useState("Capa do projeto");
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isDeleted, setIsDeleted] = useState(false);
  const simulatedPhotos = [
    "https://storage.googleapis.com/banani-generated-images/generated-images/ed993d53-08a8-4be3-b552-c60fca359c15.jpg",
    "https://storage.googleapis.com/banani-generated-images/generated-images/8710618e-4e64-4d2a-ae9f-53404d15a9f3.jpg",
    "https://storage.googleapis.com/banani-generated-images/generated-images/2b1f4f99-1cc7-4f6c-aa9d-220857994a69.jpg",
  ];
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
    <View className="h-full w-full max-w-[480px] self-center bg-background">
      <ProjectHeader onBack={onBack} onProfilePress={onProfilePress} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-4 pb-6 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-bold text-foreground">
            Detalhes da Foto
          </Text>
          <Pressable onPress={onBack} accessibilityRole="button">
            <Text className="text-base font-semibold text-primary">Salvar</Text>
          </Pressable>
        </View>

        <View className="relative h-[260px] overflow-hidden rounded-[12px]">
          {isDeleted ? (
            <View className="h-full w-full items-center justify-center gap-2 bg-[#f5e8e9]">
              <Ionicons name="image-outline" size={40} color="#b94b50" />
              <Text className="text-sm font-semibold text-primary">
                Foto removida
              </Text>
            </View>
          ) : (
            <Image
              source={{ uri: simulatedPhotos[photoIndex] }}
              className="h-full w-full"
              resizeMode="cover"
              accessibilityLabel="Foto do projeto"
            />
          )}
          <Pressable
            onPress={() => {
              setIsDeleted(false);
              setPhotoIndex((current) => (current + 1) % simulatedPhotos.length);
            }}
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
      </ScrollView>

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
          onPress={() => setIsDeleted(true)}
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
