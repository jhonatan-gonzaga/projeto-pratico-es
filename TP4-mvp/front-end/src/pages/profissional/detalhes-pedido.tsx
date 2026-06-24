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

export function RequestDetailsScreen({
  onBack,
  onProfilePress,
}: {
  onBack: () => void;
  onProfilePress: () => void;
}) {
  return (
    <View className="h-full w-full max-w-[480px] self-center bg-background">
      <ProjectHeader onBack={onBack} onProfilePress={onProfilePress} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-6 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-1 text-2xl font-bold text-foreground">
          Pintura Residencial
        </Text>
        <View className="mb-4 flex-row flex-wrap gap-2">
          <View className="flex-row items-center gap-1 rounded-[12px] bg-card px-3 py-1.5">
            <Ionicons name="location" size={14} color="#b94b50" />
            <Text className="text-sm text-foreground">Centro</Text>
          </View>
          <View className="flex-row items-center gap-1 rounded-[12px] bg-card px-3 py-1.5">
            <Ionicons name="calendar" size={14} color="#b94b50" />
            <Text className="text-sm text-foreground">04 de dez.</Text>
          </View>
        </View>

        <View className="mb-4 rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
          <View className="mb-3 flex-row items-center gap-2">
            <Ionicons name="briefcase-outline" size={18} color="#b94b50" />
            <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
              Categoria
            </Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {[
              "Pedreiro",
              "Eletricista",
              "Pintor",
              "Encanador",
              "Ajudante",
              "Ar Condicionado",
              "Carpinteiro",
            ].map((category) => (
              <DetailTag
                key={category}
                label={category}
                active={category === "Pintor"}
              />
            ))}
          </View>
        </View>

        <View className="mb-4 rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
          <View className="mb-2 flex-row items-center gap-2">
            <Ionicons name="reorder-three-outline" size={18} color="#b94b50" />
            <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
              Descricao
            </Text>
          </View>
          <Text className="text-sm leading-6 text-muted-foreground">
            Pintura completa de casa de 3 quartos, incluindo teto e paredes
            internas. Necessario preparar as paredes, cobrir moveis e entregar
            acabamento limpo.
          </Text>
        </View>

        <View className="mb-4 flex-row gap-3">
          <DetailInfoCard
            icon="calendar-outline"
            label="Data"
            value="04/12/2024"
            subtitle="Prazo: 5 dias"
          />
          <DetailInfoCard
            icon="wallet-outline"
            label="Valor"
            value="R$ 1.800"
            subtitle="NEGOCIAVEL"
          />
        </View>

        <View className="mb-4 rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
          <View className="mb-3 flex-row items-center gap-2">
            <Ionicons name="cash-outline" size={18} color="#b94b50" />
            <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
              Propor Novo Valor
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="flex-1 flex-row items-center gap-2 rounded-[12px] border border-input-border bg-background px-3 py-3">
              <Text className="text-sm font-medium text-muted-foreground">R$</Text>
              <Text className="text-sm text-muted-foreground">Ex: 1.500,00</Text>
            </View>
            <Pressable
              className="rounded-[12px] bg-primary px-5 py-3"
              accessibilityRole="button"
            >
              <Text className="text-sm font-semibold text-white">Enviar</Text>
            </Pressable>
          </View>
        </View>

        <View className="mb-5 rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
          <View className="mb-3 flex-row items-center gap-2">
            <Ionicons name="image-outline" size={18} color="#b94b50" />
            <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
              Imagens do Servico
            </Text>
          </View>
          <Image
            source={{
              uri: "https://storage.googleapis.com/banani-generated-images/generated-images/115f5264-00fb-47c5-8131-0b9c0c0cc1f9.jpg",
            }}
            className="mb-2 h-[170px] w-full rounded-[12px]"
            resizeMode="cover"
            accessibilityLabel="Parede antes do servico"
          />
          <View className="flex-row gap-2">
            <Image
              source={{
                uri: "https://storage.googleapis.com/banani-generated-images/generated-images/a7392f6c-4409-404d-b138-9700b3cdafb7.jpg",
              }}
              className="h-[92px] flex-1 rounded-[12px]"
              resizeMode="cover"
              accessibilityLabel="Parede pintada"
            />
            <Image
              source={{
                uri: "https://storage.googleapis.com/banani-generated-images/generated-images/8e2e8dc8-4a47-4485-a1d8-b3d82ae43a22.jpg",
              }}
              className="h-[92px] flex-1 rounded-[12px]"
              resizeMode="cover"
              accessibilityLabel="Materiais de pintura"
            />
          </View>
        </View>

        <View className="flex-row gap-3">
          <Pressable
            onPress={onBack}
            className="min-h-[56px] flex-1 items-center justify-center rounded-[12px] bg-card shadow-sm"
            accessibilityRole="button"
          >
            <Text className="font-semibold text-foreground">Recusar</Text>
          </Pressable>
          <Pressable
            onPress={onBack}
            className="min-h-[56px] flex-1 items-center justify-center rounded-[12px] bg-primary"
            accessibilityRole="button"
          >
            <Text className="font-semibold text-white">Aceitar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
