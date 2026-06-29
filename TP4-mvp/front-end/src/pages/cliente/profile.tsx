import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { Image, Linking, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { ClientBottomNav, type ClientNavKey } from "../../components/cliente";
import { EmptyState, ErrorState, LoadingState } from "../../components/feedback-state";
import { NativeDateTimeField } from "../../components/native-date-time-field";
import { ProjectHeader } from "../../components/profissional/components";
import type { ProjectItem } from "../../components/profissional/types";
import {
  ApiError,
  ProfessionalProfile,
  api,
  formatMoney,
} from "../../services/api";
import { pickAndUploadImage } from "../../services/image-upload";
import { MyProjectsScreen } from "../profissional/meus-projetos";
import { ProjectResultScreen } from "../profissional/resultado-projeto";
import { ClientMessageScreen } from "./mensagem-profissional";

export type ClientProfessionalProfile = {
  about?: string;
  avatarUri?: string | null;
  dailyRate?: string;
  name: string;
  neighborhood?: string;
  role: string;
};

const defaultProfessionalProfile: ClientProfessionalProfile = {
  avatarUri: null,
  name: "Profissional",
  role: "Profissional",
};

function toClientProfile(professional: ProfessionalProfile): ClientProfessionalProfile {
  return {
    about: professional.about ?? undefined,
    avatarUri: professional.user.avatarUrl,
    dailyRate: formatMoney(professional.dailyRate),
    name: professional.user.name,
    neighborhood: professional.address?.neighborhood,
    role:
      professional.specialties.map((item) => item.category.name).join(", ") ||
      "Profissional",
  };
}

export function ClientProfilePage({
  contractMode = "direct",
  onBack,
  onContractApplication,
  onNavigate,
  onProfilePress,
  professional = defaultProfessionalProfile,
  professionalId,
}: {
  onBack: () => void;
  contractMode?: "direct" | "application";
  onContractApplication?: () => void | Promise<void>;
  onNavigate?: (key: ClientNavKey) => void;
  onProfilePress?: () => void;
  professional?: ClientProfessionalProfile;
  professionalId?: string;
}) {
  const [apiProfessional, setApiProfessional] =
    useState<ProfessionalProfile | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(professionalId));
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isHiring, setIsHiring] = useState(false);
  const [hireError, setHireError] = useState<string | null>(null);
  const [hireSuccess, setHireSuccess] = useState(false);
  const [isShowingHireForm, setIsShowingHireForm] = useState(false);
  const [directConversationId, setDirectConversationId] = useState<string | null>(null);
  const [directAdForm, setDirectAdForm] = useState({
    title: "",
    description: "",
    location: "",
    startDate: "",
    startTime: "",
    deadlineDays: "",
    budget: "",
    imageUrls: [] as string[],
  });
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isShowingPortfolio, setIsShowingPortfolio] = useState(false);
  const [isViewingProjectResult, setIsViewingProjectResult] = useState(false);
  const [selectedPortfolioProject, setSelectedPortfolioProject] =
    useState<ProjectItem | null>(null);
  const [isShowingMessages, setIsShowingMessages] = useState(false);

  const resolvedProfessional = apiProfessional
    ? toClientProfile(apiProfessional)
    : professional;

  const specializations =
    apiProfessional?.specialties.map((item) => item.category.name) ?? [];
  const portfolioProjects =
    apiProfessional?.portfolio.map((project) => ({
      id: project.id,
      title: project.title,
      location: project.location,
      description: project.description ?? "",
      image:
        project.images.find((image) => image.type === "COVER")?.url ??
        project.images[0]?.url ??
        "",
      imageType:
        (project.images.find((image) => image.type === "COVER")?.type as ProjectItem["imageType"]) ??
        (project.images[0]?.type as ProjectItem["imageType"]) ??
        "GENERAL",
      images: project.images.map((image) => ({
        id: image.id,
        url: image.url,
        type: image.type as NonNullable<ProjectItem["imageType"]>,
        altText: image.altText,
      })),
    })) ?? [];
  const portfolioItems = portfolioProjects.map((project) => ({
    label: project.title,
    uri: project.image,
  }));
  const reviews =
    apiProfessional?.reviews?.map((review) => ({
      id: review.id,
      name: review.client.user.name,
      when: new Intl.DateTimeFormat("pt-BR").format(new Date(review.createdAt)),
      rating: String(review.rating),
      comment: review.comment ?? "Avaliacao sem comentario.",
    })) ?? [];
  const availabilityDays = useMemo(() => {
    const week = [
      { key: "SUNDAY", label: "D" },
      { key: "MONDAY", label: "S" },
      { key: "TUESDAY", label: "T" },
      { key: "WEDNESDAY", label: "Q" },
      { key: "THURSDAY", label: "Q" },
      { key: "FRIDAY", label: "S" },
      { key: "SATURDAY", label: "S" },
    ];
    const available = new Set(
      apiProfessional?.availability.map((item) => item.dayOfWeek) ?? [],
    );
    return week.map((day) => ({ label: day.label, available: available.has(day.key) }));
  }, [apiProfessional]);

  const loadProfessional = async () => {
    if (!professionalId) {
      return;
    }

    setIsLoading(true);
    setLoadError(null);

    try {
      setApiProfessional(await api.professional(professionalId));
    } catch (error) {
      setLoadError(
        error instanceof ApiError
          ? error.message
          : "Nao foi possivel carregar o perfil.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadProfessional();
  }, [professionalId]);

  const handleOpenWhatsApp = async () => {
    const phoneNumber = apiProfessional?.user.phone;

    if (!phoneNumber) {
      setHireError("Este profissional ainda nao cadastrou WhatsApp.");
      return;
    }

    const digits = phoneNumber.replace(/\D/g, "");
    const whatsappUrl = `whatsapp://send?phone=${digits}`;

    try {
      const supported = await Linking.canOpenURL(whatsappUrl);
      await Linking.openURL(
        supported ? whatsappUrl : `https://api.whatsapp.com/send?phone=${digits}`,
      );
    } catch (error) {
      console.warn("Nao foi possivel abrir o WhatsApp:", error);
    }
  };

  const handleHire = async () => {
    if (!apiProfessional || isHiring) {
      return;
    }

    if (contractMode === "application") {
      setIsHiring(true);
      setHireError(null);
      setHireSuccess(false);

      try {
        await onContractApplication?.();
        setHireSuccess(true);
      } catch (error) {
        setHireError(
          error instanceof ApiError
            ? error.message
            : "Nao foi possivel contratar este profissional.",
        );
      } finally {
        setIsHiring(false);
      }
      return;
    }

    const startDate = directAdForm.startDate ? new Date(directAdForm.startDate) : null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (
      !directAdForm.title.trim() ||
      !directAdForm.description.trim() ||
      !directAdForm.location.trim()
    ) {
      setHireError("Preencha titulo, descricao e local do servico.");
      return;
    }

    if (startDate && startDate < today) {
      setHireError("A data de inicio nao pode estar no passado.");
      return;
    }

    setIsHiring(true);
    setHireError(null);
    setHireSuccess(false);

    try {
      await api.createDirectRequest({
        professionalId: apiProfessional.id,
        title: directAdForm.title,
        description: directAdForm.description,
        location: directAdForm.location,
        startDate: directAdForm.startDate || undefined,
        startTime: directAdForm.startTime || undefined,
        deadlineDays: directAdForm.deadlineDays ? Number(directAdForm.deadlineDays) : undefined,
        budget: directAdForm.budget ? Number(directAdForm.budget.replace(/[^\d,.-]/g, "").replace(",", ".")) : undefined,
        imageUrls: directAdForm.imageUrls,
      }).then((request) => {
        setDirectConversationId(request.conversations?.[0]?.id ?? null);
      });
      setHireSuccess(true);
      setIsShowingHireForm(false);
    } catch (error) {
      setHireError(
        error instanceof ApiError
          ? error.message
          : "Nao foi possivel enviar a solicitacao.",
      );
    } finally {
      setIsHiring(false);
    }
  };

  const handlePickDirectImage = async () => {
    setIsUploadingImage(true);
    setHireError(null);

    try {
      const uploadedUrl = await pickAndUploadImage();

      if (uploadedUrl) {
        setDirectAdForm((current) => ({
          ...current,
          imageUrls: [...current.imageUrls, uploadedUrl],
        }));
      }
    } catch (error) {
      setHireError(error instanceof Error ? error.message : "Nao foi possivel enviar a imagem.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  if (isShowingMessages) {
    return (
      <ClientMessageScreen
        conversationId={directConversationId}
        professionalName={resolvedProfessional.name}
        onBack={() => setIsShowingMessages(false)}
        onProfilePress={onProfilePress}
      />
    );
  }

  if (isViewingProjectResult) {
    return (
      <ProjectResultScreen
        project={selectedPortfolioProject}
        onBack={() => {
          setIsViewingProjectResult(false);
          setSelectedPortfolioProject(null);
        }}
        readOnly
      />
    );
  }

  if (isShowingPortfolio) {
    return (
      <MyProjectsScreen
        onBack={() => setIsShowingPortfolio(false)}
        projects={portfolioProjects}
        onViewResult={(project) => {
          setSelectedPortfolioProject(project);
          setIsViewingProjectResult(true);
        }}
        readOnly
      />
    );
  }

  return (
    <View className="relative flex-1 w-full max-w-[480px] bg-background">
      <ProjectHeader onBack={onBack} onProfilePress={onProfilePress} />

      <ScrollView
        className="flex-1 px-4"
        contentContainerClassName="pb-32 pt-5"
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <LoadingState label="Carregando perfil..." />
        ) : loadError ? (
          <ErrorState message={loadError} onRetry={loadProfessional} />
        ) : (
          <>
            <View className="items-center gap-2">
              <View className="overflow-hidden rounded-full border-[3px] border-primary">
                {resolvedProfessional.avatarUri ? (
                  <Image
                    source={{ uri: resolvedProfessional.avatarUri }}
                    className="h-24 w-24"
                    resizeMode="cover"
                    accessibilityLabel={`Foto de ${resolvedProfessional.name}`}
                  />
                ) : (
                  <View className="h-24 w-24 items-center justify-center bg-[#f7e8e9]">
                    <Ionicons name="person" size={44} color="#b94b50" />
                  </View>
                )}
              </View>

              <View className="text-center">
                <Text className="text-xl font-bold text-foreground">
                  {resolvedProfessional.name}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  {resolvedProfessional.role}
                </Text>
              </View>

              <View className="mt-1 w-full flex-row gap-3">
                <View className="flex-1 items-center gap-1.5 rounded-xl bg-card py-3 shadow-sm shadow-black/10">
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="star" size={14} color="#f59e0b" />
                    <Text className="text-base font-bold text-foreground">
                      {Number(apiProfessional?.ratingAvg ?? 0).toFixed(1)}
                    </Text>
                  </View>
                  <Text className="text-xs text-muted-foreground">
                    {reviews.length} avaliações
                  </Text>
                </View>

                <View className="flex-1 items-center gap-1.5 rounded-xl bg-card py-3 shadow-sm shadow-black/10">
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="briefcase-outline" size={14} color="#b94b50" />
                    <Text className="text-base font-bold text-foreground">
                      {apiProfessional?.servicesDone ?? 0}
                    </Text>
                  </View>
                  <Text className="text-xs text-muted-foreground">serviços</Text>
                </View>

                <View className="flex-1 items-center gap-1.5 rounded-xl bg-card py-3 shadow-sm shadow-black/10">
                  <Ionicons name="location-outline" size={14} color="#b94b50" />
                  <Text className="text-xs text-muted-foreground">
                    {resolvedProfessional.neighborhood ?? "Nao informado"}
                  </Text>
                </View>
              </View>

              <Text className="mt-1 text-xl font-bold text-primary">
                {resolvedProfessional.dailyRate ?? "A combinar"}
                <Text className="text-sm font-medium text-muted-foreground">/dia</Text>
              </Text>

              <View className="mt-3 w-full flex-row gap-3">
                {directConversationId ? (
                  <Pressable
                  onPress={() => setIsShowingMessages(true)}
                  className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-primary py-3.5"
                  accessibilityRole="button"
                >
                  <Ionicons name="chatbubble-ellipses-outline" size={17} color="#ffffff" />
                  <Text className="text-sm font-semibold text-primary-foreground">
                    Mensagem
                  </Text>
                </Pressable>
                ) : null}
                <Pressable
                  className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-[#25d366] py-3.5"
                  onPress={handleOpenWhatsApp}
                  accessibilityRole="button"
                >
                  <Ionicons name="logo-whatsapp" size={17} color="#ffffff" />
                  <Text className="text-sm font-semibold text-white">WhatsApp</Text>
                </Pressable>
              </View>

              <Pressable
                onPress={() => {
                  if (contractMode === "application") {
                    void handleHire();
                    return;
                  }

                  setIsShowingHireForm((current) => !current);
                }}
                disabled={!apiProfessional || isHiring}
                className="mt-3 w-full flex-row items-center justify-center gap-2 rounded-xl bg-primary py-4"
                accessibilityRole="button"
              >
                <Ionicons name="hand-left-outline" size={20} color="#ffffff" />
                <Text className="text-base font-bold text-primary-foreground">
                  {isHiring
                    ? "Enviando..."
                    : contractMode === "application"
                      ? "Contratar candidato"
                      : "Contratar Profissional"}
                </Text>
              </Pressable>
              {contractMode === "direct" && isShowingHireForm ? (
                <View className="mt-3 w-full gap-3 rounded-xl bg-card p-4">
                  <TextInput
                    value={directAdForm.title}
                    onChangeText={(title) => setDirectAdForm((current) => ({ ...current, title }))}
                    placeholder="Titulo do servico"
                    className="rounded-xl bg-background px-4 py-3 text-sm text-foreground"
                  />
                  <TextInput
                    value={directAdForm.description}
                    onChangeText={(description) => setDirectAdForm((current) => ({ ...current, description }))}
                    placeholder="Descricao do servico"
                    multiline
                    className="min-h-[88px] rounded-xl bg-background px-4 py-3 text-sm text-foreground"
                  />
                  <TextInput
                    value={directAdForm.location}
                    onChangeText={(location) => setDirectAdForm((current) => ({ ...current, location }))}
                    placeholder="Bairro, cidade"
                    className="rounded-xl bg-background px-4 py-3 text-sm text-foreground"
                  />
                  <View className="gap-3">
                    <NativeDateTimeField
                      mode="date"
                      value={directAdForm.startDate}
                      onChange={(startDate) =>
                        setDirectAdForm((current) => ({ ...current, startDate }))
                      }
                      placeholder="Selecionar data de inicio"
                      minimumDate={new Date()}
                    />
                    <NativeDateTimeField
                      mode="time"
                      value={directAdForm.startTime}
                      onChange={(startTime) =>
                        setDirectAdForm((current) => ({ ...current, startTime }))
                      }
                      placeholder="Selecionar horario"
                    />
                  </View>
                  <View className="flex-row gap-2">
                    <TextInput
                      value={directAdForm.deadlineDays}
                      onChangeText={(deadlineDays) => setDirectAdForm((current) => ({ ...current, deadlineDays }))}
                      placeholder="Prazo em dias"
                      keyboardType="numeric"
                      className="flex-1 rounded-xl bg-background px-4 py-3 text-sm text-foreground"
                    />
                    <TextInput
                      value={directAdForm.budget}
                      onChangeText={(budget) => setDirectAdForm((current) => ({ ...current, budget }))}
                      placeholder="Orcamento"
                      keyboardType="numeric"
                      className="flex-1 rounded-xl bg-background px-4 py-3 text-sm text-foreground"
                    />
                  </View>
                  <Pressable
                    onPress={handlePickDirectImage}
                    className="items-center rounded-xl border border-dashed border-input-border bg-background py-3"
                  >
                    <Text className="text-sm font-semibold text-primary">
                      {isUploadingImage ? "Enviando imagem..." : `${directAdForm.imageUrls.length} imagem(ns)`}
                    </Text>
                  </Pressable>
                  {directAdForm.imageUrls.length ? (
                    <ScrollView horizontal contentContainerClassName="gap-2">
                      {directAdForm.imageUrls.map((url) => (
                        <Image key={url} source={{ uri: url }} className="h-16 w-16 rounded-lg" />
                      ))}
                    </ScrollView>
                  ) : null}
                  <Pressable
                    onPress={handleHire}
                    disabled={isHiring}
                    className="items-center rounded-xl bg-primary py-3"
                  >
                    <Text className="font-bold text-white">
                      {isHiring ? "Enviando..." : "Enviar para este profissional"}
                    </Text>
                  </Pressable>
                </View>
              ) : null}
              {hireError ? (
                <Text className="text-center text-xs font-semibold text-primary">
                  {hireError}
                </Text>
              ) : null}
              {hireSuccess ? (
                <Text className="text-center text-xs font-semibold text-[#067a3f]">
                  {contractMode === "application"
                    ? "Profissional contratado com sucesso."
                    : "Solicitacao enviada ao profissional."}
                </Text>
              ) : null}
            </View>

            <View className="mt-5 rounded-xl bg-card p-4 shadow-sm shadow-black/10">
              <View className="mb-2 flex-row items-center gap-2">
                <View className="h-8 w-8 items-center justify-center rounded-full bg-secondary">
                  <Ionicons name="person-outline" size={16} color="#b94b50" />
                </View>
                <Text className="text-sm font-bold text-foreground">Sobre mim</Text>
              </View>
              <Text className="text-sm leading-relaxed text-muted-foreground">
                {resolvedProfessional.about ??
                  `${resolvedProfessional.name} atua como ${resolvedProfessional.role.toLowerCase()} com experiencia em servicos residenciais.`}
              </Text>
            </View>

            <View className="mt-4 rounded-xl bg-card p-4 shadow-sm shadow-black/10">
              <View className="mb-3 flex-row items-center gap-2">
                <View className="h-8 w-8 items-center justify-center rounded-full bg-secondary">
                  <Ionicons name="calendar-outline" size={16} color="#b94b50" />
                </View>
                <Text className="text-sm font-bold text-foreground">Disponibilidade</Text>
              </View>
              <View className="flex-row justify-between gap-1">
                {availabilityDays.map((day, index) => (
                  <View key={`${day.label}-${index}`} className="flex-1 items-center gap-1.5">
                    <View
                      className={`h-8 w-8 items-center justify-center rounded-full ${
                        day.available ? "bg-primary" : "bg-secondary"
                      }`}
                    >
                      <Text
                        className={`text-sm font-bold ${
                          day.available
                            ? "text-primary-foreground"
                            : "text-secondary-foreground"
                        }`}
                      >
                        {day.label}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            <View className="mt-5">
              <Text className="mb-3 text-base font-bold text-foreground">
                Especializações
              </Text>
              {specializations.length === 0 ? (
                <EmptyState message="Este profissional ainda nao cadastrou especializacoes." />
              ) : (
                <View className="flex-row flex-wrap gap-2">
                  {specializations.map((item) => (
                    <View
                      key={item}
                      className="rounded-full border border-black/10 bg-card px-4 py-1.5 shadow-sm shadow-black/5"
                    >
                      <Text className="text-sm font-medium text-foreground">{item}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            <View className="mt-5">
              <View className="mb-3 flex-row items-center justify-between">
                <Text className="text-base font-bold text-foreground">Portfólio</Text>
                <Pressable
                  onPress={() => setIsShowingPortfolio(true)}
                  className="flex-row items-center gap-1"
                  accessibilityRole="button"
                >
                  <Text className="text-sm font-semibold text-primary">Ver tudo</Text>
                  <Ionicons name="chevron-forward" size={14} color="#b94b50" />
                </Pressable>
              </View>
              {portfolioItems.length === 0 ? (
                <EmptyState message="Este profissional ainda nao cadastrou portfolio." />
              ) : (
                <View className="flex-row flex-wrap justify-between gap-3">
                  {portfolioItems.map((item) => (
                    <Pressable
                      key={item.label}
                      onPress={() => setIsViewingProjectResult(true)}
                      className="w-[48%] overflow-hidden rounded-xl shadow-sm shadow-black/10"
                      accessibilityRole="button"
                    >
                      <Image
                        source={{ uri: item.uri }}
                        className="h-[110px] w-full"
                        resizeMode="cover"
                      />
                      <View className="bg-card px-3 py-2">
                        <Text className="text-xs font-semibold text-foreground">
                          {item.label}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>

            <View className="mt-5">
              <Text className="mb-3 text-base font-bold text-foreground">Avaliações</Text>
              {reviews.length === 0 ? (
                <EmptyState message="Este profissional ainda nao recebeu avaliacoes." />
              ) : (
                <View className="flex-col gap-3">
                  {reviews.map((review) => (
                    <View
                      key={review.id}
                      className="rounded-xl bg-card p-4 shadow-sm shadow-black/10"
                    >
                      <View className="mb-2 flex-row items-center justify-between">
                        <View className="flex-row items-center gap-2">
                          <View className="h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#f7e8e9]">
                            <Ionicons name="person" size={18} color="#b94b50" />
                          </View>
                          <View>
                            <Text className="text-sm font-bold text-foreground">
                              {review.name}
                            </Text>
                            <Text className="text-xs text-muted-foreground">
                              {review.when}
                            </Text>
                          </View>
                        </View>
                        <View className="flex-row items-center gap-1">
                          <Ionicons name="star" size={13} color="#f59e0b" />
                          <Text className="text-sm font-bold text-foreground">
                            {review.rating}
                          </Text>
                        </View>
                      </View>
                      <Text className="text-sm leading-relaxed text-muted-foreground">
                        {review.comment}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </>
        )}
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 px-5 pb-2">
        <ClientBottomNav active="search" onSelect={onNavigate} />
      </View>
    </View>
  );
}
