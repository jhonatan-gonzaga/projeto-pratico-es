import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, ScrollView, Text, useWindowDimensions, View } from "react-native";

import {
  BrandLogo,
  Field,
} from "../components/app-components";
import type { ValidationStatus } from "../components/app-components";
import {
  isValidEmail,
  isValidPassword,
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

export function LoginScreen({
  onCreateAccount,
  onOpenPrivacy,
  onOpenTerms,
  onSuccess,
}: {
  onCreateAccount: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  onSuccess: () => void;
}) {
  const { height } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotEmail, setForgotEmail] = useState("");
  const [temporaryPassword, setTemporaryPassword] = useState<string | null>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRecoveringPassword, setIsRecoveringPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [forgotError, setForgotError] = useState<string | null>(null);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const emailIsValid = isValidEmail(email);
  const passwordIsValid = isValidPassword(password);
  const loginIsValid = emailIsValid && passwordIsValid;

  const handleLogin = async () => {
    if (!loginIsValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await api.login(email, password);
      onSuccess();
    } catch (error) {
      setSubmitError(
        error instanceof ApiError
          ? error.message
          : "Nao foi possivel entrar agora.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleForgotPassword = async () => {
    if (!isValidEmail(forgotEmail) || isRecoveringPassword) {
      setForgotError("Informe o e-mail cadastrado.");
      return;
    }

    setIsRecoveringPassword(true);
    setForgotError(null);
    setTemporaryPassword(null);

    try {
      const response = await api.forgotPassword(forgotEmail);
      setTemporaryPassword(response.temporaryPassword);
      setEmail(forgotEmail);
      setPassword(response.temporaryPassword);
    } catch (error) {
      setForgotError(
        error instanceof ApiError
          ? error.message
          : "Nao foi possivel recuperar a senha.",
      );
    } finally {
      setIsRecoveringPassword(false);
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
      <LinearGradient
        colors={["#fce8e9", "#fbd4d6", "#fbf6f7"]}
        locations={[0, 0.4, 1]}
        start={{ x: 0.08, y: 0 }}
        end={{ x: 0.95, y: 1 }}
        className="absolute left-0 right-0 top-0 h-[380px]"
      />
      <View className="absolute -left-20 -top-16 h-[280px] w-[280px] rounded-full bg-[#f5bfc2] opacity-40" />
      <View className="absolute -right-16 top-5 h-[200px] w-[200px] rounded-full bg-[#fbd2d4] opacity-50" />
      <View className="absolute -bottom-10 -left-10 h-[220px] w-[220px] rounded-full bg-[#fce8e9] opacity-70" />

      <View className="z-10 items-center gap-4 px-6 pb-7 pt-10 sm:pt-[52px]">
        <BrandLogo />
        <View className="items-center gap-1.5">
          <Text className="text-center text-[28px] font-extrabold leading-8 text-foreground">
            Bem-vindo de volta
          </Text>
          <Text className="max-w-[270px] text-center text-[15px] leading-6 text-muted-foreground">
            Entre na sua conta para encontrar os melhores profissionais.
          </Text>
        </View>
      </View>

      <View className="z-10 mx-4 gap-3.5 rounded-[24px] bg-card px-5 pb-5 pt-6 shadow-lg shadow-primary/10">
        <View className="gap-2.5">
          <Field
            label="Email"
            icon="person-outline"
            value={email}
            onBlur={() => setTouched((current) => ({ ...current, email: true }))}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoComplete="email"
            placeholder="seu@email.com"
            status={validationStatus(touched.email, emailIsValid)}
            helperText={
              touched.email && !emailIsValid
                ? "Digite um e-mail completo, exemplo: joao.silva@gmail.com."
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
                  size={22}
                  color="#7a6568"
                />
              </Pressable>
            }
          />
        </View>

        <Pressable
          onPress={() => setShowForgotPassword((current) => !current)}
          className="-mt-1 self-end"
          accessibilityRole="button"
        >
          <Text className="text-[13px] font-semibold text-primary">
            Esqueci minha senha
          </Text>
        </Pressable>

        {showForgotPassword ? (
          <View className="gap-3 rounded-[16px] border border-input-border bg-background p-4">
            <Field
              label="E-mail cadastrado"
              icon="mail-outline"
              value={forgotEmail}
              onChangeText={setForgotEmail}
              keyboardType="email-address"
              autoComplete="email"
              placeholder="seu@email.com"
              status={forgotEmail ? validationStatus(true, isValidEmail(forgotEmail)) : "default"}
              helperText={
                forgotEmail && !isValidEmail(forgotEmail)
                  ? "Digite um e-mail valido."
                  : undefined
              }
            />
            <Pressable
              onPress={handleForgotPassword}
              disabled={isRecoveringPassword}
              className="min-h-[46px] items-center justify-center rounded-[14px] bg-primary px-4"
              accessibilityRole="button"
            >
              <Text className="text-sm font-bold text-white">
                {isRecoveringPassword ? "Gerando..." : "Gerar senha temporaria"}
              </Text>
            </Pressable>
            {temporaryPassword ? (
              <Text className="text-xs leading-5 text-muted-foreground">
                Senha temporaria:{" "}
                <Text className="font-bold text-primary">{temporaryPassword}</Text>
              </Text>
            ) : null}
            {forgotError ? (
              <Text className="text-xs font-semibold text-primary">{forgotError}</Text>
            ) : null}
          </View>
        ) : null}

        <Pressable
          disabled={!loginIsValid || isSubmitting}
          onPress={handleLogin}
          className={`min-h-[58px] flex-row items-center justify-center gap-2.5 rounded-full px-6 shadow-lg shadow-primary/40 ${
            loginIsValid && !isSubmitting ? "bg-primary" : "bg-[#d7a0a3]"
          }`}
          accessibilityRole="button"
        >
          <Text className="text-base font-bold text-white">
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Text>
          <Ionicons name="arrow-forward" size={18} color="#ffffff" />
        </Pressable>

        {submitError ? (
          <Text className="text-center text-xs font-semibold text-primary">
            {submitError}
          </Text>
        ) : null}
      </View>

      <View className="z-10 items-center gap-2.5 px-6 pb-8 pt-5">
        <Pressable onPress={onCreateAccount} accessibilityRole="button">
          <Text className="text-center text-[15px] text-foreground">
            Nao tem uma conta?{" "}
            <Text className="font-bold text-primary">Criar conta</Text>
          </Text>
        </Pressable>
        <Text className="text-center text-xs leading-5 text-muted-foreground">
          Ao entrar, voce concorda com nossos
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
