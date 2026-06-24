import { View } from "react-native";

import { professionalServices } from "../../components/profissional/data";
import type { ProfessionalService } from "../../components/profissional/types";
import {
  ServiceFilterChips,
  ServiceOrderCard,
} from "../../components/profissional/components";

export function OportunidadeMeusServicosScreen({
  onDetails,
  onMessage,
}: {
  onDetails: (service: ProfessionalService) => void;
  onMessage: (service: ProfessionalService) => void;
}) {
  return (
    <View className="pb-2">
      <ServiceFilterChips />
      {professionalServices.map((service) => (
        <ServiceOrderCard
          key={service.order}
          service={service}
          onDetails={() => onDetails(service)}
          onMessage={() => onMessage(service)}
        />
      ))}
    </View>
  );
}
