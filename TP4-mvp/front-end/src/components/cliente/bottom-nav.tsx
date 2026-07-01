import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

import { api } from "../../services/api";

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
  { key: "work", label: "Obra", icon: "hammer-outline" },
  { key: "search", label: "Buscar", icon: "search-outline" },
  { key: "ads", label: "Anunciar", icon: "megaphone-outline" },
  { key: "settings", label: "Ajustes", icon: "settings-outline" },
];

export function ClientBottomNav({ active = "home", onSelect }: ClientBottomNavProps) {
  const [badges, setBadges] = useState<Partial<Record<ClientNavKey, number>>>({});

  useEffect(() => {
    let isMounted = true;

    Promise.all([api.myServiceAdsSummary(), api.unreadConversations()])
      .then(([ads, messages]) => {
        if (!isMounted) {
          return;
        }

        setBadges({
          ads: ads.receivedApplications,
          work: messages.count,
        });
      })
      .catch(() => undefined);

    return () => {
      isMounted = false;
    };
  }, [active]);

  return (
    <View className="rounded-t-[22px] border-t border-input-border bg-card px-2 py-3 shadow-lg shadow-black/10">
      <View className="flex-row items-center justify-between">
        {navItems.map((item) => {
          const isActive = active === item.key;
          const badge = badges[item.key];

          return (
            <Pressable
              key={item.key}
              onPress={() => onSelect?.(item.key)}
              className="min-w-0 flex-1 items-center gap-1 px-1"
              accessibilityRole="button"
              accessibilityLabel={item.label}
            >
              <View className="relative">
                <Ionicons
                  name={item.icon}
                  size={24}
                  color={isActive ? "#b94b50" : "#9e8e8f"}
                />
                {badge ? (
                  <View className="absolute -right-2 -top-1 h-4 w-4 items-center justify-center rounded-full bg-primary">
                    <Text className="text-[10px] font-bold text-white">
                      {badge > 9 ? "9+" : badge}
                    </Text>
                  </View>
                ) : null}
              </View>
              <Text
                className={`text-center text-[10px] font-semibold leading-3 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
                numberOfLines={1}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
