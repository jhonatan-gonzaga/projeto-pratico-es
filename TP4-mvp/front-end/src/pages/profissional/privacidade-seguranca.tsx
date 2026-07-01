import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { ProjectHeader } from "../../components/profissional/components";
import { ApiError, api } from "../../services/api";

function SecurityOption({
  description,
  icon,
  label,
  onPress,
}: {
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center gap-3 rounded-[12px] bg-card p-4 shadow-sm shadow-black/5"
      accessibilityRole="button"
    >
      <View className="h-10 w-10 items-center justify-center rounded-[12px] bg-[#fceaea]">
        <Ionicons name={icon} size={18} color="#b94b50" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-foreground">{label}</Text>
        <Text className="mt-0.5 text-xs leading-4 text-muted-foreground">
          {description}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#b94b50" />
    </Pressable>
  );
}

export function PrivacySecurityScreen({
  onBack,
  onProfilePress,
  onSignOut,
}: {
  onBack: () => void;
  onProfilePress: () => void;
  onSignOut: () => void;
}) {
  const [activePanel, setActivePanel] = useState<
    "password" | "visibility" | "delete" | "twoFactor" | null
  >(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState<string | null>(null);
  const [deleteStatus, setDeleteStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const changePassword = async () => {
    if (newPassword.length < 6) {
      setPasswordStatus("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordStatus("A confirmacao precisa ser igual a nova senha.");
      return;
    }

    setIsSubmitting(true);
    setPasswordStatus(null);

    try {
      const response = await api.changePassword({ currentPassword, newPassword });
      setPasswordStatus(response.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setPasswordStatus(
        error instanceof ApiError ? error.message : "Nao foi possivel alterar a senha.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteAccount = async () => {
    setIsSubmitting(true);
    setDeleteStatus(null);

    try {
      await api.deleteMe();
      onSignOut();
    } catch (error) {
      setDeleteStatus(
        error instanceof ApiError ? error.message : "Nao foi possivel excluir a conta.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="h-full w-full max-w-[480px] self-center bg-background">
      <ProjectHeader onBack={onBack} onProfilePress={onProfilePress} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-4 pb-6 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text className="text-2xl font-bold text-foreground">
            Privacidade e Seguranca
          </Text>
          <Text className="mt-1 text-sm text-muted-foreground">
            Controle seus dados, senha e formas de protecao da conta.
          </Text>
        </View>

        <SecurityOption
          icon="key-outline"
          label="Alterar senha"
          description="Atualize sua senha de acesso ao aplicativo."
          onPress={() => setActivePanel(activePanel === "password" ? null : "password")}
        />
        {activePanel === "password" ? (
          <View className="gap-3 rounded-[12px] bg-card p-4 shadow-sm shadow-black/5">
            <TextInput
              value={currentPassword}
              onChangeText={setCurrentPassword}
              secureTextEntry
              placeholder="Senha atual"
              placeholderTextColor="#b0b8c1"
              className="min-h-[44px] rounded-[12px] bg-background px-4 text-sm text-foreground"
            />
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              placeholder="Nova senha"
              placeholderTextColor="#b0b8c1"
              className="min-h-[44px] rounded-[12px] bg-background px-4 text-sm text-foreground"
            />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholder="Confirmar nova senha"
              placeholderTextColor="#b0b8c1"
              className="min-h-[44px] rounded-[12px] bg-background px-4 text-sm text-foreground"
            />
            <Pressable
              onPress={changePassword}
              disabled={isSubmitting}
              className="min-h-[44px] items-center justify-center rounded-[12px] bg-primary px-4"
              accessibilityRole="button"
            >
              <Text className="text-sm font-semibold text-white">
                {isSubmitting ? "Salvando..." : "Salvar nova senha"}
              </Text>
            </Pressable>
            {passwordStatus ? (
              <Text className="text-xs font-semibold text-primary">{passwordStatus}</Text>
            ) : null}
          </View>
        ) : null}
        <SecurityOption
          icon="shield-checkmark-outline"
          label="Verificacao em duas etapas"
          description="Adicione uma protecao extra para entrar na conta."
          onPress={() => setActivePanel(activePanel === "twoFactor" ? null : "twoFactor")}
        />
        {activePanel === "twoFactor" ? (
          <Text className="rounded-[12px] bg-[#f7eced] p-4 text-sm leading-5 text-muted-foreground">
            A verificacao em duas etapas esta prevista para uma proxima versao. Por enquanto, mantenha sua senha atualizada e nao compartilhe seu acesso.
          </Text>
        ) : null}
        <SecurityOption
          icon="eye-outline"
          label="Visibilidade do perfil"
          description="Defina quais informacoes os clientes podem ver."
          onPress={() => setActivePanel(activePanel === "visibility" ? null : "visibility")}
        />
        {activePanel === "visibility" ? (
          <Text className="rounded-[12px] bg-[#f7eced] p-4 text-sm leading-5 text-muted-foreground">
            Seu perfil profissional exibe nome, foto, especialidades, portfolio, avaliacao e disponibilidade para clientes encontrarem seus servicos.
          </Text>
        ) : null}
        <SecurityOption
          icon="trash-outline"
          label="Excluir dados da conta"
          description="Solicite a remocao dos seus dados do Conecta Obras."
          onPress={() => setActivePanel(activePanel === "delete" ? null : "delete")}
        />
        {activePanel === "delete" ? (
          <View className="gap-3 rounded-[12px] border border-[#f2cdd0] bg-[#fff7f7] p-4">
            <Text className="text-sm leading-5 text-muted-foreground">
              Esta acao remove sua conta profissional e os dados vinculados. Ela nao pode ser desfeita.
            </Text>
            <Pressable
              onPress={deleteAccount}
              disabled={isSubmitting}
              className="min-h-[44px] items-center justify-center rounded-[12px] bg-primary px-4"
              accessibilityRole="button"
            >
              <Text className="text-sm font-semibold text-white">
                {isSubmitting ? "Excluindo..." : "Excluir minha conta"}
              </Text>
            </Pressable>
            {deleteStatus ? (
              <Text className="text-xs font-semibold text-primary">{deleteStatus}</Text>
            ) : null}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}
