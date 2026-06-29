import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Switch, Text, View } from "react-native";
import { useEffect, useState } from "react";

import { EmptyState, ErrorState, LoadingState } from "../../components/feedback-state";
import { ProjectHeader } from "../../components/profissional/components";
import { ApiError, NotificationItem, api } from "../../services/api";

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

export function NotificationsScreen({
  onBack,
  onProfilePress,
}: {
  onBack: () => void;
  onProfilePress: () => void;
}) {
  const [messages, setMessages] = useState(true);
  const [ads, setAds] = useState(true);
  const [reviews, setReviews] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const loadNotifications = async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      setNotifications(await api.notifications());
    } catch (error) {
      setLoadError(
        error instanceof ApiError
          ? error.message
          : "Nao foi possivel carregar notificacoes.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadNotifications();
  }, []);

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
          label="Ativar mensagem"
          description="Receber avisos quando clientes enviarem mensagens."
          value={messages}
          onChange={setMessages}
        />
        <NotificationRow
          icon="megaphone-outline"
          label="Ativar notificacao de anuncio"
          description="Receber novidades e oportunidades anunciadas."
          value={ads}
          onChange={setAds}
        />
        <NotificationRow
          icon="star-outline"
          label="Receber notificacao de avaliacao"
          description="Avisar quando um cliente avaliar seu servico."
          value={reviews}
          onChange={setReviews}
        />

        <View className="mt-2">
          <Text className="mb-3 text-lg font-bold text-foreground">
            Avisos recentes
          </Text>
          {isLoading ? (
            <LoadingState label="Carregando notificacoes..." />
          ) : loadError ? (
            <ErrorState message={loadError} onRetry={loadNotifications} />
          ) : notifications.length === 0 ? (
            <EmptyState message="Voce ainda nao possui notificacoes." />
          ) : (
            <View className="gap-3">
              {notifications.map((notification) => (
                <View
                  key={notification.id}
                  className="rounded-[12px] bg-card p-4 shadow-sm shadow-black/5"
                >
                  <Text className="text-sm font-bold text-foreground">
                    {notification.title}
                  </Text>
                  <Text className="mt-1 text-sm leading-5 text-muted-foreground">
                    {notification.body}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
