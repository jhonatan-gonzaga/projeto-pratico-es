import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { professionalServices, serviceRequests } from "../../components/profissional/data";
import { formatBRPhone } from "../../components/profissional/utils";
import type { ProfessionalArea, ProfessionalTab, ProjectItem } from "../../components/profissional/types";
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
  onDeleteProject,
  onEditProject,
  onProfilePress,
  projects,
  onSelectArea,
  onViewResult,
  readOnly = false,
}: {
  onAddProject?: () => void;
  onBack: () => void;
  onDeleteProject?: (project: ProjectItem) => void;
  onEditProject?: (project: ProjectItem) => void;
  onProfilePress?: () => void;
  projects: ProjectItem[];
  onSelectArea?: (area: ProfessionalArea) => void;
  onViewResult: (project: ProjectItem) => void;
  readOnly?: boolean;
}) {
  return (
    <View className="h-full w-full max-w-[480px] self-center bg-background">
      <ProjectHeader onBack={onBack} onProfilePress={onProfilePress} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-5 px-4 pb-4 pt-5"
        showsVerticalScrollIndicator={false}
      >
        {readOnly ? null : (
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
        )}

        <View className="flex-row items-center justify-between">
          <Text className="text-xl font-bold text-foreground">
            {readOnly ? "Portfólio" : "Meus Projetos"}
          </Text>
          <Text className="text-sm text-muted-foreground">
            {projects.length} projetos
          </Text>
        </View>

        <View className="gap-3">
          {projects.map((project) => (
            <ProjectListCard
              key={project.title}
              project={project}
              onDelete={onDeleteProject ? () => onDeleteProject(project) : undefined}
              onEdit={onEditProject ? () => onEditProject(project) : undefined}
              onViewResult={() => onViewResult(project)}
              readOnly={readOnly}
            />
          ))}
        </View>
      </ScrollView>

      {readOnly || !onSelectArea ? null : (
        <ProfessionalBottomTab
          activeArea="projects"
          onSelectArea={onSelectArea}
        />
      )}
    </View>
  );
}
