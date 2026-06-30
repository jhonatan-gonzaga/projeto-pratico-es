import { Ionicons } from "@expo/vector-icons";

export type IconName = keyof typeof Ionicons.glyphMap;

export type ServiceRequest = {
  id?: string;
  source?: "direct" | "ad";
  title: string;
  location: string;
  date: string;
  time: string;
  deadline: string;
  description: string;
  price: string;
  category?: string;
  imageUrls?: string[];
  negotiable?: boolean;
};

export type ProfessionalTab = "requests" | "services";
export type ProfessionalArea = "opportunities" | "projects" | "settings";
export type ServiceStatus = "inProgress" | "completed" | "pending";

export type ProfessionalService = {
  title: string;
  status: ServiceStatus;
  order: string;
  source?: "contract" | "application";
  customer: string;
  price: string;
  date: string;
  time: string;
  deadline: string;
  category?: string;
  description?: string;
  imageUrls?: string[];
  address?: string;
  hasReview?: boolean;
  canStart?: boolean;
  messageCount?: string;
  conversationId?: string | null;
  action?: string;
};

export type ProjectItem = {
  id?: string;
  title: string;
  location: string;
  description?: string;
  image: string;
  imageType?: "COVER" | "BEFORE" | "AFTER" | "GENERAL";
  images?: {
    id?: string;
    url: string;
    type: "COVER" | "BEFORE" | "AFTER" | "GENERAL";
    altText?: string | null;
  }[];
};
