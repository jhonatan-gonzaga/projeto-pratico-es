import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { CustomerAvatar, ProjectHeader } from "../../components/profissional/components";
import { EmptyState, ErrorState, LoadingState } from "../../components/feedback-state";
import { AudioRecordingState, startAudioRecording, stopAndUploadAudio } from "../../services/audio-upload";
import { ApiError, MessageItem, api } from "../../services/api";

export function ClientMessageScreen({
  onBack,
  onHire,
  onProfilePress,
  conversationId,
  professionalName = "Jhon Souza",
}: {
  onBack: () => void;
  onHire?: () => void;
  onProfilePress?: () => void;
  conversationId?: string | null;
  professionalName?: string;
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(conversationId));
  const [error, setError] = useState<string | null>(null);
  const [recordingState, setRecordingState] = useState<AudioRecordingState>({
    recording: null,
    startedAt: null,
  });

  const loadMessages = async () => {
    if (!conversationId) {
      setMessages([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [user, items] = await Promise.all([
        api.me(),
        api.conversationMessages(conversationId),
      ]);
      setCurrentUserId(user.id);
      setMessages(items);
    } catch (loadError) {
      setError(loadError instanceof ApiError ? loadError.message : "Nao foi possivel carregar mensagens.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadMessages();
  }, [conversationId]);

  const sendMessage = async () => {
    const trimmed = message.trim();

    if (!trimmed || !conversationId) {
      return;
    }

    try {
      const sent = await api.sendMessage(conversationId, { text: trimmed });
      setMessages((current) => [...current, sent]);
      setMessage("");
    } catch (sendError) {
      setError(sendError instanceof ApiError ? sendError.message : "Nao foi possivel enviar mensagem.");
    }
  };

  const toggleAudio = async () => {
    if (!conversationId) {
      return;
    }

    try {
      if (recordingState.recording) {
        const uploaded = await stopAndUploadAudio(recordingState);
        setRecordingState({ recording: null, startedAt: null });

        if (uploaded) {
          const sent = await api.sendMessage(conversationId, {
            type: "AUDIO",
            audioUrl: uploaded.url,
            durationMs: uploaded.durationMs,
          });
          setMessages((current) => [...current, sent]);
        }
        return;
      }

      setRecordingState(await startAudioRecording());
    } catch (audioError) {
      setRecordingState({ recording: null, startedAt: null });
      setError(audioError instanceof Error ? audioError.message : "Nao foi possivel gravar audio.");
    }
  };

  const playAudio = async (url: string) => {
    const { sound } = await Audio.Sound.createAsync({ uri: url });
    await sound.playAsync();
  };

  return (
    <View className="h-full w-full max-w-[480px] self-center bg-background">
      <ProjectHeader onBack={onBack} onProfilePress={onProfilePress} />

      <View className="border-b border-input-border bg-card px-4 py-3">
        <View className="flex-row items-center gap-3">
          <CustomerAvatar name={professionalName} />
          <View className="flex-1">
            <Text className="text-base font-bold text-foreground">
              {professionalName}
            </Text>
            <Text className="text-xs text-muted-foreground">Pintor</Text>
          </View>
          <Pressable
            onPress={onHire}
            className="shrink-0 rounded-full bg-[#25d366] px-4 py-1.5"
            accessibilityRole="button"
            accessibilityLabel="Contratar profissional"
          >
            <Text className="text-xs font-semibold text-white">Contratar</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-3 px-4 py-5"
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <LoadingState label="Carregando mensagens..." />
        ) : error ? (
          <ErrorState message={error} onRetry={loadMessages} />
        ) : !conversationId ? (
          <EmptyState message="Envie uma solicitacao para liberar o chat." />
        ) : messages.length === 0 ? (
          <EmptyState message="Nenhuma mensagem enviada ainda." />
        ) : messages.map((item) => {
          const isMine = item.sender.id === currentUserId;

          return (
            <View
              key={item.id}
              className={`max-w-[78%] rounded-[16px] px-4 py-3 ${
                isMine
                  ? "self-end rounded-tr-[4px] bg-primary"
                  : "self-start rounded-tl-[4px] bg-card shadow-sm shadow-black/5"
              }`}
            >
              {item.type === "AUDIO" && item.audioUrl ? (
                <Pressable onPress={() => void playAudio(item.audioUrl ?? "")} className="flex-row items-center gap-2">
                  <Ionicons name="play-circle" size={20} color={isMine ? "#ffffff" : "#b94b50"} />
                  <Text className={`text-sm ${isMine ? "text-white" : "text-foreground"}`}>
                    Audio
                  </Text>
                </Pressable>
              ) : (
                <Text
                  className={`text-sm leading-5 ${
                    isMine ? "text-white" : "text-foreground"
                  }`}
                >
                  {item.text}
                </Text>
              )}
              <Text
                className={`mt-1 text-[11px] ${
                  isMine ? "text-right text-white/80" : "text-muted-foreground"
                }`}
              >
                {new Intl.DateTimeFormat("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(item.createdAt))}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      <View className="flex-row items-center gap-2 border-t border-input-border bg-card px-4 py-3">
        <TextInput
          value={message}
          onChangeText={setMessage}
          className="min-h-[44px] flex-1 rounded-[12px] bg-background px-4 text-sm text-foreground"
          placeholder="Digite uma mensagem..."
          placeholderTextColor="#8a8a96"
          accessibilityLabel="Mensagem"
        />
        <Pressable
          onPress={toggleAudio}
          className={`h-11 w-11 items-center justify-center rounded-full ${
            recordingState.recording ? "bg-[#dc2626]" : "bg-background"
          }`}
          accessibilityRole="button"
          accessibilityLabel="Gravar audio"
        >
          <Ionicons
            name={recordingState.recording ? "stop" : "mic-outline"}
            size={18}
            color={recordingState.recording ? "#ffffff" : "#b94b50"}
          />
        </Pressable>
        <Pressable
          onPress={sendMessage}
          className="h-11 w-11 items-center justify-center rounded-full bg-primary"
          accessibilityRole="button"
          accessibilityLabel="Enviar mensagem"
        >
          <Ionicons name="send" size={17} color="#ffffff" />
        </Pressable>
      </View>
    </View>
  );
}
