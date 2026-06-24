import { useState } from "react";
import { View } from "react-native";

import type {
  ProfessionalArea,
  ProfessionalTab,
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
import { OportunidadeMeusServicosScreen } from "./oportunidade-meus-servicos";
import { OportunidadesNovosPedidosScreen } from "./oportunidades-novos-pedidos";
import { ProjectResultScreen } from "./resultado-projeto";

export function ProfessionalHomeScreen({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<ProfessionalTab>("requests");
  const [activeArea, setActiveArea] =
    useState<ProfessionalArea>("opportunities");
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [isViewingProjectResult, setIsViewingProjectResult] = useState(false);
  const [isViewingRequestDetails, setIsViewingRequestDetails] = useState(false);

  const selectArea = (area: ProfessionalArea) => {
    setIsAddingProject(false);
    setIsEditingProject(false);
    setIsViewingProjectResult(false);
    setIsViewingRequestDetails(false);
    setActiveArea(area);
  };

  if (activeArea === "opportunities" && isViewingRequestDetails) {
    return (
      <RequestDetailsScreen onBack={() => setIsViewingRequestDetails(false)} />
    );
  }

  if (activeArea === "projects" && isAddingProject) {
    return <AddProjectScreen onBack={() => setIsAddingProject(false)} />;
  }

  if (activeArea === "projects" && isEditingProject) {
    return <EditProjectScreen onBack={() => setIsEditingProject(false)} />;
  }

  if (activeArea === "projects" && isViewingProjectResult) {
    return (
      <ProjectResultScreen
        onBack={() => setIsViewingProjectResult(false)}
        onEdit={() => {
          setIsViewingProjectResult(false);
          setIsEditingProject(true);
        }}
      />
    );
  }

  if (activeArea === "settings") {
    return (
      <SettingsScreen
        onBack={() => setActiveArea("opportunities")}
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
        onViewResult={() => setIsViewingProjectResult(true)}
        onSelectArea={selectArea}
      />
    );
  }

  return (
    <View className="min-h-[812px] w-full max-w-[480px] bg-background">
      <ProfessionalHomeHeader onBack={onBack} />
      <ProfessionalTabToggle activeTab={activeTab} onChangeTab={setActiveTab} />

      {activeTab === "requests" ? (
        <OportunidadesNovosPedidosScreen
          onDetails={() => setIsViewingRequestDetails(true)}
        />
      ) : (
        <OportunidadeMeusServicosScreen />
      )}

      <ProfessionalBottomTab activeArea={activeArea} onSelectArea={selectArea} />
    </View>
  );
}
