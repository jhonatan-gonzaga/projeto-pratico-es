const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000/api";

let accessToken: string | null = null;

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type RequestOptions = RequestInit & {
  auth?: boolean;
};

async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type") && options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (options.auth !== false && accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let response: Response;

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
    });
  } catch {
    throw new ApiError("Nao foi possivel conectar ao servidor.", 0);
  }

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = Array.isArray(data?.message)
      ? data.message.join("\n")
      : data?.message || "A requisicao falhou.";
    throw new ApiError(message, response.status);
  }

  return data as T;
}

function toQuery(params: Record<string, string | number | undefined>) {
  const search = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      search.set(key, String(value));
    }
  });

  const query = search.toString();
  return query ? `?${query}` : "";
}

export type UserRole = "CLIENTE" | "PROFISSIONAL" | "LOJISTA" | "SUPORTE";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  avatarUrl?: string | null;
  role: UserRole;
};

export type AuthResponse = {
  accessToken: string;
  user: AuthUser;
};

export type Category = {
  id: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
};

export type ProfessionalProfile = {
  id: string;
  about?: string | null;
  dailyRate?: string | number | null;
  ratingAvg?: string | number | null;
  servicesDone: number;
  user: AuthUser;
  address?: {
    neighborhood: string;
    city: string;
    street?: string | null;
    number?: string | null;
  } | null;
  specialties: { category: Category }[];
  availability: { dayOfWeek: string; startTime: string; endTime: string }[];
  portfolio: {
    id: string;
    title: string;
    location: string;
    description?: string | null;
    images: { id: string; url: string; type: string; altText?: string | null }[];
  }[];
  reviews?: {
    id: string;
    rating: number;
    comment?: string | null;
    professionalReply?: string | null;
    repliedAt?: string | null;
    reportReason?: string | null;
    reportDetails?: string | null;
    reportedAt?: string | null;
    createdAt: string;
    client: { user: { id: string; name: string } };
  }[];
};

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
};

export type ServiceAdStatus =
  | "DRAFT"
  | "OPEN"
  | "PAUSED"
  | "CONTRACTED"
  | "CANCELED"
  | "EXPIRED";

export type ServiceAd = {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate?: string | null;
  startTime?: string | null;
  deadlineDays?: number | null;
  budget?: string | number | null;
  negotiable: boolean;
  status: ServiceAdStatus;
  visits: number;
  createdAt: string;
  category: Category;
  categories?: { category: Category }[];
  images: { id: string; url: string }[];
  applications?: Application[];
  client?: { user: AuthUser };
};

export type ApplicationStatus =
  | "SENT"
  | "COUNTER_OFFERED"
  | "ACCEPTED"
  | "REJECTED"
  | "CANCELED";

export type Application = {
  id: string;
  proposedValue?: string | number | null;
  message?: string | null;
  status: ApplicationStatus;
  createdAt: string;
  ad?: ServiceAd;
  professional: ProfessionalProfile;
};

export type DirectRequest = {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate?: string | null;
  startTime?: string | null;
  deadlineDays?: number | null;
  budget?: string | number | null;
  status: "SENT" | "ACCEPTED" | "REJECTED" | "CANCELED" | "EXPIRED";
  client: { user: AuthUser };
  professional: ProfessionalProfile;
  images?: { id: string; url: string }[];
  conversations?: Conversation[];
};

export type ContractStatus =
  | "PENDING_START"
  | "IN_PROGRESS"
  | "WAITING_CLIENT_APPROVAL"
  | "COMPLETED"
  | "CANCELED"
  | "REOPENED";

export type Contract = {
  id: string;
  title: string;
  description: string;
  agreedValue?: string | number | null;
  startDate?: string | null;
  status: ContractStatus;
  client: { user: AuthUser };
  professional: ProfessionalProfile;
  ad?: (ServiceAd & { images: { id: string; url: string }[] }) | null;
  directRequest?: (DirectRequest & { images?: { id: string; url: string }[] }) | null;
  conversations?: Conversation[];
  review?: {
    id: string;
    rating: number;
    comment?: string | null;
    professionalReply?: string | null;
    repliedAt?: string | null;
    reportReason?: string | null;
    reportDetails?: string | null;
    reportedAt?: string | null;
  } | null;
};

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  readAt?: string | null;
  createdAt: string;
};

export type PortfolioProject = ProfessionalProfile["portfolio"][number];

export type UploadedImage = {
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
};

export type UploadedAudio = UploadedImage;

export type MessageItem = {
  id: string;
  type: "TEXT" | "AUDIO";
  text?: string | null;
  audioUrl?: string | null;
  durationMs?: number | null;
  readAt?: string | null;
  createdAt: string;
  sender: { id: string; name: string };
};

export type Conversation = {
  id: string;
  clientUserId: string;
  professionalUserId: string;
  contractId?: string | null;
  applicationId?: string | null;
  directRequestId?: string | null;
  clientUser: { id: string; name: string };
  professionalUser: { id: string; name: string };
  messages?: MessageItem[];
  createdAt: string;
  updatedAt: string;
};

export function setAccessToken(token: string | null) {
  accessToken = token;
}

export const api = {
  async login(email: string, password: string) {
    const response = await request<AuthResponse>("/auth/login", {
      method: "POST",
      auth: false,
      body: JSON.stringify({ email, password }),
    });
    setAccessToken(response.accessToken);
    return response;
  },

  async register(input: {
    name: string;
    email: string;
    phone?: string;
    password: string;
    role?: UserRole;
  }) {
    const response = await request<AuthResponse>("/auth/register", {
      method: "POST",
      auth: false,
      body: JSON.stringify(input),
    });
    setAccessToken(response.accessToken);
    return response;
  },

  async googleAuth(input: { email: string; name: string; avatarUrl?: string | null }) {
    const response = await request<AuthResponse>("/auth/google", {
      method: "POST",
      auth: false,
      body: JSON.stringify(input),
    });
    setAccessToken(response.accessToken);
    return response;
  },

  forgotPassword: (email: string) =>
    request<{ message: string; temporaryPassword: string }>("/auth/forgot-password", {
      method: "POST",
      auth: false,
      body: JSON.stringify({ email }),
    }),

  me: () => request<AuthUser>("/auth/me"),
  updateMe: (input: Partial<Pick<AuthUser, "name" | "email" | "phone" | "avatarUrl">>) =>
    request<AuthUser>("/users/me", {
      method: "PATCH",
      body: JSON.stringify(input),
    }),
  uploadImage: async (file: { uri: string; name: string; type: string }) => {
    const formData = new FormData();
    formData.append("file", file as unknown as Blob);
    return request<UploadedImage>("/uploads/image", {
      method: "POST",
      body: formData,
    });
  },
  uploadAudio: async (file: { uri: string; name: string; type: string }) => {
    const formData = new FormData();
    formData.append("file", file as unknown as Blob);
    return request<UploadedAudio>("/uploads/audio", {
      method: "POST",
      body: formData,
    });
  },

  categories: () => request<Category[]>("/categories", { auth: false }),
  professionals: (params: {
    q?: string;
    categoryId?: string;
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
  } = {}) => request<Paginated<ProfessionalProfile>>(`/professionals${toQuery(params)}`, { auth: false }),
  professional: (id: string) =>
    request<ProfessionalProfile>(`/professionals/${id}`, { auth: false }),
  professionalMe: () => request<ProfessionalProfile>("/professionals/me"),
  upsertProfessionalMe: (input: unknown) =>
    request<ProfessionalProfile>("/professionals/me", {
      method: "POST",
      body: JSON.stringify(input),
    }),
  myPortfolio: () => request<PortfolioProject[]>("/professionals/me/portfolio"),
  createPortfolio: (input: unknown) =>
    request<PortfolioProject>("/professionals/me/portfolio", {
      method: "POST",
      body: JSON.stringify(input),
    }),
  updatePortfolio: (id: string, input: unknown) =>
    request<PortfolioProject>(`/professionals/me/portfolio/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    }),
  deletePortfolio: (id: string) =>
    request<{ deleted: true }>(`/professionals/me/portfolio/${id}`, {
      method: "DELETE",
    }),

  myServiceAds: () => request<Paginated<ServiceAd>>("/service-ads/my"),
  myServiceAdsSummary: () =>
    request<{ openAds: number; receivedApplications: number }>("/service-ads/my/summary"),
  openServiceAds: () => request<Paginated<ServiceAd>>("/service-ads/open"),
  serviceAdApplications: (adId: string) =>
    request<Application[]>(`/service-ads/${adId}/applications`),
  createServiceAd: (input: unknown) =>
    request<ServiceAd>("/service-ads", {
      method: "POST",
      body: JSON.stringify(input),
    }),
  updateServiceAd: (id: string, input: unknown) =>
    request<ServiceAd>(`/service-ads/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    }),
  updateServiceAdStatus: (id: string, status: ServiceAdStatus) =>
    request<ServiceAd>(`/service-ads/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
  dismissServiceAd: (id: string) =>
    request<{ dismissed: true }>(`/service-ads/${id}/dismiss`, { method: "POST" }),
  deleteServiceAd: (id: string) =>
    request<{ deleted: true }>(`/service-ads/${id}`, { method: "DELETE" }),

  createApplication: (adId: string, input: { proposedValue?: number; message?: string }) =>
    request<Application>(`/service-ads/${adId}/applications`, {
      method: "POST",
      body: JSON.stringify(input),
    }),
  myApplications: () => request<Application[]>("/applications/my"),
  acceptApplication: (id: string) =>
    request<Contract>(`/applications/${id}/accept`, { method: "POST" }),
  rejectApplication: (id: string) =>
    request<Application>(`/applications/${id}/reject`, { method: "POST" }),

  createDirectRequest: (input: unknown) =>
    request<DirectRequest>("/direct-requests", {
      method: "POST",
      body: JSON.stringify(input),
    }),
  myDirectRequests: () => request<DirectRequest[]>("/direct-requests/my"),
  inboxDirectRequests: () => request<DirectRequest[]>("/direct-requests/inbox"),
  inboxDirectRequestsSummary: () =>
    request<{ pendingDirectRequests: number }>("/direct-requests/inbox/summary"),
  acceptDirectRequest: (id: string) =>
    request<Contract>(`/direct-requests/${id}/accept`, { method: "POST" }),
  rejectDirectRequest: (id: string) =>
    request<DirectRequest>(`/direct-requests/${id}/reject`, { method: "POST" }),

  myContracts: () => request<Contract[]>("/contracts/my"),
  contract: (id: string) => request<Contract>(`/contracts/${id}`),
  updateContractStatus: (id: string, status: ContractStatus, note?: string) =>
    request<Contract>(`/contracts/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status, note }),
    }),
  createReview: (id: string, input: { rating: number; comment?: string }) =>
    request(`/contracts/${id}/review`, {
      method: "POST",
      body: JSON.stringify(input),
    }),
  replyReview: (id: string, input: { reply: string }) =>
    request(`/contracts/reviews/${id}/reply`, {
      method: "POST",
      body: JSON.stringify(input),
    }),
  reportReview: (id: string, input: { reason: string; details: string }) =>
    request(`/contracts/reviews/${id}/report`, {
      method: "POST",
      body: JSON.stringify(input),
    }),

  conversations: () => request<Conversation[]>("/conversations"),
  unreadConversations: () => request<{ count: number }>("/conversations/unread-count"),
  conversationMessages: (id: string) =>
    request<MessageItem[]>(`/conversations/${id}/messages`),
  sendMessage: (
    id: string,
    input:
      | { type?: "TEXT"; text: string }
      | { type: "AUDIO"; audioUrl: string; durationMs?: number },
  ) =>
    request<MessageItem>(`/conversations/${id}/messages`, {
      method: "POST",
      body: JSON.stringify(input),
    }),

  notifications: () => request<NotificationItem[]>("/notifications"),
  unreadNotifications: () => request<{ count: number }>("/notifications/unread-count"),
};

export function formatMoney(value?: string | number | null) {
  const numericValue = Number(value ?? 0);

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return "A combinar";
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numericValue);
}

export function formatDate(value?: string | null) {
  if (!value) {
    return "A combinar";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
