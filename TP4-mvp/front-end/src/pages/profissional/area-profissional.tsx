import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";

import { EmptyState, ErrorState, LoadingState } from "../../components/feedback-state";
import type {
  ProfessionalArea,
  ProfessionalService,
  ProfessionalTab,
  ProjectItem,
  ServiceRequest,
} from "../../components/profissional/types";
import {
  ProfessionalBottomTab,
  ProfessionalHomeHeader,
  ProfessionalTabToggle,
} from "../../components/profissional/components";
import {
  ApiError,
  Application,
  Contract,
  ContractStatus,
  DirectRequest,
  PortfolioProject,
  ServiceAd,
  api,
  formatDate,
  formatMoney,
} from "../../services/api";

import { AddProjectScreen } from "./adicionar-projeto";
import { SettingsScreen } from "./configuracao";
import { RequestDetailsScreen } from "./detalhes-pedido";
import { EditProjectScreen } from "./editar-projeto";
import { MyProjectsScreen } from "./meus-projetos";
import { ServiceDetailsScreen } from "./detalhes-servico";
import { ServiceMessageScreen } from "./mensagem-servico";
import { OportunidadeMeusServicosScreen } from "./oportunidade-meus-servicos";
import { OportunidadesNovosPedidosScreen } from "./oportunidades-novos-pedidos";
import { ProjectResultScreen } from "./resultado-projeto";

function mapDirectRequest(item: DirectRequest): ServiceRequest {
  return {
    id: item.id,
    source: "direct",
    title: item.title,
    location: item.location,
    date: formatDate(item.startDate),
    time: item.startTime ?? "A combinar",
    deadline: item.deadlineDays ? `${item.deadlineDays} dias` : "A combinar",
    description: item.description,
    price: formatMoney(item.budget),
    category:
      item.professional.specialties?.map((specialty) => specialty.category.name).join(", ") ||
      "Solicitacao direta",
    imageUrls: item.images?.map((image) => image.url) ?? [],
    negotiable: true,
  };
}

function mapServiceAd(item: ServiceAd): ServiceRequest {
  return {
    id: item.id,
    source: "ad",
    title: item.title,
    location: item.location,
    date: formatDate(item.startDate),
    time: item.startTime ?? "A combinar",
    deadline: item.deadlineDays ? `${item.deadlineDays} dias` : "A combinar",
    description: item.description,
    price: formatMoney(item.budget),
    category:
      item.categories?.map((adCategory) => adCategory.category.name).join(", ") ||
      item.category.name,
    imageUrls: item.images.map((image) => image.url),
    negotiable: item.negotiable,
  };
}

const contractStatusToServiceStatus: Record<
  ContractStatus,
  ProfessionalService["status"]
> = {
  PENDING_START: "pending",
  IN_PROGRESS: "inProgress",
  WAITING_CLIENT_APPROVAL: "pending",
  COMPLETED: "completed",
  CANCELED: "completed",
  REOPENED: "inProgress",
};

function mapContract(item: Contract): ProfessionalService {
  return {
    title: item.title,
    status: contractStatusToServiceStatus[item.status],
    order: item.id,
    source: "contract",
    customer: item.client.user.name,
    price: formatMoney(item.agreedValue),
    date: formatDate(item.startDate),
    time: "A combinar",
    deadline: "A combinar",
    conversationId: item.conversations?.[0]?.id,
    messageCount: item.conversations?.[0]?.messages?.length
      ? String(item.conversations[0].messages.length)
      : undefined,
    action:
      item.status === "PENDING_START" ? "Iniciar Servico" : "Em andamento",
    canStart: item.status === "PENDING_START" || item.status === "REOPENED",
  };
}

function mapApplication(item: Application): ProfessionalService | null {
  if (!item.ad || !["SENT", "COUNTER_OFFERED"].includes(item.status)) {
    return null;
  }

  return {
    title: item.ad.title,
    status: "pending",
    order: `application-${item.id}`,
    source: "application",
    customer: item.ad.client?.user?.name ?? "Cliente do servico",
    price: formatMoney(item.proposedValue ?? item.ad.budget),
    date: formatDate(item.ad.startDate),
    time: item.ad.startTime ?? "A combinar",
    deadline: item.ad.deadlineDays ? `${item.ad.deadlineDays} dias` : "A combinar",
    address: item.ad.location,
    category:
      item.ad.categories?.map((adCategory) => adCategory.category.name).join(", ") ||
      item.ad.category.name,
    description: item.ad.description,
    imageUrls: item.ad.images?.map((image) => image.url) ?? [],
    action: "Aguardando aprovacao",
    canStart: false,
  };
}

function mapPortfolioProject(item: PortfolioProject): ProjectItem {
  return {
    id: item.id,
    title: item.title,
    location: item.location,
    description: item.description ?? "",
    image:
      item.images.find((image) => image.type === "COVER")?.url ??
      item.images[0]?.url ??
      "",
    imageType:
      (item.images.find((image) => image.type === "COVER")?.type as ProjectItem["imageType"]) ??
      (item.images[0]?.type as ProjectItem["imageType"]) ??
      "GENERAL",
    images: item.images.map((image) => ({
      id: image.id,
      url: image.url,
      type: image.type as NonNullable<ProjectItem["imageType"]>,
      altText: image.altText,
    })),
  };
}

function nextContractStatus(service: ProfessionalService): ContractStatus {
  if (service.status === "pending") {
    return "IN_PROGRESS";
  }

  if (service.status === "inProgress") {
    return "WAITING_CLIENT_APPROVAL";
  }

  return "REOPENED";
}

export function ProfessionalHomeScreen({
  onBack,
  onProfilePress,
  onSignOut,
}: {
  onBack: () => void;
  onProfilePress: () => void;
  onSignOut: () => void;
}) {
  const [activeTab, setActiveTab] = useState<ProfessionalTab>("requests");
  const [activeArea, setActiveArea] =
    useState<ProfessionalArea>("opportunities");
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [services, setServices] = useState<ProfessionalService[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [isViewingProjectResult, setIsViewingProjectResult] = useState(false);
  const [shouldReturnToResultAfterEdit, setShouldReturnToResultAfterEdit] =
    useState(false);
  const [isViewingRequestDetails, setIsViewingRequestDetails] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(null);
  const [selectedService, setSelectedService] =
    useState<ProfessionalService | null>(null);
  const [serviceView, setServiceView] = useState<"details" | "message" | null>(
    null,
  );

  const loadProfessionalArea = async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const [directRequests, openAds, contracts, applications, portfolio] = await Promise.all([
        api.inboxDirectRequests(),
        api.openServiceAds(),
        api.myContracts(),
        api.myApplications(),
        api.myPortfolio(),
      ]);
      setRequests([
        ...directRequests
          .filter((item) => item.status === "SENT")
          .map(mapDirectRequest),
        ...openAds.items.map(mapServiceAd),
      ]);
      setServices([
        ...applications.map(mapApplication).filter(Boolean),
        ...contracts.map(mapContract),
      ] as ProfessionalService[]);
      setProjects(portfolio.map(mapPortfolioProject));
    } catch (error) {
      setLoadError(
        error instanceof ApiError
          ? error.message
          : "Nao foi possivel carregar area profissional.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadProfessionalArea();
  }, []);

  const selectArea = (area: ProfessionalArea) => {
    setIsAddingProject(false);
    setIsEditingProject(false);
    setIsViewingProjectResult(false);
    setIsViewingRequestDetails(false);
    setSelectedRequest(null);
    setSelectedService(null);
    setSelectedProject(null);
    setServiceView(null);
    setActiveArea(area);
  };

  const openServiceView = (
    service: ProfessionalService,
    view: "details" | "message",
  ) => {
    setSelectedService(service);
    setServiceView(view);
  };

  const rejectRequest = async (request: ServiceRequest) => {
    try {
      if (request.source === "direct" && request.id) {
        await api.rejectDirectRequest(request.id);
      }
      setRequests((current) => current.filter((item) => item.id !== request.id));
      setIsViewingRequestDetails(false);
      setSelectedRequest(null);
    } catch (error) {
      setLoadError(
        error instanceof ApiError ? error.message : "Nao foi possivel recusar.",
      );
    }
  };

  const acceptRequest = async (request: ServiceRequest) => {
    try {
      if (request.source === "direct" && request.id) {
        const contract = await api.acceptDirectRequest(request.id);
        setServices((current) => [mapContract(contract), ...current]);
      } else if (request.source === "ad" && request.id) {
        const application = await api.createApplication(request.id, {});
        const pendingService = mapApplication(application);

        if (pendingService) {
          setServices((current) => [pendingService, ...current]);
        }
      }

      setRequests((current) => current.filter((item) => item.id !== request.id));
      setSelectedRequest(null);
      setIsViewingRequestDetails(false);
      setActiveTab("services");
    } catch (error) {
      setLoadError(
        error instanceof ApiError ? error.message : "Nao foi possivel aceitar.",
      );
    }
  };

  const runServicePrimaryAction = async (service: ProfessionalService) => {
    if (service.source === "application" || service.canStart === false) {
      return;
    }

    try {
      const updated = await api.updateContractStatus(
        service.order,
        nextContractStatus(service),
      );
      const mapped = mapContract(updated);
      setServices((current) =>
        current.map((item) => (item.order === service.order ? mapped : item)),
      );
      setSelectedService(mapped);
    } catch (error) {
      setLoadError(
        error instanceof ApiError
          ? error.message
          : "Nao foi possivel atualizar o servico.",
      );
    }
  };

  if (activeArea === "opportunities" && isViewingRequestDetails && selectedRequest) {
    return (
      <RequestDetailsScreen
        request={selectedRequest}
        onAccept={() => acceptRequest(selectedRequest)}
        onBack={() => {
          setIsViewingRequestDetails(false);
          setSelectedRequest(null);
        }}
        onProfilePress={onProfilePress}
        onReject={() => rejectRequest(selectedRequest)}
      />
    );
  }

  if (activeArea === "opportunities" && selectedService && serviceView) {
    if (serviceView === "details") {
      return (
        <ServiceDetailsScreen
          service={selectedService}
          onBack={() => setServiceView(null)}
          onMessage={() => setServiceView("message")}
          onProfilePress={onProfilePress}
          onStatusAction={() => runServicePrimaryAction(selectedService)}
        />
      );
    }
    return (
      <ServiceMessageScreen
        service={selectedService}
        onBack={() => setServiceView(null)}
        onProfilePress={onProfilePress}
      />
    );
  }

  if (activeArea === "projects" && isAddingProject) {
    return (
        <AddProjectScreen
          onBack={() => setIsAddingProject(false)}
          onProfilePress={onProfilePress}
          onSave={async (project) => {
          const saved = await api.createPortfolio({
            title: project.title,
            location: project.location,
            description: project.description,
            images: project.images ?? [],
          });
          setProjects((current) => [mapPortfolioProject(saved), ...current]);
          setIsAddingProject(false);
        }}
      />
    );
  }

  if (activeArea === "projects" && isEditingProject && selectedProject) {
    return (
      <EditProjectScreen
        project={selectedProject}
        onBack={() => {
          if (shouldReturnToResultAfterEdit) {
            setIsEditingProject(false);
            setIsViewingProjectResult(true);
            setShouldReturnToResultAfterEdit(false);
            return;
          }
          setIsEditingProject(false);
          setSelectedProject(null);
        }}
        onProfilePress={onProfilePress}
        onDelete={async (project) => {
          if (project.id) {
            await api.deletePortfolio(project.id);
          }
          setProjects((current) => current.filter((item) => item.id !== project.id));
          setIsEditingProject(false);
          setSelectedProject(null);
        }}
        onSave={async (project) => {
          const saved = project.id
            ? await api.updatePortfolio(project.id, {
                title: project.title,
                location: project.location,
                description: project.description,
                images: project.images ?? [],
              })
            : null;
          const nextProject = saved ? mapPortfolioProject(saved) : project;
          setProjects((current) =>
            current.map((item) =>
              item.id === selectedProject.id ? nextProject : item,
            ),
          );
          setSelectedProject(nextProject);
          setIsEditingProject(false);
        }}
      />
    );
  }

  if (activeArea === "projects" && isViewingProjectResult) {
    return (
      <ProjectResultScreen
        onBack={() => {
          setIsViewingProjectResult(false);
          setSelectedProject(null);
        }}
        onEdit={() => {
          setShouldReturnToResultAfterEdit(true);
          setIsViewingProjectResult(false);
          setIsEditingProject(true);
        }}
        onProfilePress={onProfilePress}
        project={selectedProject}
      />
    );
  }

  if (activeArea === "settings") {
    return (
      <SettingsScreen
        onBack={() => setActiveArea("opportunities")}
        onProfilePress={onProfilePress}
        onSelectArea={selectArea}
        onSignOut={onSignOut}
      />
    );
  }

  if (activeArea === "projects") {
    return (
      <MyProjectsScreen
        onAddProject={() => setIsAddingProject(true)}
        onBack={() => setActiveArea("opportunities")}
        onDeleteProject={(project) => {
          if (project.id) {
            void api.deletePortfolio(project.id);
          }
          setProjects((current) =>
            current.filter((item) => item.id !== project.id),
          );
        }}
        onEditProject={(project) => {
          setSelectedProject(project);
          setShouldReturnToResultAfterEdit(false);
          setIsEditingProject(true);
        }}
        onProfilePress={onProfilePress}
        projects={projects}
        onViewResult={(project) => {
          setSelectedProject(project);
          setIsViewingProjectResult(true);
        }}
        onSelectArea={selectArea}
      />
    );
  }

  return (
    <View className="h-full w-full max-w-[480px] self-center bg-background">
      <ProfessionalHomeHeader onBack={onBack} onProfilePress={onProfilePress} />
      <ProfessionalTabToggle activeTab={activeTab} onChangeTab={setActiveTab} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="pb-4"
        showsVerticalScrollIndicator={false}
      >
        {isLoading ? (
          <View className="px-4">
            <LoadingState label="Carregando oportunidades..." />
          </View>
        ) : loadError ? (
          <View className="px-4">
            <ErrorState message={loadError} onRetry={loadProfessionalArea} />
          </View>
        ) : activeTab === "requests" ? (
          requests.length === 0 ? (
            <View className="px-4">
              <EmptyState message="Nenhuma oportunidade disponivel agora." />
            </View>
          ) : (
            <OportunidadesNovosPedidosScreen
              requests={requests}
              onAccept={acceptRequest}
              onDetails={(request) => {
                setSelectedRequest(request);
                setIsViewingRequestDetails(true);
              }}
              onReject={rejectRequest}
            />
          )
        ) : services.length === 0 ? (
          <View className="px-4">
            <EmptyState message="Voce ainda nao possui servicos contratados." />
          </View>
        ) : (
          <OportunidadeMeusServicosScreen
            services={services}
            onDetails={(service) => openServiceView(service, "details")}
            onMessage={(service) => openServiceView(service, "message")}
            onPrimaryAction={runServicePrimaryAction}
          />
        )}
      </ScrollView>

      <ProfessionalBottomTab activeArea={activeArea} onSelectArea={selectArea} />
    </View>
  );
}
