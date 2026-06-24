import { useState } from "react";
import { ScrollView, View } from "react-native";

import type {
  ProfessionalArea,
  ProfessionalService,
  ProfessionalTab,
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
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [isViewingProjectResult, setIsViewingProjectResult] = useState(false);
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

  if (activeArea === "opportunities" && isViewingRequestDetails && selectedRequest) {
    return (
      <RequestDetailsScreen
        request={selectedRequest}
        onBack={() => {
          setIsViewingRequestDetails(false);
          setSelectedRequest(null);
        }}
        onProfilePress={onProfilePress}
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
      />
    );
  }

  if (activeArea === "projects" && isEditingProject) {
    return (
      <EditProjectScreen
        onBack={() => setIsEditingProject(false)}
        onProfilePress={onProfilePress}
      />
    );
  }

  if (activeArea === "projects" && isViewingProjectResult) {
    return (
      <ProjectResultScreen
        onBack={() => setIsViewingProjectResult(false)}
        onEdit={() => {
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
        onEditProject={() => setIsEditingProject(true)}
        onProfilePress={onProfilePress}
        onViewResult={() => setIsViewingProjectResult(true)}
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
            onDetails={(request) => {
              setSelectedRequest(request);
              setIsViewingRequestDetails(true);
            }}
          />
        ) : (
          <OportunidadeMeusServicosScreen
            onDetails={(service) => openServiceView(service, "details")}
            onMessage={(service) => openServiceView(service, "message")}
          />
        )}
      </ScrollView>

      <ProfessionalBottomTab activeArea={activeArea} onSelectArea={selectArea} />
    </View>
  );
}
