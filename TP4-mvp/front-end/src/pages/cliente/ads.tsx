import { Ionicons } from "@expo/vector-icons";
import type { ReactNode } from "react";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

import { ClientBottomNav, type ClientNavKey } from "../../components/cliente";
import {
  ChoiceChip,
  ProjectHeader,
  SetupSection,
  SetupTextField,
} from "../../components/profissional/components";
import {
  isPositiveInteger,
  isRequiredText,
  isValidBRMoney,
  isValidTime,
} from "../../services/validators";
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
};

type AdFormValues = {
  budget: string;
  category: string;
  deadline: string;
  description: string;
  hasImages: boolean;
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
  role: string;
};

const ads: AdItem[] = [
  {
    id: "bathroom-renovation",
    title: "Reforma Completa de Banheiro",
    status: "active",
    postedAt: "Postado ha 2 dias",
    location: "Jardins, Sao Paulo",
    candidates: 8,
    visits: 32,
  },
  {
    id: "electrical-panel",
    title: "Instalacao Eletrica (Quadro)",
    status: "inactive",
    postedAt: "Postado hoje",
    location: "Centro, Sao Paulo",
    candidates: 0,
    visits: 5,
  },
];

const serviceCategories = [
  "Construcao",
  "Eletrica",
  "Encanamento",
  "Pintura",
  "Reparo",
  "Outros",
];

const defaultAdFormValues: AdFormValues = {
  budget: "",
  category: "Construcao",
  deadline: "",
  description: "",
  hasImages: false,
  location: "",
  negotiable: true,
  startDate: "",
  time: "",
  title: "",
};

const adFormValuesById: Record<string, AdFormValues> = {
  "bathroom-renovation": {
    budget: "R$ 2500",
    category: "Construcao",
    deadline: "10",
    description:
      "Preciso reformar o banheiro com troca de piso, revestimento, pintura e ajuste hidraulico.",
    hasImages: true,
    location: "Jardins, Sao Paulo",
    negotiable: true,
    startDate: "10/07/2026",
    time: "08:00",
    title: "Reforma Completa de Banheiro",
  },
  "electrical-panel": {
    budget: "R$ 800",
    category: "Eletrica",
    deadline: "3",
    description:
      "Instalacao eletrica com troca de quadro, organizacao dos disjuntores e revisao de tomadas.",
    hasImages: false,
    location: "Centro, Sao Paulo",
    negotiable: true,
    startDate: "08/07/2026",
    time: "09:00",
    title: "Instalacao Eletrica (Quadro)",
  },
};

const candidates: CandidateItem[] = [
  {
    about:
      "Marcos Almeida e pedreiro com foco em reformas residenciais, acabamento limpo e organizacao no canteiro.",
    avatarUrl:
      "https://storage.googleapis.com/banani-avatars/avatar/male/25-35/Hispanic/0",
    baseValue: "R$ 1.800,00",
    dailyRate: "R$ 180,00",
    hasCounterOffer: false,
    id: "marcos-almeida",
    name: "Marcos Almeida",
    neighborhood: "Jardins",
    role: "Pedreiro",
  },
  {
    about:
      "Joao Souza coordena equipes de obra e acompanha reformas completas com planejamento de etapas e prazos.",
    avatarUrl:
      "https://storage.googleapis.com/banani-avatars/avatar/male/25-35/South Asian/1",
    baseValue: "R$ 1.800,00",
    dailyRate: "R$ 220,00",
    hasCounterOffer: true,
    id: "joao-souza",
    name: "Joao Souza",
    neighborhood: "Centro",
    newValue: "R$ 2.100,00",
    role: "Empreiteiro",
  },
  {
    about:
      "Silva Reformas atende obras de pequeno e medio porte com equipe propria para construcao e acabamento.",
    avatarUrl:
      "https://storage.googleapis.com/banani-avatars/avatar/male/25-35/African/2",
    baseValue: "R$ 1.800,00",
    dailyRate: "R$ 250,00",
    hasCounterOffer: false,
    id: "silva-reformas",
    name: "Silva Reformas",
    neighborhood: "Vila Nova",
    role: "Construtora",
  },
  {
    about:
      "Roberto Carlos atua em reformas e reparos gerais, com experiencia em alvenaria, pintura e pequenos ajustes.",
    avatarUrl:
      "https://storage.googleapis.com/banani-avatars/avatar/male/25-35/Hispanic/4",
    baseValue: "R$ 1.800,00",
    dailyRate: "R$ 190,00",
    hasCounterOffer: true,
    id: "roberto-carlos",
    name: "Roberto Carlos",
    neighborhood: "Centro",
    newValue: "R$ 1.950,00",
    role: "Pedreiro",
  },
];

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
  onEdit,
  onToggleActive,
  onViewCandidates,
}: {
  item: AdItem;
  onCancel: (item: AdItem) => void;
  onEdit: (item: AdItem) => void;
  onToggleActive: (item: AdItem) => void;
  onViewCandidates: (item: AdItem) => void;
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
        <Image
          source={{ uri: item.avatarUrl }}
          className="h-12 w-12 rounded-[12px] bg-muted"
          accessibilityLabel={`Foto de ${item.name}`}
        />
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
          className={`min-h-[44px] flex-1 items-center justify-center rounded-lg border border-border px-3 shadow-sm shadow-black/5 ${
            disabled ? "bg-[#eee4e4]" : "bg-card"
          }`}
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
  onContractCandidate: (ad: AdItem, candidate: CandidateItem) => void;
  onBack: () => void;
  onNavigate?: (key: ClientNavKey) => void;
  onProfilePress?: () => void;
}) {
  const [activeFilter, setActiveFilter] = useState<CandidateFilter>("all");
  const [profileCandidate, setProfileCandidate] = useState<CandidateItem | null>(null);
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

        {visibleCandidates.map((item) => (
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
  initialValues = defaultAdFormValues,
  mode,
  onBack,
  onProfilePress,
  onSubmit,
}: {
  initialValues?: AdFormValues;
  mode: "create" | "edit";
  onBack: () => void;
  onProfilePress?: () => void;
  onSubmit: () => void;
}) {
  const [title, setTitle] = useState(initialValues.title);
  const [category, setCategory] = useState(initialValues.category);
  const [description, setDescription] = useState(initialValues.description);
  const [location, setLocation] = useState(initialValues.location);
  const [startDate, setStartDate] = useState(initialValues.startDate);
  const [deadline, setDeadline] = useState(initialValues.deadline);
  const [time, setTime] = useState(initialValues.time);
  const [budget, setBudget] = useState(initialValues.budget);
  const [negotiable, setNegotiable] = useState(initialValues.negotiable);
  const [hasImages, setHasImages] = useState(initialValues.hasImages);
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
    startDate: isRequiredText(startDate, 6)
      ? undefined
      : "Informe a data de inicio desejada.",
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

    onSubmit();
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
              {serviceCategories.map((item) => (
                <ChoiceChip
                  key={item}
                  label={item}
                  selected={category === item}
                  onPress={() => setCategory(item)}
                />
              ))}
            </View>
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
            <SetupTextField
              icon="calendar-outline"
              value={startDate}
              onBlur={() =>
                setTouched((current) => ({ ...current, startDate: true }))
              }
              onChangeText={setStartDate}
              placeholder="Ex: 10/07/2026"
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
            <SetupTextField
              icon="timer-outline"
              value={time}
              onBlur={() => setTouched((current) => ({ ...current, time: true }))}
              onChangeText={setTime}
              placeholder="Ex: 08:00"
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
            <Pressable
              onPress={() => setHasImages((current) => !current)}
              className={`items-center justify-center gap-2 rounded-[16px] border-[1.5px] border-dashed px-5 py-8 shadow-sm shadow-black/5 ${
                hasImages
                  ? "border-primary bg-[#fff7f7]"
                  : "border-black/10 bg-card"
              }`}
              accessibilityRole="button"
              accessibilityLabel="Adicionar imagens"
            >
              <View className="h-12 w-12 items-center justify-center rounded-full bg-[#fceaea]">
                <Ionicons
                  name={hasImages ? "checkmark-circle" : "image-outline"}
                  size={22}
                  color="#b94b50"
                />
              </View>
              <Text className="text-sm font-medium text-muted-foreground">
                {hasImages ? "Imagens adicionadas" : "Adicionar imagens"}
              </Text>
            </Pressable>
          </SetupSection>

          <Pressable
            onPress={handleSubmit}
            className="mb-8 mt-2 min-h-[56px] items-center justify-center rounded-full bg-primary px-6"
            accessibilityRole="button"
          >
            <Text className="text-[17px] font-bold text-white">
              {submitLabel}
            </Text>
          </Pressable>
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
  const [adItems, setAdItems] = useState<AdItem[]>(ads);
  const [isCreatingAd, setIsCreatingAd] = useState(false);
  const [editingAd, setEditingAd] = useState<AdItem | null>(null);
  const [selectedCandidatesAd, setSelectedCandidatesAd] =
    useState<AdItem | null>(null);
  const [contractedAdIds, setContractedAdIds] = useState<string[]>([]);

  const updateAdStatus = (item: AdItem, status: AdStatus) => {
    setAdItems((current) =>
      current.map((ad) => (ad.id === item.id ? { ...ad, status } : ad)),
    );
  };

  const handleToggleActive = (item: AdItem) => {
    if (item.status === "inactive") {
      updateAdStatus(item, "active");
      return;
    }

    if (item.status === "active") {
      updateAdStatus(item, "inactive");
    }
  };

  const handleCancel = (item: AdItem) => {
    setAdItems((current) => current.filter((ad) => ad.id !== item.id));
  };

  const handleContractCandidate = (ad: AdItem, candidate: CandidateItem) => {
    if (contractedAdIds.includes(ad.id)) {
      return;
    }

    setContractedAdIds((current) => [...current, ad.id]);
    updateAdStatus(ad, "contracted");
    onContractService?.({
      avatarUri: candidate.avatarUrl,
      dateLabel: "Início:",
      dateValue: "Hoje",
      id: `contract-${ad.id}-${candidate.id}`,
      professionalName: candidate.name,
      professionalRole: candidate.role,
      status: "em_andamento",
      statusOptions: [
        { key: "aguardando_aprovacao", label: "Aguardando aprovação" },
        { key: "em_andamento", label: "Em andamento" },
        { key: "concluido", label: "Concluído" },
        { key: "reabrir_servico", label: "Reabrir Serviço" },
      ],
      title: ad.title,
    });
    setSelectedCandidatesAd(null);
    onNavigate?.("work");
  };

  if (isCreatingAd) {
    return (
      <ClientAdFormScreen
        mode="create"
        onBack={() => setIsCreatingAd(false)}
        onProfilePress={onProfilePress}
        onSubmit={() => setIsCreatingAd(false)}
      />
    );
  }

  if (editingAd) {
    return (
      <ClientAdFormScreen
        mode="edit"
        initialValues={adFormValuesById[editingAd.id] ?? {
          ...defaultAdFormValues,
          location: editingAd.location,
          title: editingAd.title,
        }}
        onBack={() => setEditingAd(null)}
        onProfilePress={onProfilePress}
        onSubmit={() => setEditingAd(null)}
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

        {adItems.map((item) => (
          <AdCard
            key={item.id}
            item={item}
            onCancel={handleCancel}
            onEdit={setEditingAd}
            onToggleActive={handleToggleActive}
            onViewCandidates={setSelectedCandidatesAd}
          />
        ))}
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 px-5 pb-2">
        <ClientBottomNav active="ads" onSelect={onNavigate} />
      </View>
    </View>
  );
}
