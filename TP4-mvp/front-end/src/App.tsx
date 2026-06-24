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
type Screen =
  | ReturnScreen
  | "phone"
  | "google"
  | "profileChoice"
  | "accountProfile"
  | "professionalSetup"
  | "professionalHome";
type IconName = keyof typeof Ionicons.glyphMap;
type ValidationStatus = "default" | "valid" | "error";
type ProfileType = "cliente" | "profissional";

type ServiceRequest = {
  title: string;
  location: string;
  date: string;
  description: string;
  price: string;
  negotiable?: boolean;
};

type ProfessionalTab = "requests" | "services";
type ProfessionalArea = "opportunities" | "projects" | "settings";
type ServiceStatus = "inProgress" | "completed" | "pending";

type ProfessionalService = {
  title: string;
  status: ServiceStatus;
  order: string;
  customer: string;
  price: string;
  date: string;
  time: string;
  address?: string;
  messageCount?: string;
  action?: string;
};

type ProjectItem = {
  title: string;
  location: string;
  image: string;
};

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
  onContinue,
  onProfilePress,
}: {
  onBack: () => void;
  onContinue: (profile: ProfileType) => void;
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
          onPress={() => onContinue(selectedProfile)}
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

function SetupTextField({
  icon,
  keyboardType = "default",
  multiline,
  onChangeText,
  placeholder,
  value,
}: {
  icon?: IconName;
  keyboardType?: "default" | "numeric" | "phone-pad";
  multiline?: boolean;
  onChangeText: (value: string) => void;
  placeholder?: string;
  value: string;
}) {
  return (
    <View
      className={`flex-row gap-2.5 rounded-[16px] border-[1.5px] border-input-border bg-card px-4 py-3 shadow-sm ${
        multiline ? "min-h-[100px] items-start" : "items-center"
      }`}
    >
      {icon ? <Ionicons name={icon} size={16} color="#b94b50" /> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        className={`flex-1 p-0 text-[15px] font-medium text-foreground ${
          multiline ? "min-h-[74px] text-top" : "min-h-[24px]"
        }`}
        placeholder={placeholder}
        placeholderTextColor="#b0b8c1"
        accessibilityLabel={placeholder}
      />
    </View>
  );
}

function SetupSection({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <View className="gap-2">
      <Text className="text-sm font-bold text-foreground">{label}</Text>
      {children}
    </View>
  );
}

function ChoiceChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full border-[1.5px] px-[18px] py-2.5 shadow-sm ${
        selected ? "border-primary bg-primary" : "border-input-border bg-card"
      }`}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Text
        className={`text-sm font-semibold ${
          selected ? "text-white" : "text-foreground"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function DayButton({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`h-10 w-10 items-center justify-center rounded-full border-[1.5px] shadow-sm ${
        selected ? "border-primary bg-primary" : "border-input-border bg-card"
      }`}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`Dia ${label}`}
    >
      <Text
        className={`text-[13px] font-bold ${
          selected ? "text-white" : "text-foreground"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const serviceRequests: ServiceRequest[] = [
  {
    title: "Pintura Residencial",
    location: "Centro",
    date: "04 de dez.",
    description:
      "Pintura completa de casa de 3 quartos, incluindo teto e paredes internas.",
    price: "R$ 1.800",
    negotiable: true,
  },
  {
    title: "Instalacao Eletrica",
    location: "Jauary",
    date: "05 de dez.",
    description:
      "Troca de fiacao e instalacao de novos pontos de energia em residencia.",
    price: "R$ 950",
    negotiable: true,
  },
  {
    title: "Montagem de Moveis",
    location: "Bela Vista",
    date: "06 de dez.",
    description:
      "Montagem de guarda-roupa, cama e mesa de cabeceira em apartamento.",
    price: "R$ 280",
  },
];

const professionalServices: ProfessionalService[] = [
  {
    title: "Pintura Residencial",
    status: "inProgress",
    order: "SRV-1029",
    customer: "Carla Mendes",
    price: "R$ 450",
    date: "04 Dez, 2023",
    time: "08:00 - 17:00",
    address: "Rua das Flores, 45 - Centro",
    messageCount: "3",
    action: "Finalizar Servico",
  },
  {
    title: "Instalacao Eletrica",
    status: "completed",
    order: "SRV-0984",
    customer: "Roberto Silva",
    price: "R$ 120",
    date: "28 Nov, 2023",
    time: "14:00 - 15:30",
  },
  {
    title: "Montagem de Moveis",
    status: "pending",
    order: "SRV-1041",
    customer: "Fernanda Costa",
    price: "R$ 280",
    date: "06 Dez, 2023",
    time: "10:00 - 12:30",
    address: "Av. Paulista, 820 - Bela Vista",
    action: "Cancelar",
  },
];

const statusMeta: Record<
  ServiceStatus,
  { label: string; bg: string; color: string }
> = {
  inProgress: {
    label: "Em Andamento",
    bg: "bg-[#e5effc]",
    color: "#2d6bbf",
  },
  completed: {
    label: "Concluido",
    bg: "bg-[#e8f5ee]",
    color: "#2e7d5c",
  },
  pending: {
    label: "Aguardando Aprovacao",
    bg: "bg-[#fdf3dc]",
    color: "#b07c18",
  },
};

const projectItems: ProjectItem[] = [
  {
    title: "Construcao de Residencia",
    location: "Centro",
    image:
      "https://storage.googleapis.com/banani-generated-images/generated-images/38608ed7-42db-41b0-a4fd-f573925de860.jpg",
  },
  {
    title: "Construcao de Comercial",
    location: "Centro",
    image:
      "https://storage.googleapis.com/banani-generated-images/generated-images/2258a051-4e89-4651-90cb-3b82da7d20ab.jpg",
  },
  {
    title: "Construcao de Muro",
    location: "Centro",
    image:
      "https://storage.googleapis.com/banani-generated-images/generated-images/295aaf2d-1944-4391-a5fd-688e289811c1.jpg",
  },
];

function ProfessionalHomeHeader({ onBack }: { onBack: () => void }) {
  return (
    <View className="flex-row items-center justify-between border-b border-input-border bg-background px-4 py-3">
      <Pressable
        onPress={onBack}
        className="h-9 w-9 items-center justify-center rounded-[12px] border border-input-border bg-card"
        accessibilityRole="button"
        accessibilityLabel="Voltar"
      >
        <Ionicons name="chevron-back" size={20} color="#0f1720" />
      </Pressable>

      <View className="flex-row items-center gap-2">
        <View className="h-9 w-9 items-center justify-center overflow-hidden rounded-[8px] bg-primary">
          <Image
            source={logo}
            className="h-full w-full"
            resizeMode="cover"
            accessibilityLabel="Logo Conecta Obras"
          />
        </View>
        <View>
          <Text className="text-xs font-bold leading-4 text-primary">
            CONECTA OBRAS
          </Text>
          <Text className="text-xs font-bold leading-4 text-primary">
            ITACOATIARA
          </Text>
        </View>
      </View>

      <View className="h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-primary bg-[#f7e8e9]">
        <Ionicons name="person" size={22} color="#b94b50" />
      </View>
    </View>
  );
}

function ProfessionalTabToggle({
  activeTab,
  onChangeTab,
}: {
  activeTab: ProfessionalTab;
  onChangeTab: (tab: ProfessionalTab) => void;
}) {
  return (
    <View className="mx-4 my-4 flex-row rounded-[16px] border border-input-border bg-card p-1">
      <Pressable
        onPress={() => onChangeTab("requests")}
        className={`min-h-[38px] flex-1 flex-row items-center justify-center gap-2 rounded-[12px] px-3 ${
          activeTab === "requests" ? "bg-primary" : "bg-transparent"
        }`}
        accessibilityRole="tab"
        accessibilityState={{ selected: activeTab === "requests" }}
      >
        <Text
          className={`text-sm font-semibold ${
            activeTab === "requests" ? "text-white" : "text-muted-foreground"
          }`}
        >
          Novos Pedidos
        </Text>
        {activeTab === "requests" ? (
          <View className="h-5 w-5 items-center justify-center rounded-full bg-white">
            <Text className="text-xs font-bold text-primary">2</Text>
          </View>
        ) : null}
      </Pressable>
      <Pressable
        onPress={() => onChangeTab("services")}
        className={`min-h-[38px] flex-1 items-center justify-center rounded-[12px] px-3 ${
          activeTab === "services" ? "bg-primary" : "bg-transparent"
        }`}
        accessibilityRole="tab"
        accessibilityState={{ selected: activeTab === "services" }}
      >
        <Text
          className={`text-sm font-semibold ${
            activeTab === "services" ? "text-white" : "text-muted-foreground"
          }`}
        >
          Meus Servicos
        </Text>
      </Pressable>
    </View>
  );
}

function RequestMetaPill({
  icon,
  label,
}: {
  icon: IconName;
  label: string;
}) {
  return (
    <View className="flex-row items-center gap-1 rounded-full bg-[#f7eced] px-3 py-1.5">
      <Ionicons name={icon} size={13} color="#b94b50" />
      <Text className="text-xs font-semibold text-foreground">{label}</Text>
    </View>
  );
}

function NewRequestCard({
  onDetails,
  request,
}: {
  onDetails: () => void;
  request: ServiceRequest;
}) {
  return (
    <View className="mx-4 mb-4 rounded-[8px] bg-card p-4 shadow-md shadow-black/10">
      <Text className="mb-3 text-xl font-bold leading-6 text-foreground">
        {request.title}
      </Text>

      <View className="mb-3 flex-row flex-wrap gap-2">
        <RequestMetaPill icon="location" label={request.location} />
        <RequestMetaPill icon="calendar" label={request.date} />
      </View>

      <Text className="mb-4 text-sm leading-6 text-muted-foreground">
        {request.description}
      </Text>

      <View className="mb-4 flex-row items-center justify-between rounded-[8px] bg-[#f7eced] p-3">
        <View className="flex-row items-center gap-3">
          <View className="h-9 w-9 items-center justify-center rounded-[8px] bg-primary/10">
            <Ionicons name="wallet-outline" size={18} color="#b94b50" />
          </View>
          <View>
            <Text className="mb-1 text-xs leading-3 text-muted-foreground">
              Valor estimado
            </Text>
            <Text className="text-xl font-bold leading-6 text-foreground">
              {request.price}
            </Text>
          </View>
        </View>

        {request.negotiable ? (
          <View className="rounded-[12px] border border-primary px-3 py-1">
            <Text className="text-xs font-bold text-primary">Negociavel</Text>
          </View>
        ) : null}
      </View>

      <View className="flex-row gap-2">
        <Pressable
          className="min-h-[44px] flex-1 items-center justify-center rounded-[12px] border border-input-border bg-card px-4"
          accessibilityRole="button"
        >
          <Text className="text-sm font-semibold text-muted-foreground">
            Recusar
          </Text>
        </Pressable>
        <Pressable
          className="min-h-[44px] flex-1 items-center justify-center rounded-[12px] bg-primary px-4"
          accessibilityRole="button"
        >
          <Text className="text-sm font-bold text-white">Aceitar</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={onDetails}
        className="mt-2 min-h-[44px] flex-row items-center justify-center gap-2 rounded-[12px] bg-[#f7eced] px-4"
        accessibilityRole="button"
      >
        <Ionicons name="document-text-outline" size={15} color="#b94b50" />
        <Text className="text-sm font-semibold text-primary">Ver detalhes</Text>
      </Pressable>
    </View>
  );
}

function DetailTag({ label, active }: { label: string; active?: boolean }) {
  return (
    <View
      className={`rounded-[12px] px-3 py-1 ${
        active ? "bg-primary" : "bg-[#f7eced]"
      }`}
    >
      <Text
        className={`text-sm font-medium ${
          active ? "text-white" : "text-primary"
        }`}
      >
        {label}
      </Text>
    </View>
  );
}

function DetailInfoCard({
  icon,
  label,
  subtitle,
  value,
}: {
  icon: IconName;
  label: string;
  subtitle?: string;
  value: string;
}) {
  return (
    <View className="flex-1 rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
      <View className="mb-1 flex-row items-center gap-1">
        <Ionicons name={icon} size={16} color="#b94b50" />
        <Text className="text-xs font-semibold uppercase tracking-[0.5px] text-muted-foreground">
          {label}
        </Text>
      </View>
      <Text className="text-lg font-bold text-foreground">{value}</Text>
      {subtitle ? (
        <Text className="mt-0.5 text-xs text-muted-foreground">{subtitle}</Text>
      ) : null}
    </View>
  );
}

function RequestDetailsScreen({ onBack }: { onBack: () => void }) {
  return (
    <View className="min-h-[812px] w-full max-w-[480px] bg-background">
      <ProjectHeader onBack={onBack} />

      <View className="flex-1 px-4 pb-6 pt-5">
        <Text className="mb-1 text-2xl font-bold text-foreground">
          Pintura Residencial
        </Text>
        <View className="mb-4 flex-row flex-wrap gap-2">
          <View className="flex-row items-center gap-1 rounded-[12px] bg-card px-3 py-1.5">
            <Ionicons name="location" size={14} color="#b94b50" />
            <Text className="text-sm text-foreground">Centro</Text>
          </View>
          <View className="flex-row items-center gap-1 rounded-[12px] bg-card px-3 py-1.5">
            <Ionicons name="calendar" size={14} color="#b94b50" />
            <Text className="text-sm text-foreground">04 de dez.</Text>
          </View>
        </View>

        <View className="mb-4 rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
          <View className="mb-3 flex-row items-center gap-2">
            <Ionicons name="briefcase-outline" size={18} color="#b94b50" />
            <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
              Categoria
            </Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {[
              "Pedreiro",
              "Eletricista",
              "Pintor",
              "Encanador",
              "Ajudante",
              "Ar Condicionado",
              "Carpinteiro",
            ].map((category) => (
              <DetailTag
                key={category}
                label={category}
                active={category === "Pintor"}
              />
            ))}
          </View>
        </View>

        <View className="mb-4 rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
          <View className="mb-2 flex-row items-center gap-2">
            <Ionicons name="reorder-three-outline" size={18} color="#b94b50" />
            <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
              Descricao
            </Text>
          </View>
          <Text className="text-sm leading-6 text-muted-foreground">
            Pintura completa de casa de 3 quartos, incluindo teto e paredes
            internas. Necessario preparar as paredes, cobrir moveis e entregar
            acabamento limpo.
          </Text>
        </View>

        <View className="mb-4 flex-row gap-3">
          <DetailInfoCard
            icon="calendar-outline"
            label="Data"
            value="04/12/2024"
            subtitle="Prazo: 5 dias"
          />
          <DetailInfoCard
            icon="wallet-outline"
            label="Valor"
            value="R$ 1.800"
            subtitle="NEGOCIAVEL"
          />
        </View>

        <View className="mb-4 rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
          <View className="mb-3 flex-row items-center gap-2">
            <Ionicons name="cash-outline" size={18} color="#b94b50" />
            <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
              Propor Novo Valor
            </Text>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="flex-1 flex-row items-center gap-2 rounded-[12px] border border-input-border bg-background px-3 py-3">
              <Text className="text-sm font-medium text-muted-foreground">R$</Text>
              <Text className="text-sm text-muted-foreground">Ex: 1.500,00</Text>
            </View>
            <Pressable
              className="rounded-[12px] bg-primary px-5 py-3"
              accessibilityRole="button"
            >
              <Text className="text-sm font-semibold text-white">Enviar</Text>
            </Pressable>
          </View>
        </View>

        <View className="mb-5 rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
          <View className="mb-3 flex-row items-center gap-2">
            <Ionicons name="image-outline" size={18} color="#b94b50" />
            <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
              Imagens do Servico
            </Text>
          </View>
          <Image
            source={{
              uri: "https://storage.googleapis.com/banani-generated-images/generated-images/115f5264-00fb-47c5-8131-0b9c0c0cc1f9.jpg",
            }}
            className="mb-2 h-[170px] w-full rounded-[12px]"
            resizeMode="cover"
            accessibilityLabel="Parede antes do servico"
          />
          <View className="flex-row gap-2">
            <Image
              source={{
                uri: "https://storage.googleapis.com/banani-generated-images/generated-images/a7392f6c-4409-404d-b138-9700b3cdafb7.jpg",
              }}
              className="h-[92px] flex-1 rounded-[12px]"
              resizeMode="cover"
              accessibilityLabel="Parede pintada"
            />
            <Image
              source={{
                uri: "https://storage.googleapis.com/banani-generated-images/generated-images/8e2e8dc8-4a47-4485-a1d8-b3d82ae43a22.jpg",
              }}
              className="h-[92px] flex-1 rounded-[12px]"
              resizeMode="cover"
              accessibilityLabel="Materiais de pintura"
            />
          </View>
        </View>

        <View className="flex-row gap-3">
          <Pressable
            onPress={onBack}
            className="min-h-[56px] flex-1 items-center justify-center rounded-[12px] bg-card shadow-sm"
            accessibilityRole="button"
          >
            <Text className="font-semibold text-foreground">Recusar</Text>
          </Pressable>
          <Pressable
            onPress={onBack}
            className="min-h-[56px] flex-1 items-center justify-center rounded-[12px] bg-primary"
            accessibilityRole="button"
          >
            <Text className="font-semibold text-white">Aceitar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

function ServiceFilterChips() {
  const filters = ["Todos (6)", "Em Andamento (1)", "Concluido"];

  return (
    <View className="flex-row gap-2 px-4 pb-4">
      {filters.map((filter, index) => (
        <Pressable
          key={filter}
          className={`rounded-[12px] px-4 py-2 shadow-sm ${
            index === 0 ? "bg-primary" : "bg-card"
          }`}
          accessibilityRole="button"
          accessibilityState={{ selected: index === 0 }}
        >
          <Text
            className={`text-sm font-semibold ${
              index === 0 ? "text-white" : "text-foreground"
            }`}
          >
            {filter}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

function StatusBadge({ status }: { status: ServiceStatus }) {
  const meta = statusMeta[status];

  return (
    <View
      className={`shrink-0 flex-row items-center gap-1 rounded-[12px] px-3 py-1 ${meta.bg}`}
    >
      <View
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: meta.color }}
      />
      <Text className="text-xs font-semibold" style={{ color: meta.color }}>
        {meta.label}
      </Text>
    </View>
  );
}

function ServiceInfoBox({
  icon,
  label,
  value,
}: {
  icon: IconName;
  label: string;
  value: string;
}) {
  return (
    <View className="flex-1 flex-row items-center gap-2 rounded-[8px] bg-[#f7eced] px-3 py-2">
      <Ionicons name={icon} size={14} color="#b94b50" />
      <View className="flex-1">
        <Text className="mb-0.5 text-xs uppercase leading-3 tracking-[0.4px] text-muted-foreground">
          {label}
        </Text>
        <Text className="text-sm font-semibold leading-4 text-foreground">
          {value}
        </Text>
      </View>
    </View>
  );
}

function CustomerAvatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <View className="h-9 w-9 items-center justify-center rounded-full bg-[#f7e8e9]">
      <Text className="text-xs font-bold text-primary">{initials}</Text>
    </View>
  );
}

function ServiceOrderCard({ service }: { service: ProfessionalService }) {
  const compact = service.status === "completed";

  return (
    <View className="mx-4 mb-4 rounded-[8px] bg-card p-4 shadow-md shadow-black/10">
      <View className="mb-1 flex-row items-start justify-between">
        <Text className="flex-1 pr-2 text-xl font-bold leading-6 text-foreground">
          {service.title}
        </Text>
        <StatusBadge status={service.status} />
      </View>

      <Text className="mb-4 text-xs text-muted-foreground">
        Pedido #{service.order}
      </Text>

      <View className="mb-4 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <CustomerAvatar name={service.customer} />
          <Text className="text-base font-semibold text-foreground">
            {service.customer}
          </Text>
        </View>
        <Text className="text-xl font-bold text-foreground">
          {service.price}
        </Text>
      </View>

      <View className={`flex-row gap-2 ${compact ? "mb-4" : "mb-2"}`}>
        <ServiceInfoBox icon="calendar" label="DATA" value={service.date} />
        <ServiceInfoBox icon="time-outline" label="HORARIO" value={service.time} />
      </View>

      {service.address ? (
        <View className="mb-4 flex-row items-start gap-2 rounded-[8px] bg-[#f7eced] px-3 py-2">
          <Ionicons name="location" size={14} color="#b94b50" />
          <View className="flex-1">
            <Text className="mb-0.5 text-xs uppercase leading-3 tracking-[0.4px] text-muted-foreground">
              ENDERECO
            </Text>
            <Text className="text-sm font-semibold leading-5 text-foreground">
              {service.address}
            </Text>
          </View>
        </View>
      ) : null}

      {!compact ? (
        <View className="mb-3 mt-1 flex-row gap-2">
          <Pressable
            className="relative min-h-[44px] flex-row items-center justify-center gap-2 rounded-[12px] border border-input-border bg-card px-4"
            accessibilityRole="button"
          >
            <Ionicons name="chatbubble-outline" size={18} color="#0f1720" />
            <Text className="text-sm font-semibold text-foreground">
              Mensagem
            </Text>
            {service.messageCount ? (
              <View className="absolute -right-2 -top-2 h-5 w-5 items-center justify-center rounded-full bg-primary">
                <Text className="text-[10px] font-bold text-white">
                  {service.messageCount}
                </Text>
              </View>
            ) : null}
          </Pressable>
          <Pressable
            className="min-h-[44px] flex-1 items-center justify-center rounded-[12px] bg-primary px-4"
            accessibilityRole="button"
          >
            <Text className="text-sm font-bold text-white">
              {service.action}
            </Text>
          </Pressable>
        </View>
      ) : null}

      <Pressable
        className="min-h-[44px] flex-row items-center justify-center gap-2 rounded-[12px] bg-[#f7eced] px-4"
        accessibilityRole="button"
      >
        <Ionicons name="document-text-outline" size={16} color="#b94b50" />
        <Text className="text-sm font-semibold text-primary">
          {compact ? "Ver Detalhes" : "Detalhe do Servico"}
        </Text>
      </Pressable>
    </View>
  );
}

function ProjectHeader({ onBack }: { onBack: () => void }) {
  return (
    <>
      <View className="flex-row items-center justify-between bg-background px-4 pb-4 pt-11">
        <Pressable
          onPress={onBack}
          className="h-10 w-10 items-center justify-center rounded-full bg-card shadow-sm"
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={18} color="#0f1720" />
        </Pressable>

        <View className="flex-row items-center gap-2">
          <View className="h-9 w-9 items-center justify-center rounded-[6px] bg-primary">
            <Ionicons name="business-outline" size={18} color="#ffffff" />
          </View>
          <View className="items-center">
            <Text className="text-xs font-bold leading-4 text-primary">
              CONECTA OBRAS
            </Text>
            <Text className="text-xs font-bold leading-4 text-primary">
              ITACOATIARA
            </Text>
          </View>
        </View>

        <View className="h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-primary bg-[#f7e8e9]">
          <Ionicons name="person" size={22} color="#b94b50" />
        </View>
      </View>
      <View className="h-px bg-black/5" />
    </>
  );
}

function ProjectSection({
  children,
  icon,
  title,
}: {
  children: React.ReactNode;
  icon: IconName;
  title: string;
}) {
  return (
    <View className="rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
      <View className="mb-4 flex-row items-center gap-2">
        <Ionicons name={icon} size={18} color="#b94b50" />
        <Text className="text-base font-bold text-foreground">{title}</Text>
      </View>
      {children}
    </View>
  );
}

function ProjectInput({
  label,
  placeholder,
  value,
  onChangeText,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View>
      <Text className="mb-1.5 text-xs text-muted-foreground">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        className="min-h-[46px] rounded-[12px] bg-[#f5e8e9] px-4 py-3 text-sm text-foreground"
        placeholder={placeholder}
        placeholderTextColor="#8a8a96"
        accessibilityLabel={label}
      />
    </View>
  );
}

function ProjectCategoryChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full px-4 py-2 ${
        selected ? "bg-primary" : "bg-[#f5e8e9]"
      }`}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Text
        className={`text-sm font-medium ${
          selected ? "text-white" : "text-foreground"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function PhotoTypeOption({
  description,
  label,
  onPress,
  selected,
}: {
  description: string;
  label: string;
  onPress: () => void;
  selected: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center justify-between gap-3 rounded-[12px] px-4 py-3 ${
        selected ? "border-[1.5px] border-primary bg-card" : "bg-[#fdf5f5]"
      }`}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <View className="flex-1">
        <Text
          className={`text-sm font-bold ${
            selected ? "text-primary" : "text-foreground"
          }`}
        >
          {label}
        </Text>
        <Text className="mt-0.5 text-xs leading-4 text-muted-foreground">
          {description}
        </Text>
      </View>
      <View
        className={`h-6 w-6 items-center justify-center rounded-full border-2 ${
          selected ? "border-primary" : "border-[#c0b0b1]"
        }`}
      >
        {selected ? <View className="h-3 w-3 rounded-full bg-primary" /> : null}
      </View>
    </Pressable>
  );
}

function PhotoDetailsScreen({ onBack }: { onBack: () => void }) {
  const [selectedType, setSelectedType] = useState("Capa do projeto");
  const photoTypes = [
    {
      label: "Capa do projeto",
      description: "A imagem principal que aparecera primeiro",
    },
    {
      label: "Antes",
      description: "Mostra como era o local antes do servico",
    },
    {
      label: "Depois",
      description: "Mostra o resultado finalizado",
    },
    {
      label: "Imagem adicional",
      description: "Outros angulos e detalhes do projeto",
    },
  ];

  return (
    <View className="min-h-[812px] w-full max-w-[480px] bg-background">
      <View className="flex-row items-center justify-between px-4 pb-4 pt-11">
        <Pressable
          onPress={onBack}
          className="h-10 w-10 items-center justify-center rounded-full bg-card shadow-sm"
          accessibilityRole="button"
          accessibilityLabel="Fechar detalhes da foto"
        >
          <Ionicons name="close" size={18} color="#0f1720" />
        </Pressable>
        <Text className="text-base font-bold text-foreground">
          Detalhes da Foto
        </Text>
        <Pressable onPress={onBack} accessibilityRole="button">
          <Text className="text-base font-semibold text-primary">Salvar</Text>
        </Pressable>
      </View>
      <View className="h-px bg-black/5" />

      <View className="gap-4 px-4 pb-6 pt-5">
        <View className="relative h-[260px] overflow-hidden rounded-[12px]">
          <Image
            source={{
              uri: "https://storage.googleapis.com/banani-generated-images/generated-images/ed993d53-08a8-4be3-b552-c60fca359c15.jpg",
            }}
            className="h-full w-full"
            resizeMode="cover"
            accessibilityLabel="Foto do projeto"
          />
          <Pressable
            className="absolute bottom-3 right-3 flex-row items-center gap-1.5 rounded-full bg-card px-4 py-2 shadow-md shadow-black/10"
            accessibilityRole="button"
          >
            <Ionicons name="refresh-outline" size={14} color="#0f1720" />
            <Text className="text-sm font-semibold text-foreground">
              Trocar foto
            </Text>
          </Pressable>
        </View>

        <View className="gap-3 rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
          <View className="mb-1 flex-row items-center gap-2">
            <Ionicons name="pricetag-outline" size={17} color="#b94b50" />
            <Text className="text-base font-bold text-foreground">
              Como deseja classificar esta foto?
            </Text>
          </View>
          <View className="gap-3" accessibilityRole="radiogroup">
            {photoTypes.map((type) => (
              <PhotoTypeOption
                key={type.label}
                label={type.label}
                description={type.description}
                selected={selectedType === type.label}
                onPress={() => setSelectedType(type.label)}
              />
            ))}
          </View>
        </View>
      </View>

      <View className="gap-3 px-4 pb-8 pt-2">
        <Pressable
          onPress={onBack}
          className="min-h-[56px] flex-row items-center justify-center gap-2 rounded-[12px] bg-primary px-4"
          accessibilityRole="button"
        >
          <Ionicons name="save-outline" size={18} color="#ffffff" />
          <Text className="text-base font-semibold text-white">
            Salvar alteracoes
          </Text>
        </Pressable>
        <Pressable
          onPress={onBack}
          className="min-h-[56px] flex-row items-center justify-center gap-2 rounded-[12px] bg-[#f5e8e9] px-4"
          accessibilityRole="button"
        >
          <Ionicons name="trash-outline" size={18} color="#b94b50" />
          <Text className="text-base font-semibold text-primary">
            Excluir foto
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function ProjectPhotoGrid({ onEditPhoto }: { onEditPhoto: () => void }) {
  return (
    <View className="flex-row flex-wrap gap-2">
      <View className="w-[48%]">
        <Image
          source={{
            uri: "https://storage.googleapis.com/banani-generated-images/generated-images/3a22084a-7d43-47ce-bda1-718b62bd262d.jpg",
          }}
          className="h-[130px] w-full rounded-[12px]"
          resizeMode="cover"
          accessibilityLabel="Foto principal do projeto"
        />
        <View className="mt-1.5 flex-row items-center justify-between px-0.5">
          <View>
            <Text className="text-xs font-semibold text-foreground">
              Foto prin...
            </Text>
            <Text className="text-xs text-muted-foreground">
              Capa do projeto
            </Text>
          </View>
          <Pressable
            onPress={onEditPhoto}
            className="h-7 w-7 items-center justify-center rounded-full bg-[#f5e8e9]"
            accessibilityRole="button"
            accessibilityLabel="Editar foto principal"
          >
            <Ionicons name="pencil" size={12} color="#b94b50" />
          </Pressable>
        </View>
      </View>

      <Pressable
        onPress={onEditPhoto}
        className="h-[130px] w-[48%] items-center justify-center gap-1.5 rounded-[12px] border-[1.5px] border-dashed border-primary/30 bg-[#fdf0f0] px-2"
        accessibilityRole="button"
      >
        <Ionicons name="images-outline" size={28} color="#b94b50" />
        <Text className="text-center text-xs font-semibold leading-4 text-foreground">
          Adicionar mais fotos
        </Text>
        <Text className="text-xs text-muted-foreground">Galeria ou camera</Text>
      </Pressable>

      <Pressable
        className="h-[100px] w-[48%] items-center justify-center gap-2 rounded-[12px] bg-primary"
        accessibilityRole="button"
      >
        <Ionicons name="camera-outline" size={26} color="#ffffff" />
        <Text className="text-sm font-semibold text-white">Tirar nova foto</Text>
      </Pressable>
    </View>
  );
}

function ProjectListCard({
  onEdit,
  onViewResult,
  project,
}: {
  onEdit: () => void;
  onViewResult: () => void;
  project: ProjectItem;
}) {
  return (
    <View className="flex-row items-center gap-3 rounded-[8px] bg-card p-3 shadow-sm shadow-black/5">
      <Image
        source={{ uri: project.image }}
        className="h-20 w-20 rounded-[6px]"
        resizeMode="cover"
        accessibilityLabel={project.title}
      />

      <View className="min-w-0 flex-1">
        <Text
          className="text-base font-semibold text-foreground"
          numberOfLines={1}
        >
          {project.title}
        </Text>
        <View className="mb-3 mt-0.5 flex-row items-center gap-1">
          <Ionicons name="location" size={12} color="#8a8a96" />
          <Text className="text-xs text-muted-foreground">
            {project.location}
          </Text>
        </View>
        <Pressable
          onPress={onViewResult}
          className="self-start flex-row items-center gap-1.5 rounded-full bg-[#f5e8e9] px-3 py-1.5"
          accessibilityRole="button"
        >
          <Ionicons name="image-outline" size={13} color="#b94b50" />
          <Text className="text-xs font-medium text-primary">
            Ver resultado
          </Text>
        </Pressable>
      </View>

      <View className="gap-2">
        <Pressable
          onPress={onEdit}
          className="h-9 w-9 items-center justify-center rounded-full bg-[#f0e8e9]"
          accessibilityRole="button"
          accessibilityLabel={`Editar ${project.title}`}
        >
          <Ionicons name="pencil" size={15} color="#0f1720" />
        </Pressable>
        <Pressable
          className="h-9 w-9 items-center justify-center rounded-full bg-[#f5e8e9]"
          accessibilityRole="button"
          accessibilityLabel={`Excluir ${project.title}`}
        >
          <Ionicons name="trash-outline" size={15} color="#b94b50" />
        </Pressable>
      </View>
    </View>
  );
}

function MyProjectsScreen({
  onAddProject,
  onBack,
  onEditProject,
  onSelectArea,
  onViewResult,
}: {
  onAddProject: () => void;
  onBack: () => void;
  onEditProject: () => void;
  onSelectArea: (area: ProfessionalArea) => void;
  onViewResult: () => void;
}) {
  return (
    <View className="min-h-[812px] w-full max-w-[480px] bg-background">
      <ProjectHeader onBack={onBack} />

      <View className="flex-1 gap-5 px-4 pb-4 pt-5">
        <Pressable
          onPress={onAddProject}
          className="min-h-[56px] flex-row items-center justify-center gap-2 rounded-[12px] bg-primary px-4"
          accessibilityRole="button"
        >
          <Ionicons name="add" size={20} color="#ffffff" />
          <Text className="text-base font-semibold text-white">
            Adicionar Novo Projeto
          </Text>
        </Pressable>

        <View className="flex-row items-center justify-between">
          <Text className="text-xl font-bold text-foreground">
            Meus Projetos
          </Text>
          <Text className="text-sm text-muted-foreground">3 projetos</Text>
        </View>

        <View className="gap-3">
          {projectItems.map((project) => (
            <ProjectListCard
              key={project.title}
              project={project}
              onEdit={onEditProject}
              onViewResult={onViewResult}
            />
          ))}
        </View>
      </View>

      <ProfessionalBottomTab
        activeArea="projects"
        onSelectArea={onSelectArea}
      />
    </View>
  );
}

function ResultImageBadge({
  label,
  color,
}: {
  label: string;
  color: string;
}) {
  return (
    <View
      className="absolute left-1.5 top-1.5 rounded-[5px] px-1.5 py-0.5"
      style={{ backgroundColor: color }}
    >
      <Text className="text-[10px] font-semibold text-white">{label}</Text>
    </View>
  );
}

function ProjectResultScreen({
  onBack,
  onEdit,
}: {
  onBack: () => void;
  onEdit: () => void;
}) {
  return (
    <View className="min-h-[900px] w-full max-w-[480px] bg-background pb-28">
      <View className="flex-row items-center justify-between px-4 pb-4 pt-12">
        <Pressable
          onPress={onBack}
          className="h-10 w-10 items-center justify-center rounded-[12px] bg-card shadow-sm"
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={20} color="#0f1720" />
        </Pressable>

        <View className="flex-row items-center gap-2">
          <View className="h-8 w-8 items-center justify-center rounded-[8px] bg-primary">
            <Ionicons name="hammer-outline" size={16} color="#ffffff" />
          </View>
          <View>
            <Text className="text-[11px] font-semibold leading-3 text-foreground">
              CONECTA OBRAS
            </Text>
            <Text className="text-[10px] leading-3 text-muted-foreground">
              ITACOATIARA
            </Text>
          </View>
        </View>

        <View className="h-10 w-10 items-center justify-center overflow-hidden rounded-[12px] bg-[#f7e8e9] shadow-sm">
          <Ionicons name="person" size={21} color="#b94b50" />
        </View>
      </View>

      <View className="mx-4 overflow-hidden rounded-[20px]">
        <Image
          source={{
            uri: "https://storage.googleapis.com/banani-generated-images/generated-images/4553595b-f1e6-4373-b3a1-849425e19812.jpg",
          }}
          className="h-[190px] w-full"
          resizeMode="cover"
          accessibilityLabel="Construcao de Casa"
        />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.62)"]}
          className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-10"
        >
          <Text className="text-2xl font-bold leading-8 text-white">
            Construcao de Casa
          </Text>
          <View className="mt-1 flex-row items-center gap-1">
            <Ionicons name="location" size={13} color="rgba(255,255,255,0.82)" />
            <Text className="text-sm text-white/80">
              Centro - Itacoatiara
            </Text>
          </View>
        </LinearGradient>
      </View>

      <View className="mt-4 flex-row flex-wrap gap-2 px-4">
        {["Construcao", "Eletrica", "Reparo"].map((tag) => (
          <View
            key={tag}
            className="rounded-full border border-primary px-4 py-1"
          >
            <Text className="text-[13px] font-medium text-primary">{tag}</Text>
          </View>
        ))}
      </View>

      <View className="mx-4 mt-4 rounded-[16px] bg-card p-4 shadow-sm shadow-black/5">
        <View className="mb-2 flex-row items-center gap-2">
          <Ionicons name="reorder-three-outline" size={16} color="#b94b50" />
          <Text className="text-xs font-semibold uppercase tracking-[0.4px] text-foreground">
            Descricao
          </Text>
        </View>
        <Text className="text-sm leading-6 text-muted-foreground">
          Construcao completa de residencia unifamiliar com 3 quartos, sala,
          cozinha e 2 banheiros. Execucao de fundacao, alvenaria, estrutura,
          cobertura e acabamento interno.
        </Text>
      </View>

      <View className="mx-4 mt-4 rounded-[16px] bg-card p-4 shadow-sm shadow-black/5">
        <View className="mb-3 flex-row items-center justify-between">
          <View className="flex-row items-center gap-2">
            <Ionicons name="image-outline" size={16} color="#b94b50" />
            <Text className="text-xs font-semibold uppercase tracking-[0.4px] text-foreground">
              Fotos do Projeto
            </Text>
          </View>
          <Text className="text-xs text-muted-foreground">3 fotos</Text>
        </View>

        <View className="mb-2 overflow-hidden rounded-[12px]">
          <Image
            source={{
              uri: "https://storage.googleapis.com/banani-generated-images/generated-images/702a3dd3-9bc6-48fe-90c3-874bbc6cf337.jpg",
            }}
            className="h-[175px] w-full"
            resizeMode="cover"
            accessibilityLabel="Foto antes do projeto"
          />
          <View className="absolute left-2 top-2 rounded-[6px] bg-[#2a7a4f] px-2 py-1">
            <Text className="text-[11px] font-semibold text-white">Antes</Text>
          </View>
        </View>

        <View className="flex-row gap-2">
          <View className="relative aspect-square flex-1 overflow-hidden rounded-[12px]">
            <Image
              source={{
                uri: "https://storage.googleapis.com/banani-generated-images/generated-images/8710618e-4e64-4d2a-ae9f-53404d15a9f3.jpg",
              }}
              className="h-full w-full"
              resizeMode="cover"
              accessibilityLabel="Foto depois do projeto"
            />
            <ResultImageBadge label="Depois" color="#b94b50" />
          </View>
          <View className="relative aspect-square flex-1 overflow-hidden rounded-[12px]">
            <Image
              source={{
                uri: "https://storage.googleapis.com/banani-generated-images/generated-images/2b1f4f99-1cc7-4f6c-aa9d-220857994a69.jpg",
              }}
              className="h-full w-full"
              resizeMode="cover"
              accessibilityLabel="Imagem adicional do projeto"
            />
            <ResultImageBadge label="Imagem Adicional" color="#5a6e8a" />
          </View>
          <View className="aspect-square flex-1 items-center justify-center rounded-[12px] bg-[#f0e8e9]">
            <Ionicons name="add" size={18} color="#9a8080" />
          </View>
        </View>
      </View>

      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between bg-card px-4 py-4 shadow-lg shadow-black/10">
        <Pressable
          className="flex-row items-center gap-2"
          accessibilityRole="button"
        >
          <Ionicons name="share-social-outline" size={18} color="#0f1720" />
          <Text className="text-sm font-medium text-foreground">
            Compartilhar
          </Text>
        </Pressable>
        <Pressable
          onPress={onEdit}
          className="flex-row items-center gap-2 rounded-full bg-primary px-6 py-3"
          accessibilityRole="button"
        >
          <Ionicons name="pencil" size={16} color="#ffffff" />
          <Text className="text-sm font-semibold text-white">Editar</Text>
        </Pressable>
      </View>
    </View>
  );
}

function SettingsOption({
  icon,
  label,
}: {
  icon: IconName;
  label: string;
}) {
  return (
    <Pressable
      className="flex-row items-center gap-4 px-4 py-4"
      accessibilityRole="button"
    >
      <View className="h-10 w-10 items-center justify-center rounded-[12px] bg-[#fceaea]">
        <Ionicons name={icon} size={18} color="#b94b50" />
      </View>
      <Text className="flex-1 text-[15px] font-medium text-foreground">
        {label}
      </Text>
      <Ionicons name="chevron-forward" size={18} color="#b94b50" />
    </Pressable>
  );
}

function SettingsSection({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <>
      <View className="mb-2 px-1">
        <Text className="text-xs font-semibold uppercase tracking-[1.6px] text-muted-foreground">
          {title}
        </Text>
      </View>
      <View className="mb-5 overflow-hidden rounded-[16px] bg-card shadow-sm shadow-black/5">
        {children}
      </View>
    </>
  );
}

function SettingsDivider() {
  return <View className="mx-4 border-b border-input-border" />;
}

function SettingsScreen({
  onBack,
  onSelectArea,
}: {
  onBack: () => void;
  onSelectArea: (area: ProfessionalArea) => void;
}) {
  return (
    <View className="min-h-[900px] w-full max-w-[480px] bg-background">
      <View className="flex-row items-center justify-between border-b border-input-border bg-background px-4 pb-4 pt-12">
        <Pressable
          onPress={onBack}
          className="h-11 w-11 items-center justify-center rounded-[12px] bg-card shadow-sm"
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={20} color="#0f1720" />
        </Pressable>

        <View className="flex-row items-center gap-2">
          <Image
            source={logo}
            className="h-11 w-11 rounded-[12px]"
            resizeMode="contain"
            accessibilityLabel="Conecta Obras Itacoatiara"
          />
          <View>
            <Text className="text-sm font-bold leading-4 tracking-[0.5px] text-primary">
              CONECTA OBRAS
            </Text>
            <Text className="text-sm font-bold leading-4 tracking-[0.5px] text-primary">
              ITACOATIARA
            </Text>
          </View>
        </View>

        <View className="h-11 w-11 items-center justify-center overflow-hidden rounded-[12px] border-2 border-primary bg-[#f7e8e9]">
          <Ionicons name="person" size={23} color="#b94b50" />
        </View>
      </View>

      <View className="flex-1 px-4 pt-5">
        <View className="mb-6 flex-row items-center gap-4 rounded-[16px] bg-card px-4 py-4 shadow-sm shadow-black/5">
          <View className="h-16 w-16 items-center justify-center rounded-[14px] border-2 border-primary bg-[#f7e8e9]">
            <Ionicons name="person" size={32} color="#b94b50" />
          </View>
          <View>
            <Text className="text-lg font-bold text-foreground">Jhon Souza</Text>
            <Text className="mt-0.5 text-sm text-muted-foreground">
              jhon.souza@email.com
            </Text>
          </View>
        </View>

        <SettingsSection title="Preferencias">
          <SettingsOption icon="notifications-outline" label="Notificacoes" />
          <SettingsDivider />
          <SettingsOption
            icon="lock-closed-outline"
            label="Privacidade e Seguranca"
          />
        </SettingsSection>

        <SettingsSection title="Suporte">
          <SettingsOption icon="help-circle-outline" label="Central de Ajuda" />
          <SettingsDivider />
          <SettingsOption icon="document-text-outline" label="Termos de Uso" />
        </SettingsSection>

        <View className="overflow-hidden rounded-[16px] bg-card shadow-sm shadow-black/5">
          <Pressable
            className="flex-row items-center justify-center gap-2 px-4 py-4"
            accessibilityRole="button"
          >
            <Ionicons name="log-out-outline" size={18} color="#b94b50" />
            <Text className="text-[15px] font-semibold text-primary">
              Sair da Conta
            </Text>
          </Pressable>
        </View>
      </View>

      <View className="mx-3 mb-4">
        <ProfessionalBottomTab
          activeArea="settings"
          onSelectArea={onSelectArea}
        />
      </View>
    </View>
  );
}

function EditProjectPhotoGrid({ onEditPhoto }: { onEditPhoto: () => void }) {
  const photos = [
    {
      label: "CAPA",
      color: "#b94b50",
      image:
        "https://storage.googleapis.com/banani-generated-images/generated-images/59b1f7e0-fd40-4144-aa26-a53271da7969.jpg",
    },
    {
      label: "ANTES",
      color: "#5a6a7a",
      image:
        "https://storage.googleapis.com/banani-generated-images/generated-images/bd906ca1-8db2-4c0c-98a8-ca75f63726c7.jpg",
    },
    {
      label: "DEPOIS",
      color: "#3a8a5a",
      image:
        "https://storage.googleapis.com/banani-generated-images/generated-images/8d181b67-7364-44b6-82de-1785a9037616.jpg",
    },
  ];

  return (
    <>
      <View className="mb-2 flex-row gap-2">
        {photos.map((photo) => (
          <View key={photo.label} className="relative flex-1">
            <Image
              source={{ uri: photo.image }}
              className="h-[88px] w-full rounded-[12px]"
              resizeMode="cover"
              accessibilityLabel={`Foto ${photo.label.toLowerCase()}`}
            />
            <View
              className="absolute left-1.5 top-1.5 rounded-full px-1.5 py-0.5"
              style={{ backgroundColor: photo.color }}
            >
              <Text className="text-[9px] font-bold text-white">
                {photo.label}
              </Text>
            </View>
            <Pressable
              onPress={onEditPhoto}
              className="absolute right-1.5 top-1.5 h-5 w-5 items-center justify-center rounded-full bg-card shadow-sm"
              accessibilityRole="button"
              accessibilityLabel={`Editar foto ${photo.label.toLowerCase()}`}
            >
              <Ionicons name="pencil" size={10} color="#b94b50" />
            </Pressable>
          </View>
        ))}
      </View>

      <View className="mt-3 flex-row gap-2">
        <Pressable
          className="h-[72px] flex-1 items-center justify-center gap-1.5 rounded-[12px] bg-primary"
          accessibilityRole="button"
        >
          <Ionicons name="camera-outline" size={20} color="#ffffff" />
          <Text className="text-xs font-semibold text-white">
            Tirar nova foto
          </Text>
        </Pressable>
        <Pressable
          className="h-[72px] flex-1 items-center justify-center gap-1.5 rounded-[12px] border-[1.5px] border-dashed border-primary/30 bg-[#fdf0f0]"
          accessibilityRole="button"
        >
          <Ionicons name="images-outline" size={20} color="#b94b50" />
          <Text className="text-xs font-semibold text-foreground">
            Adicionar fotos
          </Text>
        </Pressable>
      </View>
    </>
  );
}

function EditProjectScreen({ onBack }: { onBack: () => void }) {
  const [title, setTitle] = useState("Construcao de Residencia");
  const [neighborhood, setNeighborhood] = useState("Centro");
  const [details, setDetails] = useState(
    "Construcao de uma residencia de 2 andares no bairro centro, com acabamento padrao medio.",
  );
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Eletrica",
    "Reparo",
  ]);
  const categories = [
    "Construcao",
    "Eletrica",
    "Encanamento",
    "Pintura",
    "Reparo",
    "Ar Condicionado",
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  };

  if (isEditingPhoto) {
    return <PhotoDetailsScreen onBack={() => setIsEditingPhoto(false)} />;
  }

  return (
    <View className="min-h-[812px] w-full max-w-[480px] bg-background">
      <ProjectHeader onBack={onBack} />

      <View className="flex-row items-center gap-2 px-4 pb-1 pt-5">
        <Ionicons name="pencil" size={18} color="#b94b50" />
        <Text className="text-xl font-bold text-foreground">Editar Projeto</Text>
      </View>
      <Text className="px-4 pb-4 text-sm text-muted-foreground">
        Atualize as informacoes do seu projeto
      </Text>

      <View className="gap-4 px-4 pb-6">
        <ProjectSection icon="document-text-outline" title="Informacoes Basicas">
          <View className="gap-3">
            <ProjectInput
              label="Titulo do projeto"
              placeholder="Construcao de Residencia"
              value={title}
              onChangeText={setTitle}
            />
            <ProjectInput
              label="Em qual Bairro?"
              placeholder="Centro"
              value={neighborhood}
              onChangeText={setNeighborhood}
            />
          </View>
        </ProjectSection>

        <ProjectSection icon="construct-outline" title="Toque no que voce fez:">
          <View className="flex-row flex-wrap gap-2">
            {categories.map((category) => (
              <ProjectCategoryChip
                key={category}
                label={category}
                selected={selectedCategories.includes(category)}
                onPress={() => toggleCategory(category)}
              />
            ))}
          </View>
        </ProjectSection>

        <ProjectSection
          icon="reorder-three-outline"
          title="Detalhes (se quiser escrever)"
        >
          <View className="relative min-h-[100px] rounded-[12px] bg-[#f5e8e9] px-4 py-3">
            <TextInput
              value={details}
              onChangeText={setDetails}
              multiline
              className="min-h-[74px] pr-10 text-sm text-foreground"
              placeholderTextColor="#8a8a96"
              accessibilityLabel="Detalhes do projeto"
            />
            <Pressable
              className="absolute bottom-3 right-3 h-8 w-8 items-center justify-center rounded-full bg-card shadow-sm"
              accessibilityRole="button"
              accessibilityLabel="Gravar audio"
            >
              <Ionicons name="mic-outline" size={16} color="#b94b50" />
            </Pressable>
          </View>
        </ProjectSection>

        <ProjectSection icon="image-outline" title="Fotos do Projeto">
          <View className="mb-1 flex-row items-start justify-between">
            <Text className="text-sm font-bold text-foreground">
              3 fotos adicionadas
            </Text>
            <View className="rounded-full bg-[#f5e8e9] px-2 py-0.5">
              <Text className="text-xs font-semibold text-primary">3/10</Text>
            </View>
          </View>
          <Text className="mb-3 text-xs leading-5 text-muted-foreground">
            Toque em uma foto para editar ou remover.
          </Text>
          <EditProjectPhotoGrid onEditPhoto={() => setIsEditingPhoto(true)} />
        </ProjectSection>

        <View className="rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
          <View className="mb-3 flex-row items-center gap-2">
            <Ionicons name="warning-outline" size={17} color="#b94b50" />
            <Text className="text-base font-bold text-foreground">
              Zona de Perigo
            </Text>
          </View>
          <Pressable
            className="min-h-[48px] flex-row items-center justify-center gap-2 rounded-[12px] bg-[#f5e8e9]"
            accessibilityRole="button"
          >
            <Ionicons name="trash-outline" size={16} color="#b94b50" />
            <Text className="text-sm font-semibold text-primary">
              Excluir este projeto
            </Text>
          </Pressable>
        </View>
      </View>

      <View className="flex-row gap-3 border-t border-black/5 bg-background px-4 pb-8 pt-2">
        <Pressable
          onPress={onBack}
          className="min-h-[56px] flex-1 items-center justify-center rounded-[12px] bg-card shadow-sm"
          accessibilityRole="button"
        >
          <Text className="text-base font-semibold text-foreground">
            Cancelar
          </Text>
        </Pressable>
        <Pressable
          onPress={onBack}
          className="min-h-[56px] flex-[2] flex-row items-center justify-center gap-2 rounded-[12px] bg-primary"
          accessibilityRole="button"
        >
          <Ionicons name="save-outline" size={18} color="#ffffff" />
          <Text className="text-base font-semibold text-white">
            Salvar Alteracoes
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function AddProjectScreen({ onBack }: { onBack: () => void }) {
  const [title, setTitle] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [details, setDetails] = useState("");
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Eletrica",
    "Reparo",
  ]);
  const categories = [
    "Construcao",
    "Eletrica",
    "Encanamento",
    "Pintura",
    "Reparo",
    "Ar Condicionado",
  ];

  const toggleCategory = (category: string) => {
    setSelectedCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  };

  if (isEditingPhoto) {
    return <PhotoDetailsScreen onBack={() => setIsEditingPhoto(false)} />;
  }

  return (
    <View className="min-h-[812px] w-full max-w-[480px] bg-background">
      <ProjectHeader onBack={onBack} />

      <View className="gap-4 px-4 pb-6 pt-5">
        <ProjectSection icon="document-text-outline" title="Informacoes Basicas">
          <View className="gap-3">
            <ProjectInput
              label="Titulo do projeto"
              placeholder="Ex: Reforma Completa"
              value={title}
              onChangeText={setTitle}
            />
            <ProjectInput
              label="Em qual Bairro?"
              placeholder="Ex: Centro"
              value={neighborhood}
              onChangeText={setNeighborhood}
            />
          </View>
        </ProjectSection>

        <ProjectSection icon="construct-outline" title="Toque no que voce fez:">
          <View className="flex-row flex-wrap gap-2">
            {categories.map((category) => (
              <ProjectCategoryChip
                key={category}
                label={category}
                selected={selectedCategories.includes(category)}
                onPress={() => toggleCategory(category)}
              />
            ))}
          </View>
        </ProjectSection>

        <ProjectSection
          icon="reorder-three-outline"
          title="Detalhes (se quiser escrever)"
        >
          <View className="relative min-h-[100px] rounded-[12px] bg-[#f5e8e9] px-4 py-3">
            <TextInput
              value={details}
              onChangeText={setDetails}
              multiline
              className="min-h-[74px] pr-10 text-sm text-foreground"
              placeholder="Escreva Mais detalhes do projeto...."
              placeholderTextColor="#8a8a96"
              accessibilityLabel="Detalhes do projeto"
            />
            <Pressable
              className="absolute bottom-3 right-3 h-8 w-8 items-center justify-center rounded-full bg-card shadow-sm"
              accessibilityRole="button"
              accessibilityLabel="Gravar audio"
            >
              <Ionicons name="mic-outline" size={16} color="#b94b50" />
            </Pressable>
          </View>
        </ProjectSection>

        <ProjectSection icon="image-outline" title="Fotos do Projeto">
          <View className="mb-1 flex-row items-start justify-between">
            <Text className="text-sm font-bold text-foreground">
              1 foto adicionada
            </Text>
            <View className="rounded-full bg-[#f5e8e9] px-2 py-0.5">
              <Text className="text-xs font-semibold text-primary">1/10</Text>
            </View>
          </View>
          <Text className="mb-3 text-xs leading-5 text-muted-foreground">
            Voce pode adicionar mais imagens do mesmo projeto para mostrar
            outros angulos e detalhes.
          </Text>
          <ProjectPhotoGrid onEditPhoto={() => setIsEditingPhoto(true)} />
        </ProjectSection>
      </View>

      <View className="flex-row gap-3 border-t border-black/5 bg-background px-4 pb-6 pt-2">
        <Pressable
          onPress={onBack}
          className="min-h-[56px] flex-1 items-center justify-center rounded-[12px] bg-card shadow-sm"
          accessibilityRole="button"
        >
          <Text className="text-base font-semibold text-foreground">
            Cancelar
          </Text>
        </Pressable>
        <Pressable
          onPress={onBack}
          className="min-h-[56px] flex-[2] items-center justify-center rounded-[12px] bg-primary"
          accessibilityRole="button"
        >
          <Text className="text-base font-semibold text-white">
            Adicionar Projeto
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

function ProfessionalBottomTab({
  activeArea,
  onSelectArea,
}: {
  activeArea: ProfessionalArea;
  onSelectArea: (area: ProfessionalArea) => void;
}) {
  const items: Array<{
    area: ProfessionalArea;
    icon: IconName;
    label: string;
    badge?: string;
  }> = [
    {
      area: "opportunities",
      icon: "hammer-outline",
      label: "Oportunidades",
      badge: "3",
    },
    { area: "projects", icon: "clipboard-outline", label: "Meus Projetos" },
    { area: "settings", icon: "settings-outline", label: "Configuracoes" },
  ];

  return (
    <View className="border-t border-input-border bg-card px-2 py-3">
      <View className="flex-row items-center justify-around">
        {items.map((item) => (
          <Pressable
            key={item.label}
            onPress={() => onSelectArea(item.area)}
            className="items-center gap-1 px-3"
            accessibilityRole="button"
            accessibilityState={{ selected: activeArea === item.area }}
          >
            <View className="relative">
              <Ionicons
                name={item.icon}
                size={24}
                color={activeArea === item.area ? "#b94b50" : "#7a6568"}
              />
              {item.badge && activeArea === item.area ? (
                <View className="absolute -right-2 -top-1 h-4 w-4 items-center justify-center rounded-full bg-primary">
                  <Text className="text-[9px] font-bold text-white">
                    {item.badge}
                  </Text>
                </View>
              ) : null}
            </View>
            <Text
              className={`text-xs ${
                activeArea === item.area
                  ? "font-semibold text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function ProfessionalHomeScreen({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<ProfessionalTab>("requests");
  const [activeArea, setActiveArea] =
    useState<ProfessionalArea>("opportunities");
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [isViewingProjectResult, setIsViewingProjectResult] = useState(false);
  const [isViewingRequestDetails, setIsViewingRequestDetails] = useState(false);

  if (activeArea === "opportunities" && isViewingRequestDetails) {
    return <RequestDetailsScreen onBack={() => setIsViewingRequestDetails(false)} />;
  }

  if (activeArea === "projects" && isAddingProject) {
    return <AddProjectScreen onBack={() => setIsAddingProject(false)} />;
  }

  if (activeArea === "projects" && isEditingProject) {
    return <EditProjectScreen onBack={() => setIsEditingProject(false)} />;
  }

  if (activeArea === "projects" && isViewingProjectResult) {
    return (
      <ProjectResultScreen
        onBack={() => setIsViewingProjectResult(false)}
        onEdit={() => {
          setIsViewingProjectResult(false);
          setIsEditingProject(true);
        }}
      />
    );
  }

  if (activeArea === "settings") {
    return (
      <SettingsScreen
        onBack={() => setActiveArea("opportunities")}
        onSelectArea={(area) => {
          setIsAddingProject(false);
          setIsEditingProject(false);
          setIsViewingProjectResult(false);
          setIsViewingRequestDetails(false);
          setActiveArea(area);
        }}
      />
    );
  }

  if (activeArea === "projects") {
    return (
      <MyProjectsScreen
        onAddProject={() => setIsAddingProject(true)}
        onBack={() => setActiveArea("opportunities")}
        onEditProject={() => setIsEditingProject(true)}
        onViewResult={() => setIsViewingProjectResult(true)}
        onSelectArea={(area) => {
          setIsAddingProject(false);
          setIsEditingProject(false);
          setIsViewingProjectResult(false);
          setIsViewingRequestDetails(false);
          setActiveArea(area);
        }}
      />
    );
  }

  return (
    <View className="min-h-[812px] w-full max-w-[480px] bg-background">
      <ProfessionalHomeHeader onBack={onBack} />
      <ProfessionalTabToggle activeTab={activeTab} onChangeTab={setActiveTab} />

      {activeTab === "requests" ? (
        <View className="pb-2">
          {serviceRequests.map((request) => (
            <NewRequestCard
              key={request.title}
              request={request}
              onDetails={() => setIsViewingRequestDetails(true)}
            />
          ))}
        </View>
      ) : (
        <View className="pb-2">
          <ServiceFilterChips />
          {professionalServices.map((service) => (
            <ServiceOrderCard key={service.order} service={service} />
          ))}
        </View>
      )}

      <ProfessionalBottomTab
        activeArea={activeArea}
        onSelectArea={(area) => {
          setIsViewingRequestDetails(false);
          setActiveArea(area);
        }}
      />
    </View>
  );
}

function ProfessionalSetupScreen({
  onBack,
  onSave,
}: {
  onBack: () => void;
  onSave: () => void;
}) {
  const [name, setName] = useState("Joao Nonato");
  const [phone, setPhone] = useState("(92) 99123-4567");
  const [dailyRate, setDailyRate] = useState("R$ 150");
  const [neighborhood, setNeighborhood] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [about, setAbout] = useState("");
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

  return (
    <View className="min-h-[812px] w-full max-w-[480px] bg-background">
      <View className="flex-row items-center justify-between bg-background px-5 pb-3 pt-[52px]">
        <Pressable
          onPress={onBack}
          className="h-10 w-10 items-center justify-center rounded-full bg-card shadow-sm"
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={20} color="#0f1720" />
        </Pressable>

        <View className="flex-row items-center gap-2">
          <Image
            source={logo}
            className="h-10 w-[150px]"
            resizeMode="contain"
            accessibilityLabel="Conecta Obras Itacoatiara"
          />
        </View>

        <View className="h-10 w-10" />
      </View>

      <View className="gap-7 px-5 pb-[120px] pt-3">
        <View className="items-center gap-2">
          <View className="relative">
            <View className="h-24 w-24 items-center justify-center rounded-full border-[3px] border-primary bg-[#f7e8e9]">
              <Ionicons name="person" size={46} color="#b94b50" />
            </View>
            <Pressable
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
                className="h-10 w-10 items-center justify-center rounded-full bg-[#f7e8e9]"
                accessibilityRole="button"
                accessibilityLabel="Gravar audio"
              >
                <Ionicons name="mic-outline" size={18} color="#b94b50" />
              </Pressable>
            </View>
          </View>
        </SetupSection>
      </View>

      <View className="absolute bottom-0 left-0 right-0 border-t border-input-border bg-card px-5 pb-8 pt-4">
        <Pressable
          onPress={onSave}
          className="min-h-[56px] items-center justify-center rounded-[18px] bg-primary px-6"
          accessibilityRole="button"
        >
          <Text className="text-base font-bold text-white">Salvar Perfil</Text>
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
              onContinue={(profile) => {
                if (profile === "profissional") {
                  setScreen("professionalSetup");
                }
              }}
              onProfilePress={() => setScreen("accountProfile")}
            />
          ) : screen === "professionalSetup" ? (
            <ProfessionalSetupScreen
              onBack={() => setScreen("profileChoice")}
              onSave={() => setScreen("professionalHome")}
            />
          ) : screen === "professionalHome" ? (
            <ProfessionalHomeScreen onBack={() => setScreen("professionalSetup")} />
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
