import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, Switch, Text, TextInput, View } from "react-native";

import { ClientBottomNav, type ClientNavKey } from "../../components/cliente";
import {
  ProjectHeader,
  SettingsDivider,
  SettingsOption,
  SettingsSection,
} from "../../components/profissional/components";
import { ApiError, api } from "../../services/api";

type ClientSettingsPage = "home" | "notifications" | "privacy" | "help" | "terms";

type ClientSettingsScreenProps = {
  isDarkMode: boolean;
  onBack: () => void;
  onNavigate?: (key: ClientNavKey) => void;
  onProfilePress?: () => void;
  onSignOut?: () => void;
  onToggleDarkMode: (value: boolean) => void;
};

function NotificationRow({
  description,
  icon,
  label,
  onChange,
  value,
}: {
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onChange: (value: boolean) => void;
  value: boolean;
}) {
  return (
    <View className="flex-row items-center gap-3 rounded-[12px] bg-card p-4 shadow-sm shadow-black/5">
      <View className="h-10 w-10 items-center justify-center rounded-[12px] bg-[#fceaea]">
        <Ionicons name={icon} size={18} color="#b94b50" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-foreground">{label}</Text>
        <Text className="mt-0.5 text-xs leading-4 text-muted-foreground">
          {description}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        thumbColor={value ? "#b94b50" : "#f4f4f5"}
        trackColor={{ false: "#e4dada", true: "#f2cdd0" }}
      />
    </View>
  );
}

function ClientNotificationsScreen({
  onBack,
  onProfilePress,
}: {
  onBack: () => void;
  onProfilePress?: () => void;
}) {
  const [messages, setMessages] = useState(true);
  const [ads, setAds] = useState(true);
  const [status, setStatus] = useState(false);

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
            Notificacoes
          </Text>
          <Text className="mt-1 text-sm text-muted-foreground">
            Escolha quais avisos deseja receber.
          </Text>
        </View>

        <NotificationRow
          icon="chatbubble-outline"
          label="Mensagens"
          description="Receber avisos quando profissionais enviarem respostas."
          value={messages}
          onChange={setMessages}
        />
        <NotificationRow
          icon="megaphone-outline"
          label="Anuncios"
          description="Receber atualizacoes dos anuncios publicados."
          value={ads}
          onChange={setAds}
        />
        <NotificationRow
          icon="hammer-outline"
          label="Minha obra"
          description="Avisar quando houver mudanca no andamento dos servicos."
          value={status}
          onChange={setStatus}
        />
      </ScrollView>
    </View>
  );
}

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

function ClientPrivacyScreen({
  onBack,
  onProfilePress,
  onSignOut,
}: {
  onBack: () => void;
  onProfilePress?: () => void;
  onSignOut?: () => void;
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
      onSignOut?.();
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
            Controle senha, dados e protecao da sua conta.
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
          label="Visibilidade dos dados"
          description="Defina quais dados podem aparecer para profissionais."
          onPress={() => setActivePanel(activePanel === "visibility" ? null : "visibility")}
        />
        {activePanel === "visibility" ? (
          <Text className="rounded-[12px] bg-[#f7eced] p-4 text-sm leading-5 text-muted-foreground">
            Seus dados de contato aparecem apenas em interacoes relacionadas a anuncios, contratos e conversas dentro da plataforma.
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
              Esta acao remove sua conta e os dados vinculados. Ela nao pode ser desfeita.
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

function HelpCard({
  description,
  icon,
  title,
}: {
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
}) {
  return (
    <Pressable
      className="rounded-[12px] bg-card p-4 shadow-sm shadow-black/5"
      accessibilityRole="button"
    >
      <View className="mb-2 flex-row items-center gap-2">
        <Ionicons name={icon} size={18} color="#b94b50" />
        <Text className="text-base font-bold text-foreground">{title}</Text>
      </View>
      <Text className="text-sm leading-5 text-muted-foreground">
        {description}
      </Text>
    </Pressable>
  );
}

function ClientHelpScreen({
  onBack,
  onProfilePress,
}: {
  onBack: () => void;
  onProfilePress?: () => void;
}) {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendSupportMessage = async () => {
    if (subject.trim().length < 3 || message.trim().length < 10) {
      setStatus("Informe um assunto e uma mensagem com pelo menos 10 caracteres.");
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      await api.createSupportTicket({
        subject,
        message,
        context: "CLIENTE",
      });
      setSubject("");
      setMessage("");
      setStatus("Mensagem enviada ao suporte e salva com sucesso.");
    } catch (error) {
      setStatus(
        error instanceof ApiError ? error.message : "Nao foi possivel enviar a mensagem.",
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
            Central de Ajuda
          </Text>
          <Text className="mt-1 text-sm text-muted-foreground">
            Encontre respostas rapidas para usar sua conta de cliente.
          </Text>
        </View>

        <HelpCard
          icon="search-outline"
          title="Como encontrar profissionais?"
          description="Use a guia Buscar para filtrar por categoria, preco, avaliacao e servicos disponiveis."
        />
        <HelpCard
          icon="megaphone-outline"
          title="Como criar um anuncio?"
          description="Abra a guia Anunciar, toque em criar novo anuncio e descreva o servico que precisa."
        />
        <HelpCard
          icon="hammer-outline"
          title="Como acompanhar minha obra?"
          description="Use Minha obra para acompanhar servicos, conversar com profissionais e conferir detalhes."
        />

        <View className="rounded-[12px] bg-[#f7eced] p-4">
          <Text className="text-base font-bold text-foreground">
            Precisa de suporte?
          </Text>
          <Text className="mt-1 text-sm leading-5 text-muted-foreground">
            Entre em contato pelo atendimento do Conecta Obras para tirar
            duvidas sobre conta, anuncios ou seguranca.
          </Text>
          <View className="mt-4 gap-3">
            <TextInput
              value={subject}
              onChangeText={setSubject}
              placeholder="Assunto"
              placeholderTextColor="#b0b8c1"
              className="min-h-[44px] rounded-[12px] bg-card px-4 text-sm text-foreground"
            />
            <TextInput
              value={message}
              onChangeText={setMessage}
              multiline
              placeholder="Descreva sua duvida ou problema"
              placeholderTextColor="#b0b8c1"
              className="min-h-[96px] rounded-[12px] bg-card px-4 py-3 text-sm leading-5 text-foreground"
            />
            <Pressable
              onPress={sendSupportMessage}
              disabled={isSubmitting}
              className="min-h-[46px] flex-row items-center justify-center gap-2 rounded-[12px] bg-primary px-4"
              accessibilityRole="button"
            >
              <Ionicons name="chatbubble-ellipses-outline" size={17} color="#ffffff" />
              <Text className="text-sm font-semibold text-white">
                {isSubmitting ? "Enviando..." : "Enviar para suporte"}
              </Text>
            </Pressable>
            {status ? (
              <Text className="text-xs font-semibold text-primary">{status}</Text>
            ) : null}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

function ClientTermsScreen({
  onBack,
  onProfilePress,
}: {
  onBack: () => void;
  onProfilePress?: () => void;
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
            Termos de Uso
          </Text>
          <Text className="mt-1 text-sm text-muted-foreground">
            Texto ficticio para revisao e edicao futura.
          </Text>
        </View>

        {[
          {
            title: "1. Aceite dos termos",
            text: "Ao utilizar o Conecta Obras, o cliente declara que leu e concorda com estas condicoes gerais.",
          },
          {
            title: "2. Anuncios e solicitacoes",
            text: "O cliente deve informar dados verdadeiros sobre o servico solicitado para facilitar o contato com profissionais.",
          },
          {
            title: "3. Negociacao dos servicos",
            text: "A negociacao, prazo, valor e realizacao do servico sao de responsabilidade das partes envolvidas.",
          },
          {
            title: "4. Privacidade",
            text: "Informacoes pessoais devem ser utilizadas apenas para comunicacao e execucao dos servicos dentro da plataforma.",
          },
        ].map((item) => (
          <View
            key={item.title}
            className="rounded-[12px] bg-card p-4 shadow-sm shadow-black/5"
          >
            <Text className="mb-3 text-base font-bold text-foreground">
              {item.title}
            </Text>
            <Text className="text-sm leading-6 text-muted-foreground">
              {item.text}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export function ClientSettingsScreen({
  isDarkMode,
  onBack,
  onNavigate,
  onProfilePress,
  onSignOut,
  onToggleDarkMode,
}: ClientSettingsScreenProps) {
  const [settingsPage, setSettingsPage] = useState<ClientSettingsPage>("home");

  if (settingsPage === "notifications") {
    return (
      <ClientNotificationsScreen
        onBack={() => setSettingsPage("home")}
        onProfilePress={onProfilePress}
      />
    );
  }

  if (settingsPage === "privacy") {
    return (
        <ClientPrivacyScreen
          onBack={() => setSettingsPage("home")}
          onProfilePress={onProfilePress}
          onSignOut={onSignOut}
        />
    );
  }

  if (settingsPage === "help") {
    return (
      <ClientHelpScreen
        onBack={() => setSettingsPage("home")}
        onProfilePress={onProfilePress}
      />
    );
  }

  if (settingsPage === "terms") {
    return (
      <ClientTermsScreen
        onBack={() => setSettingsPage("home")}
        onProfilePress={onProfilePress}
      />
    );
  }

  return (
    <View className="relative flex-1 w-full max-w-[480px] bg-background">
      <ProjectHeader onBack={onBack} onProfilePress={onProfilePress} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-32 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-5 text-[28px] font-bold leading-9 text-foreground">
          Configuracoes
        </Text>

        <SettingsSection title="Preferencias">
          <View className="flex-row items-center gap-4 px-4 py-4">
            <View className="h-10 w-10 items-center justify-center rounded-[12px] bg-[#fceaea]">
              <Ionicons name="moon-outline" size={18} color="#b94b50" />
            </View>
            <View className="flex-1">
              <Text className="text-[15px] font-medium text-foreground">
                Modo escuro
              </Text>
              <Text className="mt-0.5 text-xs leading-4 text-muted-foreground">
                Ajusta cores do aplicativo para ambientes com pouca luz.
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={onToggleDarkMode}
              thumbColor={isDarkMode ? "#eb747a" : "#f4f4f5"}
              trackColor={{ false: "#e4dada", true: "#4b2528" }}
            />
          </View>
          <SettingsDivider />
          <SettingsOption
            icon="notifications-outline"
            label="Notificacoes"
            onPress={() => setSettingsPage("notifications")}
          />
          <SettingsDivider />
          <SettingsOption
            icon="lock-closed-outline"
            label="Privacidade e Seguranca"
            onPress={() => setSettingsPage("privacy")}
          />
        </SettingsSection>

        <SettingsSection title="Suporte">
          <SettingsOption
            icon="help-circle-outline"
            label="Central de Ajuda"
            onPress={() => setSettingsPage("help")}
          />
          <SettingsDivider />
          <SettingsOption
            icon="document-text-outline"
            label="Termos de Uso"
            onPress={() => setSettingsPage("terms")}
          />
        </SettingsSection>

        <View className="overflow-hidden rounded-[16px] bg-muted shadow-sm shadow-black/5">
          <Pressable
            onPress={onSignOut}
            className="flex-row items-center justify-center gap-2 px-4 py-4"
            accessibilityRole="button"
          >
            <Ionicons name="log-out-outline" size={18} color="#b94b50" />
            <Text className="text-[15px] font-semibold text-primary">
              Sair da Conta
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 px-5 pb-2">
        <ClientBottomNav active="settings" onSelect={onNavigate} />
      </View>
    </View>
  );
}
