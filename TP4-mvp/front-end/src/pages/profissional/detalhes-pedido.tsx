import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";

import { professionalServices, projectItems, serviceRequests } from "../../components/profissional/data";
import { formatBRPhone } from "../../components/profissional/utils";
import type { ProfessionalArea, ProfessionalTab, ServiceRequest } from "../../components/profissional/types";
import { isValidBRMoney } from "../../services/validators";
import {
  ChoiceChip,
  CustomerAvatar,
  DayButton,
  DetailInfoCard,
  DetailTag,
  EditProjectPhotoGrid,
  NewRequestCard,
  PhotoTypeOption,
  ProfessionalBottomTab,
  ProfessionalHomeHeader,
  ProfessionalTabToggle,
  ProjectCategoryChip,
  ProjectHeader,
  ProjectInput,
  ProjectListCard,
  ProjectPhotoGrid,
  ProjectSection,
  ResultImageBadge,
  ServiceFilterChips,
  ServiceOrderCard,
  SettingsDivider,
  SettingsOption,
  SettingsSection,
  SetupSection,
  SetupTextField,
} from "../../components/profissional/components";

export function RequestDetailsScreen({
  onAccept,
  onBack,
  onProfilePress,
  onReject,
  request,
}: {
  onAccept: () => void;
  onBack: () => void;
  onProfilePress: () => void;
  onReject: () => void;
  request: ServiceRequest;
}) {
  const [proposedValue, setProposedValue] = useState("");
  const [proposalSent, setProposalSent] = useState(false);
  const [proposalTouched, setProposalTouched] = useState(false);
  const [proposalSubmitted, setProposalSubmitted] = useState(false);
  const [confirmingReject, setConfirmingReject] = useState(false);
  const proposalIsValid = isValidBRMoney(proposedValue);
  const showProposalError =
    (proposalTouched || proposalSubmitted) && !proposalIsValid;
  const handleSendProposal = () => {
    setProposalSubmitted(true);

    if (!proposalIsValid) {
      return;
    }

    setProposalSent(true);
  };

  return (
    <View className="h-full w-full max-w-[480px] self-center bg-background">
      <ProjectHeader onBack={onBack} onProfilePress={onProfilePress} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="px-4 pb-6 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <Text className="mb-1 text-2xl font-bold text-foreground">
          {request.title}
        </Text>
        <View className="mb-4 flex-row flex-wrap gap-2">
          <View className="flex-row items-center gap-1 rounded-[12px] bg-card px-3 py-1.5">
            <Ionicons name="location" size={14} color="#b94b50" />
            <Text className="text-sm text-foreground">{request.location}</Text>
          </View>
          <View className="flex-row items-center gap-1 rounded-[12px] bg-card px-3 py-1.5">
            <Ionicons name="calendar" size={14} color="#b94b50" />
            <Text className="text-sm text-foreground">{request.date}</Text>
          </View>
          <View className="flex-row items-center gap-1 rounded-[12px] bg-card px-3 py-1.5">
            <Ionicons name="time-outline" size={14} color="#b94b50" />
            <Text className="text-sm text-foreground">{request.time}</Text>
          </View>
        </View>

        <View className="mb-4 rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
          <View className="mb-3 flex-row items-center gap-2">
            <Ionicons name="briefcase-outline" size={18} color="#b94b50" />
            <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
              Categoria
            </Text>
          </View>
          <View className="flex-row flex-wrap gap-2">
            {(request.category?.split(",").map((item) => item.trim()).filter(Boolean) ?? []).map((category) => (
              <DetailTag
                key={category}
                label={category}
                active
              />
            ))}
          </View>
        </View>

        <View className="mb-4 rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
          <View className="mb-2 flex-row items-center gap-2">
            <Ionicons name="reorder-three-outline" size={18} color="#b94b50" />
            <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
              Descricao
            </Text>
          </View>
          <Text className="text-sm leading-6 text-muted-foreground">
            {request.description}
          </Text>
        </View>

        <View className="mb-4 gap-3">
          <View className="flex-row gap-3">
            <DetailInfoCard
              icon="calendar-outline"
              label="Data"
              value={request.date}
              subtitle={`Prazo: ${request.deadline}`}
            />
            <DetailInfoCard
              icon="time-outline"
              label="Horario"
              value={request.time}
              subtitle="Previsto"
            />
          </View>
          <View className="flex-row">
            <DetailInfoCard
              icon="wallet-outline"
              label="Valor"
              value={request.price}
              subtitle={request.negotiable ? "NEGOCIAVEL" : "VALOR FIXO"}
            />
          </View>
        </View>

        {request.negotiable ? (
          <View className="mb-4 rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
            <View className="mb-3 flex-row items-center gap-2">
              <Ionicons name="cash-outline" size={18} color="#b94b50" />
              <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
                Propor Novo Valor
              </Text>
            </View>
            <View className="flex-row items-center gap-2">
              <View
                className={`flex-1 flex-row items-center gap-2 rounded-[12px] border px-3 py-3 ${
                  showProposalError
                    ? "border-[#dc2626] bg-[#fff7f7]"
                    : proposalTouched
                      ? "border-[#16a34a] bg-[#f7fff9]"
                      : "border-input-border bg-background"
                }`}
              >
                <Text className="text-sm font-medium text-muted-foreground">R$</Text>
                <TextInput
                  value={proposedValue}
                  onBlur={() => setProposalTouched(true)}
                  onChangeText={setProposedValue}
                  keyboardType="numeric"
                  className="flex-1 p-0 text-sm text-foreground"
                  placeholder="Ex: 1.500,00"
                  placeholderTextColor="#b0b8c1"
                  accessibilityLabel="Propor novo valor"
                />
                {proposalTouched || proposalSubmitted ? (
                  <Ionicons
                    name={proposalIsValid ? "checkmark-circle" : "alert-circle"}
                    size={18}
                    color={proposalIsValid ? "#16a34a" : "#dc2626"}
                  />
                ) : null}
              </View>
              <Pressable
                onPress={handleSendProposal}
                className={`rounded-[12px] px-5 py-3 ${
                  proposedValue.trim() ? "bg-primary" : "bg-[#d7c7c9]"
                }`}
                accessibilityRole="button"
              >
                <Text className="text-sm font-semibold text-white">
                  {proposalSent ? "Enviado" : "Enviar"}
                </Text>
              </Pressable>
            </View>
            {showProposalError ? (
              <Text className="mt-1 px-1 text-xs leading-4 text-[#dc2626]">
                O valor proposto deve ser maior que zero.
              </Text>
            ) : null}
          </View>
        ) : null}

        <View className="mb-5 rounded-[8px] bg-card p-4 shadow-sm shadow-black/5">
          <View className="mb-3 flex-row items-center gap-2">
            <Ionicons name="image-outline" size={18} color="#b94b50" />
            <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
              Imagens do Servico
            </Text>
          </View>
          {request.imageUrls?.length ? (
            <>
              <Image
                source={{ uri: request.imageUrls[0] }}
                className="mb-2 h-[170px] w-full rounded-[12px]"
                resizeMode="cover"
                accessibilityLabel="Imagem do servico"
              />
              <View className="flex-row gap-2">
                {request.imageUrls.slice(1, 3).map((url) => (
                  <Image
                    key={url}
                    source={{ uri: url }}
                    className="h-[92px] flex-1 rounded-[12px]"
                    resizeMode="cover"
                    accessibilityLabel="Imagem adicional do servico"
                  />
                ))}
              </View>
            </>
          ) : (
            <View className="h-[140px] items-center justify-center rounded-[12px] bg-[#f5e8e9]">
              <Ionicons name="image-outline" size={34} color="#b94b50" />
              <Text className="mt-2 text-sm font-semibold text-primary">
                Nenhuma imagem enviada
              </Text>
            </View>
          )}
        </View>

        <View className="flex-row gap-3">
          <Pressable
            onPress={() => setConfirmingReject(true)}
            className="min-h-[56px] flex-1 items-center justify-center rounded-[12px] bg-muted shadow-sm"
            accessibilityRole="button"
          >
            <Text className="font-semibold text-foreground">Recusar</Text>
          </Pressable>
          <Pressable
            onPress={onAccept}
            className="min-h-[56px] flex-1 items-center justify-center rounded-[12px] bg-primary"
            accessibilityRole="button"
          >
            <Text className="font-semibold text-white">Aceitar</Text>
          </Pressable>
        </View>
        {confirmingReject ? (
          <View className="mt-3 gap-3 rounded-[12px] border border-[#f2cdd0] bg-[#fff7f7] p-4">
            <Text className="text-sm leading-5 text-muted-foreground">
              Ao recusar, este pedido sai da sua lista e nao entra em seus servicos.
              Se for um pedido direto, o cliente sera avisado.
            </Text>
            <View className="flex-row gap-2">
              <Pressable
                onPress={() => setConfirmingReject(false)}
                className="min-h-[44px] flex-1 items-center justify-center rounded-[12px] border border-input-border bg-muted"
                accessibilityRole="button"
              >
                <Text className="text-sm font-semibold text-foreground">Voltar</Text>
              </Pressable>
              <Pressable
                onPress={onReject}
                className="min-h-[44px] flex-1 items-center justify-center rounded-[12px] bg-primary"
                accessibilityRole="button"
              >
                <Text className="text-sm font-semibold text-white">
                  Confirmar recusa
                </Text>
              </Pressable>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}
