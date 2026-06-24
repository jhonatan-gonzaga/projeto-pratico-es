import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";

import { ProjectHeader } from "../../components/profissional/components";

function SecurityOption({
  description,
  icon,
  label,
}: {
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}) {
  return (
    <Pressable
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
}: {
  onBack: () => void;
  onProfilePress: () => void;
}) {
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
        />
        <SecurityOption
          icon="shield-checkmark-outline"
          label="Verificacao em duas etapas"
          description="Adicione uma protecao extra para entrar na conta."
        />
        <SecurityOption
          icon="eye-outline"
          label="Visibilidade do perfil"
          description="Defina quais informacoes os clientes podem ver."
        />
        <SecurityOption
          icon="trash-outline"
          label="Excluir dados da conta"
          description="Solicite a remocao dos seus dados do Conecta Obras."
        />
      </ScrollView>
    </View>
  );
}
