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

function PriceBox({ value, label }: { value: string; label: string }) {
  return (
    <Pressable
      className="h-[52px] flex-1 flex-row items-center gap-2 rounded-2xl bg-card px-4 shadow-sm shadow-black/5"
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text className="text-sm font-medium text-muted-foreground">R$</Text>
      <Text className="text-base font-semibold text-foreground">{value}</Text>
    </Pressable>
  );
}

export function ClientSearchPage({ onNavigate }: ClientSearchPageProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("Relevancia");
  const [rating, setRating] = useState("Qualquer");

  const clearFilters = () => {
    setQuery("");
    setCategory("Todos");
    setSortBy("Relevancia");
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
                selected={category === item}
                onPress={() => setCategory(item)}
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
            <PriceBox value="0" label="Preco minimo" />
            <Text className="text-lg text-muted-foreground">-</Text>
            <PriceBox value="500+" label="Preco maximo" />
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
