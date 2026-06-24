import { Ionicons } from "@expo/vector-icons";

export type IconName = keyof typeof Ionicons.glyphMap;

export type ServiceRequest = {
  title: string;
  location: string;
  date: string;
  time: string;
  deadline: string;
  description: string;
  price: string;
  negotiable?: boolean;
};

export type ProfessionalTab = "requests" | "services";
export type ProfessionalArea = "opportunities" | "projects" | "settings";
export type ServiceStatus = "inProgress" | "completed" | "pending";

export type ProfessionalService = {
  title: string;
  status: ServiceStatus;
  order: string;
  customer: string;
  price: string;
  date: string;
  time: string;
  deadline: string;
  address?: string;
  messageCount?: string;
  action?: string;
};

export type ProjectItem = {
  title: string;
  location: string;
  image: string;
};
