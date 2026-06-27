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
    key: "Pintura",
    title: "Pintores",
    imageUri:
      "https://storage.googleapis.com/banani-generated-images/generated-images/4fc9aee0-066e-42e2-bdc1-f0d747e2ed03.jpg",
  },
  {
    key: "Eletrica",
    title: "Eletricistas",
    imageUri:
      "https://storage.googleapis.com/banani-generated-images/generated-images/702be546-1c15-437d-b5f1-fb6dbfdcb84d.jpg",
  },
  {
    key: "Pedreiro",
    title: "Pedreiros",
    imageUri:
      "https://storage.googleapis.com/banani-generated-images/generated-images/bddd6bdf-bc6b-4764-b242-a9379a09aeb6.jpg",
  },
  {
    key: "Encanamento",
    title: "Encanadores",
    imageUri:
      "https://storage.googleapis.com/banani-generated-images/generated-images/dc018ab8-9a3c-47d2-a8ab-451866dc7d1e.jpg",
  },
  {
    key: "Jardinagem",
    title: "Jardineiros",
    imageUri:
      "https://storage.googleapis.com/banani-generated-images/generated-images/47017bff-305f-4aa7-b64b-d81070213515.jpg",
  },
  {
    key: "Montagem",
    title: "Montadores",
    imageUri:
      "https://storage.googleapis.com/banani-generated-images/generated-images/25cb0462-d71b-43d5-9eb9-e76966027a00.jpg",
  },
];

const professionals = [
  {
    category: "Pintura",
    name: "Jhon Souza",
    role: "Pintor",
    price: "R$ 200,00",
    priceValue: 200,
    rating: "4.8",
    ratingValue: 4.8,
    avatarUri: "https://storage.googleapis.com/banani-avatars/avatar/male/35-50/European/0",
  },
  {
    category: "Encanamento",
    name: "Jonas Smith",
    role: "Encanador",
    price: "R$ 75,00",
    priceValue: 75,
    rating: "4.5",
    ratingValue: 4.5,
    avatarUri: "https://storage.googleapis.com/banani-avatars/avatar/male/25-35/African/1",
  },
  {
    category: "Encanamento",
    name: "Oliver da Silva",
    role: "Encanador",
    price: "R$ 130,00",
    priceValue: 130,
    rating: "4.9",
    ratingValue: 4.9,
    avatarUri: "https://storage.googleapis.com/banani-avatars/avatar/male/35-50/European/2",
  },
  {
    category: "Jardinagem",
    name: "Benson D.",
    role: "Jardineiro",
    price: "R$ 90,00",
    priceValue: 90,
    rating: "5.0",
    ratingValue: 5,
    avatarUri: "https://storage.googleapis.com/banani-avatars/avatar/male/25-35/African/3",
  },
  {
    category: "Eletrica",
    name: "Roberto Carlos",
    role: "Eletricista",
    price: "R$ 180,00",
    priceValue: 180,
    rating: "4.7",
    ratingValue: 4.7,
    avatarUri: "https://storage.googleapis.com/banani-avatars/avatar/male/35-50/African/3",
  },
  {
    category: "Pedreiro",
    name: "Marcos Almeida",
    role: "Pedreiro",
    price: "R$ 150,00",
    priceValue: 150,
    rating: "4.6",
    ratingValue: 4.6,
    avatarUri: "https://storage.googleapis.com/banani-avatars/avatar/male/25-35/Hispanic/0",
  },
  {
    category: "Montagem",
    name: "Andre Montagens",
    role: "Montador",
    price: "R$ 110,00",
    priceValue: 110,
    rating: "4.4",
    ratingValue: 4.4,
    avatarUri: "https://storage.googleapis.com/banani-avatars/avatar/male/25-35/South Asian/1",
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
  const [showAllCategories, setShowAllCategories] = useState(false);
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

  const ratingMinimum =
    rating === "5.0" ? 5 : rating === "4.5+" ? 4.5 : rating === "4.0+" ? 4 : 0;
  const minPriceNumber = Number(minPrice || 0);
  const maxPriceNumber = Number(maxPrice || 9999);
  const normalizedQuery = query.trim().toLowerCase();
  const visibleCategories = showAllCategories ? categories : categories.slice(0, 4);
  const selectedCategoryLabel = selectedCategories.includes("Todos")
    ? null
    : selectedCategories.join(", ");
  const filteredProfessionals = professionals
    .filter((professional) => {
      const matchesCategory =
        selectedCategories.includes("Todos") ||
        selectedCategories.includes(professional.category);
      const matchesQuery =
        !normalizedQuery ||
        professional.name.toLowerCase().includes(normalizedQuery) ||
        professional.role.toLowerCase().includes(normalizedQuery);
      const matchesPrice =
        professional.priceValue >= minPriceNumber &&
        professional.priceValue <= maxPriceNumber;
      const matchesRating = professional.ratingValue >= ratingMinimum;

      return matchesCategory && matchesQuery && matchesPrice && matchesRating;
    })
    .sort((first, second) => {
      if (sortBy === "Menor Preco") {
        return first.priceValue - second.priceValue;
      }

      if (sortBy === "Maior Avaliacao") {
        return second.ratingValue - first.ratingValue;
      }

      return 0;
    });

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
            <Pressable
              onPress={() => setShowAllCategories((current) => !current)}
              accessibilityRole="button"
              accessibilityLabel={
                showAllCategories ? "Mostrar menos categorias" : "Ver todas categorias"
              }
            >
              <Text className="text-sm font-semibold text-primary">
                {showAllCategories ? "Mostrar menos" : "Ver todas"}
              </Text>
            </Pressable>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 12 }}
          >
            {visibleCategories.map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                imageUri={category.imageUri}
                selected={selectedCategories.includes(category.key)}
                onPress={() => toggleCategory(category.key)}
              />
            ))}
          </ScrollView>
        </View>

        <View className="mb-5">
          <View className="mb-3 flex-row items-center justify-between gap-3">
            <Text className="flex-1 text-lg font-bold text-foreground">
              {selectedCategoryLabel
                ? `Profissionais: ${selectedCategoryLabel}`
                : "Profissionais em destaque"}
            </Text>
            {!selectedCategories.includes("Todos") ? (
              <Pressable
                onPress={() => setSelectedCategories(["Todos"])}
                accessibilityRole="button"
                accessibilityLabel="Limpar categoria"
              >
                <Text className="text-sm font-semibold text-primary">Limpar</Text>
              </Pressable>
            ) : null}
          </View>
          <View className="flex-row flex-wrap justify-between gap-3">
            {filteredProfessionals.map((professional) => (
              <ProfessionalCard
                key={professional.name}
                name={professional.name}
                role={professional.role}
                price={professional.price}
                rating={professional.rating}
                avatarUri={professional.avatarUri}
                onPress={professional.name === "Jhon Souza" ? onOpenProfessional : undefined}
              />
            ))}
          </View>
          {filteredProfessionals.length === 0 ? (
            <View className="mt-3 rounded-[16px] bg-card px-4 py-5 shadow-sm shadow-black/5">
              <Text className="text-center text-sm font-medium text-muted-foreground">
                Nenhum profissional encontrado nessa categoria.
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 px-5 pb-2">
        <ClientBottomNav active="home" onSelect={onNavigate} />
      </View>
    </View>
  );
}
