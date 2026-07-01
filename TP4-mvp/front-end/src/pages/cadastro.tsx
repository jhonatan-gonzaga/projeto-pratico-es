import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";

import {
  BrandLogo,
  Field,
} from "../components/app-components";
import type { ValidationStatus } from "../components/app-components";
import {
  formatBRPhone,
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidPhone,
} from "../services/validators";
import { ApiError, api } from "../services/api";

const validationStatus = (
  isTouched: boolean,
  isValid: boolean,
): ValidationStatus => {
  if (!isTouched) {
    return "default";
  }

  return isValid ? "valid" : "error";
};

export function SignupScreen({
  onLogin,
  onOpenPrivacy,
  onOpenTerms,
  onSuccess,
}: {
  onLogin: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onSuccess: () => void;
}) {
  const { height } = useWindowDimensions();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
    password: false,
  });

  const nameIsValid = isValidName(name);
  const phoneIsValid = isValidPhone(phone);
  const emailIsValid = isValidEmail(email);
  const passwordIsValid = isValidPassword(password);
  const signupIsValid =
    nameIsValid && phoneIsValid && emailIsValid && passwordIsValid;

  const handleSignup = async () => {
    if (!signupIsValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await api.register({
        name,
        phone,
        email,
        password,
        role: "CLIENTE",
      });
      onSuccess();
    } catch (error) {
      setSubmitError(
        error instanceof ApiError
          ? error.message
          : "Nao foi possivel cadastrar agora.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView
      className="w-full max-w-[480px] bg-background"
      contentContainerStyle={{ minHeight: height }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View
        className="relative w-full overflow-hidden bg-background"
        style={{ minHeight: height }}
      >
      <View className="absolute -left-16 -top-20 h-[320px] w-[320px] rounded-full bg-[#f5c0c2] opacity-50" />
      <View className="absolute -right-20 -top-10 h-[220px] w-[220px] rounded-full bg-[#fbd3d5] opacity-60" />
      <View className="absolute -bottom-16 -right-16 h-[260px] w-[260px] rounded-full bg-[#f5c0c2] opacity-30" />

      <View className="z-10 items-center gap-3.5 px-6 pb-6 pt-10 sm:pt-[48px]">
        <BrandLogo />
        <View className="items-center gap-1.5">
          <Text className="text-center text-[30px] font-extrabold leading-9 text-foreground">
            Criar conta
          </Text>
          <Text className="max-w-[240px] text-center text-[15px] leading-6 text-muted-foreground">
            Cadastre-se para encontrar os melhores profissionais.
          </Text>
        </View>
      </View>

      <View className="z-10 mx-4 mt-1 gap-3 rounded-[24px] bg-card px-5 pb-5 pt-6 shadow-lg shadow-primary/10">
        <Field
          label="Nome completo"
          icon="person-outline"
          value={name}
          onBlur={() => setTouched((current) => ({ ...current, name: true }))}
          onChangeText={setName}
          autoComplete="name"
          placeholder="Maria da Silva"
          status={validationStatus(touched.name, nameIsValid)}
          helperText={
            touched.name && !nameIsValid
              ? "Informe nome e sobrenome."
              : undefined
          }
        />
        <Field
          label="Telefone"
          icon="call-outline"
          value={phone}
          onBlur={() => setTouched((current) => ({ ...current, phone: true }))}
          onChangeText={(value) => setPhone(formatBRPhone(value))}
          keyboardType="phone-pad"
          autoComplete="tel"
          placeholder="(11) 99999-9999"
          status={validationStatus(touched.phone, phoneIsValid)}
          helperText={
            touched.phone && !phoneIsValid
              ? "Digite DDD + numero, com 11 digitos."
              : undefined
          }
        />
        <Field
          label="Email"
          icon="mail-outline"
          value={email}
          onBlur={() => setTouched((current) => ({ ...current, email: true }))}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoComplete="email"
          placeholder="maria@email.com"
          active
          status={validationStatus(touched.email, emailIsValid)}
          helperText={
            touched.email && !emailIsValid
              ? "Digite um e-mail valido, exemplo: maria@gmail.com."
              : undefined
          }
        />
        <Field
          label="Senha"
          icon="lock-closed-outline"
          value={password}
          onBlur={() =>
            setTouched((current) => ({ ...current, password: true }))
          }
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          autoComplete="password"
          placeholder="Sua senha"
          status={validationStatus(touched.password, passwordIsValid)}
          helperText={
            touched.password && !passwordIsValid
              ? "Use 8 ou mais caracteres com letras e numeros."
              : undefined
          }
          rightAction={
            <Pressable
              onPress={() => setIsPasswordVisible((current) => !current)}
              hitSlop={10}
              accessibilityRole="button"
              accessibilityLabel={
                isPasswordVisible ? "Ocultar senha" : "Mostrar senha"
              }
            >
              <Ionicons
                name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#7a6568"
              />
            </Pressable>
          }
        />

        <Pressable
          disabled={!signupIsValid || isSubmitting}
          onPress={handleSignup}
          className={`mt-1 min-h-[56px] flex-row items-center justify-center gap-2 rounded-full px-6 shadow-lg shadow-primary/40 ${
            signupIsValid && !isSubmitting ? "bg-primary" : "bg-[#d7a0a3]"
          }`}
          accessibilityRole="button"
        >
          <Text className="text-base font-bold text-white">
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#ffffff" />
        </Pressable>

        {submitError ? (
          <Text className="text-center text-xs font-semibold text-primary">
            {submitError}
          </Text>
        ) : null}
      </View>

      <View className="z-10 items-center gap-2.5 px-6 pb-8 pt-[18px]">
        <Pressable onPress={onLogin} accessibilityRole="button">
          <Text className="text-center text-[15px] text-muted-foreground">
            Ja tem uma conta?{" "}
            <Text className="font-bold text-primary">Entrar</Text>
          </Text>
        </Pressable>
        <Text className="text-center text-xs leading-5 text-muted-foreground">
          Ao cadastrar, voce concorda com nossos
        </Text>
        <View className="flex-row flex-wrap items-center justify-center gap-x-1">
          <Pressable onPress={onOpenTerms} accessibilityRole="button">
            <Text className="text-xs font-semibold text-primary">Termos de Uso</Text>
          </Pressable>
          <Text className="text-xs text-muted-foreground">e</Text>
          <Pressable onPress={onOpenPrivacy} accessibilityRole="button">
            <Text className="text-xs font-semibold text-primary">
              Politica de Privacidade
            </Text>
          </Pressable>
          <Text className="text-xs text-muted-foreground">.</Text>
        </View>
        <Text className="text-center text-xs leading-5 text-muted-foreground">
          Versao 1.0.0
        </Text>
      </View>
      </View>
    </ScrollView>
  );
}
