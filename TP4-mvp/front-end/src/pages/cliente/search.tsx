import { Ionicons } from "@expo/vector-icons";
import { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { EmptyState, ErrorState, LoadingState } from "../../components/feedback-state";
import {
  ClientBottomNav,
  ClientSearchFilters,
  ProfessionalCard,
  type ClientNavKey,
} from "../../components/cliente";
import { ProjectHeader } from "../../components/profissional/components";
import { ApiError, Category, ProfessionalProfile, api, formatMoney } from "../../services/api";

type ClientSearchPageProps = {
  onNavigate?: (key: ClientNavKey) => void;
  onBack?: () => void;
  onOpenProfessional?: (professionalId: string) => void;
  onProfilePress?: () => void;
};

function normalizeCategoryText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\bpintura\b/g, "pintor")
    .replace(/\beletrica\b/g, "eletricista")
    .replace(/\bencanamento\b/g, "encanador");
}

export function ClientSearchPage({
  onBack,
  onNavigate,
  onOpenProfessional,
  onProfilePress,
}: ClientSearchPageProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [professionals, setProfessionals] = useState<ProfessionalProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Todos"]);
  const [sortBy, setSortBy] = useState("Relevancia");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("");
  const [rating, setRating] = useState("Qualquer");

  const loadProfessionals = async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const [categoryItems, response] = await Promise.all([
        api.categories(),
        api.professionals(),
      ]);
      setCategories(categoryItems);
      setProfessionals(response.items);
    } catch (error) {
      setLoadError(
        error instanceof ApiError
          ? error.message
          : "Nao foi possivel buscar profissionais.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadProfessionals();
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

  const clearFilters = () => {
    setQuery("");
    setSelectedCategories(["Todos"]);
    setSortBy("Relevancia");
    setMinPrice("0");
    setMaxPrice("");
    setRating("Qualquer");
  };

  const ratingMinimum =
    rating === "5.0" ? 5 : rating === "4.5+" ? 4.5 : rating === "4.0+" ? 4 : 0;
  const minPriceNumber = Number(minPrice || 0);
  const maxPriceNumber = Number(maxPrice || 9999);
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedSearchQuery = normalizeCategoryText(normalizedQuery);
  const visibleProfessionals = useMemo(
    () =>
      professionals.filter((professional) => {
        const role =
          professional.specialties.map((item) => item.category.name).join(", ") ||
          "Profissional";
        const categories = professional.specialties.flatMap((item) => [
          item.category.id,
          item.category.name,
        ]);
        const normalizedCategories = professional.specialties.flatMap((item) => [
          normalizeCategoryText(item.category.id),
          normalizeCategoryText(item.category.name),
        ]);
        const matchesCategory =
          selectedCategories.includes("Todos") ||
          categories.some((category) => selectedCategories.includes(category));
        const matchesQuery =
          !normalizedQuery ||
          professional.user.name.toLowerCase().includes(normalizedQuery) ||
          role.toLowerCase().includes(normalizedQuery) ||
          normalizedCategories.some((category) =>
            category.includes(normalizedSearchQuery),
          );
        const priceValue = Number(professional.dailyRate ?? 0);
        const ratingValue = Number(professional.ratingAvg ?? 0);

        return (
          matchesCategory &&
          matchesQuery &&
          priceValue >= minPriceNumber &&
          priceValue <= maxPriceNumber &&
          ratingValue >= ratingMinimum
        );
      }),
    [
      maxPriceNumber,
      minPriceNumber,
      normalizedQuery,
      normalizedSearchQuery,
      professionals,
      ratingMinimum,
      selectedCategories,
    ],
  );

  return (
    <View className="relative flex-1 w-full max-w-[480px] bg-background">
      <ProjectHeader
        onBack={onBack ?? (() => onNavigate?.("home"))}
        onProfilePress={onProfilePress}
      />

      <View className="flex-row items-center justify-between px-5 pb-2 pt-5">
        <Text className="text-[28px] font-bold leading-9 text-foreground">
          Buscar
        </Text>
        <Pressable
          onPress={clearFilters}
          accessibilityRole="button"
          accessibilityLabel="Limpar filtros"
        >
          <Text className="text-base font-medium text-primary">Limpar</Text>
        </Pressable>
      </View>

      <View className="px-5 pb-1 pt-3">
        <View className="h-[52px] flex-row items-center gap-3 rounded-full bg-card px-[18px] shadow-sm shadow-black/5">
          <Ionicons name="search" size={18} color="#7a6568" />
          <TextInput
            value={query}
            onChangeText={setQuery}
            className="h-full flex-1 text-[15px] text-foreground"
            placeholder="Buscar Servicos ou Profissionais"
            placeholderTextColor="#7a6568"
            returnKeyType="search"
            accessibilityLabel="Buscar servicos ou profissionais"
          />
        </View>
      </View>

      <ScrollView
        className="flex-1 px-5"
        contentContainerClassName="gap-7 pb-32 pt-5"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
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

        {isLoading ? (
          <LoadingState label="Buscando profissionais..." />
        ) : loadError ? (
          <ErrorState message={loadError} onRetry={loadProfessionals} />
        ) : visibleProfessionals.length === 0 ? (
          <EmptyState message="Nenhum profissional encontrado." />
        ) : (
          <View className="flex-row flex-wrap justify-between gap-3">
            {visibleProfessionals.map((professional) => (
              <ProfessionalCard
                key={professional.id}
                name={professional.user.name}
                role={
                  professional.specialties.map((item) => item.category.name).join(", ") ||
                  "Profissional"
                }
                price={formatMoney(professional.dailyRate)}
                rating={Number(professional.ratingAvg ?? 0).toFixed(1)}
                avatarUri={professional.user.avatarUrl}
                onPress={() => onOpenProfessional?.(professional.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 px-5 pb-2">
        <ClientBottomNav active="search" onSelect={onNavigate} />
      </View>
    </View>
  );
}
