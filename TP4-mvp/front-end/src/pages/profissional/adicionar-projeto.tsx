import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { professionalServices, projectItems, serviceRequests } from "../../components/profissional/data";
import { formatBRPhone } from "../../components/profissional/utils";
import type { ProfessionalArea, ProfessionalTab, ProjectItem } from "../../components/profissional/types";
import { captureAndUploadImage, pickAndUploadImage } from "../../services/image-upload";
import { getProjectFormErrors, isRequiredText } from "../../services/validators";
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
  onSave,
}: {
  onBack: () => void;
  onProfilePress: () => void;
  onSave: (project: ProjectItem) => void;
}) {
  const [title, setTitle] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [details, setDetails] = useState("");
  const [images, setImages] = useState<NonNullable<ProjectItem["images"]>>([]);
  const [editingPhotoIndex, setEditingPhotoIndex] = useState<number | null>(null);
  const [isEditingPhotoDetails, setIsEditingPhotoDetails] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({
    details: false,
    neighborhood: false,
    title: false,
  });
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

  const errors = getProjectFormErrors({
    categories: selectedCategories,
    details,
    neighborhood,
    title,
  });
  const hasErrors = Object.values(errors).some(Boolean);
  const shouldShow = (field: keyof typeof touched) => submitted || touched[field];
  const fieldStatus = (field: keyof typeof touched, isValid: boolean) => {
    if (!shouldShow(field)) {
      return "default";
    }

    return isValid ? "valid" : "error";
  };
  const fieldError = (field: keyof typeof touched) =>
    shouldShow(field) ? errors[field] : undefined;

  const handleSave = () => {
    setSubmitted(true);

    if (hasErrors) {
      return;
    }

    onSave({
      title: title.trim(),
      location: neighborhood.trim(),
      description: details.trim(),
      image:
        images.find((image) => image.type === "COVER")?.url ??
        images[0]?.url ??
        "",
      imageType: images.find((image) => image.type === "COVER")?.type ?? images[0]?.type,
      images,
    });
  };
  const handleAddImage = async (source: "camera" | "library") => {
    setIsUploadingImage(true);
    setUploadError(null);

    try {
      const uploadedUrl =
        source === "camera" ? await captureAndUploadImage() : await pickAndUploadImage();

      if (uploadedUrl) {
        const nextIndex = images.length;
        setImages((current) => [
          ...current,
          {
            url: uploadedUrl,
            type: current.length === 0 ? "COVER" : "GENERAL",
          },
        ]);
        setEditingPhotoIndex(nextIndex);
        setIsEditingPhotoDetails(true);
      }
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Nao foi possivel enviar a foto.",
      );
    } finally {
      setIsUploadingImage(false);
    }
  };

  const editingImage =
    editingPhotoIndex !== null ? images[editingPhotoIndex] : undefined;

  if (isEditingPhotoDetails && editingImage) {
    return (
      <PhotoDetailsScreen
        imageUri={editingImage.url}
        initialType={editingImage.type}
        onBack={() => setIsEditingPhotoDetails(false)}
        onProfilePress={onProfilePress}
        onSave={({ deleted, type, url }) => {
          setImages((current) => {
            if (deleted) {
              const nextImages = current.filter((_, index) => index !== editingPhotoIndex);

              if (!nextImages.some((image) => image.type === "COVER") && nextImages[0]) {
                return nextImages.map((image, index) =>
                  index === 0 ? { ...image, type: "COVER" } : image,
                );
              }

              return nextImages;
            }

            return current.map((image, index) => {
              if (type === "COVER" && index !== editingPhotoIndex) {
                return image.type === "COVER" ? { ...image, type: "GENERAL" } : image;
              }

              return index === editingPhotoIndex ? { ...image, type, url } : image;
            });
          });
          setIsEditingPhotoDetails(false);
          setEditingPhotoIndex(null);
        }}
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
              onBlur={() => setTouched((current) => ({ ...current, title: true }))}
              onChangeText={setTitle}
              status={fieldStatus("title", isRequiredText(title, 3))}
              helperText={fieldError("title")}
            />
            <ProjectInput
              label="Em qual Bairro?"
              placeholder="Ex: Centro"
              value={neighborhood}
              onBlur={() =>
                setTouched((current) => ({ ...current, neighborhood: true }))
              }
              onChangeText={setNeighborhood}
              status={fieldStatus("neighborhood", isRequiredText(neighborhood))}
              helperText={fieldError("neighborhood")}
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
          {submitted && errors.categories ? (
            <Text className="px-1 text-xs leading-4 text-[#dc2626]">
              {errors.categories}
            </Text>
          ) : null}
        </ProjectSection>

        <ProjectSection
          icon="reorder-three-outline"
          title="Detalhes (se quiser escrever)"
        >
          <View
            className={`relative min-h-[100px] rounded-[12px] border-[1.5px] px-4 py-3 ${
              fieldError("details")
                ? "border-[#dc2626] bg-[#fff7f7]"
                : "border-transparent bg-[#f5e8e9]"
            }`}
          >
            <TextInput
              value={details}
              onBlur={() =>
                setTouched((current) => ({ ...current, details: true }))
              }
              onChangeText={setDetails}
              multiline
              className="min-h-[74px] pr-10 text-sm text-foreground"
              placeholder="Escreva Mais detalhes do projeto...."
              placeholderTextColor="#8a8a96"
              accessibilityLabel="Detalhes do projeto"
            />
          </View>
          {fieldError("details") ? (
            <Text className="px-1 text-xs leading-4 text-[#dc2626]">
              {fieldError("details")}
            </Text>
          ) : null}
        </ProjectSection>

        <ProjectSection icon="image-outline" title="Fotos do Projeto">
          <View className="mb-1 flex-row items-start justify-between">
            <Text className="text-sm font-bold text-foreground">
              {images.length === 1
                ? "1 foto adicionada"
                : `${images.length} fotos adicionadas`}
            </Text>
            <View className="rounded-full bg-[#f5e8e9] px-2 py-0.5">
              <Text className="text-xs font-semibold text-primary">
                {images.length}/10
              </Text>
            </View>
          </View>
          <Text className="mb-3 text-xs leading-5 text-muted-foreground">
            Voce pode adicionar mais imagens do mesmo projeto para mostrar
            outros angulos e detalhes.
          </Text>
          <ProjectPhotoGrid
            images={images}
            onAddPhoto={() => handleAddImage("library")}
            onTakePhoto={() => handleAddImage("camera")}
            onEditPhoto={(index) => {
              setEditingPhotoIndex(index);
              setIsEditingPhotoDetails(true);
            }}
          />
          {isUploadingImage ? (
            <Text className="text-xs text-muted-foreground">Enviando foto...</Text>
          ) : null}
          {uploadError ? (
            <Text className="px-1 text-xs leading-4 text-[#dc2626]">
              {uploadError}
            </Text>
          ) : null}
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
          onPress={handleSave}
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
