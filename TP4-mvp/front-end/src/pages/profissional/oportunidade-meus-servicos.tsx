import { View } from "react-native";

import type { ProfessionalService } from "../../components/profissional/types";
import {
  type ServiceListFilter,
  ServiceFilterChips,
  ServiceOrderCard,
} from "../../components/profissional/components";
import { useMemo, useState } from "react";

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
  const [activeFilter, setActiveFilter] = useState<ServiceListFilter>("all");
  const counts = useMemo(
    () => ({
      all: services.length,
      active: services.filter((service) => service.status !== "completed").length,
      completed: services.filter((service) => service.status === "completed").length,
    }),
    [services],
  );
  const visibleServices =
    activeFilter === "completed"
      ? services.filter((service) => service.status === "completed")
      : activeFilter === "active"
        ? services.filter((service) => service.status !== "completed")
        : services;

  return (
    <View className="pb-2">
      <ServiceFilterChips
        activeFilter={activeFilter}
        counts={counts}
        onChangeFilter={setActiveFilter}
      />
      {visibleServices.map((service) => (
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
