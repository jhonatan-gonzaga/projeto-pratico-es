import "./global.css";

import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ProfessionalHomeScreen, ProfessionalSetupScreen } from "./components/profissional";
import {
  AccountProfileScreen,
  ClientHomePage,
  ClientMyWorkPage,
  ClientProfilePage,
  ClientSearchPage,
  GoogleSignInScreen,
  LoginScreen,
  PhoneVerificationScreen,
  ProfileChoiceScreen,
  SignupScreen,
} from "./pages";

type ReturnScreen = "login" | "signup";
type ProfileReturnScreen =
  | "profileChoice"
  | "professionalSetup"
  | "professionalHome"
  | "clientHome"
  | "clientSearch"
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
  | "clientProfile";

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");
  const [previousScreen, setPreviousScreen] = useState<ReturnScreen>("signup");
  const [profileReturnScreen, setProfileReturnScreen] =
    useState<ProfileReturnScreen>("profileChoice");
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

  const openClientTab = (tab: "home" | "search" | "work") => {
    if (tab === "search") {
      setScreen("clientSearch");
    } else if (tab === "work") {
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
              onNavigate={(tab) => {
                if (tab === "home" || tab === "search" || tab === "work") {
                  openClientTab(tab);
                }
              }}
              onOpenProfessional={() => setScreen("clientProfile")}
              onBack={() => setScreen("profileChoice")}
            />
          ) : screen === "clientSearch" ? (
            <ClientSearchPage
              onNavigate={(tab) => {
                if (tab === "home" || tab === "search" || tab === "work") {
                  openClientTab(tab);
                }
              }}
            />
          ) : screen === "clientWork" ? (
            <ClientMyWorkPage
              onNavigate={(tab) => {
                if (tab === "home" || tab === "search" || tab === "work") {
                  openClientTab(tab);
                }
              }}
            />
          ) : screen === "clientProfile" ? (
            <ClientProfilePage onBack={() => setScreen("clientHome")} />
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
