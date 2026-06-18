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

const logoUri =
  "https://firebasestorage.googleapis.com/v0/b/banani-prod.appspot.com/o/reference-images%2F3549b407-583a-4a83-ae7d-302f594cfd23?alt=media&token=cc1b663e-3733-42fa-9277-9f9ca1d35176";

export default function App() {
  const [email, setEmail] = useState("joao.silva@email.com");
  const [password, setPassword] = useState("conecta123");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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

            <View className="z-10 items-center gap-4 px-6 pb-7 pt-[60px]">
              <View className="h-20 w-20 items-center justify-center overflow-hidden rounded-[24px] bg-card shadow-lg shadow-primary/20">
                <Image
                  source={{ uri: logoUri }}
                  className="h-[72px] w-[72px]"
                  resizeMode="contain"
                  accessibilityLabel="Conecta Obras Itacoatiara"
                />
              </View>

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
                <View className="min-h-[72px] flex-row items-center gap-3 rounded-[14px] border-[1.5px] border-input-border bg-background px-4 py-3.5">
                  <Ionicons name="person-outline" size={21} color="#b94b50" />
                  <View className="flex-1 gap-0.5">
                    <Text className="text-[10px] font-bold uppercase tracking-[0.6px] text-primary">
                      Email ou Nome
                    </Text>
                    <TextInput
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                      className="p-0 text-[15px] leading-5 text-foreground"
                      placeholder="seu@email.com"
                      placeholderTextColor="#7a6568"
                      accessibilityLabel="Email ou nome"
                    />
                  </View>
                </View>

                <View className="min-h-[72px] flex-row items-center gap-3 rounded-[14px] border-[1.5px] border-input-border bg-background px-4 py-3.5">
                  <Ionicons name="lock-closed-outline" size={21} color="#b94b50" />
                  <View className="flex-1 gap-0.5">
                    <Text className="text-[10px] font-bold uppercase tracking-[0.6px] text-primary">
                      Senha
                    </Text>
                    <TextInput
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!isPasswordVisible}
                      autoCapitalize="none"
                      autoComplete="password"
                      className="p-0 text-[15px] leading-5 text-foreground"
                      placeholder="Sua senha"
                      placeholderTextColor="#7a6568"
                      accessibilityLabel="Senha"
                    />
                  </View>
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
                </View>
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

              <View className="flex-row items-center gap-3">
                <View className="h-px flex-1 bg-input-border" />
                <Text className="text-xs text-muted-foreground">
                  ou continue com
                </Text>
                <View className="h-px flex-1 bg-input-border" />
              </View>

              <View className="flex-row gap-3">
                <Pressable className="min-h-[50px] flex-1 flex-row items-center justify-center gap-2.5 rounded-[14px] border-[1.5px] border-input-border bg-card px-4">
                  <Text className="text-lg font-extrabold text-[#4285F4]">G</Text>
                  <Text className="text-[15px] font-semibold text-foreground">
                    Google
                  </Text>
                </Pressable>
                <Pressable className="min-h-[50px] flex-1 flex-row items-center justify-center gap-2.5 rounded-[14px] border-[1.5px] border-input-border bg-card px-4">
                  <Ionicons name="call-outline" size={20} color="#b94b50" />
                  <Text className="text-[15px] font-semibold text-foreground">
                    Telefone
                  </Text>
                </Pressable>
              </View>
            </View>

            <View className="z-10 items-center gap-2.5 px-6 pb-7 pt-5">
              <Pressable accessibilityRole="button">
                <Text className="text-center text-[15px] text-foreground">
                  Nao tem uma conta?{" "}
                  <Text className="font-bold text-primary">Criar conta</Text>
                </Text>
              </Pressable>
              <Text className="text-center text-xs leading-5 text-muted-foreground">
                Ao entrar, voce concorda com nossos{" "}
                <Text className="font-semibold text-primary">Termos de Uso</Text>{" "}
                e{" "}
                <Text className="font-semibold text-primary">
                  Politica de Privacidade
                </Text>
                .
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
