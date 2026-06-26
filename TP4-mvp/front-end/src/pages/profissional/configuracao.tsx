import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { professionalServices, projectItems, serviceRequests } from "../../components/profissional/data";
import { formatBRPhone } from "../../components/profissional/utils";
import type { ProfessionalArea, ProfessionalTab } from "../../components/profissional/types";
import {
  getProfessionalProfileErrors,
  isRequiredText,
  isValidBRMoney,
  isValidName,
  isValidTime,
} from "../../services/validators";
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
import { HelpCenterScreen } from "./central-ajuda";
import { NotificationsScreen } from "./notificacoes";
import { PrivacySecurityScreen } from "./privacidade-seguranca";
import { TermsOfUseScreen } from "./termos-uso";

type SettingsPage = "home" | "profile" | "notifications" | "privacy" | "help" | "terms";

const professionalReviewItems = [
  {
    author: "Maria S.",
    initials: "MS",
    rating: 4,
    text: "Excelente profissional, deixou o acabamento muito bem feito.",
    date: "Ha 2 dias",
  },
  {
    author: "Roberto A.",
    initials: "RA",
    rating: 4,
    text: "Muito bom! Trabalho rapido e caprichado.",
    date: "Ha 3 dias",
  },
];

type ProfessionalReview = (typeof professionalReviewItems)[number];
type ReviewAction = "reply" | "report";

function ReviewStars({ rating, size = 15 }: { rating: number; size?: number }) {
  return (
    <View className="flex-row gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name="star-outline"
          size={size}
          color={star <= rating ? "#f0c040" : "#e0d8da"}
        />
      ))}
    </View>
  );
}

function ReviewActionScreen({
  action,
  onBack,
  onDone,
  onProfilePress,
  review,
}: {
  action: ReviewAction;
  onBack: () => void;
  onDone: () => void;
  onProfilePress: () => void;
  review: ProfessionalReview;
}) {
  const [reply, setReply] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedReason, setSelectedReason] = useState("Comentario ofensivo");
  const reportReasons = [
    "Comentario ofensivo",
    "Informacao falsa",
    "Spam",
    "Nao reconheco o servico",
  ];
  const isReply = action === "reply";
  const detailsError = isReply
    ? !isRequiredText(reply, 10)
      ? "Escreva uma resposta com pelo menos 10 caracteres."
      : undefined
    : !isRequiredText(reportDetails, 15)
      ? "Descreva o motivo do reporte com pelo menos 15 caracteres."
      : undefined;
  const handleDone = () => {
    setSubmitted(true);

    if (detailsError) {
      return;
    }

    onDone();
  };

  return (
    <View className="h-full w-full max-w-[480px] self-center bg-background">
      <ProjectHeader onBack={onBack} onProfilePress={onProfilePress} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-5 px-4 pb-8 pt-5"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="rounded-[8px] bg-card p-4 shadow-md shadow-black/10">
          <View className="mb-3 flex-row items-center gap-3">
            <View className="h-11 w-11 items-center justify-center rounded-full bg-[#f7e8e9]">
              <Text className="text-sm font-bold text-primary">
                {review.initials}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-foreground">
                {review.author}
              </Text>
              <View className="mt-1 flex-row items-center gap-2">
                <ReviewStars rating={review.rating} size={14} />
                <Text className="text-xs text-muted-foreground">
                  {review.date}
                </Text>
              </View>
            </View>
          </View>

          <Text className="text-sm leading-6 text-muted-foreground">
            {review.text}
          </Text>
        </View>

        <View className="rounded-[8px] bg-card p-4 shadow-md shadow-black/10">
          <View className="mb-4 flex-row items-center gap-2">
            <View className="h-9 w-9 items-center justify-center rounded-[12px] bg-[#f7e8e9]">
              <Ionicons
                name={isReply ? "chatbox-outline" : "flag-outline"}
                size={18}
                color="#b94b50"
              />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-bold text-foreground">
                {isReply ? "Responder avaliacao" : "Reportar avaliacao"}
              </Text>
              <Text className="mt-0.5 text-xs text-muted-foreground">
                {isReply
                  ? "Sua resposta aparece no seu perfil publico."
                  : "Informe o motivo para analisarmos a avaliacao."}
              </Text>
            </View>
          </View>

          {isReply ? (
            <View className="gap-3">
              <View
                className={`min-h-[150px] rounded-[16px] border-[1.5px] px-4 py-3 ${
                  submitted && detailsError
                    ? "border-[#dc2626] bg-[#fff7f7]"
                    : "border-input-border bg-card"
                }`}
              >
                <TextInput
                  value={reply}
                  onChangeText={setReply}
                  multiline
                  className="min-h-[124px] p-0 text-[15px] font-medium leading-6 text-foreground"
                  placeholder="Digite uma resposta educada para o cliente..."
                  placeholderTextColor="#b0b8c1"
                  accessibilityLabel="Resposta da avaliacao"
                />
              </View>
              {submitted && detailsError ? (
                <Text className="px-1 text-xs leading-4 text-[#dc2626]">
                  {detailsError}
                </Text>
              ) : null}

              <View className="rounded-[12px] bg-[#f7eced] px-4 py-3">
                <Text className="text-xs leading-5 text-muted-foreground">
                  Dica: agradeca o feedback e explique rapidamente como voce
                  pode ajudar em proximos servicos.
                </Text>
              </View>
            </View>
          ) : (
            <View className="gap-4">
              <View className="flex-row flex-wrap gap-2">
                {reportReasons.map((reason) => {
                  const selected = selectedReason === reason;

                  return (
                    <Pressable
                      key={reason}
                      onPress={() => setSelectedReason(reason)}
                      className={`rounded-full border-[1.5px] px-4 py-2 ${
                        selected
                          ? "border-primary bg-primary"
                          : "border-input-border bg-card"
                      }`}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                    >
                      <Text
                        className={`text-sm font-semibold ${
                          selected ? "text-white" : "text-foreground"
                        }`}
                      >
                        {reason}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <View
                className={`min-h-[130px] rounded-[16px] border-[1.5px] px-4 py-3 ${
                  submitted && detailsError
                    ? "border-[#dc2626] bg-[#fff7f7]"
                    : "border-input-border bg-card"
                }`}
              >
                <TextInput
                  value={reportDetails}
                  onChangeText={setReportDetails}
                  multiline
                  className="min-h-[104px] p-0 text-[15px] font-medium leading-6 text-foreground"
                  placeholder="Adicione detalhes para ajudar na analise..."
                  placeholderTextColor="#b0b8c1"
                  accessibilityLabel="Detalhes do reporte"
                />
              </View>
              {submitted && detailsError ? (
                <Text className="px-1 text-xs leading-4 text-[#dc2626]">
                  {detailsError}
                </Text>
              ) : null}
            </View>
          )}
        </View>

        <View className="gap-3">
          <Pressable
            onPress={handleDone}
            className="min-h-[56px] items-center justify-center rounded-[16px] bg-primary px-6"
            accessibilityRole="button"
          >
            <Text className="text-base font-bold text-white">
              {isReply ? "Enviar Resposta" : "Enviar Reporte"}
            </Text>
          </Pressable>

          <Pressable
            onPress={onBack}
            className="min-h-[52px] items-center justify-center rounded-[16px] border border-input-border bg-card px-6"
            accessibilityRole="button"
          >
            <Text className="text-base font-semibold text-foreground">
              Cancelar
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

function ProfessionalProfileSettingsScreen({
  onBack,
  onProfilePress,
  onSave,
}: {
  onBack: () => void;
  onProfilePress: () => void;
  onSave: () => void;
}) {
  const [name, setName] = useState("Joao Nonato");
  const [dailyRate, setDailyRate] = useState("R$ 150");
  const [neighborhood, setNeighborhood] = useState("Centro");
  const [street, setStreet] = useState("Rua Borba");
  const [number, setNumber] = useState("120");
  const [about, setAbout] = useState(
    "Profissional com experiencia em obras residenciais, pintura, reparos e acabamento.",
  );
  const [specialties, setSpecialties] = useState<string[]>([
    "Pedreiro",
    "Eletricista",
    "Pintor",
    "Encanador",
  ]);
  const [availableDays, setAvailableDays] = useState<string[]>([
    "S",
    "T",
    "Q1",
    "Q2",
    "Sx",
    "Sa",
  ]);
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("18:00");
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState({
    about: false,
    dailyRate: false,
    endTime: false,
    name: false,
    neighborhood: false,
    number: false,
    startTime: false,
    street: false,
  });
  const [selectedReview, setSelectedReview] =
    useState<ProfessionalReview | null>(null);
  const [reviewAction, setReviewAction] = useState<ReviewAction | null>(null);

  const specialtyOptions = [
    "Pedreiro",
    "Eletricista",
    "Pintor",
    "Encanador",
    "Ajudante",
    "Ar Condicionado",
  ];
  const days = [
    { id: "S", label: "S" },
    { id: "T", label: "T" },
    { id: "Q1", label: "Q" },
    { id: "Q2", label: "Q" },
    { id: "Sx", label: "S" },
    { id: "Sa", label: "S" },
    { id: "D", label: "D" },
  ];

  const toggleSpecialty = (specialty: string) => {
    setSpecialties((current) =>
      current.includes(specialty)
        ? current.filter((item) => item !== specialty)
        : [...current, specialty],
    );
  };

  const toggleDay = (day: string) => {
    setAvailableDays((current) =>
      current.includes(day)
        ? current.filter((item) => item !== day)
        : [...current, day],
    );
  };

  const openReviewAction = (review: ProfessionalReview, action: ReviewAction) => {
    setSelectedReview(review);
    setReviewAction(action);
  };

  const closeReviewAction = () => {
    setSelectedReview(null);
    setReviewAction(null);
  };

  const errors = getProfessionalProfileErrors({
    about,
    availableDays,
    dailyRate,
    endTime,
    name,
    neighborhood,
    number,
    specialties,
    startTime,
    street,
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

    onSave();
  };

  if (selectedReview && reviewAction) {
    return (
      <ReviewActionScreen
        action={reviewAction}
        onBack={closeReviewAction}
        onDone={closeReviewAction}
        onProfilePress={onProfilePress}
        review={selectedReview}
      />
    );
  }

  return (
    <View className="h-full w-full max-w-[480px] self-center bg-background">
      <ProjectHeader onBack={onBack} onProfilePress={onProfilePress} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-8"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center px-4 pb-2 pt-6">
          <View className="relative mb-5">
            <View className="h-28 w-28 items-center justify-center rounded-full border-4 border-primary bg-[#f7e8e9]">
              <Text className="text-3xl font-bold text-primary">JN</Text>
            </View>
            <Pressable
              className="absolute bottom-1 right-1 h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary"
              accessibilityRole="button"
              accessibilityLabel="Alterar foto do perfil profissional"
            >
              <Ionicons name="camera" size={15} color="#ffffff" />
            </Pressable>
          </View>

          <View className="w-full items-center rounded-[8px] bg-card px-6 py-5 shadow-md shadow-black/10">
            <Text className="mb-1 text-4xl font-bold text-foreground">4.0</Text>
            <ReviewStars rating={4} size={22} />
            <Text className="mt-1 text-sm text-muted-foreground">
              Baseado em 12 avaliacoes
            </Text>
          </View>
        </View>

        <View className="mt-6 px-4">
          <Text className="text-xl font-bold text-foreground">
            Avaliacoes Recentes
          </Text>
        </View>

        <ScrollView
          horizontal
          className="mt-3"
          contentContainerClassName="gap-3 px-4 pb-2"
          showsHorizontalScrollIndicator={false}
        >
          {professionalReviewItems.map((review) => (
            <View
              key={review.author}
              className="w-64 rounded-[8px] bg-card p-4 shadow-md shadow-black/10"
            >
              <View className="mb-2 flex-row items-center justify-between gap-2">
                <View className="flex-row items-center gap-2">
                  <View className="h-7 w-7 items-center justify-center rounded-full bg-[#f7e8e9]">
                    <Text className="text-[10px] font-bold text-primary">
                      {review.initials}
                    </Text>
                  </View>
                  <Text className="text-sm font-bold text-card-foreground">
                    {review.author}
                  </Text>
                </View>
                <ReviewStars rating={review.rating} size={13} />
              </View>
              <Text className="mb-3 text-sm leading-5 text-muted-foreground">
                {review.text}
              </Text>
              <Text className="mb-3 text-xs text-muted-foreground">
                {review.date}
              </Text>
              <View className="flex-row gap-4">
                <Pressable
                  onPress={() => openReviewAction(review, "reply")}
                  className="flex-row items-center gap-1"
                  accessibilityRole="button"
                  accessibilityLabel={`Responder avaliacao de ${review.author}`}
                >
                  <Ionicons
                    name="chatbox-outline"
                    size={13}
                    color="#b94b50"
                  />
                  <Text className="text-xs font-semibold text-primary">
                    Responder
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => openReviewAction(review, "report")}
                  className="flex-row items-center gap-1"
                  accessibilityRole="button"
                  accessibilityLabel={`Reportar avaliacao de ${review.author}`}
                >
                  <Ionicons
                    name="flag-outline"
                    size={13}
                    color="#8a8490"
                  />
                  <Text className="text-xs font-semibold text-muted-foreground">
                    Reportar
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>

        <View className="mt-5 gap-5 px-4">
          <SetupSection label="Nome Completo">
            <SetupTextField
              value={name}
              onBlur={() => setTouched((current) => ({ ...current, name: true }))}
              onChangeText={setName}
              status={fieldStatus("name", isValidName(name))}
              helperText={fieldError("name")}
            />
          </SetupSection>

          <SetupSection label="Especialidades">
            <View className="flex-row flex-wrap gap-2">
              {specialtyOptions.map((specialty) => (
                <ChoiceChip
                  key={specialty}
                  label={specialty}
                  selected={specialties.includes(specialty)}
                  onPress={() => toggleSpecialty(specialty)}
                />
              ))}
            </View>
            {submitted && errors.specialties ? (
              <Text className="px-1 text-xs leading-4 text-[#dc2626]">
                {errors.specialties}
              </Text>
            ) : null}
          </SetupSection>

          <SetupSection label="Disponibilidade">
            <Text className="text-sm text-muted-foreground">
              Dias da semana
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {days.map((day) => (
                <DayButton
                  key={day.id}
                  label={day.label}
                  selected={availableDays.includes(day.id)}
                  onPress={() => toggleDay(day.id)}
                />
              ))}
            </View>
            {submitted && errors.availableDays ? (
              <Text className="px-1 text-xs leading-4 text-[#dc2626]">
                {errors.availableDays}
              </Text>
            ) : null}
          </SetupSection>

          <View className="flex-row gap-4">
            <View className="flex-1 gap-2">
              <Text className="text-sm font-bold text-foreground">Das</Text>
              <SetupTextField
                value={startTime}
                onBlur={() =>
                  setTouched((current) => ({ ...current, startTime: true }))
                }
                onChangeText={setStartTime}
                status={fieldStatus("startTime", isValidTime(startTime))}
                helperText={fieldError("startTime")}
              />
            </View>
            <View className="flex-1 gap-2">
              <Text className="text-sm font-bold text-foreground">Ate</Text>
              <SetupTextField
                value={endTime}
                onBlur={() =>
                  setTouched((current) => ({ ...current, endTime: true }))
                }
                onChangeText={setEndTime}
                status={fieldStatus("endTime", !errors.endTime)}
                helperText={fieldError("endTime")}
              />
            </View>
          </View>

          <SetupSection label="Valor da Diaria">
            <SetupTextField
              value={dailyRate}
              onBlur={() =>
                setTouched((current) => ({ ...current, dailyRate: true }))
              }
              onChangeText={setDailyRate}
              keyboardType="numeric"
              status={fieldStatus("dailyRate", isValidBRMoney(dailyRate))}
              helperText={fieldError("dailyRate")}
            />
          </SetupSection>

          <SetupSection label="Sobre mim">
            <SetupTextField
              value={about}
              onBlur={() => setTouched((current) => ({ ...current, about: true }))}
              onChangeText={setAbout}
              placeholder="Conte sua experiencia, servicos e diferenciais"
              multiline
              status={fieldStatus("about", isRequiredText(about, 20))}
              helperText={fieldError("about")}
            />
          </SetupSection>

          <SetupSection label="Localizacao">
            <View className="gap-3">
              <SetupTextField
                icon="map-outline"
                value={neighborhood}
                onBlur={() =>
                  setTouched((current) => ({ ...current, neighborhood: true }))
                }
                onChangeText={setNeighborhood}
                placeholder="Bairro"
                status={fieldStatus("neighborhood", isRequiredText(neighborhood))}
                helperText={fieldError("neighborhood")}
              />
              <View className="flex-row gap-3">
                <View className="flex-[2]">
                  <SetupTextField
                    icon="navigate-outline"
                    value={street}
                    onBlur={() =>
                      setTouched((current) => ({ ...current, street: true }))
                    }
                    onChangeText={setStreet}
                    placeholder="Rua"
                    status={fieldStatus("street", isRequiredText(street))}
                    helperText={fieldError("street")}
                  />
                </View>
                <View className="flex-1">
                  <SetupTextField
                    icon="keypad-outline"
                    value={number}
                    onBlur={() =>
                      setTouched((current) => ({ ...current, number: true }))
                    }
                    onChangeText={setNumber}
                    placeholder="No"
                    status={fieldStatus("number", !errors.number)}
                    helperText={fieldError("number")}
                  />
                </View>
              </View>
            </View>
          </SetupSection>

          <Pressable
            onPress={handleSave}
            className="mb-8 min-h-[56px] items-center justify-center rounded-[16px] bg-primary px-6"
            accessibilityRole="button"
          >
            <Text className="text-lg font-bold text-white">Salvar Perfil</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

export function SettingsScreen({
  onBack,
  onProfilePress,
  onSelectArea,
}: {
  onBack: () => void;
  onProfilePress: () => void;
  onSelectArea: (area: ProfessionalArea) => void;
}) {
  const [settingsPage, setSettingsPage] = useState<SettingsPage>("home");

  if (settingsPage === "notifications") {
    return (
      <NotificationsScreen
        onBack={() => setSettingsPage("home")}
        onProfilePress={onProfilePress}
      />
    );
  }

  if (settingsPage === "profile") {
    return (
      <ProfessionalProfileSettingsScreen
        onBack={() => setSettingsPage("home")}
        onProfilePress={onProfilePress}
        onSave={() => setSettingsPage("home")}
      />
    );
  }

  if (settingsPage === "privacy") {
    return (
      <PrivacySecurityScreen
        onBack={() => setSettingsPage("home")}
        onProfilePress={onProfilePress}
      />
    );
  }

  if (settingsPage === "help") {
    return (
      <HelpCenterScreen
        onBack={() => setSettingsPage("home")}
        onProfilePress={onProfilePress}
      />
    );
  }

  if (settingsPage === "terms") {
    return (
      <TermsOfUseScreen
        onBack={() => setSettingsPage("home")}
        onProfilePress={onProfilePress}
      />
    );
  }

  return (
    <View className="h-full w-full max-w-[480px] self-center bg-background">
      <ProjectHeader onBack={onBack} onProfilePress={onProfilePress} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-4 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={() => setSettingsPage("profile")}
          className="mb-6 flex-row items-center gap-4 rounded-[16px] bg-card px-4 py-4 shadow-sm shadow-black/5"
          accessibilityRole="button"
          accessibilityLabel="Editar perfil profissional"
        >
          <View className="h-16 w-16 items-center justify-center rounded-[14px] border-2 border-primary bg-[#f7e8e9]">
            <Ionicons name="person" size={32} color="#b94b50" />
          </View>
          <View className="flex-1">
            <Text className="text-lg font-bold text-foreground">Jhon Souza</Text>
            <Text className="mt-0.5 text-sm text-muted-foreground">
              jhon.souza@email.com
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#8a8490" />
        </Pressable>

        <SettingsSection title="Preferencias">
          <SettingsOption
            icon="notifications-outline"
            label="Notificacoes"
            onPress={() => setSettingsPage("notifications")}
          />
          <SettingsDivider />
          <SettingsOption
            icon="lock-closed-outline"
            label="Privacidade e Seguranca"
            onPress={() => setSettingsPage("privacy")}
          />
        </SettingsSection>

        <SettingsSection title="Suporte">
          <SettingsOption
            icon="help-circle-outline"
            label="Central de Ajuda"
            onPress={() => setSettingsPage("help")}
          />
          <SettingsDivider />
          <SettingsOption
            icon="document-text-outline"
            label="Termos de Uso"
            onPress={() => setSettingsPage("terms")}
          />
        </SettingsSection>

        <View className="overflow-hidden rounded-[16px] bg-card shadow-sm shadow-black/5">
          <Pressable
            className="flex-row items-center justify-center gap-2 px-4 py-4"
            accessibilityRole="button"
          >
            <Ionicons name="log-out-outline" size={18} color="#b94b50" />
            <Text className="text-[15px] font-semibold text-primary">
              Sair da Conta
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <ProfessionalBottomTab
        activeArea="settings"
        onSelectArea={onSelectArea}
      />
    </View>
  );
}
