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

export function PhoneVerificationScreen({ onBack }: { onBack: () => void }) {
  const [phone, setPhone] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const phoneIsValid = isValidPhone(phone);

  return (
    <View className="relative min-h-[812px] w-full max-w-[480px] overflow-hidden bg-background">
      <View className="absolute -left-16 -top-20 h-[320px] w-[320px] rounded-full bg-[#f5c0c2] opacity-50" />
      <View className="absolute -right-20 -top-10 h-[220px] w-[220px] rounded-full bg-[#fbd3d5] opacity-60" />
      <View className="absolute -bottom-16 -right-16 h-[260px] w-[260px] rounded-full bg-[#f5c0c2] opacity-30" />

      <View className="z-10 items-center gap-4 px-6 pb-5 pt-[48px]">
        <BrandLogo />
        <View className="items-center gap-1.5">
          <Text className="text-center text-[28px] font-extrabold leading-8 text-foreground">
            Verificar por SMS
          </Text>
          <Text className="max-w-[260px] text-center text-[15px] leading-6 text-muted-foreground">
            Enviaremos um codigo de verificacao por mensagem de texto para o
            seu numero.
          </Text>
        </View>
      </View>

      <View className="z-10 items-center px-6 pt-2">
        <View className="flex-row items-center gap-2.5 rounded-full bg-card px-[18px] py-2.5 shadow-lg shadow-primary/10">
          <View className="h-[34px] w-[34px] items-center justify-center rounded-full bg-primary">
            <Ionicons name="chatbox-outline" size={18} color="#ffffff" />
          </View>
          <View className="gap-0.5">
            <Text className="text-[13px] font-bold text-foreground">
              Codigo via SMS
            </Text>
            <Text className="text-[11px] text-muted-foreground">
              Entrega em ate 60 segundos
            </Text>
          </View>
        </View>
      </View>

      <View className="z-10 mx-4 mt-5 gap-3.5 rounded-[24px] bg-card px-5 pb-[22px] pt-6 shadow-lg shadow-primary/10">
        <View className="gap-1.5">
          <Text className="text-[13px] font-semibold text-muted-foreground">
            Numero de telefone
          </Text>
          <View
            className={`min-h-[54px] flex-row overflow-hidden rounded-[14px] border-[1.5px] ${
              phoneTouched
                ? phoneIsValid
                  ? "border-[#16a34a] bg-[#f7fff9]"
                  : "border-[#dc2626] bg-[#fff7f7]"
                : "border-primary bg-background"
            }`}
          >
            <Pressable
              className="flex-row items-center gap-1.5 border-r-[1.5px] border-input-border bg-card px-3"
              accessibilityRole="button"
              accessibilityLabel="Selecionar codigo do pais"
            >
              <Text className="text-sm font-semibold text-foreground">BR</Text>
              <Text className="text-sm font-semibold text-foreground">+55</Text>
              <Ionicons name="chevron-down" size={14} color="#7a6568" />
            </Pressable>
            <View className="flex-1 flex-row items-center gap-2 px-3.5 py-3.5">
              <Ionicons name="phone-portrait-outline" size={18} color="#b94b50" />
              <TextInput
                value={phone}
                onBlur={() => setPhoneTouched(true)}
                onChangeText={(value) => setPhone(formatBRPhone(value))}
                keyboardType="phone-pad"
                autoComplete="tel"
                className="min-h-[24px] flex-1 p-0 text-[15px] font-medium text-foreground"
                placeholder="(11) 99999-9999"
                placeholderTextColor="#c5adaf"
                accessibilityLabel="Numero de telefone"
              />
              {phoneTouched ? (
                <Ionicons
                  name={phoneIsValid ? "checkmark-circle" : "alert-circle"}
                  size={18}
                  color={phoneIsValid ? "#16a34a" : "#dc2626"}
                />
              ) : null}
            </View>
          </View>
          {phoneTouched && !phoneIsValid ? (
            <Text className="px-1 text-xs leading-4 text-[#dc2626]">
              Digite DDD + numero, com 11 digitos.
            </Text>
          ) : null}
        </View>

        <View className="flex-row items-start gap-2.5 rounded-[14px] border border-primary/10 bg-[#fff5f5] px-3.5 py-3">
          <Ionicons
            name="information-circle-outline"
            size={20}
            color="#b94b50"
          />
          <Text className="flex-1 text-[13px] leading-5 text-muted-foreground">
            Um SMS com o codigo de verificacao sera enviado para{" "}
            <Text className="font-semibold text-primary">{phone}</Text>. Tarifas
            de SMS podem ser aplicadas.
          </Text>
        </View>

        <Pressable
          disabled={!phoneIsValid}
          onPress={() => setPhoneTouched(true)}
          className={`min-h-[56px] flex-row items-center justify-center gap-2 rounded-full px-6 shadow-lg shadow-primary/40 ${
            phoneIsValid ? "bg-primary" : "bg-[#d7a0a3]"
          }`}
          accessibilityRole="button"
        >
          <Ionicons name="send-outline" size={18} color="#ffffff" />
          <Text className="text-base font-bold text-white">Enviar codigo</Text>
        </Pressable>

        <Pressable
          onPress={onBack}
          className="min-h-[52px] flex-row items-center justify-center gap-2 rounded-full border-[1.5px] border-input-border bg-transparent px-6"
          accessibilityRole="button"
        >
          <Ionicons name="arrow-back" size={16} color="#7a6568" />
          <Text className="text-[15px] font-semibold text-muted-foreground">
            Usar outro metodo
          </Text>
        </Pressable>
      </View>

      <View className="z-10 items-center gap-2.5 px-6 pb-7 pt-[18px]">
        <Pressable
          onPress={onBack}
          className="flex-row items-center gap-1"
          accessibilityRole="button"
        >
          <Ionicons name="chevron-back" size={14} color="#b94b50" />
          <Text className="text-center text-sm text-muted-foreground">
            Voltar para <Text className="font-semibold text-primary">Criar conta</Text>
          </Text>
        </Pressable>
        <Text className="text-center text-xs leading-5 text-muted-foreground">
          Ao continuar, voce concorda com nossos{" "}
          <Text className="font-semibold text-primary">Termos de Uso</Text> e{" "}
          <Text className="font-semibold text-primary">
            Politica de Privacidade
          </Text>
          .
        </Text>
      </View>
    </View>
  );
}
