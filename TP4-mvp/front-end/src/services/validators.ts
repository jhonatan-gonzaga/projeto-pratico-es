const onlyDigits = (value: string) => value.replace(/\D/g, "");

export type ValidationResult = {
  isValid: boolean;
  message?: string;
};

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

export const normalizeDigits = onlyDigits;

export const isRequiredText = (value: string, minLength = 2) =>
  value.trim().replace(/\s+/g, " ").length >= minLength;

export const isValidBRMoney = (value: string) => parseBRMoney(value) > 0;

export const isPositiveInteger = (value: string) =>
  /^\d+$/.test(value.trim()) && Number(value.trim()) > 0;

export const isValidTime = (value: string) =>
  /^([01]\d|2[0-3]):[0-5]\d$/.test(value.trim());

export const parseBRMoney = (value: string) => {
  const cleaned = value
    .trim()
    .replace(/[^\d.,-]/g, "")
    .replace(/\s/g, "");

  if (!cleaned || cleaned.includes("-")) {
    return 0;
  }

  const hasComma = cleaned.includes(",");
  const normalized = hasComma
    ? cleaned.replace(/\./g, "").replace(",", ".")
    : cleaned.replace(/,/g, "");
  const parsed = Number(normalized);

  return Number.isFinite(parsed) ? parsed : 0;
};

const timeToMinutes = (value: string) => {
  const [hours, minutes] = value.split(":").map(Number);

  return hours * 60 + minutes;
};

const success = (): ValidationResult => ({ isValid: true });

const fail = (message: string): ValidationResult => ({
  isValid: false,
  message,
});

export const validateProfessionalProfile = ({
  about,
  availableDays,
  dailyRate,
  endTime,
  name,
  neighborhood,
  number,
  phone,
  specialties,
  startTime,
  street,
}: {
  about: string;
  availableDays: string[];
  dailyRate: string;
  endTime: string;
  name: string;
  neighborhood: string;
  number: string;
  phone?: string;
  specialties: string[];
  startTime: string;
  street: string;
}) => {
  if (!isValidName(name)) {
    return fail("Informe nome e sobrenome, com pelo menos 2 letras em cada parte.");
  }

  if (phone !== undefined && !isValidPhone(phone)) {
    return fail("Informe um telefone valido com DDD e 11 digitos.");
  }

  if (specialties.length === 0) {
    return fail("Selecione pelo menos uma especialidade.");
  }

  if (availableDays.length === 0) {
    return fail("Selecione pelo menos um dia de atendimento.");
  }

  if (!isValidTime(startTime) || !isValidTime(endTime)) {
    return fail("Informe horarios no formato HH:mm, por exemplo 08:00.");
  }

  if (timeToMinutes(endTime) <= timeToMinutes(startTime)) {
    return fail("O horario final deve ser depois do horario inicial.");
  }

  if (!isValidBRMoney(dailyRate)) {
    return fail("O valor da diaria deve ser maior que zero.");
  }

  if (!isRequiredText(neighborhood)) {
    return fail("Informe o bairro de atendimento.");
  }

  if (!isRequiredText(street)) {
    return fail("Informe a rua de atendimento.");
  }

  if (!isPositiveInteger(number)) {
    return fail("Informe um numero de endereco maior que zero.");
  }

  if (!isRequiredText(about, 20)) {
    return fail("Descreva sua experiencia com pelo menos 20 caracteres.");
  }

  return success();
};

export const validateProjectForm = ({
  categories,
  details,
  neighborhood,
  title,
}: {
  categories: string[];
  details?: string;
  neighborhood: string;
  title: string;
}) => {
  if (!isRequiredText(title, 3)) {
    return fail("Informe um titulo do projeto com pelo menos 3 caracteres.");
  }

  if (!isRequiredText(neighborhood)) {
    return fail("Informe o bairro onde o projeto foi realizado.");
  }

  if (categories.length === 0) {
    return fail("Selecione pelo menos uma categoria do projeto.");
  }

  if (details !== undefined && details.trim() && !isRequiredText(details, 10)) {
    return fail("Os detalhes do projeto devem ter pelo menos 10 caracteres.");
  }

  return success();
};

export const validateReviewAction = ({
  action,
  details,
}: {
  action: "reply" | "report";
  details: string;
}) => {
  if (!isRequiredText(details, action === "reply" ? 10 : 15)) {
    return fail(
      action === "reply"
        ? "Escreva uma resposta com pelo menos 10 caracteres."
        : "Descreva o motivo do reporte com pelo menos 15 caracteres.",
    );
  }

  return success();
};

export const validateMessage = (value: string) => {
  const trimmed = value.trim();

  if (!trimmed) {
    return fail("Digite uma mensagem antes de enviar.");
  }

  if (trimmed.length > 500) {
    return fail("A mensagem deve ter no maximo 500 caracteres.");
  }

  return success();
};
