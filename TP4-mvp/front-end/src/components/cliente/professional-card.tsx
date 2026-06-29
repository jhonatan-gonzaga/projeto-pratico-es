import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

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
  const CardWrapper = onPress ? Pressable : View;

  return (
    <CardWrapper
      onPress={onPress}
      className="w-[48%] min-w-[48%] overflow-hidden rounded-[20px] bg-card shadow-lg shadow-black/5"
      accessibilityRole={onPress ? "button" : undefined}
    >
      <View className="relative h-[150px]">
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
      <View className="px-3 py-3">
        <Text className="font-bold text-base leading-tight text-foreground">{name}</Text>
        <Text className="mb-2 text-sm text-muted-foreground">{role}</Text>
        <Text className="text-base font-bold text-primary">
          {price}
          <Text className="text-xs font-normal text-muted-foreground">/dia</Text>
        </Text>
      </View>
    </CardWrapper>
  );
}
