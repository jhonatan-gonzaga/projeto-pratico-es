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

export function ProjectResultScreen({
  onBack,
  onEdit,
  onProfilePress,
}: {
  onBack: () => void;
  onEdit: () => void;
  onProfilePress: () => void;
}) {
  return (
    <View className="h-full w-full max-w-[480px] self-center bg-background">
      <ProjectHeader onBack={onBack} onProfilePress={onProfilePress} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-28"
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-4 overflow-hidden rounded-[20px]">
          <Image
            source={{
              uri: "https://storage.googleapis.com/banani-generated-images/generated-images/4553595b-f1e6-4373-b3a1-849425e19812.jpg",
            }}
            className="h-[190px] w-full"
            resizeMode="cover"
            accessibilityLabel="Construcao de Casa"
          />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.62)"]}
            className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10"
          >
            <Text className="text-2xl font-bold leading-8 text-white">
              Construcao de Casa
            </Text>
            <View className="mt-1 flex-row items-center gap-1">
              <Ionicons name="location" size={13} color="rgba(255,255,255,0.82)" />
              <Text className="text-sm text-white/80">
                Centro - Itacoatiara
              </Text>
            </View>
          </LinearGradient>
        </View>

      <View className="mt-4 flex-row flex-wrap gap-2 px-4">
        {["Construcao", "Eletrica", "Reparo"].map((tag) => (
          <View
            key={tag}
            className="rounded-full border border-primary px-4 py-1"
          >
            <Text className="text-[13px] font-medium text-primary">{tag}</Text>
          </View>
        ))}
      </View>

      <View className="mx-4 mt-4 rounded-[16px] bg-card p-4 shadow-sm shadow-black/5">
        <View className="mb-2 flex-row items-center gap-2">
          <Ionicons name="reorder-three-outline" size={16} color="#b94b50" />
          <Text className="text-xs font-semibold uppercase tracking-[0.4px] text-foreground">
            Descricao
          </Text>
        </View>
        <Text className="text-sm leading-6 text-muted-foreground">
          Construcao completa de residencia unifamiliar com 3 quartos, sala,
          cozinha e 2 banheiros. Execucao de fundacao, alvenaria, estrutura,
          cobertura e acabamento interno.
        </Text>
      </View>

      <View className="mx-4 mt-4 rounded-[16px] bg-card p-4 shadow-sm shadow-black/5">
        <View className="mb-3 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Ionicons name="image-outline" size={16} color="#b94b50" />
            <Text className="text-xs font-semibold uppercase tracking-[0.4px] text-foreground">
              Fotos do Projeto
            </Text>
          </View>
          <Text className="text-xs text-muted-foreground">3 fotos</Text>
        </View>

        <View className="mb-2 overflow-hidden rounded-[12px]">
          <Image
            source={{
              uri: "https://storage.googleapis.com/banani-generated-images/generated-images/702a3dd3-9bc6-48fe-90c3-874bbc6cf337.jpg",
            }}
            className="h-[175px] w-full"
            resizeMode="cover"
            accessibilityLabel="Foto antes do projeto"
          />
          <View className="absolute left-2 top-2 rounded-[6px] bg-[#2a7a4f] px-2 py-1">
            <Text className="text-[11px] font-semibold text-white">Antes</Text>
          </View>
        </View>

        <View className="flex-row gap-2">
          <View className="relative aspect-square flex-1 overflow-hidden rounded-[12px]">
            <Image
              source={{
                uri: "https://storage.googleapis.com/banani-generated-images/generated-images/8710618e-4e64-4d2a-ae9f-53404d15a9f3.jpg",
              }}
              className="h-full w-full"
              resizeMode="cover"
              accessibilityLabel="Foto depois do projeto"
            />
            <ResultImageBadge label="Depois" color="#b94b50" />
          </View>
          <View className="relative aspect-square flex-1 overflow-hidden rounded-[12px]">
            <Image
              source={{
                uri: "https://storage.googleapis.com/banani-generated-images/generated-images/2b1f4f99-1cc7-4f6c-aa9d-220857994a69.jpg",
              }}
              className="h-full w-full"
              resizeMode="cover"
              accessibilityLabel="Imagem adicional do projeto"
            />
            <ResultImageBadge label="Imagem Adicional" color="#5a6e8a" />
          </View>
          <View className="aspect-square flex-1 items-center justify-center rounded-[12px] bg-[#f0e8e9]">
            <Ionicons name="add" size={18} color="#9a8080" />
          </View>
        </View>
      </View>

      </ScrollView>

      <View className="flex-row items-center justify-between bg-card px-4 py-4 shadow-lg shadow-black/10">
        <Pressable
          className="flex-row items-center gap-2"
          accessibilityRole="button"
        >
          <Ionicons name="share-social-outline" size={18} color="#0f1720" />
          <Text className="text-sm font-medium text-foreground">
            Compartilhar
          </Text>
        </Pressable>
        <Pressable
          onPress={onEdit}
          className="flex-row items-center gap-2 rounded-full bg-primary px-6 py-3"
          accessibilityRole="button"
        >
          <Ionicons name="pencil" size={16} color="#ffffff" />
          <Text className="text-sm font-semibold text-white">Editar</Text>
        </Pressable>
      </View>
    </View>
  );
}
