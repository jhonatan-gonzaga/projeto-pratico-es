import { Image, Pressable, Text, View } from "react-native";

type CategoryCardProps = {
  title: string;
  imageUri: string;
  onPress?: () => void;
  selected?: boolean;
};

export function CategoryCard({
  title,
  imageUri,
  onPress,
  selected = false,
}: CategoryCardProps) {
  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper
      onPress={onPress}
      className={`relative h-[100px] w-[112px] overflow-hidden rounded-[18px] ${
        selected ? "border-[3px] border-primary" : ""
      }`}
      accessibilityRole={onPress ? "button" : undefined}
      accessibilityState={onPress ? { selected } : undefined}
      accessibilityLabel={title}
    >
      <Image
        source={{ uri: imageUri }}
        className="h-full w-full"
        resizeMode="cover"
        accessibilityLabel={title}
      />
      <View className="absolute inset-0 rounded-[18px] bg-foreground opacity-35" />
      <Text
        className="absolute bottom-2 left-2 right-2 text-sm font-semibold leading-4 text-primary-foreground"
        numberOfLines={2}
      >
        {title}
      </Text>
    </Wrapper>
  );
}
