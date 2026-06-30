import type { ProfessionalService, ProjectItem, ServiceRequest, ServiceStatus } from "./types";

export const serviceRequests: ServiceRequest[] = [];

export const statusMeta: Record<
  ServiceStatus,
  { label: string; bg: string; color: string }
> = {
  inProgress: {
    label: "Em Andamento",
    bg: "bg-[#e5effc]",
    color: "#2d6bbf",
  },
  completed: {
    label: "Concluido",
    bg: "bg-[#e8f5ee]",
    color: "#2e7d5c",
  },
  pending: {
    label: "Aguardando Aprovacao",
    bg: "bg-[#fdf3dc]",
    color: "#b07c18",
  },
};

export const professionalServices: ProfessionalService[] = [];

export const projectItems: ProjectItem[] = [];
