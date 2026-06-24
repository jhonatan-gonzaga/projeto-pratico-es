import { Ionicons } from "@expo/vector-icons";
import { Linking, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import type { ProfessionalService } from "../../components/profissional/types";
import {
  CustomerAvatar,
  ProjectHeader,
  StatusBadge,
} from "../../components/profissional/components";

export function ServiceMessageScreen({
  onBack,
  onProfilePress,
  service,
}: {
  onBack: () => void;
  onProfilePress: () => void;
  service: ProfessionalService;
}) {
  const openWhatsapp = () => {
    Linking.openURL("https://wa.me/5592999999999");
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
        <View className="max-w-[78%] self-start rounded-[16px] rounded-tl-[4px] bg-card px-4 py-3 shadow-sm shadow-black/5">
          <Text className="text-sm leading-5 text-foreground">
            Bom dia! Podemos confirmar o horario do servico?
          </Text>
          <Text className="mt-1 text-[11px] text-muted-foreground">08:12</Text>
        </View>

        <View className="max-w-[78%] self-end rounded-[16px] rounded-tr-[4px] bg-primary px-4 py-3">
          <Text className="text-sm leading-5 text-white">
            Bom dia, posso sim. Chego no endereco as 8h.
          </Text>
          <Text className="mt-1 text-right text-[11px] text-white/80">
            08:15
          </Text>
        </View>

        <View className="max-w-[78%] self-start rounded-[16px] rounded-tl-[4px] bg-card px-4 py-3 shadow-sm shadow-black/5">
          <Text className="text-sm leading-5 text-foreground">
            Perfeito. Vou deixar o material separado.
          </Text>
          <Text className="mt-1 text-[11px] text-muted-foreground">08:18</Text>
        </View>

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

      <View className="flex-row items-center gap-2 border-t border-input-border bg-card px-4 py-3">
        <TextInput
          className="min-h-[44px] flex-1 rounded-[12px] bg-background px-4 text-sm text-foreground"
          placeholder="Digite uma mensagem..."
          placeholderTextColor="#8a8a96"
          accessibilityLabel="Mensagem"
        />
        <Pressable
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
