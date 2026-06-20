import "./global.css";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const logo = require("../assets/logotipo.png");

type ReturnScreen = "login" | "signup";
type Screen = ReturnScreen | "phone" | "google" | "profileChoice" | "accountProfile";
type IconName = keyof typeof Ionicons.glyphMap;
type ValidationStatus = "default" | "valid" | "error";
type ProfileType = "cliente" | "profissional";

type FieldProps = {
  label: string;
  icon: IconName;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
  autoComplete?: "email" | "password" | "name" | "tel";
  secureTextEntry?: boolean;
  active?: boolean;
  helperText?: string;
  onBlur?: () => void;
  rightAction?: React.ReactNode;
  status?: ValidationStatus;
};

const onlyDigits = (value: string) => value.replace(/\D/g, "");

const formatBRPhone = (value: string) => {
  const digits = onlyDigits(value);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

const isValidName = (value: string) => {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  return parts.length >= 2 && parts.every((part) => part.length >= 2);
};

const isValidPhone = (value: string) => onlyDigits(value).length === 11;

const isValidPassword = (value: string) =>
  /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value);

const validationStatus = (
  isTouched: boolean,
  isValid: boolean,
): ValidationStatus => {
  if (!isTouched) {
    return "default";
  }

  return isValid ? "valid" : "error";
};

const statusClasses: Record<ValidationStatus, string> = {
  default: "border-input-border bg-background",
  valid: "border-[#16a34a] bg-[#f7fff9]",
  error: "border-[#dc2626] bg-[#fff7f7]",
};

function BrandLogo() {
  return (
    <View className="h-[76px] w-[284px] items-center justify-center rounded-[24px] bg-card px-4 shadow-lg shadow-primary/20">
      <Image
        source={logo}
        className="h-[58px] w-[217px]"
        resizeMode="contain"
        accessibilityLabel="Conecta Obras Itacoatiara"
      />
    </View>
  );
}

function Field({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  autoComplete,
  secureTextEntry,
  active,
  helperText,
  onBlur,
  rightAction,
  status = "default",
}: FieldProps) {
  const appliedStatus = status === "default" && active ? "active" : status;
  const containerClass =
    appliedStatus === "active"
      ? "border-primary bg-[#fff9f9]"
      : statusClasses[status];
  const isValidated = status === "valid" || status === "error";

  return (
    <View className="gap-1">
      <View
        className={`min-h-[62px] gap-1 rounded-[14px] border-[1.5px] px-3.5 py-2.5 ${containerClass}`}
      >
        <Text className="text-[10px] font-bold uppercase tracking-[0.7px] text-primary">
          {label}
        </Text>
        <View className="flex-row items-center gap-2.5">
          <Ionicons name={icon} size={17} color="#b94b50" />
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            autoCapitalize="none"
            autoComplete={autoComplete}
            secureTextEntry={secureTextEntry}
            className="min-h-[24px] flex-1 p-0 text-[15px] font-medium text-foreground"
            placeholder={placeholder}
            placeholderTextColor="#c5adaf"
            accessibilityLabel={label}
          />
          {rightAction}
          {isValidated ? (
            <Ionicons
              name={status === "valid" ? "checkmark-circle" : "alert-circle"}
              size={18}
              color={status === "valid" ? "#16a34a" : "#dc2626"}
            />
          ) : null}
        </View>
      </View>
      {helperText ? (
        <Text
          className={`px-1 text-xs leading-4 ${
            status === "error" ? "text-[#dc2626]" : "text-muted-foreground"
          }`}
        >
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}

function SocialButtons({
  onGoogle,
  onPhone,
}: {
  onGoogle: () => void;
  onPhone: () => void;
}) {
  return (
    <View className="flex-row gap-3">
      <Pressable
        onPress={onGoogle}
        className="min-h-[50px] flex-1 flex-row items-center justify-center gap-2 rounded-[14px] border-[1.5px] border-input-border bg-card px-3"
        accessibilityRole="button"
      >
        <Text className="text-lg font-extrabold text-[#4285F4]">G</Text>
        <Text className="text-[15px] font-semibold text-foreground">Google</Text>
      </Pressable>
      <Pressable
        onPress={onPhone}
        className="min-h-[50px] flex-1 flex-row items-center justify-center gap-2 rounded-[14px] border-[1.5px] border-input-border bg-card px-3"
        accessibilityRole="button"
      >
        <Ionicons name="call-outline" size={20} color="#b94b50" />
        <Text className="text-[15px] font-semibold text-foreground">
          Telefone
        </Text>
      </Pressable>
    </View>
  );
}

function Divider() {
  return (
    <View className="flex-row items-center gap-3">
      <View className="h-px flex-1 bg-input-border" />
      <Text className="text-xs text-muted-foreground">ou continue com</Text>
      <View className="h-px flex-1 bg-input-border" />
    </View>
  );
}

function LoginScreen({
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

function SignupScreen({
  onLogin,
  onGoogle,
  onPhone,
  onSuccess,
}: {
  onLogin: () => void;
  onGoogle: () => void;
  onPhone: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState("Maria da Silva");
  const [phone, setPhone] = useState("(11) 99999-9999");
  const [email, setEmail] = useState("maria@email.com");
  const [password, setPassword] = useState("conecta12");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
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

  return (
    <View className="relative min-h-[812px] w-full max-w-[480px] overflow-hidden bg-background">
      <View className="absolute -left-16 -top-20 h-[320px] w-[320px] rounded-full bg-[#f5c0c2] opacity-50" />
      <View className="absolute -right-20 -top-10 h-[220px] w-[220px] rounded-full bg-[#fbd3d5] opacity-60" />
      <View className="absolute -bottom-16 -right-16 h-[260px] w-[260px] rounded-full bg-[#f5c0c2] opacity-30" />

      <View className="z-10 items-center gap-3.5 px-6 pb-6 pt-[48px]">
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
          disabled={!signupIsValid}
          onPress={onSuccess}
          className={`mt-1 min-h-[56px] flex-row items-center justify-center gap-2 rounded-full px-6 shadow-lg shadow-primary/40 ${
            signupIsValid ? "bg-primary" : "bg-[#d7a0a3]"
          }`}
          accessibilityRole="button"
        >
          <Text className="text-base font-bold text-white">Cadastrar</Text>
          <Ionicons name="arrow-forward" size={18} color="#ffffff" />
        </Pressable>

        <Divider />
        <SocialButtons onGoogle={onGoogle} onPhone={onPhone} />
      </View>

      <View className="z-10 items-center gap-2.5 px-6 pb-6 pt-[18px]">
        <Pressable onPress={onLogin} accessibilityRole="button">
          <Text className="text-center text-[15px] text-muted-foreground">
            Ja tem uma conta?{" "}
            <Text className="font-bold text-primary">Entrar</Text>
          </Text>
        </Pressable>
        <Text className="text-center text-xs leading-5 text-muted-foreground">
          Ao cadastrar, voce concorda com nossos{" "}
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

function PhoneVerificationScreen({ onBack }: { onBack: () => void }) {
  const [phone, setPhone] = useState("(11) 99999-9999");
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

function AccountRow({
  avatar,
  email,
  name,
  selected,
}: {
  avatar?: string;
  email?: string;
  name: string;
  selected?: boolean;
}) {
  return (
    <Pressable
      className={`mb-3 min-h-[66px] flex-row items-center gap-3 rounded-[16px] border px-4 py-3 ${
        selected ? "border-primary" : "border-input-border"
      }`}
      accessibilityRole="button"
    >
      {avatar ? (
        <Image
          source={{ uri: avatar }}
          className="h-10 w-10 rounded-full"
          resizeMode="cover"
          accessibilityLabel={name}
        />
      ) : (
        <View className="h-10 w-10 items-center justify-center rounded-full bg-muted">
          <Ionicons name="add" size={22} color="#888888" />
        </View>
      )}
      <View className="min-w-0 flex-1">
        <Text className="text-base font-semibold leading-5 text-foreground">
          {name}
        </Text>
        {email ? (
          <Text className="text-sm text-muted-foreground">{email}</Text>
        ) : null}
      </View>
      {selected ? (
        <View className="h-8 w-8 items-center justify-center rounded-full bg-primary">
          <Ionicons name="checkmark" size={16} color="#ffffff" />
        </View>
      ) : null}
    </Pressable>
  );
}

function PermissionItem({
  icon,
  label,
}: {
  icon: IconName;
  label: string;
}) {
  return (
    <View className="flex-row items-center gap-3 py-2">
      <View className="h-8 w-8 items-center justify-center rounded-lg bg-[#fdeaea]">
        <Ionicons name={icon} size={16} color="#c0392b" />
      </View>
      <Text className="text-sm text-foreground">{label}</Text>
    </View>
  );
}

function GoogleSignInScreen({ onBack }: { onBack: () => void }) {
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

function ProfileCard({
  description,
  icon,
  label,
  selected,
  onPress,
}: {
  description: string;
  icon: IconName;
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`relative rounded-[24px] px-6 pb-8 pt-6 ${
        selected ? "border-2 border-primary bg-card" : "border border-input-border bg-card"
      }`}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
    >
      <View className="absolute right-4 top-4">
        {selected ? (
          <View className="h-6 w-6 items-center justify-center rounded-full bg-primary">
            <View className="h-2.5 w-2.5 rounded-full bg-white" />
          </View>
        ) : (
          <View className="h-6 w-6 rounded-full border-2 border-muted" />
        )}
      </View>

      <View className="mb-4 items-center">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-[#f7e8e9]">
          <Ionicons name={icon} size={28} color="#b94b50" />
        </View>
      </View>

      <Text className="mb-2 text-center text-xl font-bold text-foreground">
        {label}
      </Text>
      <Text className="text-center text-base leading-7 text-muted-foreground">
        {description}
      </Text>
    </Pressable>
  );
}

function ProfileChoiceScreen({
  onBack,
  onProfilePress,
}: {
  onBack: () => void;
  onProfilePress: () => void;
}) {
  const [selectedProfile, setSelectedProfile] = useState<ProfileType>("cliente");

  return (
    <View className="min-h-[812px] w-full max-w-[480px] bg-background">
      <View className="flex-row items-center justify-between px-5 pb-4 pt-12">
        <Pressable
          onPress={onBack}
          className="h-9 w-9 items-center justify-center"
          accessibilityRole="button"
          accessibilityLabel="Sair da escolha de perfil"
        >
          <Ionicons name="log-out-outline" size={22} color="#0f1720" />
        </Pressable>

        <Image
          source={logo}
          className="h-10 w-[150px]"
          resizeMode="contain"
          accessibilityLabel="Conecta Obras Itacoatiara"
        />

        <Pressable
          onPress={onProfilePress}
          className="h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-card"
          accessibilityRole="button"
          accessibilityLabel="Abrir perfil"
        >
          <Ionicons name="person" size={20} color="#b94b50" />
        </Pressable>
      </View>

      <View className="h-px bg-muted" />

      <View className="items-center px-5 pb-6 pt-8">
        <View className="mb-5 rounded-full bg-[#f7e8e9] px-5 py-2">
          <Text className="text-sm font-bold uppercase tracking-[1.6px] text-primary">
            Ola, bem-vindo(a)!
          </Text>
        </View>

        <Text className="mb-3 text-center text-3xl font-bold text-foreground">
          Informe o seu perfil
        </Text>
        <Text className="mb-8 text-center text-base leading-7 text-muted-foreground">
          Selecione o tipo de conta que melhor descreve voce para
          personalizarmos sua experiencia.
        </Text>

        <View
          className="w-full gap-4"
          accessibilityRole="radiogroup"
        >
          <ProfileCard
            label="Cliente"
            description="Busque por servicos e produtos locais"
            icon="person-outline"
            selected={selectedProfile === "cliente"}
            onPress={() => setSelectedProfile("cliente")}
          />
          <ProfileCard
            label="Profissional"
            description="Ofereca sua mao de obra e servicos"
            icon="color-palette-outline"
            selected={selectedProfile === "profissional"}
            onPress={() => setSelectedProfile("profissional")}
          />
        </View>
      </View>

      <View className="mt-auto px-5 pb-10">
        <Pressable
          className="min-h-[56px] items-center justify-center rounded-[24px] bg-primary px-6"
          accessibilityRole="button"
          accessibilityLabel={`Continuar como ${selectedProfile}`}
        >
          <Text className="text-base font-semibold text-white">Continuar</Text>
        </Pressable>
      </View>
    </View>
  );
}

function ProfileInfoField({
  active,
  autoComplete,
  icon,
  keyboardType = "default",
  label,
  onChangeText,
  value,
}: {
  active?: boolean;
  autoComplete?: "email" | "name" | "tel";
  icon: IconName;
  keyboardType?: "default" | "email-address" | "phone-pad";
  label: string;
  onChangeText: (value: string) => void;
  value: string;
}) {
  return (
    <View
      className={`mb-3 rounded-[16px] border px-4 pb-3 pt-3 ${
        active ? "border-primary" : "border-input-border"
      }`}
    >
      <Text className="mb-1 text-xs font-bold uppercase tracking-[1.6px] text-primary">
        {label}
      </Text>
      <View className="flex-row items-center gap-3">
        <Ionicons name={icon} size={16} color="#b94b50" />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoComplete={autoComplete}
          autoCapitalize={keyboardType === "email-address" ? "none" : "words"}
          className={`min-h-[28px] flex-1 p-0 text-base ${
            active ? "font-medium text-foreground" : "text-muted-foreground"
          }`}
          placeholderTextColor="#c5adaf"
          accessibilityLabel={label}
        />
      </View>
    </View>
  );
}

function AccountProfileScreen({
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
            <Ionicons name="person" size={46} color="#b94b50" />
          </View>
          <Pressable
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

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [previousScreen, setPreviousScreen] = useState<ReturnScreen>("signup");

  const openPhoneScreen = (from: ReturnScreen) => {
    setPreviousScreen(from);
    setScreen("phone");
  };

  const openGoogleScreen = (from: ReturnScreen) => {
    setPreviousScreen(from);
    setScreen("google");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          className="flex-1"
          contentContainerClassName="min-h-[812px] items-center"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {screen === "login" ? (
            <LoginScreen
              onCreateAccount={() => setScreen("signup")}
              onGoogle={() => openGoogleScreen("login")}
              onPhone={() => openPhoneScreen("login")}
              onSuccess={() => setScreen("profileChoice")}
            />
          ) : screen === "signup" ? (
            <SignupScreen
              onLogin={() => setScreen("login")}
              onGoogle={() => openGoogleScreen("signup")}
              onPhone={() => openPhoneScreen("signup")}
              onSuccess={() => setScreen("profileChoice")}
            />
          ) : screen === "phone" ? (
            <PhoneVerificationScreen onBack={() => setScreen(previousScreen)} />
          ) : screen === "profileChoice" ? (
            <ProfileChoiceScreen
              onBack={() => setScreen("login")}
              onProfilePress={() => setScreen("accountProfile")}
            />
          ) : screen === "accountProfile" ? (
            <AccountProfileScreen
              onBack={() => setScreen("profileChoice")}
              onSave={() => setScreen("profileChoice")}
              onSignOut={() => setScreen("login")}
              onDeleteAccount={() => setScreen("signup")}
            />
          ) : (
            <GoogleSignInScreen onBack={() => setScreen(previousScreen)} />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
