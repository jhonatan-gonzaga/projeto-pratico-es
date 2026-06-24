import { View } from "react-native";

import { serviceRequests } from "../../components/profissional/data";
import type { ServiceRequest } from "../../components/profissional/types";
import { NewRequestCard } from "../../components/profissional/components";

export function OportunidadesNovosPedidosScreen({
  onDetails,
}: {
  onDetails: (request: ServiceRequest) => void;
}) {
  return (
    <View className="pb-2">
      {serviceRequests.map((request) => (
        <NewRequestCard
          key={request.title}
          request={request}
          onDetails={() => onDetails(request)}
        />
      ))}
    </View>
  );
}
