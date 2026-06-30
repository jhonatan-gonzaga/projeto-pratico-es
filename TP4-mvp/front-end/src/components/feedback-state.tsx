import { ActivityIndicator, Pressable, Text, View } from "react-native";

export function LoadingState({ label = "Carregando..." }: { label?: string }) {
  return (
    <View className="items-center justify-center gap-3 rounded-[16px] bg-card px-4 py-8 shadow-sm shadow-black/5">
      <ActivityIndicator color="#b94b50" />
      <Text className="text-sm font-medium text-muted-foreground">{label}</Text>
    </View>
  );
}

export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <View className="items-center gap-3 rounded-[16px] border border-[#f2cdd0] bg-[#fff7f7] px-4 py-6">
      <Text className="text-center text-sm font-semibold text-primary">
        {message}
      </Text>
      {onRetry ? (
        <Pressable
          onPress={onRetry}
          className="rounded-full bg-primary px-5 py-2.5"
          accessibilityRole="button"
        >
          <Text className="text-sm font-bold text-white">Tentar novamente</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <View className="items-center justify-center rounded-[16px] bg-card px-4 py-8 shadow-sm shadow-black/5">
      <Text className="text-center text-sm font-medium text-muted-foreground">
        {message}
      </Text>
    </View>
  );
}
