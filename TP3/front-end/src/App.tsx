import "./global.css";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const logo = require("../assets/logotipo.png");

type Screen = "login" | "signup" | "phone";
type IconName = keyof typeof Ionicons.glyphMap;

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
  rightAction?: React.ReactNode;
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
  rightAction,
}: FieldProps) {
  return (
    <View
      className={`min-h-[62px] gap-1 rounded-[14px] border-[1.5px] px-3.5 py-2.5 ${
        active
          ? "border-primary bg-[#fff9f9]"
          : "border-input-border bg-background"
      }`}
    >
      <Text className="text-[10px] font-bold uppercase tracking-[0.7px] text-primary">
        {label}
      </Text>
      <View className="flex-row items-center gap-2.5">
        <Ionicons name={icon} size={17} color="#b94b50" />
        <TextInput
          value={value}
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
      </View>
    </View>
  );
}

function SocialButtons({ onPhone }: { onPhone: () => void }) {
  return (
    <View className="flex-row gap-3">
      <Pressable
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
  onPhone,
}: {
  onCreateAccount: () => void;
  onPhone: () => void;
}) {
  const [email, setEmail] = useState("joao.silva@email.com");
  const [password, setPassword] = useState("conecta123");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
            label="Email ou Nome"
            icon="person-outline"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoComplete="email"
            placeholder="seu@email.com"
          />
          <Field
            label="Senha"
            icon="lock-closed-outline"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
            autoComplete="password"
            placeholder="Sua senha"
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
          className="min-h-[58px] flex-row items-center justify-center gap-2.5 rounded-full bg-primary px-6 shadow-lg shadow-primary/40"
          accessibilityRole="button"
        >
          <Text className="text-base font-bold text-white">Entrar</Text>
          <Ionicons name="arrow-forward" size={18} color="#ffffff" />
        </Pressable>

        <Divider />
        <SocialButtons onPhone={onPhone} />
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
  onPhone,
}: {
  onLogin: () => void;
  onPhone: () => void;
}) {
  const [name, setName] = useState("Maria da Silva");
  const [phone, setPhone] = useState("(11) 99999-9999");
  const [email, setEmail] = useState("maria@email.com");
  const [password, setPassword] = useState("conecta12");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
          onChangeText={setName}
          autoComplete="name"
          placeholder="Maria da Silva"
        />
        <Field
          label="Telefone"
          icon="call-outline"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          autoComplete="tel"
          placeholder="(11) 99999-9999"
        />
        <Field
          label="Email"
          icon="mail-outline"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoComplete="email"
          placeholder="maria@email.com"
          active
        />
        <Field
          label="Senha"
          icon="lock-closed-outline"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
          autoComplete="password"
          placeholder="Sua senha"
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
          className="mt-1 min-h-[56px] flex-row items-center justify-center gap-2 rounded-full bg-primary px-6 shadow-lg shadow-primary/40"
          accessibilityRole="button"
        >
          <Text className="text-base font-bold text-white">Cadastrar</Text>
          <Ionicons name="arrow-forward" size={18} color="#ffffff" />
        </Pressable>

        <Divider />
        <SocialButtons onPhone={onPhone} />
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
          <View className="min-h-[54px] flex-row overflow-hidden rounded-[14px] border-[1.5px] border-primary bg-background">
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
                onChangeText={setPhone}
                keyboardType="phone-pad"
                autoComplete="tel"
                className="min-h-[24px] flex-1 p-0 text-[15px] font-medium text-foreground"
                placeholder="(11) 99999-9999"
                placeholderTextColor="#c5adaf"
                accessibilityLabel="Numero de telefone"
              />
            </View>
          </View>
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
          className="min-h-[56px] flex-row items-center justify-center gap-2 rounded-full bg-primary px-6 shadow-lg shadow-primary/40"
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

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [previousScreen, setPreviousScreen] = useState<Exclude<Screen, "phone">>(
    "signup",
  );

  const openPhoneScreen = (from: Exclude<Screen, "phone">) => {
    setPreviousScreen(from);
    setScreen("phone");
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
              onPhone={() => openPhoneScreen("login")}
            />
          ) : screen === "signup" ? (
            <SignupScreen
              onLogin={() => setScreen("login")}
              onPhone={() => openPhoneScreen("signup")}
            />
          ) : (
            <PhoneVerificationScreen onBack={() => setScreen(previousScreen)} />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
