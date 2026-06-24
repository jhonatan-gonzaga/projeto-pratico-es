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

export function LoginScreen({
  onCreateAccount,
  onGoogle,
  onPhone,
  onSuccess,
}: {
  onCreateAccount: () => void;
  onGoogle: () => void;
  onPhone: () => void;
  onSuccess: () => void;
}) {
  const [email, setEmail] = useState("joao.silva@email.com");
  const [password, setPassword] = useState("conecta123");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const emailIsValid = isValidEmail(email);
  const passwordIsValid = isValidPassword(password);
  const loginIsValid = emailIsValid && passwordIsValid;

  return (
    <View className="relative min-h-[812px] w-full max-w-[480px] overflow-hidden bg-background">
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

      <View className="z-10 items-center gap-4 px-6 pb-7 pt-[52px]">
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

        <Pressable className="-mt-1 self-end" accessibilityRole="button">
          <Text className="text-[13px] font-semibold text-primary">
            Esqueci minha senha
          </Text>
        </Pressable>

        <Pressable
          disabled={!loginIsValid}
          onPress={onSuccess}
          className={`min-h-[58px] flex-row items-center justify-center gap-2.5 rounded-full px-6 shadow-lg shadow-primary/40 ${
            loginIsValid ? "bg-primary" : "bg-[#d7a0a3]"
          }`}
          accessibilityRole="button"
        >
          <Text className="text-base font-bold text-white">Entrar</Text>
          <Ionicons name="arrow-forward" size={18} color="#ffffff" />
        </Pressable>

        <Divider />
        <SocialButtons onGoogle={onGoogle} onPhone={onPhone} />
      </View>

      <View className="z-10 items-center gap-2.5 px-6 pb-7 pt-5">
        <Pressable onPress={onCreateAccount} accessibilityRole="button">
          <Text className="text-center text-[15px] text-foreground">
            Nao tem uma conta?{" "}
            <Text className="font-bold text-primary">Criar conta</Text>
          </Text>
        </Pressable>
        <Text className="text-center text-xs leading-5 text-muted-foreground">
          Ao entrar, voce concorda com nossos{" "}
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

