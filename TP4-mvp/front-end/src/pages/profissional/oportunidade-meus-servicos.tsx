import { View } from "react-native";

import type { ProfessionalService } from "../../components/profissional/types";
import {
  ServiceFilterChips,
  ServiceOrderCard,
} from "../../components/profissional/components";

export function OportunidadeMeusServicosScreen({
  onDetails,
  onMessage,
  onPrimaryAction,
  services,
}: {
  onDetails: (service: ProfessionalService) => void;
  onMessage: (service: ProfessionalService) => void;
  onPrimaryAction: (service: ProfessionalService) => void;
  services: ProfessionalService[];
}) {
  return (
    <View className="pb-2">
      <ServiceFilterChips />
      {services.map((service) => (
        <ServiceOrderCard
          key={service.order}
          service={service}
          onDetails={() => onDetails(service)}
          onMessage={() => onMessage(service)}
          onPrimaryAction={() => onPrimaryAction(service)}
        />
      ))}
    </View>
  );
}
