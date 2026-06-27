import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import {
  CategoryCard,
  ClientBottomNav,
  ClientSearchFilters,
  type ClientNavKey,
  ProfessionalCard,
} from "../../components/cliente";
import { ProjectHeader } from "../../components/profissional/components";

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
  onNavigate,
  onOpenProfessional,
  onProfilePress,
  onBack,
}: {
  onNavigate?: (key: ClientNavKey) => void;
  onOpenProfessional?: () => void;
  onProfilePress?: () => void;
  onBack?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Todos"]);
  const [sortBy, setSortBy] = useState("Relevancia");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("500");
  const [rating, setRating] = useState("Qualquer");

  const toggleCategory = (item: string) => {
    if (item === "Todos") {
      setSelectedCategories(["Todos"]);
      return;
    }

    setSelectedCategories((current) => {
      const withoutAll = current.filter((categoryItem) => categoryItem !== "Todos");

      if (withoutAll.includes(item)) {
        const nextCategories = withoutAll.filter((categoryItem) => categoryItem !== item);
        return nextCategories.length > 0 ? nextCategories : ["Todos"];
      }

      return [...withoutAll, item];
    });
  };

  return (
    <View className="relative flex-1 w-full max-w-[480px] bg-background">
      <ProjectHeader onBack={onBack ?? (() => {})} onProfilePress={onProfilePress} />

      <ScrollView
        className="flex-1 px-5"
        contentContainerClassName="pb-32 pt-4"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-4 text-3xl font-bold leading-tight text-foreground">
          O que você precisa hoje?
        </Text>

        <View className="mb-5 flex-row gap-2">
          <View
            className="flex-1 flex-row items-center gap-2 rounded-[20px] bg-card px-4 py-3 shadow-sm shadow-black/10"
          >
            <Ionicons name="search" size={16} color="#9e8e8f" />
            <TextInput
              value={query}
              onChangeText={setQuery}
              className="h-[28px] flex-1 p-0 text-sm text-foreground"
              placeholder="Buscar Servicos ou Profissionais"
              placeholderTextColor="#9e8e8f"
              returnKeyType="search"
              accessibilityLabel="Buscar servicos ou profissionais"
            />
          </View>
          <Pressable
            onPress={() => setShowFilters((current) => !current)}
            className={`h-[52px] w-[52px] items-center justify-center rounded-[20px] shadow-sm shadow-black/10 ${
              showFilters ? "bg-primary" : "bg-card"
            }`}
            accessibilityRole="button"
            accessibilityState={{ expanded: showFilters }}
            accessibilityLabel="Filtros"
          >
            <Ionicons
              name="filter-outline"
              size={18}
              color={showFilters ? "#ffffff" : "#0f1720"}
            />
          </Pressable>
        </View>

        {showFilters ? (
          <View className="mb-6 gap-7 rounded-[16px] bg-background">
            <ClientSearchFilters
              values={{
                selectedCategories,
                sortBy,
                minPrice,
                maxPrice,
                rating,
              }}
              actions={{
                onToggleCategory: toggleCategory,
                onChangeSort: setSortBy,
                onChangeMinPrice: setMinPrice,
                onChangeMaxPrice: setMaxPrice,
                onChangeRating: setRating,
              }}
            />
          </View>
        ) : null}

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

      <View className="absolute inset-x-0 bottom-0 px-5 pb-2">
        <ClientBottomNav active="home" onSelect={onNavigate} />
      </View>
    </View>
  );
}
