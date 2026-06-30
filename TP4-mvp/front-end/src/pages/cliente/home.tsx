import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { EmptyState, ErrorState, LoadingState } from "../../components/feedback-state";
import {
  CategoryCard,
  ClientBottomNav,
  ClientSearchFilters,
  type ClientNavKey,
  ProfessionalCard,
} from "../../components/cliente";
import { ProjectHeader } from "../../components/profissional/components";
import { ApiError, Category, ProfessionalProfile, api, formatMoney } from "../../services/api";

const fallbackCategoryImage =
  "https://storage.googleapis.com/banani-generated-images/generated-images/25cb0462-d71b-43d5-9eb9-e76966027a00.jpg";
function getProfessionalRole(professional: ProfessionalProfile) {
  const categories = professional.specialties.map((item) => item.category.name);
  return categories.length ? categories.join(", ") : "Profissional";
}

function getProfessionalCategoryIds(professional: ProfessionalProfile) {
  return professional.specialties.map((item) => item.category.id);
}

export function ClientHomePage({
  onNavigate,
  onOpenProfessional,
  onProfilePress,
  onBack,
}: {
  onNavigate?: (key: ClientNavKey) => void;
  onOpenProfessional?: (professionalId: string) => void;
  onProfilePress?: () => void;
  onBack?: () => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [professionals, setProfessionals] = useState<ProfessionalProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Todos"]);
  const [sortBy, setSortBy] = useState("Relevancia");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("Qualquer");

  const loadData = async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const [categoryItems, professionalPage] = await Promise.all([
        api.categories(),
        api.professionals(),
      ]);
      setCategories(categoryItems);
      setProfessionals(professionalPage.items);
    } catch (error) {
      setLoadError(
        error instanceof ApiError
          ? error.message
          : "Nao foi possivel carregar profissionais.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

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
    : categories
        .filter((category) => selectedCategories.includes(category.id))
        .map((category) => category.name)
        .join(", ");
  const filteredProfessionals = useMemo(() => professionals
    .filter((professional) => {
      const matchesCategory =
        selectedCategories.includes("Todos") ||
        getProfessionalCategoryIds(professional).some((id) =>
          selectedCategories.includes(id),
        );
      const matchesQuery =
        !normalizedQuery ||
        professional.user.name.toLowerCase().includes(normalizedQuery) ||
        getProfessionalRole(professional).toLowerCase().includes(normalizedQuery);
      const priceValue = Number(professional.dailyRate ?? 0);
      const ratingValue = Number(professional.ratingAvg ?? 0);
      const matchesPrice =
        priceValue >= minPriceNumber && priceValue <= maxPriceNumber;
      const matchesRating = ratingValue >= ratingMinimum;

      return matchesCategory && matchesQuery && matchesPrice && matchesRating;
    })
    .sort((first, second) => {
      if (sortBy === "Menor Preco") {
        return Number(first.dailyRate ?? 0) - Number(second.dailyRate ?? 0);
      }

      if (sortBy === "Maior Avaliacao") {
        return Number(second.ratingAvg ?? 0) - Number(first.ratingAvg ?? 0);
      }

      return 0;
    }), [
      maxPriceNumber,
      minPriceNumber,
      normalizedQuery,
      professionals,
      ratingMinimum,
      selectedCategories,
      sortBy,
    ]);

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
              categories={categories.map((category) => ({
                key: category.id,
                label: category.name,
              }))}
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
                key={category.id}
                title={category.name}
                imageUri={category.imageUrl ?? fallbackCategoryImage}
                selected={selectedCategories.includes(category.id)}
                onPress={() => toggleCategory(category.id)}
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
          {isLoading ? (
            <LoadingState label="Carregando profissionais..." />
          ) : loadError ? (
            <ErrorState message={loadError} onRetry={loadData} />
          ) : filteredProfessionals.length === 0 ? (
            <EmptyState message="Nenhum profissional encontrado com esses filtros." />
          ) : (
            <View className="flex-row flex-wrap justify-between gap-3">
              {filteredProfessionals.map((professional) => (
                <ProfessionalCard
                  key={professional.id}
                  name={professional.user.name}
                  role={getProfessionalRole(professional)}
                  price={formatMoney(professional.dailyRate)}
                  rating={Number(professional.ratingAvg ?? 0).toFixed(1)}
                  avatarUri={professional.user.avatarUrl}
                  onPress={() => onOpenProfessional?.(professional.id)}
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 px-5 pb-2">
        <ClientBottomNav active="home" onSelect={onNavigate} />
      </View>
    </View>
  );
}
