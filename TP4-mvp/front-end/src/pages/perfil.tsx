import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";

import {
  ProfileInfoField,
} from "../components/app-components";
import type { ValidationStatus } from "../components/app-components";
import {
  formatBRPhone,
  isValidEmail,
  isValidName,
  isValidPhone,
} from "../services/validators";
import { ApiError, api } from "../services/api";
import { pickAndUploadImage } from "../services/image-upload";

const logo = require("../../assets/logotipo.png");

const validationStatus = (
  isTouched: boolean,
  isValid: boolean,
): ValidationStatus => {
  if (!isTouched) {
    return "default";
  }

  return isValid ? "valid" : "error";
};

export function AccountProfileScreen({
  onBack,
  onDeleteAccount,
  onSave,
  onSignOut,
}: {
  onBack: () => void;
  onDeleteAccount: () => void;
  onSave: () => void;
  onSignOut: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasProfilePhoto, setHasProfilePhoto] = useState(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    name: false,
    phone: false,
  });

  const errors = {
    name: isValidName(name)
      ? undefined
      : "Informe nome e sobrenome, com pelo menos 2 letras em cada parte.",
    phone: isValidPhone(phone)
      ? undefined
      : "Informe um telefone valido com DDD e 11 digitos.",
    email: isValidEmail(email) ? undefined : "Informe um email valido.",
  };
  const shouldShow = (field: keyof typeof touched) => submitted || touched[field];
  const fieldStatus = (field: keyof typeof touched, isValid: boolean) =>
    validationStatus(shouldShow(field), isValid);
  const fieldError = (field: keyof typeof touched) =>
    shouldShow(field) ? errors[field] : undefined;

  useEffect(() => {
    api.me()
      .then((user) => {
        setName(user.name);
        setPhone(user.phone ?? "");
        setEmail(user.email);
        setProfilePhotoUrl(user.avatarUrl ?? null);
        setHasProfilePhoto(Boolean(user.avatarUrl));
      })
      .catch(() => undefined);
  }, []);

  const handleSave = async () => {
    setSubmitted(true);

    if (Object.values(errors).some(Boolean) || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await api.updateMe({ name, phone, email, avatarUrl: profilePhotoUrl ?? undefined });
      onSave();
    } catch (error) {
      setSubmitError(
        error instanceof ApiError
          ? error.message
          : "Nao foi possivel salvar os dados.",
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
        setHasProfilePhoto(true);
      }
    } catch (error) {
      setPhotoError(
        error instanceof Error ? error.message : "Nao foi possivel enviar a foto.",
      );
    }
  };

  return (
    <View className="min-h-[812px] w-full max-w-[480px] overflow-hidden bg-background">
      <LinearGradient
        colors={["#f9d6d6", "#fbf6f7", "#fbf6f7"]}
        locations={[0, 0.4, 1]}
        start={{ x: 0.12, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        className="absolute bottom-0 left-0 right-0 top-0"
      />

      <View className="z-10 flex-row items-center justify-between px-5 pb-4 pt-12">
        <Pressable
          onPress={onBack}
          className="h-9 w-9 items-center justify-center"
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={22} color="#0f1720" />
        </Pressable>

        <Image
          source={logo}
          className="h-10 w-[150px]"
          resizeMode="contain"
          accessibilityLabel="Conecta Obras Itacoatiara"
        />

        <View className="w-9" />
      </View>

      <View className="z-10 items-center pb-6 pt-4">
        <View className="relative mb-3">
          <View className="h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-card bg-[#f7e8e9]">
            {profilePhotoUrl ? (
              <Image
                source={{ uri: profilePhotoUrl }}
                className="h-full w-full"
                resizeMode="cover"
              />
            ) : (
              <Ionicons name="person" size={46} color="#b94b50" />
            )}
          </View>
          <Pressable
            onPress={handlePickProfilePhoto}
            className="absolute bottom-0 right-0 h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-primary"
            accessibilityRole="button"
            accessibilityLabel="Trocar foto de perfil"
          >
            <Ionicons name="camera" size={14} color="#ffffff" />
          </Pressable>
        </View>
        <Text className="text-sm font-semibold text-primary">
          Trocar foto de perfil
        </Text>
        {photoError ? (
          <Text className="mt-2 text-center text-xs font-semibold text-primary">
            {photoError}
          </Text>
        ) : null}
      </View>

      <View className="z-10 mx-4 rounded-[24px] bg-card px-5 pb-6 pt-6">
        <ProfileInfoField
          label="Nome completo"
          icon="person-outline"
          value={name}
          onBlur={() => setTouched((current) => ({ ...current, name: true }))}
          onChangeText={setName}
          autoComplete="name"
          status={fieldStatus("name", isValidName(name))}
          helperText={fieldError("name")}
        />
        <ProfileInfoField
          label="Telefone"
          icon="call-outline"
          value={phone}
          onBlur={() => setTouched((current) => ({ ...current, phone: true }))}
          onChangeText={(value) => setPhone(formatBRPhone(value))}
          keyboardType="phone-pad"
          autoComplete="tel"
          status={fieldStatus("phone", isValidPhone(phone))}
          helperText={fieldError("phone")}
        />
        <ProfileInfoField
          active
          label="Email"
          icon="mail-outline"
          value={email}
          onBlur={() => setTouched((current) => ({ ...current, email: true }))}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoComplete="email"
          status={fieldStatus("email", isValidEmail(email))}
          helperText={fieldError("email")}
        />

        <Pressable
          onPress={handleSave}
          disabled={isSubmitting}
          className="mt-4 min-h-[56px] flex-row items-center justify-center gap-2 rounded-[16px] bg-primary px-6"
          accessibilityRole="button"
        >
          <Text className="text-base font-semibold text-white">
            {isSubmitting ? "Salvando..." : "Salvar alteracoes"}
          </Text>
          <Ionicons name="checkmark" size={18} color="#ffffff" />
        </Pressable>
        {submitError ? (
          <Text className="mt-3 text-center text-xs font-semibold text-primary">
            {submitError}
          </Text>
        ) : null}
      </View>

      <View className="z-10 items-center gap-3 px-5 py-6">
        <Pressable accessibilityRole="button">
          <Text className="text-sm text-muted-foreground">Alterar senha</Text>
        </Pressable>

        <Pressable
          onPress={onSignOut}
          className="mt-1 min-h-[48px] w-full flex-row items-center justify-center gap-2 rounded-[16px] border border-input-border bg-card px-6"
          accessibilityRole="button"
        >
          <Ionicons name="log-out-outline" size={18} color="#0f1720" />
          <Text className="text-base font-semibold text-foreground">
            Sair da conta
          </Text>
        </Pressable>

        {confirmingDelete ? (
          <View className="w-full gap-3 rounded-[16px] border border-[#f2cdd0] bg-[#fff7f7] p-4">
            <Text className="text-center text-sm leading-5 text-muted-foreground">
              Sua conta sera excluida. Para continuar usando o app, faca um novo
              cadastro.
            </Text>
            <View className="flex-row gap-2">
              <Pressable
                onPress={() => setConfirmingDelete(false)}
                className="min-h-[44px] flex-1 items-center justify-center rounded-[12px] border border-input-border bg-card"
                accessibilityRole="button"
              >
                <Text className="text-sm font-semibold text-foreground">
                  Cancelar
                </Text>
              </Pressable>
              <Pressable
                onPress={onDeleteAccount}
                className="min-h-[44px] flex-1 items-center justify-center rounded-[12px] bg-primary"
                accessibilityRole="button"
              >
                <Text className="text-sm font-semibold text-white">
                  Excluir
                </Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <Pressable
            onPress={() => setConfirmingDelete(true)}
            accessibilityRole="button"
          >
            <Text className="text-sm font-medium text-primary">Excluir conta</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
