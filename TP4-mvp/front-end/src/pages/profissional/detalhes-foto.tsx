import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { professionalServices, projectItems, serviceRequests } from "../../components/profissional/data";
import { formatBRPhone } from "../../components/profissional/utils";
import type { ProjectItem } from "../../components/profissional/types";
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
  imageUri,
  onBack,
  onProfilePress,
  onSave,
}: {
  imageUri: string;
  onBack: () => void;
  onProfilePress: () => void;
  onSave: (type: NonNullable<ProjectItem["imageType"]>) => void;
}) {
  const [selectedType, setSelectedType] = useState("Capa do projeto");
  const [isDeleted, setIsDeleted] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
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
  const typeMap: Record<string, NonNullable<ProjectItem["imageType"]>> = {
    "Capa do projeto": "COVER",
    Antes: "BEFORE",
    Depois: "AFTER",
    "Imagem adicional": "GENERAL",
  };
  const handleSave = () => onSave(typeMap[selectedType]);

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
          <Pressable onPress={handleSave} accessibilityRole="button">
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
              source={{ uri: imageUri }}
              className="h-full w-full"
              resizeMode="cover"
              accessibilityLabel="Foto do projeto"
            />
          )}
          <Pressable
            onPress={onBack}
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
          onPress={handleSave}
          className="min-h-[56px] flex-row items-center justify-center gap-2 rounded-[12px] bg-primary px-4"
          accessibilityRole="button"
        >
          <Ionicons name="save-outline" size={18} color="#ffffff" />
          <Text className="text-base font-semibold text-white">
            Salvar alteracoes
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setConfirmingDelete(true)}
          className="min-h-[56px] flex-row items-center justify-center gap-2 rounded-[12px] bg-[#f5e8e9] px-4"
          accessibilityRole="button"
        >
          <Ionicons name="trash-outline" size={18} color="#b94b50" />
          <Text className="text-base font-semibold text-primary">
            Excluir foto
          </Text>
        </Pressable>
        {confirmingDelete ? (
          <View className="gap-3 rounded-[12px] border border-[#f2cdd0] bg-[#fff7f7] p-3">
            <Text className="text-sm leading-5 text-muted-foreground">
              Esta foto deixara de aparecer no projeto. Se ela for capa, escolha
              outra imagem antes de salvar para manter o projeto bem apresentado.
            </Text>
            <View className="flex-row gap-2">
              <Pressable
                onPress={() => setConfirmingDelete(false)}
                className="min-h-[42px] flex-1 items-center justify-center rounded-[10px] border border-input-border bg-card"
                accessibilityRole="button"
              >
                <Text className="text-sm font-semibold text-foreground">Voltar</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setIsDeleted(true);
                  setConfirmingDelete(false);
                }}
                className="min-h-[42px] flex-1 items-center justify-center rounded-[10px] bg-primary"
                accessibilityRole="button"
              >
                <Text className="text-sm font-semibold text-white">Confirmar</Text>
              </Pressable>
            </View>
          </View>
        ) : null}
      </View>
    </View>
  );
}
