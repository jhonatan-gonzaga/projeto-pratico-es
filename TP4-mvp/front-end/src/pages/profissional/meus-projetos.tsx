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

export function MyProjectsScreen({
  onAddProject,
  onBack,
  onEditProject,
  onSelectArea,
  onViewResult,
}: {
  onAddProject: () => void;
  onBack: () => void;
  onEditProject: () => void;
  onSelectArea: (area: ProfessionalArea) => void;
  onViewResult: () => void;
}) {
  return (
    <View className="min-h-[812px] w-full max-w-[480px] bg-background">
      <ProjectHeader onBack={onBack} />

      <View className="flex-1 gap-5 px-4 pb-4 pt-5">
        <Pressable
          onPress={onAddProject}
          className="min-h-[56px] flex-row items-center justify-center gap-2 rounded-[12px] bg-primary px-4"
          accessibilityRole="button"
        >
          <Ionicons name="add" size={20} color="#ffffff" />
          <Text className="text-base font-semibold text-white">
            Adicionar Novo Projeto
          </Text>
        </Pressable>

        <View className="flex-row items-center justify-between">
          <Text className="text-xl font-bold text-foreground">
            Meus Projetos
          </Text>
          <Text className="text-sm text-muted-foreground">3 projetos</Text>
        </View>

        <View className="gap-3">
          {projectItems.map((project) => (
            <ProjectListCard
              key={project.title}
              project={project}
              onEdit={onEditProject}
              onViewResult={onViewResult}
            />
          ))}
        </View>
      </View>

      <ProfessionalBottomTab
        activeArea="projects"
        onSelectArea={onSelectArea}
      />
    </View>
  );
}
