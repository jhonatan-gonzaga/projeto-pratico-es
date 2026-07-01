import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { Image, Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { CustomerAvatar, ProjectHeader } from "../../components/profissional/components";
import { EmptyState, ErrorState, LoadingState } from "../../components/feedback-state";
import { AudioRecordingState, startAudioRecording, stopAndUploadAudio } from "../../services/audio-upload";
import { ApiError, MessageItem, api } from "../../services/api";
import { pickAndUploadImage } from "../../services/image-upload";

function formatAudioDuration(durationMs?: number | null) {
  const totalSeconds = Math.max(0, Math.round((durationMs ?? 0) / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

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
  const [isSendingImage, setIsSendingImage] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
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

  useEffect(() => {
    return () => {
      void playingAudio?.sound.unloadAsync();
    };
  }, [playingAudio?.sound]);

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

  const sendImage = async () => {
    if (!conversationId || isSendingImage) {
      return;
    }

    setIsSendingImage(true);
    setError(null);

    try {
      const imageUrl = await pickAndUploadImage();

      if (imageUrl) {
        const sent = await api.sendMessage(conversationId, {
          type: "IMAGE",
          imageUrl,
        });
        setMessages((current) => [...current, sent]);
      }
    } catch (imageError) {
      setError(
        imageError instanceof Error
          ? imageError.message
          : "Nao foi possivel enviar a imagem.",
      );
    } finally {
      setIsSendingImage(false);
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
                <Pressable onPress={() => void togglePlayAudio(item)} className="flex-row items-center gap-2">
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
              ) : item.type === "IMAGE" && item.imageUrl ? (
                <Pressable
                  onPress={() => setPreviewImageUrl(item.imageUrl ?? null)}
                  accessibilityRole="imagebutton"
                  accessibilityLabel="Abrir imagem em tela cheia"
                >
                  <Image
                    source={{ uri: item.imageUrl }}
                    className="h-[150px] w-[190px] rounded-[12px]"
                    resizeMode="cover"
                    accessibilityLabel="Imagem enviada no chat"
                  />
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
        <Pressable
          onPress={sendImage}
          disabled={isSendingImage}
          className="h-11 w-11 items-center justify-center rounded-full bg-background"
          accessibilityRole="button"
          accessibilityLabel="Enviar imagem da galeria"
        >
          <Ionicons
            name={isSendingImage ? "hourglass-outline" : "image-outline"}
            size={18}
            color="#b94b50"
          />
        </Pressable>
        <TextInput
          value={message}
          onChangeText={setMessage}
          className="min-h-[44px] flex-1 rounded-[12px] bg-background px-4 text-sm text-foreground"
          placeholder="Digite uma mensagem..."
          placeholderTextColor="#b0b8c1"
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

      <Modal
        visible={Boolean(previewImageUrl)}
        transparent
        animationType="fade"
        onRequestClose={() => setPreviewImageUrl(null)}
      >
        <View className="flex-1 bg-black">
          <Pressable
            onPress={() => setPreviewImageUrl(null)}
            className="absolute right-4 top-12 z-10 h-11 w-11 items-center justify-center rounded-full bg-white/20"
            accessibilityRole="button"
            accessibilityLabel="Fechar imagem"
          >
            <Ionicons name="close" size={24} color="#ffffff" />
          </Pressable>
          {previewImageUrl ? (
            <Image
              source={{ uri: previewImageUrl }}
              className="h-full w-full"
              resizeMode="contain"
              accessibilityLabel="Imagem em tela cheia"
            />
          ) : null}
        </View>
      </Modal>
    </View>
  );
}
