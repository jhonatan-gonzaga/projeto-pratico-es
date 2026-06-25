import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

import { CategoryCard, ClientBottomNav, ProfessionalCard } from "../../components/cliente";

const categories = [
  {
    title: "Pintores",
    imageUri:
      "https://storage.googleapis.com/banani-generated-images/generated-images/4fc9aee0-066e-42e2-bdc1-f0d747e2ed03.jpg",
  },
  {
    title: "Eletricistas",
    imageUri:
      "https://storage.googleapis.com/banani-generated-images/generated-images/702be546-1c15-437d-b5f1-fb6dbfdcb84d.jpg",
  },
  {
    title: "Pedreiros",
    imageUri:
      "https://storage.googleapis.com/banani-generated-images/generated-images/bddd6bdf-bc6b-4764-b242-a9379a09aeb6.jpg",
  },
  {
    title: "Encanadores",
    imageUri:
      "https://storage.googleapis.com/banani-generated-images/generated-images/dc018ab8-9a3c-47d2-a8ab-451866dc7d1e.jpg",
  },
];

const professionals = [
  {
    name: "Jhon Souza",
    role: "Pintor",
    price: "R$ 200,00",
    rating: "4.8",
    avatarUri: "https://storage.googleapis.com/banani-avatars/avatar/male/35-50/European/0",
  },
  {
    name: "Jonas Smith",
    role: "Encanador",
    price: "R$ 75,00",
    rating: "4.5",
    avatarUri: "https://storage.googleapis.com/banani-avatars/avatar/male/25-35/African/1",
  },
  {
    name: "Oliver da Silva",
    role: "Encanador",
    price: "R$ 130,00",
    rating: "4.9",
    avatarUri: "https://storage.googleapis.com/banani-avatars/avatar/male/35-50/European/2",
  },
  {
    name: "Benson D.",
    role: "Jardineiro",
    price: "R$ 90,00",
    rating: "5.0",
    avatarUri: "https://storage.googleapis.com/banani-avatars/avatar/male/25-35/African/3",
  },
];

export function ClientHomePage({
  onOpenProfessional,
  onBack,
}: {
  onOpenProfessional?: () => void;
  onBack?: () => void;
}) {
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

        <View className="flex-row items-center gap-2">
          <View className="h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Ionicons name="business-outline" size={16} color="#ffffff" />
          </View>
          <View>
            <Text className="text-xs font-bold uppercase tracking-[0.7px] text-primary">
              CONECTA OBRAS
            </Text>
            <Text className="text-xs font-bold uppercase tracking-[0.7px] text-primary">
              ITACOATIARA
            </Text>
          </View>
        </View>

        <Image
          source={{ uri: "https://storage.googleapis.com/banani-avatars/avatar/male/35-50/European/0" }}
          className="h-9 w-9 rounded-[20px]"
          resizeMode="cover"
          accessibilityLabel="Usuário"
        />
      </View>

      <ScrollView
        className="flex-1 px-5"
        contentContainerClassName="pb-32"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-4 text-3xl font-bold leading-tight text-foreground">
          O que você precisa hoje?
        </Text>

        <View className="mb-5 flex-row gap-2">
          <View className="flex-1 flex-row items-center gap-2 rounded-[20px] bg-card px-4 py-3 shadow-sm shadow-black/10">
            <Ionicons name="search" size={16} color="#9e8e8f" />
            <Text className="text-sm text-muted-foreground">
              Buscar Serviços ou Profis...
            </Text>
          </View>
          <Pressable
            className="h-[52px] w-[52px] items-center justify-center rounded-[20px] bg-card shadow-sm shadow-black/10"
            accessibilityRole="button"
            accessibilityLabel="Filtros"
          >
            <Ionicons name="filter-outline" size={18} color="#0f1720" />
          </Pressable>
        </View>

        <View className="mb-5">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-lg font-bold text-foreground">Categorias</Text>
            <Pressable accessibilityRole="button" accessibilityLabel="Ver todas categorias">
              <Text className="text-sm font-semibold text-primary">Ver todas</Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          >
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                imageUri={category.imageUri}
              />
            ))}
          </ScrollView>
        </View>

        <View className="mb-5">
          <Text className="mb-3 text-lg font-bold text-foreground">
            Profissionais em destaque
          </Text>
          <View className="flex-row flex-wrap justify-between gap-3">
            {professionals.map((professional, index) => (
              <ProfessionalCard
                key={professional.name}
                name={professional.name}
                role={professional.role}
                price={professional.price}
                rating={professional.rating}
                avatarUri={professional.avatarUri}
                onPress={index === 0 ? onOpenProfessional : undefined}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 px-5 pb-7">
        <ClientBottomNav />
      </View>
    </View>
  );
}
