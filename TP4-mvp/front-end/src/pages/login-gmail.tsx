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

export function GoogleSignInScreen({ onBack }: { onBack: () => void }) {
  return (
    <View className="min-h-[812px] w-full max-w-[480px] bg-background">
      <LinearGradient
        colors={["#f9d6d6", "#fce8e8", "#fce8e8"]}
        locations={[0, 0.5, 1]}
        start={{ x: 0.08, y: 0 }}
        end={{ x: 0.95, y: 1 }}
        className="absolute bottom-0 left-0 right-0 top-0"
      />

      <View className="z-10 px-5 pt-12">
        <Pressable
          onPress={onBack}
          className="h-10 w-10 items-center justify-center rounded-[16px] bg-card shadow-sm"
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Ionicons name="chevron-back" size={22} color="#111111" />
        </Pressable>
      </View>

      <View className="z-10 items-center px-6 pb-8 pt-6">
        <View className="mb-5 h-20 w-20 items-center justify-center rounded-[16px] bg-card shadow-sm">
          <Text className="text-[40px] font-bold text-[#4285F4]">G</Text>
        </View>
        <Text className="mb-2 text-center text-[30px] font-bold leading-9 text-[#111111]">
          Entrar com Google
        </Text>
        <Text className="text-center text-base leading-7 text-[#888888]">
          Escolha uma conta do Google para continuar no app.
        </Text>
      </View>

      <View className="z-10 mx-4 flex-1 overflow-hidden rounded-[24px] bg-card">
        <View className="px-5 pt-5">
          <Text className="mb-3 text-xs font-semibold uppercase tracking-[1.6px] text-[#888888]">
            Selecione uma conta
          </Text>
          <AccountRow
            selected
            name="Maria da Silva"
            email="maria.silva@gmail.com"
            avatar="https://storage.googleapis.com/banani-avatars/avatar/female/25-35/Hispanic/0"
          />
          <AccountRow
            name="Maria Silva"
            email="m.silva.work@gmail.com"
            avatar="https://storage.googleapis.com/banani-avatars/avatar/female/25-35/Hispanic/1"
          />
          <AccountRow name="Usar outra conta" />

          <View className="mb-4 flex-row items-center gap-3">
            <View className="h-px flex-1 bg-input-border" />
            <Text className="text-xs text-[#888888]">
              permissoes solicitadas
            </Text>
            <View className="h-px flex-1 bg-input-border" />
          </View>

          <View className="mb-5 rounded-[16px] border border-input-border px-4 py-4">
            <Text className="mb-3 text-sm font-semibold text-foreground">
              O app tera acesso a:
            </Text>
            <PermissionItem icon="person-outline" label="Nome e foto de perfil" />
            <PermissionItem icon="mail-outline" label="Endereco de e-mail" />
            <PermissionItem
              icon="shield-checkmark-outline"
              label="Verificacao de identidade segura"
            />
          </View>

          <Pressable
            className="mb-5 min-h-[56px] flex-row items-center justify-center gap-2 rounded-[16px] bg-[#c0392b] px-6"
            accessibilityRole="button"
          >
            <Text className="text-lg font-bold text-white">G</Text>
            <Text className="text-base font-semibold text-white">
              Continuar com Google
            </Text>
          </Pressable>
        </View>
      </View>

      <View className="z-10 px-6 py-5">
        <Text className="text-center text-xs leading-5 text-[#888888]">
          Ao continuar, voce concorda com os{" "}
          <Text className="font-medium text-primary">Termos de Servico</Text> e
          a{" "}
          <Text className="font-medium text-primary">
            Politica de Privacidade
          </Text>{" "}
          do Google.
        </Text>
      </View>
    </View>
  );
}

