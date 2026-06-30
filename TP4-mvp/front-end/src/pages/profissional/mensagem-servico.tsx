import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import type { ProfessionalService } from "../../components/profissional/types";
import {
  CustomerAvatar,
  ProjectHeader,
  StatusBadge,
} from "../../components/profissional/components";
import { EmptyState, ErrorState, LoadingState } from "../../components/feedback-state";
import {
  AudioRecordingState,
  startAudioRecording,
  stopAndUploadAudio,
} from "../../services/audio-upload";
import { ApiError, MessageItem, api } from "../../services/api";
import { validateMessage } from "../../services/validators";

function formatAudioDuration(durationMs?: number | null) {
  const totalSeconds = Math.max(0, Math.round((durationMs ?? 0) / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function ServiceMessageScreen({
  onBack,
  onProfilePress,
  service,
}: {
  onBack: () => void;
  onProfilePress: () => void;
  service: ProfessionalService;
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(service.conversationId));
  const [error, setError] = useState<string | null>(null);
  const [recordingState, setRecordingState] = useState<AudioRecordingState>({
    recording: null,
    startedAt: null,
  });
  const [playingAudio, setPlayingAudio] = useState<{
    id: string;
    isPlaying: boolean;
    sound: Audio.Sound;
  } | null>(null);

  const loadMessages = async () => {
    if (!service.conversationId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [user, items] = await Promise.all([
        api.me(),
        api.conversationMessages(service.conversationId),
      ]);
      setCurrentUserId(user.id);
      setMessages(items);
    } catch (loadError) {
      setError(
        loadError instanceof ApiError
          ? loadError.message
          : "Nao foi possivel carregar mensagens.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadMessages();
  }, [service.conversationId]);

  useEffect(() => {
    return () => {
      void playingAudio?.sound.unloadAsync();
    };
  }, [playingAudio?.sound]);

  const sendMessage = async () => {
    const validation = validateMessage(message);

    if (!validation.isValid || !service.conversationId) {
      setError(validation.message ?? "Digite uma mensagem.");
      return;
    }

    try {
      const sent = await api.sendMessage(service.conversationId, {
        text: message.trim(),
      });
      setMessages((current) => [...current, sent]);
      setMessage("");
      setError(null);
    } catch (sendError) {
      setError(
        sendError instanceof ApiError
          ? sendError.message
          : "Nao foi possivel enviar mensagem.",
      );
    }
  };

  const toggleAudio = async () => {
    if (!service.conversationId) {
      return;
    }

    try {
      if (recordingState.recording) {
        const uploaded = await stopAndUploadAudio(recordingState);
        setRecordingState({ recording: null, startedAt: null });

        if (uploaded) {
          const sent = await api.sendMessage(service.conversationId, {
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
      setError(
        audioError instanceof Error
          ? audioError.message
          : "Nao foi possivel gravar audio.",
      );
    }
  };

  const togglePlayAudio = async (item: MessageItem) => {
    if (!item.audioUrl) {
      return;
    }

    if (playingAudio?.id === item.id) {
      const status = await playingAudio.sound.getStatusAsync();

      if (status.isLoaded && status.isPlaying) {
        await playingAudio.sound.pauseAsync();
        setPlayingAudio((current) =>
          current?.id === item.id ? { ...current, isPlaying: false } : current,
        );
        return;
      }

      await playingAudio.sound.playAsync();
      setPlayingAudio((current) =>
        current?.id === item.id ? { ...current, isPlaying: true } : current,
      );
      return;
    }

    if (playingAudio) {
      await playingAudio.sound.unloadAsync();
    }

    const { sound } = await Audio.Sound.createAsync(
      { uri: item.audioUrl },
      { shouldPlay: true },
    );
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.isLoaded && status.didJustFinish) {
        setPlayingAudio((current) => (current?.id === item.id ? null : current));
      }
    });
    setPlayingAudio({ id: item.id, isPlaying: true, sound });
  };

  return (
    <View className="h-full w-full max-w-[480px] self-center bg-background">
      <ProjectHeader onBack={onBack} onProfilePress={onProfilePress} />

      <View className="border-b border-input-border bg-card px-4 py-3">
        <View className="flex-row items-center gap-3">
          <CustomerAvatar name={service.customer} />
          <View className="flex-1">
            <Text className="text-base font-bold text-foreground">
              {service.customer}
            </Text>
            <Text className="text-xs text-muted-foreground">
              Pedido #{service.order} - {service.title}
            </Text>
          </View>
          <StatusBadge status={service.status} />
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
        ) : !service.conversationId ? (
          <EmptyState message="Este servico ainda nao possui conversa." />
        ) : messages.length === 0 ? (
          <EmptyState message="Nenhuma mensagem enviada ainda." />
        ) : (
          messages.map((item) => {
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
                  <Pressable
                    onPress={() => void togglePlayAudio(item)}
                    className="flex-row items-center gap-2"
                  >
                    <Ionicons
                      name={
                        playingAudio?.id === item.id && playingAudio.isPlaying
                          ? "pause-circle"
                          : "play-circle"
                      }
                      size={20}
                      color={isMine ? "#ffffff" : "#b94b50"}
                    />
                    <Text className={`text-sm ${isMine ? "text-white" : "text-foreground"}`}>
                      Audio {formatAudioDuration(item.durationMs)}
                    </Text>
                  </Pressable>
                ) : (
                  <Text className={`text-sm leading-5 ${isMine ? "text-white" : "text-foreground"}`}>
                    {item.text}
                  </Text>
                )}
                <Text className={`mt-1 text-[11px] ${isMine ? "text-right text-white/80" : "text-muted-foreground"}`}>
                  {new Intl.DateTimeFormat("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(item.createdAt))}
                </Text>
              </View>
            );
          })
        )}
      </ScrollView>

      <View className="border-t border-input-border bg-card px-4 py-3">
        <View className="flex-row items-center gap-2">
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
    </View>
  );
}
