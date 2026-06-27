import { Ionicons } from "@expo/vector-icons";
import type { ReactNode } from "react";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

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

type ClientAdsPageProps = {
  onBack?: () => void;
  onNavigate?: (key: ClientNavKey) => void;
  onProfilePress?: () => void;
};

type AdStatus = "active" | "review";

type AdItem = {
  id: string;
  title: string;
  status: AdStatus;
  postedAt: string;
  location: string;
  candidates: number;
  visits: number;
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
    status: "review",
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

const statusContent: Record<
  AdStatus,
  {
    label: string;
    badgeClassName: string;
    badgeTextClassName: string;
    actionLabel: string;
    actionClassName: string;
    actionTextClassName: string;
  }
> = {
  active: {
    label: "Ativo",
    badgeClassName: "bg-[#e6fbf0]",
    badgeTextClassName: "text-[#067a3f]",
    actionLabel: "Ver Candidatos",
    actionClassName: "bg-primary",
    actionTextClassName: "text-white",
  },
  review: {
    label: "Em Analise",
    badgeClassName: "bg-[#fff4e6]",
    badgeTextClassName: "text-[#8a5a00]",
    actionLabel: "Aguardando",
    actionClassName: "bg-[#ffeff0]",
    actionTextClassName: "text-[#6b2730]",
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

function AdCard({ item }: { item: AdItem }) {
  const status = statusContent[item.status];

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
          className="flex-1 items-center rounded-md border border-input-border bg-card py-3"
          accessibilityRole="button"
          accessibilityLabel={`Editar ${item.title}`}
        >
          <Text className="text-sm font-semibold text-foreground">Editar</Text>
        </Pressable>
        <Pressable
          className={`flex-[2] items-center rounded-md py-3 ${status.actionClassName}`}
          accessibilityRole="button"
          accessibilityLabel={status.actionLabel}
        >
          <Text className={`text-sm font-semibold ${status.actionTextClassName}`}>
            {status.actionLabel}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function ClientCreateAdScreen({
  onBack,
  onProfilePress,
  onPublish,
}: {
  onBack: () => void;
  onProfilePress?: () => void;
  onPublish: () => void;
}) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Construcao");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [time, setTime] = useState("");
  const [budget, setBudget] = useState("");
  const [negotiable, setNegotiable] = useState(true);
  const [hasImages, setHasImages] = useState(false);
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

  const handlePublish = () => {
    setSubmitted(true);

    if (Object.values(errors).some(Boolean)) {
      return;
    }

    onPublish();
  };

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
            Novo Anuncio
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
            onPress={handlePublish}
            className="mb-8 mt-2 min-h-[56px] items-center justify-center rounded-full bg-primary px-6"
            accessibilityRole="button"
          >
            <Text className="text-[17px] font-bold text-white">
              Publicar Anuncio
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

export function ClientAdsPage({
  onBack,
  onNavigate,
  onProfilePress,
}: ClientAdsPageProps) {
  const [isCreatingAd, setIsCreatingAd] = useState(false);

  if (isCreatingAd) {
    return (
      <ClientCreateAdScreen
        onBack={() => setIsCreatingAd(false)}
        onProfilePress={onProfilePress}
        onPublish={() => setIsCreatingAd(false)}
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
          Anuncios Ativos
        </Text>

        {ads.map((item) => (
          <AdCard key={item.id} item={item} />
        ))}
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 px-5 pb-2">
        <ClientBottomNav active="ads" onSelect={onNavigate} />
      </View>
    </View>
  );
}
