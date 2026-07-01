import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, TextInput, View } from "react-native";

export type IconName = keyof typeof Ionicons.glyphMap;
export type ValidationStatus = "default" | "valid" | "error";

type FieldProps = {
  label: string;
  icon: IconName;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  keyboardType?: "default" | "email-address" | "phone-pad";
  autoComplete?: "email" | "password" | "name" | "tel";
  secureTextEntry?: boolean;
  active?: boolean;
  helperText?: string;
  onBlur?: () => void;
  rightAction?: React.ReactNode;
  status?: ValidationStatus;
};

const logo = require("../../assets/logotipo.png");

const statusClasses: Record<ValidationStatus, string> = {
  default: "border-input-border bg-background",
  valid: "border-[#16a34a] bg-[#f7fff9]",
  error: "border-[#dc2626] bg-[#fff7f7]",
};

export function BrandLogo() {
  return (
    <View className="h-[76px] w-full max-w-[284px] items-center justify-center rounded-[22px] bg-card px-4 shadow-lg shadow-primary/20">
      <Image
        source={logo}
        className="h-[58px] w-full max-w-[217px]"
        resizeMode="contain"
        accessibilityLabel="Conecta Obras Itacoatiara"
      />
    </View>
  );
}

export function Field({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  autoComplete,
  secureTextEntry,
  active,
  helperText,
  onBlur,
  rightAction,
  status = "default",
}: FieldProps) {
  const appliedStatus = status === "default" && active ? "active" : status;
  const containerClass =
    appliedStatus === "active"
      ? "border-primary bg-[#fff9f9]"
      : statusClasses[status];
  const isValidated = status === "valid" || status === "error";

  return (
    <View className="gap-1">
      <View
        className={`min-h-[62px] gap-1 rounded-[14px] border-[1.5px] px-3.5 py-2.5 ${containerClass}`}
      >
        <Text className="text-[10px] font-bold uppercase tracking-[0.7px] text-primary">
          {label}
        </Text>
        <View className="flex-row items-center gap-2.5">
          <Ionicons name={icon} size={17} color="#b94b50" />
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            autoCapitalize="none"
            autoComplete={autoComplete}
            secureTextEntry={secureTextEntry}
            className="min-h-[26px] min-w-0 flex-1 p-0 text-[15px] font-medium text-foreground"
            placeholder={placeholder}
            placeholderTextColor="#c5adaf"
            accessibilityLabel={label}
          />
          {rightAction}
          {isValidated ? (
            <Ionicons
              name={status === "valid" ? "checkmark-circle" : "alert-circle"}
              size={18}
              color={status === "valid" ? "#16a34a" : "#dc2626"}
            />
          ) : null}
        </View>
      </View>
      {helperText ? (
        <Text
          className={`px-1 text-xs leading-4 ${
            status === "error" ? "text-[#dc2626]" : "text-muted-foreground"
          }`}
        >
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}

export function SocialButtons({
  onGoogle,
  onPhone,
}: {
  onGoogle: () => void;
  onPhone: () => void;
}) {
  return (
    <View className="flex-row gap-3">
      <Pressable
        onPress={onGoogle}
        className="min-h-[50px] flex-1 flex-row items-center justify-center gap-2 rounded-[14px] border-[1.5px] border-input-border bg-card px-3"
        accessibilityRole="button"
      >
        <Text className="text-lg font-extrabold text-[#4285F4]">G</Text>
        <Text className="text-[15px] font-semibold text-foreground">Google</Text>
      </Pressable>
      <Pressable
        onPress={onPhone}
        className="min-h-[50px] flex-1 flex-row items-center justify-center gap-2 rounded-[14px] border-[1.5px] border-input-border bg-card px-3"
        accessibilityRole="button"
      >
        <Ionicons name="call-outline" size={20} color="#b94b50" />
        <Text className="text-[15px] font-semibold text-foreground">
          Telefone
        </Text>
      </Pressable>
    </View>
  );
}

export function Divider() {
  return (
    <View className="flex-row items-center gap-3">
      <View className="h-px flex-1 bg-input-border" />
      <Text className="text-xs text-muted-foreground">ou continue com</Text>
      <View className="h-px flex-1 bg-input-border" />
    </View>
  );
}

export function AccountRow({
  avatar,
  email,
  name,
  onPress,
  selected,
}: {
  avatar?: string;
  email?: string;
  name: string;
  onPress?: () => void;
  selected?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`mb-3 min-h-[66px] flex-row items-center gap-3 rounded-[16px] border px-4 py-3 ${
        selected ? "border-primary" : "border-input-border"
      }`}
      accessibilityRole="button"
    >
      {avatar ? (
        <Image
          source={{ uri: avatar }}
          className="h-10 w-10 rounded-full"
          resizeMode="cover"
          accessibilityLabel={name}
        />
      ) : (
        <View className="h-10 w-10 items-center justify-center rounded-full bg-muted">
          <Ionicons name="add" size={22} color="#888888" />
        </View>
      )}
      <View className="min-w-0 flex-1">
        <Text className="text-base font-semibold leading-5 text-foreground">
          {name}
        </Text>
        {email ? (
          <Text className="text-sm text-muted-foreground">{email}</Text>
        ) : null}
      </View>
      {selected ? (
        <View className="h-8 w-8 items-center justify-center rounded-full bg-primary">
          <Ionicons name="checkmark" size={16} color="#ffffff" />
        </View>
      ) : null}
    </Pressable>
  );
}

export function PermissionItem({
  icon,
  label,
}: {
  icon: IconName;
  label: string;
}) {
  return (
    <View className="flex-row items-center gap-3 py-2">
      <View className="h-8 w-8 items-center justify-center rounded-lg bg-[#fdeaea]">
        <Ionicons name={icon} size={16} color="#c0392b" />
      </View>
      <Text className="text-sm text-foreground">{label}</Text>
    </View>
  );
}

export function ProfileCard({
  description,
  icon,
  label,
  selected,
  onPress,
}: {
  description: string;
  icon: IconName;
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`relative rounded-[20px] px-5 pb-6 pt-6 ${
        selected ? "border-2 border-primary bg-card" : "border border-input-border bg-card"
      }`}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
    >
      <View className="absolute right-4 top-4">
        {selected ? (
          <View className="h-6 w-6 items-center justify-center rounded-full bg-primary">
            <View className="h-2.5 w-2.5 rounded-full bg-white" />
          </View>
        ) : (
          <View className="h-6 w-6 rounded-full border-2 border-muted" />
        )}
      </View>

      <View className="mb-4 items-center">
        <View className="h-14 w-14 items-center justify-center rounded-full bg-[#f7e8e9]">
          <Ionicons name={icon} size={28} color="#b94b50" />
        </View>
      </View>

      <Text className="mb-2 text-center text-lg font-bold text-foreground">
        {label}
      </Text>
      <Text className="text-center text-sm leading-6 text-muted-foreground">
        {description}
      </Text>
    </Pressable>
  );
}

export function ProfileInfoField({
  active,
  autoComplete,
  helperText,
  icon,
  keyboardType = "default",
  label,
  onChangeText,
  onBlur,
  status = "default",
  value,
}: {
  active?: boolean;
  autoComplete?: "email" | "name" | "tel";
  helperText?: string;
  icon: IconName;
  keyboardType?: "default" | "email-address" | "phone-pad";
  label: string;
  onBlur?: () => void;
  onChangeText: (value: string) => void;
  status?: ValidationStatus;
  value: string;
}) {
  const isError = status === "error";
  const isValid = status === "valid";

  return (
    <View className="mb-3 gap-1">
      <View
        className={`rounded-[16px] border px-4 pb-3 pt-3 ${
          isError
            ? "border-[#dc2626] bg-[#fff7f7]"
            : isValid
              ? "border-[#16a34a] bg-[#f7fff9]"
              : active
                ? "border-primary"
                : "border-input-border"
        }`}
      >
        <Text className="mb-1 text-xs font-bold uppercase tracking-[1.6px] text-primary">
          {label}
        </Text>
        <View className="flex-row items-center gap-3">
          <Ionicons name={icon} size={16} color="#b94b50" />
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChangeText}
            keyboardType={keyboardType}
            autoComplete={autoComplete}
            autoCapitalize={keyboardType === "email-address" ? "none" : "words"}
            className={`min-h-[28px] flex-1 p-0 text-base ${
              active ? "font-medium text-foreground" : "text-muted-foreground"
            }`}
            placeholderTextColor="#c5adaf"
            accessibilityLabel={label}
          />
          {isError || isValid ? (
            <Ionicons
              name={isValid ? "checkmark-circle" : "alert-circle"}
              size={18}
              color={isValid ? "#16a34a" : "#dc2626"}
            />
          ) : null}
        </View>
      </View>
      {helperText ? (
        <Text className="px-1 text-xs leading-4 text-[#dc2626]">
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}
