import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Platform, Pressable, Text, TextInput, View } from "react-native";

type NativeDateTimeFieldProps = {
  helperText?: string;
  label?: string;
  minimumDate?: Date;
  mode: "date" | "time";
  onBlur?: () => void;
  onChange: (value: string) => void;
  placeholder: string;
  status?: "default" | "valid" | "error";
  value: string;
};

const statusClass = {
  default: "border-input-border bg-card",
  valid: "border-[#16a34a] bg-[#f7fff9]",
  error: "border-[#dc2626] bg-[#fff7f7]",
};

function toPickerDate(value: string, mode: "date" | "time") {
  if (mode === "date" && value) {
    return new Date(`${value}T00:00:00`);
  }

  if (mode === "time" && value) {
    const [hours, minutes] = value.split(":").map(Number);
    const date = new Date();
    date.setHours(hours || 0, minutes || 0, 0, 0);
    return date;
  }

  return new Date();
}

function formatPickerValue(date: Date, mode: "date" | "time") {
  if (mode === "date") {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function NativeDateTimeField({
  helperText,
  label,
  minimumDate,
  mode,
  onBlur,
  onChange,
  placeholder,
  status = "default",
  value,
}: NativeDateTimeFieldProps) {
  const [isOpen, setIsOpen] = useState(false);
  const icon = mode === "date" ? "calendar-outline" : "time-outline";
  const displayValue = value || placeholder;
  const isPlaceholder = !value;

  const handleNativeChange = (event: DateTimePickerEvent, selected?: Date) => {
    setIsOpen(false);
    onBlur?.();

    if (event.type === "dismissed" || !selected) {
      return;
    }

    onChange(formatPickerValue(selected, mode));
  };

  if (Platform.OS === "web") {
    return (
      <View className="gap-1">
        {label ? <Text className="text-sm font-bold text-foreground">{label}</Text> : null}
        <View
          className={`flex-row items-center gap-2.5 rounded-[16px] border-[1.5px] px-4 py-3 shadow-sm ${statusClass[status]}`}
        >
          <Ionicons name={icon} size={16} color="#b94b50" />
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            className="min-h-[24px] flex-1 p-0 text-[15px] font-medium text-foreground"
            placeholder={placeholder}
            placeholderTextColor="#b0b8c1"
            {...({
              type: mode,
              min:
                mode === "date" && minimumDate
                  ? formatPickerValue(minimumDate, "date")
                  : undefined,
            } as object)}
          />
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

  return (
    <View className="gap-1">
      {label ? <Text className="text-sm font-bold text-foreground">{label}</Text> : null}
      <Pressable
        onPress={() => setIsOpen(true)}
        className={`flex-row items-center gap-2.5 rounded-[16px] border-[1.5px] px-4 py-3 shadow-sm ${statusClass[status]}`}
        accessibilityRole="button"
        accessibilityLabel={placeholder}
      >
        <Ionicons name={icon} size={16} color="#b94b50" />
        <Text
          className={`min-h-[24px] flex-1 text-[15px] font-medium ${
            isPlaceholder ? "text-[#b0b8c1]" : "text-foreground"
          }`}
        >
          {displayValue}
        </Text>
        {status === "valid" || status === "error" ? (
          <Ionicons
            name={status === "valid" ? "checkmark-circle" : "alert-circle"}
            size={18}
            color={status === "valid" ? "#16a34a" : "#dc2626"}
          />
        ) : null}
      </Pressable>
      {isOpen ? (
        <DateTimePicker
          value={toPickerDate(value, mode)}
          mode={mode}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          minimumDate={mode === "date" ? minimumDate : undefined}
          onChange={handleNativeChange}
        />
      ) : null}
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
