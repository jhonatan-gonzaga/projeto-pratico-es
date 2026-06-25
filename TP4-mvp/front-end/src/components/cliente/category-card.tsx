import { Image, Text, View } from "react-native";

type CategoryCardProps = {
  title: string;
  imageUri: string;
};

export function CategoryCard({ title, imageUri }: CategoryCardProps) {
  return (
    <View className="relative h-[100px] w-[106px] overflow-hidden rounded-[20px]">
      <Image
        source={{ uri: imageUri }}
        className="h-full w-full"
        resizeMode="cover"
        accessibilityLabel={title}
      />
      <View className="absolute inset-0 rounded-[20px] bg-foreground opacity-30" />
      <Text className="absolute bottom-2 left-2 text-sm font-semibold text-primary-foreground">
        {title}
      </Text>
    </View>
  );
}
