import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Linking, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import type { ProfessionalService } from "../../components/profissional/types";
import {
  CustomerAvatar,
  ProjectHeader,
  StatusBadge,
} from "../../components/profissional/components";
import { validateMessage } from "../../services/validators";

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
  const [messageTouched, setMessageTouched] = useState(false);
  const [messageSubmitted, setMessageSubmitted] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "1",
      fromMe: false,
      text: "Bom dia! Podemos confirmar o horario do servico?",
      time: "08:12",
    },
    {
      id: "2",
      fromMe: true,
      text: "Bom dia, posso sim. Chego no endereco as 8h.",
      time: "08:15",
    },
    {
      id: "3",
      fromMe: false,
      text: "Perfeito. Vou deixar o material separado.",
      time: "08:18",
    },
  ]);

  const openWhatsapp = () => {
    Linking.openURL("https://wa.me/5592999999999");
  };

  const sendMessage = () => {
    const trimmed = message.trim();
    const validation = validateMessage(message);
    setMessageSubmitted(true);

    if (!validation.isValid) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: `${Date.now()}`,
        fromMe: true,
        text: trimmed,
        time: "Agora",
      },
    ]);
    setMessage("");
    setMessageSubmitted(false);
    setMessageTouched(false);
  };
  const messageValidation = validateMessage(message);
  const showMessageError =
    (messageTouched || messageSubmitted) && !messageValidation.isValid;

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
        {messages.map((item) => (
          <View
            key={item.id}
            className={`max-w-[78%] rounded-[16px] px-4 py-3 ${
              item.fromMe
                ? "self-end rounded-tr-[4px] bg-primary"
                : "self-start rounded-tl-[4px] bg-card shadow-sm shadow-black/5"
            }`}
          >
            <Text
              className={`text-sm leading-5 ${
                item.fromMe ? "text-white" : "text-foreground"
              }`}
            >
              {item.text}
            </Text>
            <Text
              className={`mt-1 text-[11px] ${
                item.fromMe ? "text-right text-white/80" : "text-muted-foreground"
              }`}
            >
              {item.time}
            </Text>
          </View>
        ))}

        <Pressable
          onPress={openWhatsapp}
          className="mt-2 flex-row items-center justify-center gap-2 rounded-[12px] border border-primary bg-[#f7eced] px-4 py-3"
          accessibilityRole="button"
        >
          <Ionicons name="logo-whatsapp" size={18} color="#b94b50" />
          <Text className="text-sm font-semibold text-primary">
            Continuar conversa pelo WhatsApp
          </Text>
        </Pressable>
      </ScrollView>

      <View className="border-t border-input-border bg-card px-4 py-3">
        <View className="flex-row items-center gap-2">
          <View
            className={`min-h-[44px] flex-1 flex-row items-center rounded-[12px] border px-4 ${
              showMessageError
                ? "border-[#dc2626] bg-[#fff7f7]"
                : messageTouched
                  ? "border-[#16a34a] bg-[#f7fff9]"
                  : "border-transparent bg-background"
            }`}
          >
            <TextInput
              value={message}
              onBlur={() => setMessageTouched(true)}
              onChangeText={setMessage}
              className="min-h-[42px] flex-1 p-0 text-sm text-foreground"
              placeholder="Digite uma mensagem..."
              placeholderTextColor="#8a8a96"
              accessibilityLabel="Mensagem"
            />
            {messageTouched || messageSubmitted ? (
              <Ionicons
                name={messageValidation.isValid ? "checkmark-circle" : "alert-circle"}
                size={18}
                color={messageValidation.isValid ? "#16a34a" : "#dc2626"}
              />
            ) : null}
          </View>
          <Pressable
            onPress={sendMessage}
            className="h-11 w-11 items-center justify-center rounded-full bg-primary"
            accessibilityRole="button"
            accessibilityLabel="Enviar mensagem"
          >
            <Ionicons name="send" size={17} color="#ffffff" />
          </Pressable>
        </View>
        {showMessageError ? (
          <Text className="mt-1 px-1 text-xs leading-4 text-[#dc2626]">
            {messageValidation.message}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
