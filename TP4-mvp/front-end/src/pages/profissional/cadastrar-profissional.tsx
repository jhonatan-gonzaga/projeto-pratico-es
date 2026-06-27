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
  isValidPhone,
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

export function ProfessionalSetupScreen({
  onBack,
  onProfilePress,
  onSave,
}: {
  onBack: () => void;
  onProfilePress: () => void;
  onSave: () => void;
}) {
  const [name, setName] = useState("Joao Nonato");
  const [phone, setPhone] = useState("(92) 99123-4567");
  const [dailyRate, setDailyRate] = useState("R$ 150");
  const [neighborhood, setNeighborhood] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [about, setAbout] = useState("");
  const [hasProfilePhoto, setHasProfilePhoto] = useState(false);
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
    phone: false,
    startTime: false,
    street: false,
  });
  const [specialties, setSpecialties] = useState<string[]>([
    "Pedreiro",
    "Pintor",
  ]);
  const [availableDays, setAvailableDays] = useState<string[]>([
    "S",
    "Q1",
    "Q2",
    "Sx",
    "Sa",
  ]);

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

  const handleSave = () => {
    setSubmitted(true);

    if (hasErrors) {
      return;
    }

    onSave();
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
              {hasProfilePhoto ? (
                <Text className="text-2xl font-bold text-primary">JN</Text>
              ) : (
                <Ionicons name="person" size={46} color="#b94b50" />
              )}
            </View>
            <Pressable
              onPress={() => setHasProfilePhoto((current) => !current)}
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
            <View className="items-end">
              <Pressable
                onPress={() =>
                  setAbout(
                    "Texto gerado por audio simulado: profissional com experiencia em obras residenciais, pintura, reparos e acabamento.",
                  )
                }
                className="h-10 w-10 items-center justify-center rounded-full bg-[#f7e8e9]"
                accessibilityRole="button"
                accessibilityLabel="Gravar audio"
              >
                <Ionicons name="mic-outline" size={18} color="#b94b50" />
              </Pressable>
            </View>
          </View>
        </SetupSection>

        <Pressable
          onPress={handleSave}
          className="mb-6 min-h-[56px] items-center justify-center rounded-[18px] bg-primary px-6"
          accessibilityRole="button"
        >
          <Text className="text-base font-bold text-white">Salvar Perfil</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
