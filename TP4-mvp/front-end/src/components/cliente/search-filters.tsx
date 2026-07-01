import { Pressable, Text, TextInput, View } from "react-native";

const defaultClientFilterCategories = [
  { key: "Todos", label: "Todos" },
  { key: "Pedreiro", label: "Pedreiro" },
  { key: "Eletricista", label: "Eletricista" },
  { key: "Pintor", label: "Pintor" },
  { key: "Encanador", label: "Encanador" },
  { key: "Ajudante", label: "Ajudante" },
  { key: "Ar Condicionado", label: "Ar Condicionado" },
  { key: "Carpinteiro", label: "Carpinteiro" },
];

export const clientSortOptions = [
  "Relevancia",
  "Menor Preco",
  "Maior Avaliacao",
  "Mais Proximo",
];

export const clientRatingOptions = ["Qualquer", "4.0+", "4.5+", "5.0"];

type FilterChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

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
      <Text
        className={`text-sm font-medium ${
          selected ? "text-white" : "text-foreground"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function normalizePrice(value: string) {
  return value.replace(/\D/g, "");
}

function PriceInput({
  label,
  onChangeText,
  placeholder,
  value,
}: {
  label: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  value: string;
}) {
  return (
    <View className="h-[52px] flex-1 flex-row items-center gap-2 rounded-2xl bg-card px-4 shadow-sm shadow-black/5">
      <Text className="text-sm font-medium text-muted-foreground">R$</Text>
      <TextInput
        value={value}
        onChangeText={(text) => onChangeText(normalizePrice(text))}
        className="h-full flex-1 text-base font-semibold text-foreground"
        placeholder={placeholder}
        placeholderTextColor="#b0b8c1"
        keyboardType="number-pad"
        returnKeyType="done"
        accessibilityLabel={label}
      />
    </View>
  );
}

export type ClientFilterValues = {
  selectedCategories: string[];
  sortBy: string;
  minPrice: string;
  maxPrice: string;
  rating: string;
};

export type ClientFilterActions = {
  onToggleCategory: (item: string) => void;
  onChangeSort: (item: string) => void;
  onChangeMinPrice: (value: string) => void;
  onChangeMaxPrice: (value: string) => void;
  onChangeRating: (item: string) => void;
};

export function ClientSearchFilters({
  actions,
  categories = defaultClientFilterCategories,
  values,
}: {
  actions: ClientFilterActions;
  categories?: { key: string; label: string }[];
  values: ClientFilterValues;
}) {
  const filterCategories = [
    { key: "Todos", label: "Todos" },
    ...categories.filter((category) => category.key !== "Todos"),
  ];

  return (
    <>
      <View className="gap-3">
        <Text className="text-[17px] font-bold text-foreground">Categorias</Text>
        <View className="flex-row flex-wrap gap-2">
          {filterCategories.map((item) => (
            <FilterChip
              key={item.key}
              label={item.label}
              selected={values.selectedCategories.includes(item.key)}
              onPress={() => actions.onToggleCategory(item.key)}
            />
          ))}
        </View>
      </View>

      <View className="gap-3">
        <Text className="text-[17px] font-bold text-foreground">Ordenar por</Text>
        <View className="flex-row flex-wrap gap-2">
          {clientSortOptions.map((item) => (
            <FilterChip
              key={item}
              label={item}
              selected={values.sortBy === item}
              onPress={() => actions.onChangeSort(item)}
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
            value={values.minPrice}
            label="Preco minimo"
            placeholder="0"
            onChangeText={actions.onChangeMinPrice}
          />
          <Text className="text-lg text-muted-foreground">-</Text>
          <PriceInput
            value={values.maxPrice}
            label="Preco maximo"
            placeholder="500"
            onChangeText={actions.onChangeMaxPrice}
          />
        </View>
      </View>

      <View className="gap-3">
        <Text className="text-[17px] font-bold text-foreground">
          Avaliacao Minima
        </Text>
        <View className="flex-row flex-wrap gap-2">
          {clientRatingOptions.map((item) => (
            <FilterChip
              key={item}
              label={item}
              selected={values.rating === item}
              onPress={() => actions.onChangeRating(item)}
            />
          ))}
        </View>
      </View>
    </>
  );
}
