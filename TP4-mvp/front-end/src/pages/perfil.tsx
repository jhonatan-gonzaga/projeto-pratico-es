import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, Image, Pressable, Text, TextInput, View } from "react-native";

import {
  AccountRow,
  BrandLogo,
  Divider,
  Field,
  PermissionItem,
  ProfileCard,
  ProfileInfoField,
  SocialButtons,
} from "../components/app-components";
import type { ValidationStatus } from "../components/app-components";
import {
  formatBRPhone,
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidPhone,
} from "../services/validators";

const logo = require("../../assets/logotipo.png");

type ProfileType = "cliente" | "profissional";

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
  const [name, setName] = useState("Maria da Silva");
  const [phone, setPhone] = useState("(11) 99999-9999");
  const [email, setEmail] = useState("maria@email.com");
  const [hasProfilePhoto, setHasProfilePhoto] = useState(false);

  const confirmDeleteAccount = () => {
    Alert.alert(
      "Excluir conta",
      "Sua conta sera excluida. Para continuar usando o app, faca um novo cadastro.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: onDeleteAccount,
        },
      ],
    );
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
            {hasProfilePhoto ? (
              <Text className="text-2xl font-bold text-primary">MS</Text>
            ) : (
              <Ionicons name="person" size={46} color="#b94b50" />
            )}
          </View>
          <Pressable
            onPress={() => setHasProfilePhoto((current) => !current)}
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
      </View>

      <View className="z-10 mx-4 rounded-[24px] bg-card px-5 pb-6 pt-6">
        <ProfileInfoField
          label="Nome completo"
          icon="person-outline"
          value={name}
          onChangeText={setName}
          autoComplete="name"
        />
        <ProfileInfoField
          label="Telefone"
          icon="call-outline"
          value={phone}
          onChangeText={(value) => setPhone(formatBRPhone(value))}
          keyboardType="phone-pad"
          autoComplete="tel"
        />
        <ProfileInfoField
          active
          label="Email"
          icon="mail-outline"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoComplete="email"
        />

        <Pressable
          onPress={onSave}
          className="mt-4 min-h-[56px] flex-row items-center justify-center gap-2 rounded-[16px] bg-primary px-6"
          accessibilityRole="button"
        >
          <Text className="text-base font-semibold text-white">
            Salvar alteracoes
          </Text>
          <Ionicons name="checkmark" size={18} color="#ffffff" />
        </Pressable>
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

        <Pressable onPress={confirmDeleteAccount} accessibilityRole="button">
          <Text className="text-sm font-medium text-primary">Excluir conta</Text>
        </Pressable>
      </View>
    </View>
  );
}
