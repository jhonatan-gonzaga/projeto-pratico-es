import { useState } from "react";
import { ScrollView, View } from "react-native";

import { professionalServices, projectItems, serviceRequests } from "../../components/profissional/data";
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

export function ProfessionalHomeScreen({
  onBack,
  onProfilePress,
}: {
  onBack: () => void;
  onProfilePress: () => void;
}) {
  const [activeTab, setActiveTab] = useState<ProfessionalTab>("requests");
  const [activeArea, setActiveArea] =
    useState<ProfessionalArea>("opportunities");
  const [requests, setRequests] = useState<ServiceRequest[]>(serviceRequests);
  const [services, setServices] =
    useState<ProfessionalService[]>(professionalServices);
  const [projects, setProjects] = useState<ProjectItem[]>(projectItems);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [isViewingProjectResult, setIsViewingProjectResult] = useState(false);
  const [shouldReturnToResultAfterEdit, setShouldReturnToResultAfterEdit] =
    useState(false);
  const [isViewingRequestDetails, setIsViewingRequestDetails] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<ServiceRequest | null>(
    null,
  );
  const [selectedService, setSelectedService] =
    useState<ProfessionalService | null>(null);
  const [serviceView, setServiceView] = useState<"details" | "message" | null>(
    null,
  );

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

  const rejectRequest = (request: ServiceRequest) => {
    setRequests((current) =>
      current.filter((item) => item.title !== request.title),
    );
    setIsViewingRequestDetails(false);
    setSelectedRequest(null);
  };

  const acceptRequest = (request: ServiceRequest) => {
    const nextService: ProfessionalService = {
      title: request.title,
      status: "pending",
      order: `SRV-${String(1100 + services.length)}`,
      customer: "Cliente Simulado",
      price: request.price,
      date: request.date,
      time: request.time,
      deadline: request.deadline,
      address: `${request.location} - Itacoatiara`,
      messageCount: "1",
      action: "Iniciar Servico",
    };

    setRequests((current) =>
      current.filter((item) => item.title !== request.title),
    );
    setServices((current) => [nextService, ...current]);
    setSelectedRequest(null);
    setIsViewingRequestDetails(false);
    setActiveTab("services");
  };

  const updateService = (
    service: ProfessionalService,
    changes: Partial<ProfessionalService>,
  ) => {
    const updatedService = { ...service, ...changes };

    setServices((current) =>
      current.map((item) =>
        item.order === service.order ? { ...item, ...changes } : item,
      ),
    );

    if (selectedService?.order === service.order) {
      setSelectedService(updatedService);
    }
  };

  const runServicePrimaryAction = (service: ProfessionalService) => {
    if (service.status === "completed") {
      updateService(service, {
        status: "inProgress",
        action: "Finalizar Servico",
        messageCount: "1",
      });
      return;
    }

    if (service.status === "pending") {
      updateService(service, {
        status: "inProgress",
        action: "Finalizar Servico",
      });
      return;
    }

    updateService(service, {
      status: "completed",
      action: "Reabrir Servico",
      messageCount: undefined,
    });
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

  if (activeArea === "opportunities" && selectedService && serviceView === "details") {
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

  if (activeArea === "opportunities" && selectedService && serviceView === "message") {
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
        onSave={(project) => {
          setProjects((current) => [project, ...current]);
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
        onSave={(project) => {
          setProjects((current) =>
            current.map((item) =>
              item.title === selectedProject.title ? project : item,
            ),
          );
          setSelectedProject(project);
          setIsEditingProject(false);

          if (shouldReturnToResultAfterEdit) {
            setIsViewingProjectResult(true);
            setShouldReturnToResultAfterEdit(false);
          }
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
      />
    );
  }

  if (activeArea === "settings") {
    return (
      <SettingsScreen
        onBack={() => setActiveArea("opportunities")}
        onProfilePress={onProfilePress}
        onSelectArea={selectArea}
      />
    );
  }

  if (activeArea === "projects") {
    return (
      <MyProjectsScreen
        onAddProject={() => setIsAddingProject(true)}
        onBack={() => setActiveArea("opportunities")}
        onDeleteProject={(project) =>
          setProjects((current) =>
            current.filter((item) => item.title !== project.title),
          )
        }
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
        {activeTab === "requests" ? (
          <OportunidadesNovosPedidosScreen
            requests={requests}
            onAccept={acceptRequest}
            onDetails={(request) => {
              setSelectedRequest(request);
              setIsViewingRequestDetails(true);
            }}
            onReject={rejectRequest}
          />
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
