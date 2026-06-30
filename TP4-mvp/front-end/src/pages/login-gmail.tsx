import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import {
  AccountRow,
  Field,
  PermissionItem,
} from "../components/app-components";
import { ApiError, api } from "../services/api";
import { isValidEmail, isValidName } from "../services/validators";

const googleAccounts = [
  {
    avatarUrl:
      "https://storage.googleapis.com/banani-avatars/avatar/female/25-35/Hispanic/0",
    email: "maria.silva@gmail.com",
    name: "Maria da Silva",
  },
  {
    avatarUrl:
      "https://storage.googleapis.com/banani-avatars/avatar/female/25-35/Hispanic/1",
    email: "m.silva.work@gmail.com",
    name: "Maria Silva",
  },
];

export function GoogleSignInScreen({
  onBack,
  onSuccess,
}: {
  onBack: () => void;
  onSuccess: () => void;
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [useOtherAccount, setUseOtherAccount] = useState(false);
  const [otherName, setOtherName] = useState("");
  const [otherEmail, setOtherEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const selectedAccount = googleAccounts[selectedIndex];
  const canSubmit = useOtherAccount
    ? isValidName(otherName) && isValidEmail(otherEmail)
    : Boolean(selectedAccount);

  const handleContinue = async () => {
    if (!canSubmit || isSubmitting) {
      setSubmitError("Selecione uma conta ou informe nome e e-mail validos.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await api.googleAuth(
        useOtherAccount
          ? { email: otherEmail, name: otherName }
          : {
              avatarUrl: selectedAccount.avatarUrl,
              email: selectedAccount.email,
              name: selectedAccount.name,
            },
      );
      onSuccess();
    } catch (error) {
      setSubmitError(
        error instanceof ApiError
          ? error.message
          : "Nao foi possivel entrar com Google.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
            selected={!useOtherAccount && selectedIndex === 0}
            name={googleAccounts[0].name}
            email={googleAccounts[0].email}
            avatar={googleAccounts[0].avatarUrl}
            onPress={() => {
              setUseOtherAccount(false);
              setSelectedIndex(0);
            }}
          />
          <AccountRow
            selected={!useOtherAccount && selectedIndex === 1}
            name={googleAccounts[1].name}
            email={googleAccounts[1].email}
            avatar={googleAccounts[1].avatarUrl}
            onPress={() => {
              setUseOtherAccount(false);
              setSelectedIndex(1);
            }}
          />
          <AccountRow
            selected={useOtherAccount}
            name="Usar outra conta"
            onPress={() => setUseOtherAccount(true)}
          />

          {useOtherAccount ? (
            <View className="mb-4 gap-3 rounded-[16px] border border-input-border bg-background p-4">
              <Field
                label="Nome"
                icon="person-outline"
                value={otherName}
                onChangeText={setOtherName}
                placeholder="Nome da conta Google"
              />
              <Field
                label="E-mail"
                icon="mail-outline"
                value={otherEmail}
                onChangeText={setOtherEmail}
                keyboardType="email-address"
                autoComplete="email"
                placeholder="email@gmail.com"
              />
            </View>
          ) : null}

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
            onPress={handleContinue}
            disabled={isSubmitting}
            className="mb-5 min-h-[56px] flex-row items-center justify-center gap-2 rounded-[16px] bg-[#c0392b] px-6"
            accessibilityRole="button"
          >
            <Text className="text-lg font-bold text-white">G</Text>
            <Text className="text-base font-semibold text-white">
              {isSubmitting ? "Entrando..." : "Continuar com Google"}
            </Text>
          </Pressable>
          {submitError ? (
            <Text className="mb-4 text-center text-xs font-semibold text-primary">
              {submitError}
            </Text>
          ) : null}
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
