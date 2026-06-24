import { View } from "react-native";

import { professionalServices } from "../../components/profissional/data";
import {
  ServiceFilterChips,
  ServiceOrderCard,
} from "../../components/profissional/components";

export function OportunidadeMeusServicosScreen() {
  return (
    <View className="pb-2">
      <ServiceFilterChips />
      {professionalServices.map((service) => (
        <ServiceOrderCard key={service.order} service={service} />
      ))}
    </View>
  );
}
