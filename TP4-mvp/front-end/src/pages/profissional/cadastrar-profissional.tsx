import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { professionalServices, projectItems, serviceRequests } from "../../components/profissional/data";
import { formatBRPhone } from "../../components/profissional/utils";
import type { ProfessionalArea, ProfessionalTab } from "../../components/profissional/types";
import { validateProfessionalProfile } from "../../services/validators";
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

  const handleSave = () => {
    const validation = validateProfessionalProfile({
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

    if (!validation.isValid) {
      Alert.alert("Revise os dados", validation.message);
      return;
    }

    onSave();
  };

  return (
    <View className="h-full w-full max-w-[480px] self-center bg-background">
      <ProjectHeader onBack={onBack} onProfilePress={onProfilePress} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-7 px-5 pb-[120px] pt-3"
        keyboardShouldPersistTaps="handled"
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
          <SetupTextField value={name} onChangeText={setName} />
        </SetupSection>

        <SetupSection label="Telefone">
          <SetupTextField
            value={phone}
            onChangeText={(value) => setPhone(formatBRPhone(value))}
            keyboardType="phone-pad"
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
        </SetupSection>

        <SetupSection label="Horario de Atendimento">
          <View className="flex-row gap-3">
            <View className="flex-1 gap-2">
              <Text className="text-[13px] font-semibold text-muted-foreground">
                Das
              </Text>
              <SetupTextField value={startTime} onChangeText={setStartTime} />
            </View>
            <View className="flex-1 gap-2">
              <Text className="text-[13px] font-semibold text-muted-foreground">
                Ate
              </Text>
              <SetupTextField value={endTime} onChangeText={setEndTime} />
            </View>
          </View>
        </SetupSection>

        <SetupSection label="Valor da Diaria">
          <SetupTextField
            value={dailyRate}
            onChangeText={setDailyRate}
            keyboardType="numeric"
          />
        </SetupSection>

        <SetupSection label="Localizacao">
          <View className="gap-2.5">
            <SetupTextField
              icon="map-outline"
              value={neighborhood}
              onChangeText={setNeighborhood}
              placeholder="Bairro"
            />
            <View className="flex-row gap-2.5">
              <View className="flex-[2]">
                <SetupTextField
                  icon="navigate-outline"
                  value={street}
                  onChangeText={setStreet}
                  placeholder="Rua"
                />
              </View>
              <View className="flex-1">
                <SetupTextField
                  icon="keypad-outline"
                  value={number}
                  onChangeText={setNumber}
                  placeholder="No"
                />
              </View>
            </View>
          </View>
        </SetupSection>

        <SetupSection label="Sobre mim">
          <View className="gap-2">
            <SetupTextField
              value={about}
              onChangeText={setAbout}
              placeholder="Descreva sua experiencia e diferenciais..."
              multiline
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
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 border-t border-input-border bg-card px-5 pb-8 pt-4">
        <Pressable
          onPress={handleSave}
          className="min-h-[56px] items-center justify-center rounded-[18px] bg-primary px-6"
          accessibilityRole="button"
        >
          <Text className="text-base font-bold text-white">Salvar Perfil</Text>
        </Pressable>
      </View>
    </View>
  );
}
