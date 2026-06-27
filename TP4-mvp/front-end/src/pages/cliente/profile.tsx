import { Ionicons } from "@expo/vector-icons";
import { Image, Linking, Pressable, ScrollView, Text, View } from "react-native";
import { useState } from "react";

import { ClientBottomNav, type ClientNavKey } from "../../components/cliente";
import { ProjectHeader } from "../../components/profissional/components";
import { projectItems } from "../../components/profissional/data";
import { MyProjectsScreen } from "../profissional/meus-projetos";
import { ProjectResultScreen } from "../profissional/resultado-projeto";
import { ClientMessageScreen } from "./mensagem-profissional";

const availabilityDays = [
  { label: "S", available: true },
  { label: "T", available: true },
  { label: "Q", available: false },
  { label: "Q", available: true },
  { label: "S", available: true },
  { label: "S", available: false },
  { label: "D", available: false },
];

const specializations = [
  "Construção",
  "Elétrica",
  "Encanamento",
  "Pintura",
  "Reparo",
];

const portfolioItems = [
  {
    label: "Pintura",
    uri: "https://storage.googleapis.com/banani-generated-images/generated-images/08de1ae8-bbd2-4896-aace-c871f42c87de.jpg",
  },
  {
    label: "Construção",
    uri: "https://storage.googleapis.com/banani-generated-images/generated-images/25cb0462-d71b-43d5-9eb9-e76966027a00.jpg",
  },
  {
    label: "Elétrica",
    uri: "https://storage.googleapis.com/banani-generated-images/generated-images/9caf63aa-e77f-4db7-9a50-600da3d15d3d.jpg",
  },
  {
    label: "Encanamento",
    uri: "https://storage.googleapis.com/banani-generated-images/generated-images/dcfdc144-9568-4d58-acce-aaaf1e921982.jpg",
  },
  {
    label: "Reparo",
    uri: "https://storage.googleapis.com/banani-generated-images/generated-images/47017bff-305f-4aa7-b64b-d81070213515.jpg",
  },
];

const reviews = [
  {
    name: "Mariana Silva",
    avatarUri: "https://storage.googleapis.com/banani-avatars/avatar/female/25-35/Hispanic/2",
    when: "Há 2 dias",
    rating: "5.0",
    comment:
      "Ótimo profissional! Fez a pintura da minha casa inteira em tempo recorde e com muita qualidade. Recomendo muito o trabalho do Luiz.",
  },
  {
    name: "Roberto Gomes",
    avatarUri: "https://storage.googleapis.com/banani-avatars/avatar/male/35-50/African/3",
    when: "Há 1 semana",
    rating: "4.5",
    comment:
      "Trabalho muito bom na parte elétrica e reparos gerais. Foi muito atencioso do começo ao fim. Com certeza contratarei novamente.",
  },
];

export function ClientProfilePage({
  onBack,
  onNavigate,
  onProfilePress,
}: {
  onBack: () => void;
  onNavigate?: (key: ClientNavKey) => void;
  onProfilePress?: () => void;
}) {
  const [isShowingPortfolio, setIsShowingPortfolio] = useState(false);
  const [isViewingProjectResult, setIsViewingProjectResult] = useState(false);
  const [isShowingMessages, setIsShowingMessages] = useState(false);

  const handleOpenPortfolio = () => setIsShowingPortfolio(true);
  const handleClosePortfolio = () => setIsShowingPortfolio(false);
  const handleOpenProjectResult = () => setIsViewingProjectResult(true);

  if (isShowingMessages) {
    return (
      <ClientMessageScreen
        onBack={() => setIsShowingMessages(false)}
        onProfilePress={onProfilePress}
      />
    );
  }

  if (isViewingProjectResult) {
    return (
      <ProjectResultScreen
        onBack={() => setIsViewingProjectResult(false)}
        readOnly
      />
    );
  }

  if (isShowingPortfolio) {
    return (
      <MyProjectsScreen
        onBack={handleClosePortfolio}
        projects={projectItems}
        onViewResult={() => setIsViewingProjectResult(true)}
        readOnly
      />
    );
  }

  const handleOpenWhatsApp = async () => {
    const phoneNumber = "+5511999999999";
    const whatsappUrl = `whatsapp://send?phone=${phoneNumber}`;

    try {
      const supported = await Linking.canOpenURL(whatsappUrl);
      if (supported) {
        await Linking.openURL(whatsappUrl);
      } else {
        await Linking.openURL(`https://api.whatsapp.com/send?phone=${phoneNumber}`);
      }
    } catch (error) {
      console.warn("Não foi possível abrir o WhatsApp:", error);
    }
  };

  return (
    <View className="relative flex-1 w-full max-w-[480px] bg-background">
      <ProjectHeader onBack={onBack} onProfilePress={onProfilePress} />

      <ScrollView
        className="flex-1 px-4"
        contentContainerClassName="pb-32 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center gap-2">
          <View className="rounded-full overflow-hidden border-[3px] border-primary">
            <Image
              source={{ uri: "https://storage.googleapis.com/banani-avatars/avatar/male/35-50/European/0" }}
              className="h-24 w-24"
              resizeMode="cover"
              accessibilityLabel="Foto do profissional"
            />
          </View>

          <View className="text-center">
            <Text className="text-xl font-bold text-foreground">Jhon Souza</Text>
            <Text className="text-sm text-muted-foreground">Pintor</Text>
          </View>

          <View className="mt-1 flex-row w-full gap-3">
            <View className="flex-1 rounded-xl bg-card py-3 items-center gap-1.5 shadow-sm shadow-black/10">
              <View className="flex-row items-center gap-1">
                <Ionicons name="star" size={14} color="#f59e0b" />
                <Text className="text-base font-bold text-foreground">4.8</Text>
              </View>
              <Text className="text-xs text-muted-foreground">124 avaliações</Text>
            </View>

            <View className="flex-1 rounded-xl bg-card py-3 items-center gap-1.5 shadow-sm shadow-black/10">
              <View className="flex-row items-center gap-1">
                <Ionicons name="briefcase-outline" size={14} color="#b94b50" />
                <Text className="text-base font-bold text-foreground">89</Text>
              </View>
              <Text className="text-xs text-muted-foreground">serviços</Text>
            </View>

            <View className="flex-1 rounded-xl bg-card py-3 items-center gap-1.5 shadow-sm shadow-black/10">
              <View className="flex-row items-center gap-1">
                <Ionicons name="location-outline" size={14} color="#b94b50" />
              </View>
              <Text className="text-xs text-muted-foreground">Centro</Text>
            </View>
          </View>

          <Text className="text-xl font-bold text-primary mt-1">
            R$ 200,00
            <Text className="text-sm font-medium text-muted-foreground">/dia</Text>
          </Text>

          <View className="mt-3 flex-row w-full gap-3">
            <Pressable
              onPress={() => setIsShowingMessages(true)}
              className="flex-1 rounded-xl bg-primary py-3.5 flex-row items-center justify-center gap-2"
              accessibilityRole="button"
              accessibilityLabel="Enviar mensagem"
            >
              <Ionicons name="chatbubble-ellipses-outline" size={17} color="#ffffff" />
              <Text className="text-sm font-semibold text-primary-foreground">Mensagem</Text>
            </Pressable>
            <Pressable
              className="flex-1 rounded-xl bg-[#25d366] py-3.5 flex-row items-center justify-center gap-2"
              onPress={handleOpenWhatsApp}
              accessibilityRole="button"
              accessibilityLabel="Abrir WhatsApp"
            >
              <Ionicons name="logo-whatsapp" size={17} color="#ffffff" />
              <Text className="text-sm font-semibold text-white">WhatsApp</Text>
            </Pressable>
          </View>

          <Pressable
            className="mt-3 w-full rounded-xl bg-primary py-4 flex-row items-center justify-center gap-2"
            accessibilityRole="button"
            accessibilityLabel="Contratar profissional"
          >
            <Ionicons name="hand-left-outline" size={20} color="#ffffff" />
            <Text className="text-base font-bold text-primary-foreground">Contratar Profissional</Text>
          </Pressable>
        </View>

        <View className="mt-5 rounded-xl bg-card p-4 shadow-sm shadow-black/10">
          <View className="flex-row items-center gap-2 mb-2">
            <View className="h-8 w-8 items-center justify-center rounded-full bg-secondary">
              <Ionicons name="person-outline" size={16} color="#b94b50" />
            </View>
            <Text className="text-sm font-bold text-foreground">Sobre mim</Text>
          </View>
          <Text className="text-sm leading-relaxed text-muted-foreground">
            Sou Jhon Souza, pintor profissional com mais de 10 anos de experiência em pintura residencial e comercial. Transformo ambientes com acabamento limpo, respeito aos prazos e atendimento dedicado.
          </Text>
        </View>

        <View className="mt-4 rounded-xl bg-card p-4 shadow-sm shadow-black/10">
          <View className="flex-row items-center gap-2 mb-3">
            <View className="h-8 w-8 items-center justify-center rounded-full bg-secondary">
              <Ionicons name="calendar-outline" size={16} color="#b94b50" />
            </View>
            <Text className="text-sm font-bold text-foreground">Disponibilidade</Text>
          </View>

          <View className="flex-row justify-between gap-1">
            {availabilityDays.map((day, index) => (
              <View
                key={`${day.label}-${index}`}
                className="flex-1 items-center gap-1.5"
                accessibilityRole="text"
                accessibilityLabel={`Dia ${day.label} ${day.available ? "disponível" : "indisponível"}`}
              >
                <View
                  className={`h-8 w-8 items-center justify-center rounded-full ${
                    day.available ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  <Text
                    className={`text-sm font-bold ${
                      day.available ? "text-primary-foreground" : "text-secondary-foreground"
                    }`}
                  >
                    {day.label}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <View className="mt-3 flex-row items-center gap-3">
            <View className="flex-row items-center gap-1">
              <View className="h-3 w-3 rounded-full bg-primary" />
              <Text className="text-xs text-muted-foreground">Disponível</Text>
            </View>
            <View className="flex-row items-center gap-1">
              <View className="h-3 w-3 rounded-full bg-muted" />
              <Text className="text-xs text-muted-foreground">Indisponível</Text>
            </View>
          </View>
        </View>

        <View className="mt-5">
          <Text className="text-base font-bold text-foreground mb-3">Especializações</Text>
          <View className="flex-row flex-wrap gap-2">
            {specializations.map((item) => (
              <View
                key={item}
                className="rounded-full bg-card px-4 py-1.5 border border-black/10 shadow-sm shadow-black/5"
              >
                <Text className="text-sm font-medium text-foreground">{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-5">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-bold text-foreground">Portfólio</Text>
            <Pressable
              onPress={handleOpenPortfolio}
              className="flex-row items-center gap-1"
              accessibilityRole="button"
              accessibilityLabel="Abrir portfólio"
            >
              <Text className="text-sm font-semibold text-primary">Ver tudo</Text>
              <Ionicons name="chevron-forward" size={14} color="#b94b50" />
            </Pressable>
          </View>

          <View className="flex-row flex-wrap justify-between gap-3">
            {portfolioItems.map((item) => (
              <Pressable
                key={item.label}
                onPress={handleOpenProjectResult}
                className="w-[48%] overflow-hidden rounded-xl shadow-sm shadow-black/10"
                accessibilityRole="button"
                accessibilityLabel={`Abrir projeto ${item.label}`}
              >
                <Image
                  source={{ uri: item.uri }}
                  className="h-[110px] w-full object-cover"
                  resizeMode="cover"
                  accessibilityLabel={item.label}
                />
                <View className="bg-card px-3 py-2">
                  <Text className="text-xs font-semibold text-foreground">{item.label}</Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="mt-5">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-base font-bold text-foreground">Avaliações</Text>
            <Pressable className="flex-row items-center gap-1" accessibilityRole="button">
              <Text className="text-sm font-semibold text-primary">Ler mais comentários</Text>
              <Ionicons name="chevron-forward" size={14} color="#b94b50" />
            </Pressable>
          </View>

          <View className="flex-col gap-3">
            {reviews.map((review) => (
              <View key={review.name} className="rounded-xl bg-card p-4 shadow-sm shadow-black/10">
                <View className="flex-row items-center justify-between mb-2">
                  <View className="flex-row items-center gap-2">
                    <View className="h-9 w-9 overflow-hidden rounded-full">
                      <Image
                        source={{ uri: review.avatarUri }}
                        className="h-full w-full"
                        resizeMode="cover"
                        accessibilityLabel={review.name}
                      />
                    </View>
                    <View>
                      <Text className="text-sm font-bold text-foreground">{review.name}</Text>
                      <Text className="text-xs text-muted-foreground">{review.when}</Text>
                    </View>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="star" size={13} color="#f59e0b" />
                    <Text className="text-sm font-bold text-foreground">{review.rating}</Text>
                  </View>
                </View>
                <Text className="text-sm leading-relaxed text-muted-foreground">{review.comment}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 px-5 pb-2">
        <ClientBottomNav active="search" onSelect={onNavigate} />
      </View>
    </View>
  );
}
