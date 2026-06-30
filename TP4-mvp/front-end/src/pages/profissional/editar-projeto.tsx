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

export function EditProjectScreen({
  onBack,
  onProfilePress,
  onDelete,
  onSave,
  project,
}: {
  onBack: () => void;
  onProfilePress: () => void;
  onDelete: (project: ProjectItem) => void;
  onSave: (project: ProjectItem) => void;
  project: ProjectItem;
}) {
  const [title, setTitle] = useState(project.title);
  const [neighborhood, setNeighborhood] = useState(project.location);
  const [details, setDetails] = useState(project.description ?? "");
  const [images, setImages] = useState<NonNullable<ProjectItem["images"]>>(
    project.images?.length
      ? project.images
      : project.image
        ? [{ url: project.image, type: project.imageType ?? "COVER" }]
        : [],
  );
  const [editingPhotoIndex, setEditingPhotoIndex] = useState<number | null>(null);
  const [isEditingPhotoDetails, setIsEditingPhotoDetails] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
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

    const cleanImages = images.map(({ url, type, altText }) => ({
      url,
      type,
      altText,
    }));

    onSave({
      ...project,
      title: title.trim(),
      location: neighborhood.trim(),
      description: details.trim(),
      image:
        cleanImages.find((image) => image.type === "COVER")?.url ??
        cleanImages[0]?.url ??
        "",
      imageType: cleanImages.find((image) => image.type === "COVER")?.type ?? cleanImages[0]?.type,
      images: cleanImages,
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
        onBack={() => setIsEditingPhotoDetails(false)}
        onProfilePress={onProfilePress}
        onSave={(type) => {
          setImages((current) =>
            current.map((image, index) => {
              if (type === "COVER" && index !== editingPhotoIndex) {
                return image.type === "COVER" ? { ...image, type: "GENERAL" } : image;
              }

              return index === editingPhotoIndex ? { ...image, type } : image;
            }),
          );
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
              onBlur={() => setTouched((current) => ({ ...current, title: true }))}
              onChangeText={setTitle}
              status={fieldStatus("title", isRequiredText(title, 3))}
              helperText={fieldError("title")}
            />
            <ProjectInput
              label="Em qual Bairro?"
              placeholder="Centro"
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
            Toque em uma foto para editar ou remover.
          </Text>
          <EditProjectPhotoGrid
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

        <View className="rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
          <View className="mb-3 flex-row items-center gap-2">
            <Ionicons name="warning-outline" size={17} color="#b94b50" />
            <Text className="text-base font-bold text-foreground">
              Zona de Perigo
            </Text>
          </View>
          <Pressable
            onPress={() => setConfirmingDelete(true)}
            className="min-h-[48px] flex-row items-center justify-center gap-2 rounded-[12px] bg-[#f5e8e9]"
            accessibilityRole="button"
          >
            <Ionicons name="trash-outline" size={16} color="#b94b50" />
            <Text className="text-sm font-semibold text-primary">
              Excluir este projeto
            </Text>
          </Pressable>
          {confirmingDelete ? (
            <View className="mt-3 gap-3 rounded-[12px] border border-[#f2cdd0] bg-[#fff7f7] p-3">
              <Text className="text-sm leading-5 text-muted-foreground">
                Este projeto sera removido do seu portfolio e os clientes nao verao
                mais esse resultado no seu perfil.
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
                  onPress={() => onDelete(project)}
                  className="min-h-[42px] flex-1 items-center justify-center rounded-[10px] bg-primary"
                  accessibilityRole="button"
                >
                  <Text className="text-sm font-semibold text-white">
                    Confirmar exclusao
                  </Text>
                </Pressable>
              </View>
            </View>
          ) : null}
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
          onPress={handleSave}
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
