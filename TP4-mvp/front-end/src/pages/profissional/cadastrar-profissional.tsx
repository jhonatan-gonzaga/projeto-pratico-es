import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { professionalServices, projectItems, serviceRequests } from "../../components/profissional/data";
import { formatBRPhone } from "../../components/profissional/utils";
import type { ProfessionalArea, ProfessionalTab } from "../../components/profissional/types";
import {
  getProfessionalProfileErrors,
  isRequiredText,
  isValidBRMoney,
  isValidName,
  isValidPhone,
  isValidTime,
} from "../../services/validators";
import { ApiError, Category, api } from "../../services/api";
import { pickAndUploadImage } from "../../services/image-upload";
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

export function ProfessionalSetupScreen({
  onBack,
  onProfilePress,
  onSave,
}: {
  onBack: () => void;
  onProfilePress: () => void;
  onSave: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [about, setAbout] = useState("");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({
    about: false,
    dailyRate: false,
    endTime: false,
    name: false,
    neighborhood: false,
    number: false,
    phone: false,
    startTime: false,
    street: false,
  });
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [availableDays, setAvailableDays] = useState<string[]>([]);

  const specialtyOptions = [
    "Pedreiro",
    "Eletricista",
    "Pintor",
    "Encanador",
    "Ajudante",
    "Ar Condicionado",
    "Carpinteiro",
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

  useEffect(() => {
    api.categories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

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

  const errors = getProfessionalProfileErrors({
    about,
    availableDays,
    dailyRate,
    endTime,
    name,
    neighborhood,
    number,
    phone,
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

  const handleSave = async () => {
    setSubmitted(true);

    if (hasErrors || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const selectedCategoryIds = categories
        .filter((category) => specialties.includes(category.name))
        .map((category) => category.id);
      const dayIdToWeekday: Record<string, string> = {
        S: "MONDAY",
        T: "TUESDAY",
        Q1: "WEDNESDAY",
        Q2: "THURSDAY",
        Sx: "FRIDAY",
        Sa: "SATURDAY",
        D: "SUNDAY",
      };

      await api.upsertProfessionalMe({
        about,
        dailyRate: Number(dailyRate.replace(/[^\d,.-]/g, "").replace(",", ".")),
        profilePhotoUrl: profilePhotoUrl ?? undefined,
        address: {
          neighborhood,
          street,
          number,
          city: "Itacoatiara",
          state: "AM",
        },
        categoryIds: selectedCategoryIds,
        availability: availableDays.map((day) => ({
          dayOfWeek: dayIdToWeekday[day],
          startTime,
          endTime,
        })),
      });
      onSave();
    } catch (error) {
      setSubmitError(
        error instanceof ApiError
          ? error.message
          : "Nao foi possivel salvar seu perfil profissional.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const handlePickProfilePhoto = async () => {
    setPhotoError(null);

    try {
      const uploadedUrl = await pickAndUploadImage();

      if (uploadedUrl) {
        setProfilePhotoUrl(uploadedUrl);
      }
    } catch (error) {
      setPhotoError(
        error instanceof Error ? error.message : "Nao foi possivel enviar a foto.",
      );
    }
  };

  return (
    <View className="h-full w-full max-w-[480px] self-center bg-background">
      <ProjectHeader onBack={onBack} onProfilePress={onProfilePress} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-7 px-5 pb-8 pt-3"
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center gap-2">
          <View className="relative">
            <View className="h-24 w-24 items-center justify-center rounded-full border-[3px] border-primary bg-[#f7e8e9]">
              {profilePhotoUrl ? (
                <Image
                  source={{ uri: profilePhotoUrl }}
                  className="h-full w-full rounded-full"
                  resizeMode="cover"
                />
              ) : (
                <Ionicons name="person" size={46} color="#b94b50" />
              )}
            </View>
            <Pressable
              onPress={handlePickProfilePhoto}
              className="absolute bottom-0.5 right-0.5 h-7 w-7 items-center justify-center rounded-full bg-primary shadow-sm"
              accessibilityRole="button"
              accessibilityLabel="Alterar foto"
            >
              <Ionicons name="camera" size={14} color="#ffffff" />
            </Pressable>
          </View>
          <Text className="text-[13px] font-semibold text-primary">
            Alterar foto
          </Text>
          {photoError ? (
            <Text className="text-center text-xs font-semibold text-primary">
              {photoError}
            </Text>
          ) : null}
        </View>

        <SetupSection label="Nome Completo">
          <SetupTextField
            value={name}
            onBlur={() => setTouched((current) => ({ ...current, name: true }))}
            onChangeText={setName}
            status={fieldStatus("name", isValidName(name))}
            helperText={fieldError("name")}
          />
        </SetupSection>

        <SetupSection label="Telefone">
          <SetupTextField
            value={phone}
            onBlur={() => setTouched((current) => ({ ...current, phone: true }))}
            onChangeText={(value) => setPhone(formatBRPhone(value))}
            keyboardType="phone-pad"
            status={fieldStatus("phone", isValidPhone(phone))}
            helperText={fieldError("phone")}
          />
        </SetupSection>

        <SetupSection label="Especialidades">
          <View className="flex-row flex-wrap gap-2.5">
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
          <Text className="mb-1 text-[13px] font-medium text-muted-foreground">
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

        <SetupSection label="Horario de Atendimento">
          <View className="flex-row gap-3">
            <View className="flex-1 gap-2">
              <Text className="text-[13px] font-semibold text-muted-foreground">
                Das
              </Text>
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
              <Text className="text-[13px] font-semibold text-muted-foreground">
                Ate
              </Text>
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
        </SetupSection>

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

        <SetupSection label="Localizacao">
          <View className="gap-2.5">
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
            <View className="flex-row gap-2.5">
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

        <SetupSection label="Sobre mim">
          <View className="gap-2">
            <SetupTextField
              value={about}
              onBlur={() => setTouched((current) => ({ ...current, about: true }))}
              onChangeText={setAbout}
              placeholder="Descreva sua experiencia e diferenciais..."
              multiline
              status={fieldStatus("about", isRequiredText(about, 20))}
              helperText={fieldError("about")}
            />
          </View>
        </SetupSection>

        <Pressable
          onPress={handleSave}
          disabled={isSubmitting}
          className="mb-6 min-h-[56px] items-center justify-center rounded-[18px] bg-primary px-6"
          accessibilityRole="button"
        >
          <Text className="text-base font-bold text-white">
            {isSubmitting ? "Salvando..." : "Salvar Perfil"}
          </Text>
        </Pressable>
        {submitError ? (
          <Text className="text-center text-xs font-semibold text-primary">
            {submitError}
          </Text>
        ) : null}
      </ScrollView>
    </View>
  );
}
