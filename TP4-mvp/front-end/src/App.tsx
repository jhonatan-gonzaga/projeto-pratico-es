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
  GoogleSignInScreen,
  LoginScreen,
  PhoneVerificationScreen,
  ProfileChoiceScreen,
  SignupScreen,
} from "./pages";
import type { ProfessionalService, ServiceStatus } from "./components/profissional/types";
import { ClientMessageScreen } from "./pages/cliente/mensagem-profissional";
import { ServiceDetailsScreen } from "./pages/profissional";

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
  | "phone"
  | "google"
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
  | "clientProfile";

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
    order: `CLI-${service.id.padStart(4, "0")}`,
    customer: service.professionalName,
    price: "A combinar",
    date: service.dateValue,
    time: "08:00 - 17:00",
    deadline: "5 dias",
    messageCount: service.unreadMessages
      ? String(service.unreadMessages)
      : undefined,
  };
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [previousScreen, setPreviousScreen] = useState<ReturnScreen>("signup");
  const [profileReturnScreen, setProfileReturnScreen] =
    useState<ProfileReturnScreen>("profileChoice");
  const [clientWorkReturnScreen, setClientWorkReturnScreen] = useState<
    "clientHome" | "clientSearch" | "clientAds"
  >("clientHome");
  const [selectedClientService, setSelectedClientService] =
    useState<ClientWorkService | null>(null);
  const [contractedClientServices, setContractedClientServices] = useState<
    ClientWorkService[]
  >([]);
  const isProfessionalScreen =
    screen === "professionalSetup" || screen === "professionalHome";

  const openPhoneScreen = (from: ReturnScreen) => {
    setPreviousScreen(from);
    setScreen("phone");
  };

  const openGoogleScreen = (from: ReturnScreen) => {
    setPreviousScreen(from);
    setScreen("google");
  };

  const openAccountProfile = (from: ProfileReturnScreen) => {
    setProfileReturnScreen(from);
    setScreen("accountProfile");
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
              onGoogle={() => openGoogleScreen("login")}
              onPhone={() => openPhoneScreen("login")}
              onSuccess={() => setScreen("profileChoice")}
            />
          ) : screen === "signup" ? (
            <SignupScreen
              onLogin={() => setScreen("login")}
              onGoogle={() => openGoogleScreen("signup")}
              onPhone={() => openPhoneScreen("signup")}
              onSuccess={() => setScreen("profileChoice")}
            />
          ) : screen === "phone" ? (
            <PhoneVerificationScreen onBack={() => setScreen(previousScreen)} />
          ) : screen === "profileChoice" ? (
            <ProfileChoiceScreen
              onBack={() => setScreen("login")}
              onContinue={(profile) => {
                if (profile === "profissional") {
                  setScreen("professionalSetup");
                } else {
                  setScreen("clientHome");
                }
              }}
              onProfilePress={() => openAccountProfile("profileChoice")}
            />
          ) : screen === "clientHome" ? (
            <ClientHomePage
              onNavigate={(tab) => openClientTab(tab, "clientHome")}
              onOpenProfessional={() => setScreen("clientProfile")}
              onProfilePress={() => openAccountProfile("clientHome")}
              onBack={() => setScreen("profileChoice")}
            />
          ) : screen === "clientSearch" ? (
            <ClientSearchPage
              onBack={() => setScreen("clientHome")}
              onNavigate={(tab) => openClientTab(tab, "clientSearch")}
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
              professionalName={selectedClientService.professionalName}
              onBack={() => setScreen("clientServiceDetails")}
              onProfilePress={() => openAccountProfile("clientServiceMessage")}
            />
          ) : screen === "clientProfile" ? (
            <ClientProfilePage
              onBack={() => setScreen("clientHome")}
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
              onBack={() => setScreen("professionalSetup")}
              onProfilePress={() => openAccountProfile("professionalHome")}
            />
          ) : screen === "accountProfile" ? (
            <AccountProfileScreen
              onBack={() => setScreen(profileReturnScreen)}
              onSave={() => setScreen(profileReturnScreen)}
              onSignOut={() => setScreen("login")}
              onDeleteAccount={() => setScreen("signup")}
            />
          ) : (
            <GoogleSignInScreen onBack={() => setScreen(previousScreen)} />
          );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        {isProfessionalScreen ? (
          currentScreen
        ) : (
          <View className="flex-1 items-center">{currentScreen}</View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
