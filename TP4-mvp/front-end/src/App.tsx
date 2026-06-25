import "./global.css";

import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ProfessionalHomeScreen, ProfessionalSetupScreen } from "./components/profissional";
import {
  AccountProfileScreen,
  ClientHomePage,
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
  | "clientHome";
type Screen =
  | ReturnScreen
  | "phone"
  | "google"
  | "profileChoice"
  | "accountProfile"
  | "professionalSetup"
  | "professionalHome"
  | "clientHome";

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
            <ClientHomePage />
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
          <ScrollView
            className="flex-1"
            contentContainerClassName="min-h-[812px] items-center"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {currentScreen}
        </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
