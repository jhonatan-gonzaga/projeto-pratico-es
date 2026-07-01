import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { ProjectHeader } from "../../components/profissional/components";
import { ApiError, api } from "../../services/api";

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

export function HelpCenterScreen({
  onBack,
  onProfilePress,
}: {
  onBack: () => void;
  onProfilePress: () => void;
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
        context: "PROFISSIONAL",
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
            Encontre respostas rapidas para usar sua conta profissional.
          </Text>
        </View>

        <HelpCard
          icon="briefcase-outline"
          title="Como aceitar novos pedidos?"
          description="Abra a guia Oportunidades, confira os detalhes do pedido e toque em Aceitar quando puder realizar o servico."
        />
        <HelpCard
          icon="images-outline"
          title="Como cadastrar meus projetos?"
          description="Use a guia Meus Projetos para adicionar fotos, categorias e descricao dos servicos ja realizados."
        />
        <HelpCard
          icon="wallet-outline"
          title="Pagamentos e valores"
          description="Combine valores com o cliente antes de iniciar. Os valores exibidos servem como referencia do pedido."
        />

        <View className="rounded-[12px] bg-[#f7eced] p-4">
          <Text className="text-base font-bold text-foreground">
            Precisa de suporte?
          </Text>
          <Text className="mt-1 text-sm leading-5 text-muted-foreground">
            Entre em contato pelo atendimento do Conecta Obras para tirar
            duvidas sobre conta, servicos ou seguranca.
          </Text>
          <View className="mt-4 gap-3">
            <TextInput
              value={subject}
              onChangeText={setSubject}
              placeholder="Assunto"
              placeholderTextColor="#9e8e8f"
              className="min-h-[44px] rounded-[12px] bg-card px-4 text-sm text-foreground"
            />
            <TextInput
              value={message}
              onChangeText={setMessage}
              multiline
              placeholder="Descreva sua duvida ou problema"
              placeholderTextColor="#9e8e8f"
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
