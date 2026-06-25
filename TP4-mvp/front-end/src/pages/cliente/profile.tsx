import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

import { ClientBottomNav } from "../../components/cliente";

export function ClientProfilePage({
  onBack,
}: {
  onBack: () => void;
}) {
  const portfolioImages = [
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80",
  ];

  return (
    <View className="relative flex-1 w-full max-w-[480px] bg-background">
      <View className="flex-row items-center justify-between px-5 pt-5 pb-3">
        <Pressable
          className="h-9 w-9 items-center justify-center rounded-[24px] bg-card shadow-sm shadow-black/10"
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={18} color="#0f1720" />
        </Pressable>
        <Text className="text-lg font-bold text-foreground">Perfil do Profissional</Text>
        <View className="h-9 w-9" />
      </View>

      <ScrollView
        className="flex-1 px-5"
        contentContainerClassName="pb-32"
        showsVerticalScrollIndicator={false}
      >
        <View className="mb-5 rounded-[24px] bg-card p-5 shadow-sm shadow-black/5">
          <Image
            source={{ uri: "https://storage.googleapis.com/banani-avatars/avatar/male/35-50/European/0" }}
            className="mb-4 h-52 w-full rounded-[22px]"
            resizeMode="cover"
            accessibilityLabel="Foto do profissional"
          />

          <View className="mb-4 flex-row items-center justify-between">
            <View>
              <Text className="text-2xl font-bold text-foreground">Jhon Souza</Text>
              <Text className="text-sm text-muted-foreground">Pintor profissional</Text>
            </View>
            <View className="items-end">
              <Text className="text-lg font-bold text-primary">R$ 200,00</Text>
              <Text className="text-xs text-muted-foreground">por dia</Text>
            </View>
          </View>

          <View className="mb-4 flex-row items-center gap-3">
            <View className="flex-row items-center gap-1 rounded-full bg-primary/10 px-3 py-1">
              <Ionicons name="star" size={14} color="#2563eb" />
              <Text className="text-sm font-semibold text-primary">4.8</Text>
            </View>
            <View className="flex-row items-center gap-1 rounded-full bg-card px-3 py-1">
              <Ionicons name="clipboard" size={14} color="#4b5563" />
              <Text className="text-sm font-semibold text-muted-foreground">28 trabalhos</Text>
            </View>
          </View>

          <Text className="mb-3 text-base leading-6 text-foreground">
            Especialista em pintura residencial e reformas rápidas. Atendimento
            flexível com orçamentos transparentes e acabamento limpo.
          </Text>

          <View className="flex-row flex-wrap gap-2">
            {['Pintura interna', 'Revestimentos', 'Acabamentos'].map((tag) => (
              <View
                key={tag}
                className="rounded-full bg-primary/10 px-3 py-2"
              >
                <Text className="text-xs font-semibold text-primary">{tag}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mb-5">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-foreground">Portfólio</Text>
            <Pressable accessibilityRole="button" accessibilityLabel="Ver todos os projetos">
              <Text className="text-sm font-semibold text-primary">Ver tudo</Text>
            </Pressable>
          </View>

          <View className="flex-row flex-wrap justify-between gap-3">
            {portfolioImages.map((imageUri) => (
              <Image
                key={imageUri}
                source={{ uri: imageUri }}
                className="h-40 w-[48%] rounded-[12px]"
                resizeMode="cover"
                accessibilityLabel="Imagem do portfólio"
              />
            ))}
          </View>
        </View>

        <View className="rounded-[24px] bg-card p-5 shadow-sm shadow-black/5">
          <Text className="mb-3 text-lg font-bold text-foreground">Informações de contato</Text>
          <View className="mb-3 flex-row items-center justify-between rounded-[20px] bg-background px-4 py-3">
            <Text className="text-sm font-semibold text-foreground">Tempo de resposta</Text>
            <Text className="text-sm text-muted-foreground">1 hora</Text>
          </View>
          <View className="flex-row items-center justify-between rounded-[20px] bg-background px-4 py-3">
            <Text className="text-sm font-semibold text-foreground">Atendimento</Text>
            <Text className="text-sm text-muted-foreground">Seg a Sáb</Text>
          </View>
        </View>
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 px-5 pb-7">
        <ClientBottomNav />
      </View>
    </View>
  );
}
