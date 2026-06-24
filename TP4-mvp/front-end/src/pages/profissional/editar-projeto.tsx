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
export function EditProjectScreen({
  onBack,
  onProfilePress,
}: {
  onBack: () => void;
  onProfilePress: () => void;
}) {
  const [title, setTitle] = useState("Construcao de Residencia");
  const [neighborhood, setNeighborhood] = useState("Centro");
  const [details, setDetails] = useState(
    "Construcao de uma residencia de 2 andares no bairro centro, com acabamento padrao medio.",
  );
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
        <View>
          <View className="flex-row items-center gap-2 pb-1">
            <Ionicons name="pencil" size={18} color="#b94b50" />
            <Text className="text-xl font-bold text-foreground">Editar Projeto</Text>
          </View>
          <Text className="text-sm text-muted-foreground">
            Atualize as informacoes do seu projeto
          </Text>
        </View>

        <ProjectSection icon="document-text-outline" title="Informacoes Basicas">
          <View className="gap-3">
            <ProjectInput
              label="Titulo do projeto"
              placeholder="Construcao de Residencia"
              value={title}
              onChangeText={setTitle}
            />
            <ProjectInput
              label="Em qual Bairro?"
              placeholder="Centro"
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
              3 fotos adicionadas
            </Text>
            <View className="rounded-full bg-[#f5e8e9] px-2 py-0.5">
              <Text className="text-xs font-semibold text-primary">3/10</Text>
            </View>
          </View>
          <Text className="mb-3 text-xs leading-5 text-muted-foreground">
            Toque em uma foto para editar ou remover.
          </Text>
          <EditProjectPhotoGrid onEditPhoto={() => setIsEditingPhoto(true)} />
        </ProjectSection>

        <View className="rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
          <View className="mb-3 flex-row items-center gap-2">
            <Ionicons name="warning-outline" size={17} color="#b94b50" />
            <Text className="text-base font-bold text-foreground">
              Zona de Perigo
            </Text>
          </View>
          <Pressable
            className="min-h-[48px] flex-row items-center justify-center gap-2 rounded-[12px] bg-[#f5e8e9]"
            accessibilityRole="button"
          >
            <Ionicons name="trash-outline" size={16} color="#b94b50" />
            <Text className="text-sm font-semibold text-primary">
              Excluir este projeto
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <View className="flex-row gap-3 border-t border-black/5 bg-background px-4 pb-8 pt-2">
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
          className="min-h-[56px] flex-[2] flex-row items-center justify-center gap-2 rounded-[12px] bg-primary"
          accessibilityRole="button"
        >
          <Ionicons name="save-outline" size={18} color="#ffffff" />
          <Text className="text-base font-semibold text-white">
            Salvar Alteracoes
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
