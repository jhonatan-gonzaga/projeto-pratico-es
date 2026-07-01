import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, TextInput, View } from "react-native";

import { statusMeta } from "../data";
import type { IconName, ProfessionalArea, ProfessionalService, ProfessionalTab, ProjectItem, ServiceRequest, ServiceStatus } from "../types";

export type FieldValidationStatus = "default" | "valid" | "error";

const validationClasses: Record<FieldValidationStatus, string> = {
  default: "border-input-border bg-card",
  valid: "border-[#16a34a] bg-card",
  error: "border-[#dc2626] bg-card",
};

function ValidationHelper({
  helperText,
  status,
}: {
  helperText?: string;
  status: FieldValidationStatus;
}) {
  if (!helperText) {
    return null;
  }

  return (
    <Text
      className={`px-1 text-xs leading-4 ${
        status === "error" ? "text-[#dc2626]" : "text-muted-foreground"
      }`}
    >
      {helperText}
    </Text>
  );
}

export function ProjectSection({
  children,
  icon,
  title,
}: {
  children: React.ReactNode;
  icon: IconName;
  title: string;
}) {
  return (
    <View className="rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
      <View className="mb-4 flex-row items-center gap-2">
        <Ionicons name={icon} size={18} color="#b94b50" />
        <Text className="text-base font-bold text-foreground">{title}</Text>
      </View>
      {children}
    </View>
  );
}

export function SetupTextField({
  helperText,
  icon,
  keyboardType = "default",
  multiline,
  onBlur,
  onChangeText,
  placeholder,
  status = "default",
  value,
}: {
  helperText?: string;
  icon?: IconName;
  keyboardType?: "default" | "numeric" | "phone-pad";
  multiline?: boolean;
  onBlur?: () => void;
  onChangeText: (value: string) => void;
  placeholder?: string;
  status?: FieldValidationStatus;
  value: string;
}) {
  const isValidated = status === "valid" || status === "error";

  return (
    <View className="gap-1">
      <View
        className={`flex-row gap-2.5 rounded-[16px] border-[1.5px] px-4 py-3 shadow-sm ${validationClasses[status]} ${
          multiline ? "min-h-[100px] items-start" : "items-center"
        }`}
      >
        {icon ? <Ionicons name={icon} size={16} color="#b94b50" /> : null}
        <TextInput
          value={value}
          onBlur={onBlur}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          multiline={multiline}
          className={`flex-1 p-0 text-[15px] font-medium text-foreground ${
            multiline ? "min-h-[74px] text-top" : "min-h-[24px]"
          }`}
          placeholder={placeholder}
          placeholderTextColor="#b0b8c1"
          accessibilityLabel={placeholder}
        />
        {isValidated ? (
          <Ionicons
            name={status === "valid" ? "checkmark-circle" : "alert-circle"}
            size={18}
            color={status === "valid" ? "#16a34a" : "#dc2626"}
          />
        ) : null}
      </View>
      <ValidationHelper helperText={helperText} status={status} />
    </View>
  );
}

export function SetupSection({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <View className="gap-2">
      <Text className="text-sm font-bold text-foreground">{label}</Text>
      {children}
    </View>
  );
}

export function ChoiceChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full border-[1.5px] px-[18px] py-2.5 shadow-sm ${
        selected ? "border-primary bg-primary" : "border-input-border bg-card"
      }`}
      accessibilityRole="button"
      accessibilityState={{ selected }}
    >
      <Text
        className={`text-sm font-semibold ${
          selected ? "text-white" : "text-foreground"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function DayButton({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`h-10 w-10 items-center justify-center rounded-full border-[1.5px] shadow-sm ${
        selected ? "border-primary bg-primary" : "border-input-border bg-card"
      }`}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={`Dia ${label}`}
    >
      <Text
        className={`text-[13px] font-bold ${
          selected ? "text-white" : "text-foreground"
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function ProjectInput({
  helperText,
  label,
  onBlur,
  placeholder,
  status = "default",
  value,
  onChangeText,
}: {
  helperText?: string;
  label: string;
  onBlur?: () => void;
  placeholder: string;
  status?: FieldValidationStatus;
  value: string;
  onChangeText: (value: string) => void;
}) {
  const isValidated = status === "valid" || status === "error";

  return (
    <View className="gap-1">
      <Text className="mb-1.5 text-xs text-muted-foreground">{label}</Text>
      <View
        className={`min-h-[46px] flex-row items-center rounded-[12px] border-[1.5px] px-4 py-3 ${
          status === "default" ? "border-input-border bg-card" : validationClasses[status]
        }`}
      >
        <TextInput
          value={value}
          onBlur={onBlur}
          onChangeText={onChangeText}
          className="min-h-[20px] flex-1 p-0 text-sm text-foreground"
          placeholder={placeholder}
          placeholderTextColor="#b0b8c1"
          accessibilityLabel={label}
        />
        {isValidated ? (
          <Ionicons
            name={status === "valid" ? "checkmark-circle" : "alert-circle"}
            size={18}
            color={status === "valid" ? "#16a34a" : "#dc2626"}
          />
        ) : null}
      </View>
      <ValidationHelper helperText={helperText} status={status} />
    </View>
  );
}

export function ProjectCategoryChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-full border px-4 py-2 ${
        selected ? "border-primary bg-primary" : "border-input-border bg-card"
      }`}
      accessibilityRole="button"
      accessibilityState={{ selected }}
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

export function PhotoTypeOption({
  description,
  label,
  onPress,
  selected,
}: {
  description: string;
  label: string;
  onPress: () => void;
  selected: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center justify-between gap-3 rounded-[12px] border px-4 py-3 ${
        selected ? "border-primary bg-card" : "border-input-border bg-card"
      }`}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <View className="flex-1">
        <Text
          className={`text-sm font-bold ${
            selected ? "text-primary" : "text-foreground"
          }`}
        >
          {label}
        </Text>
        <Text className="mt-0.5 text-xs leading-4 text-muted-foreground">
          {description}
        </Text>
      </View>
      <View
        className={`h-6 w-6 items-center justify-center rounded-full border-2 ${
          selected ? "border-primary" : "border-[#c0b0b1]"
        }`}
      >
        {selected ? <View className="h-3 w-3 rounded-full bg-primary" /> : null}
      </View>
    </Pressable>
  );
}

export function DetailTag({ label, active }: { label: string; active?: boolean }) {
  return (
    <View
      className={`rounded-[12px] px-3 py-1 ${
        active ? "bg-primary" : "bg-muted"
      }`}
    >
      <Text
        className={`text-sm font-medium ${
          active ? "text-white" : "text-primary"
        }`}
      >
        {label}
      </Text>
    </View>
  );
}

export function DetailInfoCard({
  icon,
  label,
  subtitle,
  value,
}: {
  icon: IconName;
  label: string;
  subtitle?: string;
  value: string;
}) {
  return (
    <View className="flex-1 rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
      <View className="mb-1 flex-row items-center gap-1">
        <Ionicons name={icon} size={16} color="#b94b50" />
        <Text className="text-xs font-semibold uppercase tracking-[0.5px] text-muted-foreground">
          {label}
        </Text>
      </View>
      <Text className="text-lg font-bold text-foreground">{value}</Text>
      {subtitle ? (
        <Text className="mt-0.5 text-xs text-muted-foreground">{subtitle}</Text>
      ) : null}
    </View>
  );
}

export function ServiceInfoBox({
  icon,
  label,
  value,
}: {
  icon: IconName;
  label: string;
  value: string;
}) {
  return (
    <View className="flex-1 flex-row items-center gap-2 rounded-[8px] bg-muted px-3 py-2">
      <Ionicons name={icon} size={14} color="#b94b50" />
      <View className="flex-1">
        <Text className="mb-0.5 text-xs uppercase leading-3 tracking-[0.4px] text-muted-foreground">
          {label}
        </Text>
        <Text className="text-sm font-semibold leading-4 text-foreground">
          {value}
        </Text>
      </View>
    </View>
  );
}
