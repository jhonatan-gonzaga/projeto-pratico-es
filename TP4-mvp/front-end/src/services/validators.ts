const onlyDigits = (value: string) => value.replace(/\D/g, "");

export const formatBRPhone = (value: string) => {
  const digits = onlyDigits(value);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

export const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());

export const isValidName = (value: string) => {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  return parts.length >= 2 && parts.every((part) => part.length >= 2);
};

export const isValidPhone = (value: string) => onlyDigits(value).length === 11;

export const isValidPassword = (value: string) =>
  /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value);
