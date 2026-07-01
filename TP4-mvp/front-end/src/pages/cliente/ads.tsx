import { Ionicons } from "@expo/vector-icons";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

import { ClientBottomNav, type ClientNavKey } from "../../components/cliente";
import { EmptyState, ErrorState, LoadingState } from "../../components/feedback-state";
import { NativeDateTimeField } from "../../components/native-date-time-field";
import {
  ChoiceChip,
  ProjectHeader,
  SetupSection,
  SetupTextField,
} from "../../components/profissional/components";
import {
  isPositiveInteger,
  isRequiredText,
  isFutureOrTodayDate,
  isValidBRMoney,
  isValidTime,
} from "../../services/validators";
import {
  ApiError,
  Application,
  Category,
  ServiceAd,
  api,
  formatDate,
  formatMoney,
} from "../../services/api";
import { captureAndUploadImage, pickAndUploadImage } from "../../services/image-upload";
import { ClientProfilePage, type ClientProfessionalProfile } from "./profile";
import type { ClientWorkService } from "./minha-obra";

type ClientAdsPageProps = {
  onContractService?: (service: ClientWorkService) => void;
  onBack?: () => void;
  onNavigate?: (key: ClientNavKey) => void;
  onProfilePress?: () => void;
};

type AdStatus = "active" | "inactive" | "contracted" | "canceled";

type AdItem = {
  id: string;
  title: string;
  status: AdStatus;
  postedAt: string;
  location: string;
  candidates: number;
  visits: number;
  raw: ServiceAd;
};

type AdFormValues = {
  budget: string;
  categoryIds: string[];
  deadline: string;
  description: string;
  hasImages: boolean;
  imageUrls: string[];
  location: string;
  negotiable: boolean;
  startDate: string;
  time: string;
  title: string;
};

type CandidateFilter = "all" | "counter" | "best";

type CandidateItem = {
  about: string;
  avatarUrl: string;
  baseValue: string;
  dailyRate: string;
  hasCounterOffer: boolean;
  id: string;
  name: string;
  neighborhood: string;
  newValue?: string;
  professionalId: string;
  role: string;
};

const defaultAdFormValues: AdFormValues = {
  budget: "",
  categoryIds: [],
  deadline: "",
  description: "",
  hasImages: false,
  imageUrls: [],
  location: "",
  negotiable: true,
  startDate: "",
  time: "",
  title: "",
};

function mapAd(item: ServiceAd): AdItem {
  const statusMap: Record<ServiceAd["status"], AdStatus> = {
    DRAFT: "inactive",
    OPEN: "active",
    PAUSED: "inactive",
    CONTRACTED: "contracted",
    CANCELED: "canceled",
    EXPIRED: "canceled",
  };

  return {
    id: item.id,
    title: item.title,
    status: statusMap[item.status],
    postedAt: `Postado em ${formatDate(item.createdAt)}`,
    location: item.location,
    candidates: item.applications?.length ?? 0,
    visits: item.visits,
    raw: item,
  };
}

function mapAdToForm(item: AdItem): AdFormValues {
  const categoryIds =
    item.raw.categories?.map((adCategory) => adCategory.category.id) ??
    [item.raw.category.id];

  return {
    budget: item.raw.budget ? String(item.raw.budget) : "",
    categoryIds,
    deadline: item.raw.deadlineDays ? String(item.raw.deadlineDays) : "",
    description: item.raw.description,
    hasImages: item.raw.images.length > 0,
    imageUrls: item.raw.images.map((image) => image.url),
    location: item.raw.location,
    negotiable: item.raw.negotiable,
    startDate: item.raw.startDate ? item.raw.startDate.slice(0, 10) : "",
    time: item.raw.startTime ?? "",
    title: item.raw.title,
  };
}

function mapApplication(item: Application): CandidateItem {
  const professional = item.professional;
  return {
    about: professional.about ?? "Profissional cadastrado na plataforma.",
    avatarUrl: professional.user.avatarUrl ?? "",
    baseValue: formatMoney(item.ad?.budget),
    dailyRate: formatMoney(professional.dailyRate),
    hasCounterOffer: item.status === "COUNTER_OFFERED",
    id: item.id,
    name: professional.user.name,
    neighborhood: professional.address?.neighborhood ?? "A combinar",
    newValue: item.proposedValue ? formatMoney(item.proposedValue) : undefined,
    professionalId: professional.id,
    role:
      professional.specialties.map((specialty) => specialty.category.name).join(", ") ||
      "Profissional",
  };
}

function parseMoney(value: string) {
  const normalized = value.replace(/[^\d,.-]/g, "").replace(".", "").replace(",", ".");
  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

const statusContent: Record<
  AdStatus,
  {
    label: string;
    badgeClassName: string;
    badgeTextClassName: string;
  }
> = {
  active: {
    label: "Ativo",
    badgeClassName: "bg-[#e6fbf0]",
    badgeTextClassName: "text-[#067a3f]",
  },
  inactive: {
    label: "Desativado",
    badgeClassName: "bg-[#eef0f2]",
    badgeTextClassName: "text-[#5a6570]",
  },
  contracted: {
    label: "Contratado",
    badgeClassName: "bg-[#f3eced]",
    badgeTextClassName: "text-primary",
  },
  canceled: {
    label: "Cancelado",
    badgeClassName: "bg-[#fde8e8]",
    badgeTextClassName: "text-[#b42318]",
  },
};

function IconText({
  icon,
  children,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  children: ReactNode;
}) {
  return (
    <View className="flex-row items-center gap-1">
      <Ionicons name={icon} size={14} color="#7a6568" />
      <Text className="text-[13px] text-muted-foreground">{children}</Text>
    </View>
  );
}

function AdCard({
  item,
  onCancel,
  onConfirmCancel,
  onDismissCancel,
  onEdit,
  onToggleActive,
  onViewCandidates,
  pendingCancel,
}: {
  item: AdItem;
  onCancel: (item: AdItem) => void;
  onConfirmCancel: (item: AdItem) => void;
  onDismissCancel: () => void;
  onEdit: (item: AdItem) => void;
  onToggleActive: (item: AdItem) => void;
  onViewCandidates: (item: AdItem) => void;
  pendingCancel: boolean;
}) {
  const status = statusContent[item.status];
  const isCanceled = item.status === "canceled";
  const isContracted = item.status === "contracted";
  const isLocked = isCanceled || isContracted;
  const canViewCandidates = item.status === "active";
  const toggleLabel = item.status === "inactive" ? "Ativar" : "Desativar";

  return (
    <View className="mb-3 rounded-lg bg-card p-4 shadow-sm shadow-black/5">
      <View className="mb-2 flex-row items-start justify-between gap-2">
        <Text className="flex-1 text-[15px] font-bold leading-5 text-foreground">
          {item.title}
        </Text>
        <View className={`rounded-full px-3 py-1 ${status.badgeClassName}`}>
          <Text className={`text-[11px] font-semibold ${status.badgeTextClassName}`}>
            {status.label}
          </Text>
        </View>
      </View>

      <View className="mb-3 gap-1">
        <IconText icon="calendar-outline">{item.postedAt}</IconText>
        <IconText icon="location-outline">{item.location}</IconText>
      </View>

      {item.raw.images[0]?.url ? (
        <Image
          source={{ uri: item.raw.images[0].url }}
          className="mb-3 h-32 w-full rounded-lg"
          resizeMode="cover"
          accessibilityLabel={`Imagem de ${item.title}`}
        />
      ) : null}

      <View className="h-px bg-input-border" />

      <View className="mt-3 flex-row items-center gap-5">
        <IconText icon="people-outline">
          <Text className="font-bold text-foreground">{item.candidates}</Text>{" "}
          Candidatos
        </IconText>
        <IconText icon="eye-outline">
          <Text className="font-bold text-foreground">{item.visits}</Text> Visitas
        </IconText>
      </View>

      <View className="mt-3 flex-row gap-2">
        <Pressable
          onPress={() => onEdit(item)}
          disabled={isLocked}
          className={`min-h-[42px] flex-1 items-center justify-center rounded-[10px] border border-input-border px-3 ${
            isLocked ? "bg-[#f4eeee]" : "bg-card"
          }`}
          accessibilityRole="button"
          accessibilityLabel={`Editar ${item.title}`}
        >
          <Text
            className={`text-[13px] font-semibold ${
              isLocked ? "text-muted-foreground" : "text-foreground"
            }`}
          >
            Editar
          </Text>
        </Pressable>
        {canViewCandidates ? (
          <Pressable
            onPress={() => onViewCandidates(item)}
            className="min-h-[42px] flex-[1.45] items-center justify-center rounded-[10px] bg-primary px-3"
            accessibilityRole="button"
            accessibilityLabel={`Ver candidatos de ${item.title}`}
          >
            <Text className="text-[13px] font-semibold text-white">
              Ver Candidatos
            </Text>
          </Pressable>
        ) : null}
      </View>

      {!isLocked ? (
        <View className="mt-2 flex-row gap-2">
          <Pressable
            onPress={() => onToggleActive(item)}
            className="min-h-[40px] flex-1 items-center justify-center rounded-[10px] bg-[#f7eced] px-3"
            accessibilityRole="button"
            accessibilityLabel={toggleLabel}
          >
            <Text className="text-[13px] font-semibold text-primary">
              {toggleLabel}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => onCancel(item)}
            className="min-h-[40px] flex-1 flex-row items-center justify-center gap-1.5 rounded-[10px] border border-[#f2cdd0] bg-[#fff7f7] px-3"
            accessibilityRole="button"
            accessibilityLabel={`Cancelar ${item.title}`}
          >
            <Ionicons name="close-circle-outline" size={16} color="#b94b50" />
            <Text className="text-[13px] font-semibold text-primary">
              Cancelar
            </Text>
          </Pressable>
        </View>
      ) : null}
      {pendingCancel ? (
        <View className="mt-3 gap-3 rounded-[12px] border border-[#f2cdd0] bg-[#fff7f7] p-3">
          <Text className="text-sm leading-5 text-muted-foreground">
            Este anuncio saira da lista, profissionais nao poderao mais se candidatar
            e candidaturas pendentes deixam de avancar por ele.
          </Text>
          <View className="flex-row gap-2">
            <Pressable
              onPress={onDismissCancel}
              className="min-h-[42px] flex-1 items-center justify-center rounded-[10px] border border-input-border bg-card"
              accessibilityRole="button"
            >
              <Text className="text-sm font-semibold text-foreground">Voltar</Text>
            </Pressable>
            <Pressable
              onPress={() => onConfirmCancel(item)}
              className="min-h-[42px] flex-1 items-center justify-center rounded-[10px] bg-primary"
              accessibilityRole="button"
            >
              <Text className="text-sm font-semibold text-white">
                Confirmar cancelamento
              </Text>
            </Pressable>
          </View>
        </View>
      ) : null}
    </View>
  );
}

function CandidateFilterButton({
  active,
  label,
  onPress,
}: {
  active: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`min-h-[38px] items-center justify-center rounded-[12px] px-4 ${
        active ? "bg-primary" : "bg-card shadow-sm shadow-black/5"
      }`}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
    >
      <Text
        className={`text-sm font-bold ${
          active ? "text-white" : "text-foreground"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function CandidateCard({
  disabled,
  item,
  onContract,
  onViewProfile,
}: {
  disabled: boolean;
  item: CandidateItem;
  onContract: (item: CandidateItem) => void;
  onViewProfile: (item: CandidateItem) => void;
}) {
  return (
    <View
      className={`mb-4 rounded-lg px-5 py-5 shadow-sm shadow-black/5 ${
        disabled ? "bg-[#f3eeee] opacity-70" : "bg-card"
      }`}
    >
      <View className="mb-4 flex-row items-center gap-3">
        {item.avatarUrl ? (
          <Image
            source={{ uri: item.avatarUrl }}
            className="h-12 w-12 rounded-[12px] bg-muted"
            accessibilityLabel={`Foto de ${item.name}`}
          />
        ) : (
          <View className="h-12 w-12 items-center justify-center rounded-[12px] bg-[#f7e8e9]">
            <Ionicons name="person" size={22} color="#b94b50" />
          </View>
        )}
        <View className="flex-1">
          <Text className="text-base font-bold text-foreground">
            {item.name}
          </Text>
          <Text className="text-xs text-muted-foreground">{item.role}</Text>
        </View>
      </View>

      {item.hasCounterOffer ? (
        <View className="mb-4 rounded-lg bg-secondary px-4 py-3">
          <View className="mb-2 flex-row items-center gap-1.5">
            <Ionicons name="repeat-outline" size={14} color="#b94b50" />
            <Text className="text-xs font-bold text-primary">
              Contraproposta
            </Text>
          </View>
          <View className="mb-1 flex-row items-center justify-between gap-3">
            <Text className="text-xs text-muted-foreground">
              Valor Estimado:
            </Text>
            <Text className="text-xs text-muted-foreground line-through">
              {item.baseValue}
            </Text>
          </View>
          <View className="flex-row items-center justify-between gap-3">
            <Text className="text-sm font-bold text-foreground">
              Nova Proposta:
            </Text>
            <Text className="text-base font-bold text-primary">
              {item.newValue}
            </Text>
          </View>
        </View>
      ) : (
        <View className="mb-4 flex-row items-center justify-between gap-3 rounded-lg bg-muted px-4 py-3">
          <Text className="text-xs text-muted-foreground">
            Proposta (Valor Estimado)
          </Text>
          <Text className="text-base font-bold text-foreground">
            {item.baseValue}
          </Text>
        </View>
      )}

      <View className="mb-3 flex-row gap-3">
        <Pressable
          onPress={() => onViewProfile(item)}
          disabled={disabled}
          className="min-h-[44px] flex-1 items-center justify-center rounded-lg border border-border bg-muted px-3 shadow-sm shadow-black/5"
          accessibilityRole="button"
          accessibilityLabel={`Ver perfil de ${item.name}`}
        >
          <Text
            className={`text-sm font-bold ${
              disabled ? "text-muted-foreground" : "text-foreground"
            }`}
          >
            Ver Perfil
          </Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => onContract(item)}
        disabled={disabled}
        className={`min-h-[44px] items-center justify-center rounded-lg px-4 ${
          disabled ? "bg-[#dbcaca]" : "bg-primary"
        }`}
        accessibilityRole="button"
        accessibilityLabel={`Contratar ${item.name}`}
      >
        <Text className={`text-sm font-bold ${disabled ? "text-primary" : "text-white"}`}>
          {disabled ? "Contratado" : "Contratar"}
        </Text>
      </Pressable>
    </View>
  );
}

function ClientCandidatesScreen({
  ad,
  contractedAdIds,
  onContractCandidate,
  onBack,
  onNavigate,
  onProfilePress,
}: {
  ad: AdItem;
  contractedAdIds: string[];
  onContractCandidate: (ad: AdItem, candidate: CandidateItem) => void | Promise<void>;
  onBack: () => void;
  onNavigate?: (key: ClientNavKey) => void;
  onProfilePress?: () => void;
}) {
  const [activeFilter, setActiveFilter] = useState<CandidateFilter>("all");
  const [profileCandidate, setProfileCandidate] = useState<CandidateItem | null>(null);
  const [candidates, setCandidates] = useState<CandidateItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const isAdContracted = contractedAdIds.includes(ad.id);
  const counterOfferCount = candidates.filter((item) => item.hasCounterOffer).length;
  const visibleCandidates = candidates.filter((item) => {
    if (activeFilter === "counter") {
      return item.hasCounterOffer;
    }

    if (activeFilter === "best") {
      return item.id === "marcos-almeida" || item.id === "roberto-carlos";
    }

    return true;
  });

  const loadCandidates = async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const applications = await api.serviceAdApplications(ad.id);
      setCandidates(applications.map(mapApplication));
    } catch (error) {
      setLoadError(
        error instanceof ApiError
          ? error.message
          : "Nao foi possivel carregar candidatos.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadCandidates();
  }, [ad.id]);

  if (profileCandidate) {
    const professional: ClientProfessionalProfile = {
      about: profileCandidate.about,
      avatarUri: profileCandidate.avatarUrl,
      dailyRate: profileCandidate.dailyRate,
      name: profileCandidate.name,
      neighborhood: profileCandidate.neighborhood,
      role: profileCandidate.role,
    };

    return (
      <ClientProfilePage
        professional={professional}
        onBack={() => setProfileCandidate(null)}
        onNavigate={onNavigate}
        onProfilePress={onProfilePress}
        professionalId={profileCandidate.professionalId}
        contractMode="application"
        onContractApplication={() => onContractCandidate(ad, profileCandidate)}
      />
    );
  }

  return (
    <View className="relative flex-1 w-full max-w-[480px] bg-background">
      <ProjectHeader onBack={onBack} onProfilePress={onProfilePress} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-32 pt-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-4 rounded-lg bg-primary px-5 py-5 shadow-md shadow-primary/20">
          <Text className="mb-1 text-base font-bold text-white">
            {ad.title}
          </Text>
          <View className="flex-row items-center justify-between gap-3">
            <Text className="flex-1 text-xs text-white/80">
              {ad.candidates} candidatos · {counterOfferCount} contrapropostas
            </Text>
            <View className="rounded-[12px] bg-white px-3 py-1">
              <Text className="text-xs font-bold text-primary">
                {statusContent[ad.status].label}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView
          horizontal
          className="mb-5"
          contentContainerClassName="gap-2"
          showsHorizontalScrollIndicator={false}
        >
          <CandidateFilterButton
            active={activeFilter === "all"}
            label={`Todos (${candidates.length})`}
            onPress={() => setActiveFilter("all")}
          />
          <CandidateFilterButton
            active={activeFilter === "counter"}
            label={`Contrapropostas (${counterOfferCount})`}
            onPress={() => setActiveFilter("counter")}
          />
          <CandidateFilterButton
            active={activeFilter === "best"}
            label="Melhores"
            onPress={() => setActiveFilter("best")}
          />
        </ScrollView>

        {isLoading ? (
          <LoadingState label="Carregando candidatos..." />
        ) : loadError ? (
          <ErrorState message={loadError} onRetry={loadCandidates} />
        ) : visibleCandidates.length === 0 ? (
          <EmptyState message="Este anuncio ainda nao recebeu candidaturas." />
        ) : visibleCandidates.map((item) => (
          <CandidateCard
            key={item.id}
            disabled={isAdContracted}
            item={item}
            onContract={(candidate) => onContractCandidate(ad, candidate)}
            onViewProfile={setProfileCandidate}
          />
        ))}
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 px-5 pb-2">
        <ClientBottomNav active="ads" onSelect={onNavigate} />
      </View>
    </View>
  );
}

function ClientAdFormScreen({
  categories,
  error,
  initialValues = defaultAdFormValues,
  isSubmitting,
  mode,
  onBack,
  onProfilePress,
  onSubmit,
}: {
  categories: Category[];
  error?: string | null;
  initialValues?: AdFormValues;
  isSubmitting?: boolean;
  mode: "create" | "edit";
  onBack: () => void;
  onProfilePress?: () => void;
  onSubmit: (values: AdFormValues) => void;
}) {
  const [title, setTitle] = useState(initialValues.title);
  const [categoryIds, setCategoryIds] = useState(initialValues.categoryIds);
  const [description, setDescription] = useState(initialValues.description);
  const [location, setLocation] = useState(initialValues.location);
  const [startDate, setStartDate] = useState(initialValues.startDate);
  const [deadline, setDeadline] = useState(initialValues.deadline);
  const [time, setTime] = useState(initialValues.time);
  const [budget, setBudget] = useState(initialValues.budget);
  const [negotiable, setNegotiable] = useState(initialValues.negotiable);
  const [hasImages, setHasImages] = useState(initialValues.hasImages);
  const [imageUrls, setImageUrls] = useState<string[]>(initialValues.imageUrls);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({
    budget: false,
    deadline: false,
    description: false,
    location: false,
    startDate: false,
    time: false,
    title: false,
  });

  const errors = {
    title: isRequiredText(title, 5)
      ? undefined
      : "Informe o servico com pelo menos 5 caracteres.",
    description: isRequiredText(description, 20)
      ? undefined
      : "Descreva o servico com pelo menos 20 caracteres.",
    location: isRequiredText(location, 3)
      ? undefined
      : "Informe bairro e cidade do servico.",
    startDate: isFutureOrTodayDate(startDate)
      ? undefined
      : "Informe uma data valida a partir de hoje no formato YYYY-MM-DD.",
    deadline: isPositiveInteger(deadline)
      ? undefined
      : "Informe um prazo em dias maior que zero.",
    time: isValidTime(time)
      ? undefined
      : "Informe o horario no formato HH:mm, por exemplo 08:00.",
    budget:
      budget.trim() && !isValidBRMoney(budget)
        ? "Informe um valor valido ou deixe em branco."
        : undefined,
    categoryIds:
      categoryIds.length > 0
        ? undefined
        : "Selecione ao menos uma categoria do servico.",
  };
  const shouldShow = (field: keyof typeof touched) => submitted || touched[field];
  const fieldStatus = (field: keyof typeof touched) => {
    if (!shouldShow(field)) {
      return "default";
    }

    return errors[field] ? "error" : "valid";
  };
  const fieldError = (field: keyof typeof touched) =>
    shouldShow(field) ? errors[field] : undefined;

  const handleSubmit = () => {
    setSubmitted(true);

    if (Object.values(errors).some(Boolean)) {
      return;
    }

    onSubmit({
      budget,
      categoryIds,
      deadline,
      description,
      hasImages,
      imageUrls,
      location,
      negotiable,
      startDate,
      time,
      title,
    });
  };
  const toggleCategory = (categoryId: string) => {
    setCategoryIds((current) =>
      current.includes(categoryId)
        ? current.filter((item) => item !== categoryId)
        : [...current, categoryId],
    );
  };
  const handleAddImage = async (source: "camera" | "library") => {
    setIsUploadingImage(true);
    setUploadError(null);

    try {
      const uploadedUrl =
        source === "camera" ? await captureAndUploadImage() : await pickAndUploadImage();

      if (uploadedUrl) {
        setImageUrls((current) => [...current, uploadedUrl]);
        setHasImages(true);
      }
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Nao foi possivel enviar a imagem.",
      );
    } finally {
      setIsUploadingImage(false);
    }
  };
  const screenTitle = mode === "edit" ? "Editar Anuncio" : "Novo Anuncio";
  const submitLabel = mode === "edit" ? "Salvar Alteracoes" : "Publicar Anuncio";

  return (
    <View className="h-full w-full max-w-[480px] self-center bg-background">
      <ProjectHeader onBack={onBack} onProfilePress={onProfilePress} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-5 pb-8 pt-5"
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-6 items-center">
          <Text className="text-[22px] font-bold text-foreground">
            {screenTitle}
          </Text>
          <View className="mt-2 h-[3px] w-10 rounded-full bg-primary" />
        </View>

        <View className="gap-5">
          <SetupSection label="O que voce precisa?">
            <SetupTextField
              value={title}
              onBlur={() => setTouched((current) => ({ ...current, title: true }))}
              onChangeText={setTitle}
              placeholder="Ex: Reforma completa de banheiro"
              status={fieldStatus("title")}
              helperText={fieldError("title")}
            />
          </SetupSection>

          <SetupSection label="Categoria do Servico">
            <View className="flex-row flex-wrap gap-2">
              {categories.map((item) => (
                <ChoiceChip
                  key={item.id}
                  label={item.name}
                  selected={categoryIds.includes(item.id)}
                  onPress={() => toggleCategory(item.id)}
                />
              ))}
            </View>
            {submitted && errors.categoryIds ? (
              <Text className="px-1 text-xs leading-4 text-[#dc2626]">
                {errors.categoryIds}
              </Text>
            ) : null}
            {categories.length === 0 ? (
              <Text className="px-1 text-xs leading-4 text-[#dc2626]">
                Cadastre categorias no backend antes de publicar anuncios.
              </Text>
            ) : null}
          </SetupSection>

          <SetupSection label="Descricao detalhada">
            <SetupTextField
              value={description}
              onBlur={() =>
                setTouched((current) => ({ ...current, description: true }))
              }
              onChangeText={setDescription}
              placeholder="Descreva o que precisa ser feito com o maximo de detalhes possivel..."
              multiline
              status={fieldStatus("description")}
              helperText={fieldError("description")}
            />
          </SetupSection>

          <SetupSection label="Onde sera o servico?">
            <SetupTextField
              icon="location-outline"
              value={location}
              onBlur={() =>
                setTouched((current) => ({ ...current, location: true }))
              }
              onChangeText={setLocation}
              placeholder="Bairro, Cidade"
              status={fieldStatus("location")}
              helperText={fieldError("location")}
            />
          </SetupSection>

          <SetupSection label="Data de inicio">
            <NativeDateTimeField
              mode="date"
              value={startDate}
              onBlur={() =>
                setTouched((current) => ({ ...current, startDate: true }))
              }
              onChange={setStartDate}
              placeholder="Selecionar data"
              minimumDate={new Date()}
              status={fieldStatus("startDate")}
              helperText={fieldError("startDate")}
            />
          </SetupSection>

          <SetupSection label="Prazo em dias">
            <SetupTextField
              icon="time-outline"
              value={deadline}
              onBlur={() =>
                setTouched((current) => ({ ...current, deadline: true }))
              }
              onChangeText={setDeadline}
              placeholder="Ex: 5 dias"
              keyboardType="numeric"
              status={fieldStatus("deadline")}
              helperText={fieldError("deadline")}
            />
          </SetupSection>

          <SetupSection label="Horario">
            <NativeDateTimeField
              mode="time"
              value={time}
              onBlur={() => setTouched((current) => ({ ...current, time: true }))}
              onChange={setTime}
              placeholder="Selecionar horario"
              status={fieldStatus("time")}
              helperText={fieldError("time")}
            />
          </SetupSection>

          <SetupSection label="Orcamento estimado">
            <View className="gap-1">
              <Text className="px-1 text-xs text-muted-foreground">
                Opcional
              </Text>
              <SetupTextField
                icon="wallet-outline"
                value={budget}
                onBlur={() =>
                  setTouched((current) => ({ ...current, budget: true }))
                }
                onChangeText={setBudget}
                placeholder="R$ 0,00"
                keyboardType="numeric"
                status={fieldStatus("budget")}
                helperText={fieldError("budget")}
              />
            </View>
          </SetupSection>

          <SetupSection label="Negociavel">
            <Pressable
              onPress={() => setNegotiable((current) => !current)}
              className="min-h-[54px] flex-row items-center justify-between rounded-full bg-card px-4 py-3 shadow-sm shadow-black/5"
              accessibilityRole="switch"
              accessibilityState={{ checked: negotiable }}
              accessibilityLabel="Aceito contrapropostas"
            >
              <Text className="text-[15px] font-medium text-foreground">
                Aceito contrapropostas
              </Text>
              <View
                className={`rounded-full px-4 py-1.5 ${
                  negotiable ? "bg-primary" : "bg-[#f2e7e8]"
                }`}
              >
                <Text
                  className={`text-[13px] font-semibold ${
                    negotiable ? "text-white" : "text-muted-foreground"
                  }`}
                >
                  {negotiable ? "Sim" : "Nao"}
                </Text>
              </View>
            </Pressable>
          </SetupSection>

          <SetupSection label="Imagens do servico">
            <Text className="px-1 text-xs text-muted-foreground">Opcional</Text>
            <View className="flex-row gap-2">
              <Pressable
                onPress={() => handleAddImage("camera")}
                className="min-h-[56px] flex-1 items-center justify-center gap-1 rounded-[14px] bg-primary px-3"
                accessibilityRole="button"
                accessibilityLabel="Tirar foto do servico"
              >
                <Ionicons name="camera-outline" size={20} color="#ffffff" />
                <Text className="text-sm font-semibold text-white">Tirar foto</Text>
              </Pressable>
              <Pressable
                onPress={() => handleAddImage("library")}
                className="min-h-[56px] flex-1 items-center justify-center gap-1 rounded-[14px] border-[1.5px] border-dashed border-input-border bg-card px-3"
                accessibilityRole="button"
                accessibilityLabel="Adicionar imagens da galeria"
              >
                <Ionicons
                  name={imageUrls.length > 0 ? "checkmark-circle" : "image-outline"}
                  size={20}
                  color="#b94b50"
                />
                <Text className="text-sm font-semibold text-primary">
                  {isUploadingImage ? "Enviando..." : "Galeria"}
                </Text>
              </Pressable>
            </View>
            <Text className="px-1 text-xs text-muted-foreground">
              {imageUrls.length > 0
                ? `${imageUrls.length} imagem(ns) adicionada(s)`
                : "Nenhuma imagem adicionada."}
            </Text>
            {uploadError ? (
              <Text className="px-1 text-xs leading-4 text-[#dc2626]">
                {uploadError}
              </Text>
            ) : null}
            {imageUrls.length > 0 ? (
              <ScrollView horizontal contentContainerClassName="gap-3">
                {imageUrls.map((url) => (
                  <View key={url} className="relative">
                    <Image
                      source={{ uri: url }}
                      className="h-32 w-44 rounded-xl"
                      resizeMode="cover"
                    />
                    <Pressable
                      onPress={() => {
                        setImageUrls((current) => {
                          const next = current.filter((item) => item !== url);
                          setHasImages(next.length > 0);
                          return next;
                        });
                      }}
                      className="absolute right-2 top-2 h-8 w-8 items-center justify-center rounded-full bg-black/60"
                      accessibilityRole="button"
                      accessibilityLabel="Remover imagem"
                    >
                      <Ionicons name="close" size={16} color="#ffffff" />
                    </Pressable>
                  </View>
                ))}
              </ScrollView>
            ) : null}
          </SetupSection>

          <Pressable
            onPress={handleSubmit}
            disabled={isSubmitting}
            className="mb-8 mt-2 min-h-[56px] items-center justify-center rounded-full bg-primary px-6"
            accessibilityRole="button"
          >
            <Text className="text-[17px] font-bold text-white">
              {isSubmitting ? "Salvando..." : submitLabel}
            </Text>
          </Pressable>
          {error ? (
            <Text className="text-center text-xs font-semibold text-primary">
              {error}
            </Text>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}

export function ClientAdsPage({
  onContractService,
  onBack,
  onNavigate,
  onProfilePress,
}: ClientAdsPageProps) {
  const [adItems, setAdItems] = useState<AdItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCreatingAd, setIsCreatingAd] = useState(false);
  const [editingAd, setEditingAd] = useState<AdItem | null>(null);
  const [selectedCandidatesAd, setSelectedCandidatesAd] =
    useState<AdItem | null>(null);
  const [contractedAdIds, setContractedAdIds] = useState<string[]>([]);
  const [pendingCancelAdId, setPendingCancelAdId] = useState<string | null>(null);

  const loadAds = async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const [categoryItems, adsPage] = await Promise.all([
        api.categories(),
        api.myServiceAds(),
      ]);
      setCategories(categoryItems);
      setAdItems(adsPage.items.map(mapAd));
    } catch (error) {
      setLoadError(
        error instanceof ApiError
          ? error.message
          : "Nao foi possivel carregar seus anuncios.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadAds();
  }, []);

  const handleToggleActive = async (item: AdItem) => {
    const nextStatus = item.status === "inactive" ? "OPEN" : "PAUSED";

    try {
      const updated = await api.updateServiceAdStatus(item.id, nextStatus);
      setAdItems((current) =>
        current.map((ad) => (ad.id === item.id ? mapAd(updated) : ad)),
      );
    } catch (error) {
      setLoadError(
        error instanceof ApiError ? error.message : "Nao foi possivel atualizar.",
      );
    }
  };

  const cancelAd = async (item: AdItem) => {
    try {
      await api.deleteServiceAd(item.id);
      setAdItems((current) => current.filter((ad) => ad.id !== item.id));
      setPendingCancelAdId(null);
    } catch (error) {
      setLoadError(
        error instanceof ApiError ? error.message : "Nao foi possivel cancelar.",
      );
    }
  };

  const handleCancel = (item: AdItem) => {
    setPendingCancelAdId((current) => (current === item.id ? null : item.id));
  };

  const handleContractCandidate = async (ad: AdItem, candidate: CandidateItem) => {
    if (contractedAdIds.includes(ad.id)) {
      return;
    }

    try {
      await api.acceptApplication(candidate.id);
      setContractedAdIds((current) => [...current, ad.id]);
      setAdItems((current) =>
        current.map((item) =>
          item.id === ad.id ? { ...item, status: "contracted" } : item,
        ),
      );
      setSelectedCandidatesAd(null);
      onNavigate?.("work");
    } catch (error) {
      setLoadError(
        error instanceof ApiError ? error.message : "Nao foi possivel contratar.",
      );
    }
  };

  const submitAd = async (values: AdFormValues, ad?: AdItem) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        categoryId: values.categoryIds[0],
        categoryIds: values.categoryIds,
        title: values.title,
        description: values.description,
        location: values.location,
        startDate: values.startDate,
        startTime: values.time,
        deadlineDays: Number(values.deadline),
        budget: parseMoney(values.budget),
        negotiable: values.negotiable,
        imageUrls: values.imageUrls,
      };
      const saved = ad
        ? await api.updateServiceAd(ad.id, payload)
        : await api.createServiceAd(payload);
      setAdItems((current) =>
        ad
          ? current.map((item) => (item.id === ad.id ? mapAd(saved) : item))
          : [mapAd(saved), ...current],
      );
      setIsCreatingAd(false);
      setEditingAd(null);
    } catch (error) {
      setSubmitError(
        error instanceof ApiError ? error.message : "Nao foi possivel salvar.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCreatingAd) {
    return (
      <ClientAdFormScreen
        categories={categories}
        error={submitError}
        isSubmitting={isSubmitting}
        initialValues={{
          ...defaultAdFormValues,
          categoryIds: categories[0]?.id ? [categories[0].id] : [],
        }}
        mode="create"
        onBack={() => setIsCreatingAd(false)}
        onProfilePress={onProfilePress}
        onSubmit={(values) => submitAd(values)}
      />
    );
  }

  if (editingAd) {
    return (
      <ClientAdFormScreen
        categories={categories}
        error={submitError}
        isSubmitting={isSubmitting}
        mode="edit"
        initialValues={mapAdToForm(editingAd)}
        onBack={() => setEditingAd(null)}
        onProfilePress={onProfilePress}
        onSubmit={(values) => submitAd(values, editingAd)}
      />
    );
  }

  if (selectedCandidatesAd) {
    return (
      <ClientCandidatesScreen
        ad={selectedCandidatesAd}
        contractedAdIds={contractedAdIds}
        onContractCandidate={handleContractCandidate}
        onBack={() => setSelectedCandidatesAd(null)}
        onNavigate={onNavigate}
        onProfilePress={onProfilePress}
      />
    );
  }

  return (
    <View className="relative flex-1 w-full max-w-[480px] bg-background">
      <ProjectHeader
        onBack={onBack ?? (() => onNavigate?.("home"))}
        onProfilePress={onProfilePress}
      />

      <ScrollView
        className="flex-1 px-5"
        contentContainerClassName="pb-32 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-4 text-[22px] font-bold text-foreground">
          Meus Anuncios
        </Text>

        <Pressable
          onPress={() => setIsCreatingAd(true)}
          className="mb-6 items-center gap-2 rounded-lg bg-primary px-5 py-7"
          accessibilityRole="button"
          accessibilityLabel="Criar novo anuncio"
        >
          <View className="h-[42px] w-[42px] items-center justify-center rounded-full bg-white/20">
            <Ionicons name="add" size={24} color="#ffffff" />
          </View>
          <Text className="text-[17px] font-bold text-white">
            Criar Novo Anuncio
          </Text>
          <Text className="text-center text-[13px] leading-5 text-white/85">
            Publique um servico e receba propostas de profissionais qualificados.
          </Text>
        </Pressable>

        <Text className="mb-3 text-[17px] font-bold text-foreground">
          Meus Anuncios
        </Text>

        {isLoading ? (
          <LoadingState label="Carregando anuncios..." />
        ) : loadError ? (
          <ErrorState message={loadError} onRetry={loadAds} />
        ) : adItems.length === 0 ? (
          <EmptyState message="Voce ainda nao publicou nenhum anuncio." />
        ) : adItems.map((item) => (
          <AdCard
            key={item.id}
            item={item}
            onCancel={handleCancel}
            onConfirmCancel={(ad) => {
              void cancelAd(ad);
            }}
            onDismissCancel={() => setPendingCancelAdId(null)}
            onEdit={setEditingAd}
            onToggleActive={handleToggleActive}
            onViewCandidates={setSelectedCandidatesAd}
            pendingCancel={pendingCancelAdId === item.id}
          />
        ))}
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 px-5 pb-2">
        <ClientBottomNav active="ads" onSelect={onNavigate} />
      </View>
    </View>
  );
}
