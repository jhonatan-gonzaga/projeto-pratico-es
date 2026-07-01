import "./global.css";

import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { ClientNavKey } from "./components/cliente";
import { ProfessionalHomeScreen, ProfessionalSetupScreen } from "./components/profissional";
import {
  AccountProfileScreen,
  ClientAdsPage,
  ClientHomePage,
  ClientMyWorkPage,
  ClientProfilePage,
  ClientSettingsScreen,
  ClientSearchPage,
  type ClientWorkService,
  LegalDocumentScreen,
  LoginScreen,
  ProfileChoiceScreen,
  SignupScreen,
} from "./pages";
import type { ProfessionalService, ServiceStatus } from "./components/profissional/types";
import { ClientMessageScreen } from "./pages/cliente/mensagem-profissional";
import { ServiceDetailsScreen } from "./pages/profissional";
import { api } from "./services/api";

type ReturnScreen = "login" | "signup";
type ProfileReturnScreen =
  | "profileChoice"
  | "professionalSetup"
  | "professionalHome"
  | "clientHome"
  | "clientSearch"
  | "clientAds"
  | "clientServiceDetails"
  | "clientServiceMessage"
  | "clientSettings"
  | "clientProfile";
type Screen =
  | ReturnScreen
  | "profileChoice"
  | "accountProfile"
  | "professionalSetup"
  | "professionalHome"
  | "clientHome"
  | "clientSearch"
  | "clientWork"
  | "clientAds"
  | "clientServiceDetails"
  | "clientServiceMessage"
  | "clientSettings"
  | "clientProfile"
  | "privacy"
  | "terms";

const clientStatusToProfessionalStatus: Record<
  ClientWorkService["status"],
  ServiceStatus
> = {
  em_andamento: "inProgress",
  aguardando_aprovacao: "pending",
  concluido: "completed",
  reabrir_servico: "inProgress",
};

function toServiceDetailsItem(service: ClientWorkService): ProfessionalService {
  return {
    title: service.title,
    status: clientStatusToProfessionalStatus[service.status],
    order: service.id,
    customer: service.professionalName,
    price: service.price ?? "A combinar",
    date: service.dateValue,
    time: service.time ?? "A combinar",
    deadline: service.deadline ?? "A combinar",
    address: service.address,
    category: service.categoryLabel,
    description: service.description,
    imageUrls: service.imageUrls,
    hasReview: service.hasReview,
    messageCount: service.unreadMessages
      ? String(service.unreadMessages)
      : undefined,
  };
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [profileReturnScreen, setProfileReturnScreen] =
    useState<ProfileReturnScreen>("profileChoice");
  const [clientWorkReturnScreen, setClientWorkReturnScreen] = useState<
    "clientHome" | "clientSearch" | "clientAds"
  >("clientHome");
  const [clientProfileReturnScreen, setClientProfileReturnScreen] = useState<
    "clientHome" | "clientSearch" | "clientWork"
  >("clientHome");
  const [legalReturnScreen, setLegalReturnScreen] =
    useState<ReturnScreen>("login");
  const [selectedClientService, setSelectedClientService] =
    useState<ClientWorkService | null>(null);
  const [selectedProfessionalId, setSelectedProfessionalId] = useState<string | null>(
    null,
  );
  const [contractedClientServices, setContractedClientServices] = useState<
    ClientWorkService[]
  >([]);
  const isProfessionalScreen =
    screen === "professionalSetup" || screen === "professionalHome";

  const openAccountProfile = (from: ProfileReturnScreen) => {
    setProfileReturnScreen(from);
    setScreen("accountProfile");
  };

  const openProfessionalArea = async () => {
    try {
      await api.professionalMe();
      setScreen("professionalHome");
    } catch {
      setScreen("professionalSetup");
    }
  };

  const openClientTab = (
    tab: ClientNavKey,
    from?: "clientHome" | "clientSearch" | "clientAds",
  ) => {
    if (tab === "search") {
      setScreen("clientSearch");
    } else if (tab === "ads") {
      setScreen("clientAds");
    } else if (tab === "settings") {
      setScreen("clientSettings");
    } else if (tab === "work") {
      if (from) {
        setClientWorkReturnScreen(from);
      }
      setScreen("clientWork");
    } else {
      setScreen("clientHome");
    }
  };

  const currentScreen =
    screen === "login" ? (
            <LoginScreen
              onCreateAccount={() => setScreen("signup")}
              onOpenPrivacy={() => {
                setLegalReturnScreen("login");
                setScreen("privacy");
              }}
              onOpenTerms={() => {
                setLegalReturnScreen("login");
                setScreen("terms");
              }}
              onSuccess={() => setScreen("profileChoice")}
            />
          ) : screen === "signup" ? (
            <SignupScreen
              onLogin={() => setScreen("login")}
              onOpenPrivacy={() => {
                setLegalReturnScreen("signup");
                setScreen("privacy");
              }}
              onOpenTerms={() => {
                setLegalReturnScreen("signup");
                setScreen("terms");
              }}
              onSuccess={() => setScreen("profileChoice")}
            />
          ) : screen === "terms" ? (
            <LegalDocumentScreen
              type="terms"
              onBack={() => setScreen(legalReturnScreen)}
            />
          ) : screen === "privacy" ? (
            <LegalDocumentScreen
              type="privacy"
              onBack={() => setScreen(legalReturnScreen)}
            />
          ) : screen === "profileChoice" ? (
            <ProfileChoiceScreen
              onBack={() => setScreen("login")}
              onContinue={(profile) => {
                if (profile === "profissional") {
                  void openProfessionalArea();
                } else {
                  setScreen("clientHome");
                }
              }}
              onProfilePress={() => openAccountProfile("profileChoice")}
            />
          ) : screen === "clientHome" ? (
            <ClientHomePage
              onNavigate={(tab) => openClientTab(tab, "clientHome")}
              onOpenProfessional={(professionalId) => {
                setSelectedProfessionalId(professionalId);
                setClientProfileReturnScreen("clientHome");
                setScreen("clientProfile");
              }}
              onProfilePress={() => openAccountProfile("clientHome")}
              onBack={() => setScreen("profileChoice")}
            />
          ) : screen === "clientSearch" ? (
            <ClientSearchPage
              onBack={() => setScreen("clientHome")}
              onNavigate={(tab) => openClientTab(tab, "clientSearch")}
              onOpenProfessional={(professionalId) => {
                setSelectedProfessionalId(professionalId);
                setClientProfileReturnScreen("clientSearch");
                setScreen("clientProfile");
              }}
              onProfilePress={() => openAccountProfile("clientSearch")}
            />
          ) : screen === "clientAds" ? (
            <ClientAdsPage
              onContractService={(service) => {
                setContractedClientServices((current) => {
                  if (current.some((item) => item.id === service.id)) {
                    return current;
                  }

                  return [service, ...current];
                });
              }}
              onNavigate={(tab) => openClientTab(tab, "clientAds")}
              onBack={() => setScreen("clientHome")}
              onProfilePress={() => openAccountProfile("clientAds")}
            />
          ) : screen === "clientSettings" ? (
            <ClientSettingsScreen
              onNavigate={(tab) => openClientTab(tab)}
              onBack={() => setScreen("clientHome")}
              onProfilePress={() => openAccountProfile("clientSettings")}
              onSignOut={() => setScreen("login")}
            />
          ) : screen === "clientWork" ? (
            <ClientMyWorkPage
              extraServices={contractedClientServices}
              onChangeExtraServiceStatus={(id, status) => {
                setContractedClientServices((current) =>
                  current.map((service) =>
                    service.id === id ? { ...service, status } : service,
                  ),
                );
              }}
              onNavigate={(tab) => openClientTab(tab)}
              onProfilePress={() => openAccountProfile("clientHome")}
              onOpenProfessional={(professionalId) => {
                setSelectedProfessionalId(professionalId);
                setClientProfileReturnScreen("clientWork");
                setScreen("clientProfile");
              }}
              onOpenDetail={(service) => {
                setSelectedClientService(service);
                setScreen("clientServiceDetails");
              }}
              onBack={() => setScreen(clientWorkReturnScreen)}
            />
          ) : screen === "clientServiceDetails" && selectedClientService ? (
            <ServiceDetailsScreen
              service={toServiceDetailsItem(selectedClientService)}
              participantLabel="Profissional contratado"
              onBack={() => setScreen("clientWork")}
              onMessage={() => setScreen("clientServiceMessage")}
              onProfilePress={() => openAccountProfile("clientServiceDetails")}
              onStatusAction={() => setScreen("clientWork")}
            />
          ) : screen === "clientServiceMessage" && selectedClientService ? (
            <ClientMessageScreen
              conversationId={selectedClientService.conversationId}
              professionalName={selectedClientService.professionalName}
              onBack={() => setScreen("clientServiceDetails")}
              onProfilePress={() => openAccountProfile("clientServiceMessage")}
            />
          ) : screen === "clientProfile" ? (
            <ClientProfilePage
              professionalId={selectedProfessionalId ?? undefined}
              onBack={() => setScreen(clientProfileReturnScreen)}
              onNavigate={(tab) => openClientTab(tab)}
              onProfilePress={() => openAccountProfile("clientProfile")}
            />
          ) : screen === "professionalSetup" ? (
            <ProfessionalSetupScreen
              onBack={() => setScreen("profileChoice")}
              onProfilePress={() => openAccountProfile("professionalSetup")}
              onSave={() => setScreen("professionalHome")}
            />
          ) : screen === "professionalHome" ? (
            <ProfessionalHomeScreen
              onBack={() => setScreen("profileChoice")}
              onProfilePress={() => openAccountProfile("professionalHome")}
              onSignOut={() => setScreen("login")}
            />
          ) : screen === "accountProfile" ? (
            <AccountProfileScreen
              onBack={() => setScreen(profileReturnScreen)}
              onSave={() => setScreen(profileReturnScreen)}
              onSignOut={() => setScreen("login")}
              onDeleteAccount={() => setScreen("signup")}
            />
          ) : null;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <View
          className={`flex-1 w-full bg-background ${
            isProfessionalScreen ? "" : "items-center"
          }`}
        >
          {currentScreen}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
