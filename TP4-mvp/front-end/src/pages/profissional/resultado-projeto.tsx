import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

import type { ProjectItem } from "../../components/profissional/types";
import {
  ProjectHeader,
  ResultImageBadge,
} from "../../components/profissional/components";
import { EmptyState } from "../../components/feedback-state";

const labelByType = {
  COVER: "Capa",
  BEFORE: "Antes",
  AFTER: "Depois",
  GENERAL: "Imagem adicional",
};

const colorByType = {
  COVER: "#b94b50",
  BEFORE: "#5a6a7a",
  AFTER: "#2a7a4f",
  GENERAL: "#5a6e8a",
};

function getProjectImages(project?: ProjectItem) {
  if (!project) {
    return [];
  }

  if (project.images?.length) {
    return project.images;
  }

  return project.image
    ? [{ url: project.image, type: project.imageType ?? "COVER" }]
    : [];
}

export function ProjectResultScreen({
  onBack,
  onEdit,
  onProfilePress,
  project,
  readOnly = false,
}: {
  onBack: () => void;
  onEdit?: () => void;
  onProfilePress?: () => void;
  project?: ProjectItem | null;
  readOnly?: boolean;
}) {
  const images = getProjectImages(project ?? undefined);
  const cover = images.find((image) => image.type === "COVER") ?? images[0];
  const gallery = images.filter((image) => image.url !== cover?.url);

  return (
    <View className="h-full w-full max-w-[480px] self-center bg-background">
      <ProjectHeader onBack={onBack} onProfilePress={onProfilePress} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-28"
        showsVerticalScrollIndicator={false}
      >
        <View className="mx-4 overflow-hidden rounded-[20px]">
          {cover ? (
            <Image
              source={{ uri: cover.url }}
              className="h-[260px] w-full"
              resizeMode="cover"
              accessibilityLabel={project?.title ?? "Foto do projeto"}
            />
          ) : (
            <View className="h-[260px] w-full items-center justify-center bg-[#f5e8e9]">
              <Ionicons name="image-outline" size={42} color="#b94b50" />
            </View>
          )}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.62)"]}
            className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10"
          >
            <Text className="text-2xl font-bold leading-8 text-white">
              {project?.title ?? "Projeto"}
            </Text>
            <View className="mt-1 flex-row items-center gap-1">
              <Ionicons name="location" size={13} color="rgba(255,255,255,0.82)" />
              <Text className="text-sm text-white/80">
                {project?.location || "Local nao informado"}
              </Text>
            </View>
          </LinearGradient>
        </View>

        <View className="mx-4 mt-4 rounded-[16px] bg-card p-4 shadow-sm shadow-black/5">
          <View className="mb-2 flex-row items-center gap-2">
            <Ionicons name="reorder-three-outline" size={16} color="#b94b50" />
            <Text className="text-xs font-semibold uppercase tracking-[0.4px] text-foreground">
              Descricao
            </Text>
          </View>
          <Text className="text-sm leading-6 text-muted-foreground">
            {project?.description?.trim() || "Este projeto ainda nao possui descricao."}
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
            <Text className="text-xs text-muted-foreground">
              {images.length} foto(s)
            </Text>
          </View>

          {images.length === 0 ? (
            <EmptyState message="Nenhuma foto cadastrada neste projeto." />
          ) : (
            <View className="gap-2">
              {cover ? (
                <View className="relative overflow-hidden rounded-[12px]">
                  <Image
                    source={{ uri: cover.url }}
                    className="h-[240px] w-full"
                    resizeMode="cover"
                    accessibilityLabel="Foto capa do projeto"
                  />
                  <ResultImageBadge
                    label={labelByType[cover.type]}
                    color={colorByType[cover.type]}
                  />
                </View>
              ) : null}

              <View className="flex-row flex-wrap gap-2">
                {gallery.map((image, index) => (
                  <View
                    key={`${image.url}-${index}`}
                    className="relative aspect-square w-[48%] overflow-hidden rounded-[12px]"
                  >
                    <Image
                      source={{ uri: image.url }}
                      className="h-full w-full"
                      resizeMode="cover"
                      accessibilityLabel={labelByType[image.type]}
                    />
                    <ResultImageBadge
                      label={labelByType[image.type]}
                      color={colorByType[image.type]}
                    />
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View className="flex-row items-center justify-between bg-card px-4 py-4 shadow-lg shadow-black/10">
        <View className="flex-row items-center gap-2">
          <Ionicons name="images-outline" size={18} color="#0f1720" />
          <Text className="text-sm font-medium text-foreground">
            {images.length} foto(s)
          </Text>
        </View>
        {readOnly ? null : (
          <Pressable
            onPress={onEdit}
            className="flex-row items-center gap-2 rounded-full bg-primary px-6 py-3"
            accessibilityRole="button"
          >
            <Ionicons name="pencil" size={16} color="#ffffff" />
            <Text className="text-sm font-semibold text-white">Editar</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
