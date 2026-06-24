import type { ProfessionalService, ProjectItem, ServiceRequest, ServiceStatus } from "./types";

export const serviceRequests: ServiceRequest[] = [
  {
    title: "Pintura Residencial",
    location: "Centro",
    date: "04 de dez.",
    description:
      "Pintura completa de casa de 3 quartos, incluindo teto e paredes internas.",
    price: "R$ 1.800",
    negotiable: true,
  },
  {
    title: "Instalacao Eletrica",
    location: "Jauary",
    date: "05 de dez.",
    description:
      "Troca de fiacao e instalacao de novos pontos de energia em residencia.",
    price: "R$ 950",
    negotiable: true,
  },
  {
    title: "Montagem de Moveis",
    location: "Bela Vista",
    date: "06 de dez.",
    description:
      "Montagem de guarda-roupa, cama e mesa de cabeceira em apartamento.",
    price: "R$ 280",
  },
];

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

export const professionalServices: ProfessionalService[] = [
  {
    title: "Pintura Residencial",
    status: "inProgress",
    order: "SRV-1029",
    customer: "Carla Mendes",
    price: "R$ 450",
    date: "04 Dez, 2023",
    time: "08:00 - 17:00",
    address: "Rua das Flores, 45 - Centro",
    messageCount: "3",
    action: "Finalizar Servico",
  },
  {
    title: "Instalacao Eletrica",
    status: "completed",
    order: "SRV-0984",
    customer: "Roberto Silva",
    price: "R$ 120",
    date: "28 Nov, 2023",
    time: "14:00 - 15:30",
  },
  {
    title: "Montagem de Moveis",
    status: "pending",
    order: "SRV-1041",
    customer: "Fernanda Costa",
    price: "R$ 280",
    date: "06 Dez, 2023",
    time: "10:00 - 12:30",
    address: "Av. Paulista, 820 - Bela Vista",
    action: "Cancelar",
  },
];

export const projectItems: ProjectItem[] = [
  {
    title: "Construcao de Residencia",
    location: "Centro",
    image:
      "https://storage.googleapis.com/banani-generated-images/generated-images/38608ed7-42db-41b0-a4fd-f573925de860.jpg",
  },
  {
    title: "Construcao de Comercial",
    location: "Centro",
    image:
      "https://storage.googleapis.com/banani-generated-images/generated-images/2258a051-4e89-4651-90cb-3b82da7d20ab.jpg",
  },
  {
    title: "Construcao de Muro",
    location: "Centro",
    image:
      "https://storage.googleapis.com/banani-generated-images/generated-images/295aaf2d-1944-4391-a5fd-688e289811c1.jpg",
  },
];

