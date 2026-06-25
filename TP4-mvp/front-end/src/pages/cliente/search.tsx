import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { ClientBottomNav, type ClientNavKey } from "../../components/cliente";

type ClientSearchPageProps = {
  onNavigate?: (key: ClientNavKey) => void;
};

type FilterChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

const categories = [
  "Todos",
  "Pintura",
  "Eletrica",
  "Encanamento",
  "Pedreiro",
  "Jardinagem",
  "Montagem",
];

const sortOptions = ["Relevancia", "Menor Preco", "Maior Avaliacao", "Mais Proximo"];
const ratingOptions = ["Qualquer", "4.0+", "4.5+", "5.0"];

function FilterChip({ label, selected, onPress }: FilterChipProps) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full px-[18px] py-[9px] shadow-sm shadow-black/5 ${
        selected ? "bg-primary" : "bg-card"
      }`}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
    >
      <Text className={`text-sm font-medium ${selected ? "text-white" : "text-foreground"}`}>
        {label}
      </Text>
    </Pressable>
  );
}

type PriceInputProps = {
  value: string;
  label: string;
  placeholder: string;
  onChangeText: (value: string) => void;
};

function normalizePrice(value: string) {
  return value.replace(/\D/g, "");
}

function PriceInput({ value, label, placeholder, onChangeText }: PriceInputProps) {
  return (
    <View
      className="h-[52px] flex-1 flex-row items-center gap-2 rounded-2xl bg-card px-4 shadow-sm shadow-black/5"
    >
      <Text className="text-sm font-medium text-muted-foreground">R$</Text>
      <TextInput
        value={value}
        onChangeText={(text) => onChangeText(normalizePrice(text))}
        className="h-full flex-1 text-base font-semibold text-foreground"
        placeholder={placeholder}
        placeholderTextColor="#7a6568"
        keyboardType="number-pad"
        returnKeyType="done"
        accessibilityLabel={label}
      />
    </View>
  );
}

export function ClientSearchPage({ onNavigate }: ClientSearchPageProps) {
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
    <View className="min-h-[812px] w-full max-w-[480px] bg-background">
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
        contentContainerClassName="gap-7 pb-8 pt-5"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-3">
          <Text className="text-[17px] font-bold text-foreground">Categorias</Text>
          <View className="flex-row flex-wrap gap-2">
            {categories.map((item) => (
              <FilterChip
                key={item}
                label={item}
                selected={selectedCategories.includes(item)}
                onPress={() => toggleCategory(item)}
              />
            ))}
          </View>
        </View>

        <View className="gap-3">
          <Text className="text-[17px] font-bold text-foreground">Ordenar por</Text>
          <View className="flex-row flex-wrap gap-2">
            {sortOptions.map((item) => (
              <FilterChip
                key={item}
                label={item}
                selected={sortBy === item}
                onPress={() => setSortBy(item)}
              />
            ))}
          </View>
        </View>

        <View className="gap-3">
          <Text className="text-[17px] font-bold text-foreground">
            Faixa de Preco (por dia)
          </Text>
          <View className="flex-row items-center gap-3">
            <PriceInput
              value={minPrice}
              label="Preco minimo"
              placeholder="0"
              onChangeText={setMinPrice}
            />
            <Text className="text-lg text-muted-foreground">-</Text>
            <PriceInput
              value={maxPrice}
              label="Preco maximo"
              placeholder="500"
              onChangeText={setMaxPrice}
            />
          </View>
        </View>

        <View className="gap-3">
          <Text className="text-[17px] font-bold text-foreground">
            Avaliacao Minima
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {ratingOptions.map((item) => (
              <FilterChip
                key={item}
                label={item}
                selected={rating === item}
                onPress={() => setRating(item)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <ClientBottomNav active="search" onSelect={onNavigate} />
    </View>
  );
}
