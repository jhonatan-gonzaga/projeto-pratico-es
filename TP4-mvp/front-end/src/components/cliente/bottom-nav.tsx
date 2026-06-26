import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export type ClientNavKey = "home" | "work" | "search" | "ads" | "settings";

type NavItem = {
  key: ClientNavKey;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  badge?: string;
};

type ClientBottomNavProps = {
  active?: ClientNavKey;
  onSelect?: (key: ClientNavKey) => void;
};

const navItems: NavItem[] = [
  { key: "home", label: "Inicio", icon: "home-outline" },
  { key: "work", label: "minha obra", icon: "hammer-outline" },
  { key: "search", label: "Buscar", icon: "search-outline" },
  { key: "ads", label: "Anunciar", icon: "megaphone-outline", badge: "3" },
  { key: "settings", label: "Configuracoes", icon: "settings-outline" },
];

export function ClientBottomNav({ active = "home", onSelect }: ClientBottomNavProps) {
  return (
    <View className="mx-3 mb-4 rounded-[24px] bg-card px-2 py-3 shadow-lg shadow-black/10">
      <View className="flex-row items-center justify-around">
        {navItems.map((item) => {
          const isActive = active === item.key;

          return (
            <Pressable
              key={item.key}
              onPress={() => onSelect?.(item.key)}
              className="items-center gap-1 px-1"
              accessibilityRole="button"
              accessibilityLabel={item.label}
            >
              <View className="relative">
                <Ionicons
                  name={item.icon}
                  size={24}
                  color={isActive ? "#b94b50" : "#9e8e8f"}
                />
                {item.badge ? (
                  <View className="absolute -right-2 -top-1 h-4 w-4 items-center justify-center rounded-full bg-primary">
                    <Text className="text-[10px] font-bold text-white">
                      {item.badge}
                    </Text>
                  </View>
                ) : null}
              </View>
              <Text className={`text-xs font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
