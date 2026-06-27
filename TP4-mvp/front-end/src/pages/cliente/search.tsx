import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import {
  ClientBottomNav,
  ClientSearchFilters,
  type ClientNavKey,
} from "../../components/cliente";
import { ProjectHeader } from "../../components/profissional/components";

type ClientSearchPageProps = {
  onNavigate?: (key: ClientNavKey) => void;
  onBack?: () => void;
  onProfilePress?: () => void;
};

export function ClientSearchPage({
  onBack,
  onNavigate,
  onProfilePress,
}: ClientSearchPageProps) {
  const [query, setQuery] = useState("");
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

  const clearFilters = () => {
    setQuery("");
    setSelectedCategories(["Todos"]);
    setSortBy("Relevancia");
    setMinPrice("0");
    setMaxPrice("500");
    setRating("Qualquer");
  };

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
      </ScrollView>

      <View className="absolute inset-x-0 bottom-0 px-5 pb-2">
        <ClientBottomNav active="search" onSelect={onNavigate} />
      </View>
    </View>
  );
}
