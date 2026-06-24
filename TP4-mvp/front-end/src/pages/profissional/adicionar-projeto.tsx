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

import { PhotoDetailsScreen } from "./detalhes-foto";
export function AddProjectScreen({
  onBack,
  onProfilePress,
}: {
  onBack: () => void;
  onProfilePress: () => void;
}) {
  const [title, setTitle] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [details, setDetails] = useState("");
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Eletrica",
    "Reparo",
  ]);
  const categories = [
    "Construcao",
    "Eletrica",
    "Encanamento",
    "Pintura",
    "Reparo",
    "Ar Condicionado",
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  };

  if (isEditingPhoto) {
    return (
      <PhotoDetailsScreen
        onBack={() => setIsEditingPhoto(false)}
        onProfilePress={onProfilePress}
      />
    );
  }

  return (
    <View className="h-full w-full max-w-[480px] self-center bg-background">
      <ProjectHeader onBack={onBack} onProfilePress={onProfilePress} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-4 pb-6 pt-5"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ProjectSection icon="document-text-outline" title="Informacoes Basicas">
          <View className="gap-3">
            <ProjectInput
              label="Titulo do projeto"
              placeholder="Ex: Reforma Completa"
              value={title}
              onChangeText={setTitle}
            />
            <ProjectInput
              label="Em qual Bairro?"
              placeholder="Ex: Centro"
              value={neighborhood}
              onChangeText={setNeighborhood}
            />
          </View>
        </ProjectSection>

        <ProjectSection icon="construct-outline" title="Toque no que voce fez:">
          <View className="flex-row flex-wrap gap-2">
            {categories.map((category) => (
              <ProjectCategoryChip
                key={category}
                label={category}
                selected={selectedCategories.includes(category)}
                onPress={() => toggleCategory(category)}
              />
            ))}
          </View>
        </ProjectSection>

        <ProjectSection
          icon="reorder-three-outline"
          title="Detalhes (se quiser escrever)"
        >
          <View className="relative min-h-[100px] rounded-[12px] bg-[#f5e8e9] px-4 py-3">
            <TextInput
              value={details}
              onChangeText={setDetails}
              multiline
              className="min-h-[74px] pr-10 text-sm text-foreground"
              placeholder="Escreva Mais detalhes do projeto...."
              placeholderTextColor="#8a8a96"
              accessibilityLabel="Detalhes do projeto"
            />
            <Pressable
              className="absolute bottom-3 right-3 h-8 w-8 items-center justify-center rounded-full bg-card shadow-sm"
              accessibilityRole="button"
              accessibilityLabel="Gravar audio"
            >
              <Ionicons name="mic-outline" size={16} color="#b94b50" />
            </Pressable>
          </View>
        </ProjectSection>

        <ProjectSection icon="image-outline" title="Fotos do Projeto">
          <View className="mb-1 flex-row items-start justify-between">
            <Text className="text-sm font-bold text-foreground">
              1 foto adicionada
            </Text>
            <View className="rounded-full bg-[#f5e8e9] px-2 py-0.5">
              <Text className="text-xs font-semibold text-primary">1/10</Text>
            </View>
          </View>
          <Text className="mb-3 text-xs leading-5 text-muted-foreground">
            Voce pode adicionar mais imagens do mesmo projeto para mostrar
            outros angulos e detalhes.
          </Text>
          <ProjectPhotoGrid onEditPhoto={() => setIsEditingPhoto(true)} />
        </ProjectSection>
      </ScrollView>

      <View className="flex-row gap-3 border-t border-black/5 bg-background px-4 pb-6 pt-2">
        <Pressable
          onPress={onBack}
          className="min-h-[56px] flex-1 items-center justify-center rounded-[12px] bg-card shadow-sm"
          accessibilityRole="button"
        >
          <Text className="text-base font-semibold text-foreground">
            Cancelar
          </Text>
        </Pressable>
        <Pressable
          onPress={onBack}
          className="min-h-[56px] flex-[2] items-center justify-center rounded-[12px] bg-primary"
          accessibilityRole="button"
        >
          <Text className="text-base font-semibold text-white">
            Adicionar Projeto
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
