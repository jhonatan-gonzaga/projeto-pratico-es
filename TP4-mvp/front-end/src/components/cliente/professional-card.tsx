import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, useWindowDimensions, View } from "react-native";

type ProfessionalCardProps = {
  name: string;
  role: string;
  price: string;
  rating: string;
  avatarUri?: string | null;
  onPress?: () => void;
};

export function ProfessionalCard({
  name,
  role,
  price,
  rating,
  avatarUri,
  onPress,
}: ProfessionalCardProps) {
  const { width } = useWindowDimensions();
  const CardWrapper = onPress ? Pressable : View;
  const contentWidth = Math.min(width, 480) - 40;
  const cardWidth = Math.max(140, (contentWidth - 12) / 2);

  return (
    <CardWrapper
      onPress={onPress}
      className="overflow-hidden rounded-[18px] bg-card shadow-lg shadow-black/5"
      style={{ width: cardWidth }}
      accessibilityRole={onPress ? "button" : undefined}
    >
      <View className="relative aspect-square w-full">
        {avatarUri ? (
          <Image
            source={{ uri: avatarUri }}
            className="h-full w-full"
            resizeMode="cover"
            accessibilityLabel={name}
          />
        ) : (
          <View className="h-full w-full items-center justify-center bg-[#f7e8e9]">
            <Ionicons name="person" size={46} color="#b94b50" />
          </View>
        )}
        <View className="absolute right-3 top-3 flex-row items-center gap-1 rounded-[14px] bg-card px-2 py-1 shadow-sm shadow-black/10">
          <Ionicons name="star" size={12} color="#9e8e8f" />
          <Text className="text-xs font-semibold text-foreground">{rating}</Text>
        </View>
      </View>
      <View className="gap-1 px-3 py-3">
        <Text className="text-base font-bold leading-tight text-foreground" numberOfLines={2}>
          {name}
        </Text>
        <Text className="text-sm leading-5 text-muted-foreground" numberOfLines={2}>
          {role}
        </Text>
        <Text className="text-base font-bold text-primary">
          {price}
          <Text className="text-xs font-normal text-muted-foreground">/dia</Text>
        </Text>
      </View>
    </CardWrapper>
  );
}
