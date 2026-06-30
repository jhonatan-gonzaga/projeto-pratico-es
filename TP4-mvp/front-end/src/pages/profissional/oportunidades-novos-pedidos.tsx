import { View } from "react-native";

import type { ServiceRequest } from "../../components/profissional/types";
import { NewRequestCard } from "../../components/profissional/components";
import { api } from "../../services/api";

export function OportunidadesNovosPedidosScreen({
  onAccept,
  onDetails,
  onReject,
  requests,
}: {
  onAccept: (request: ServiceRequest) => void;
  onDetails: (request: ServiceRequest) => void;
  onReject: (request: ServiceRequest) => void;
  requests: ServiceRequest[];
}) {
  const handleReject = async (request: ServiceRequest) => {
    if (request.source === "ad" && request.id) {
      await api.dismissServiceAd(request.id);
    }

    onReject(request);
  };

  return (
    <View className="pb-2">
      {requests.map((request) => (
        <NewRequestCard
          key={request.id ?? request.title}
          request={request}
          onAccept={() => onAccept(request)}
          onDetails={() => onDetails(request)}
          onReject={() => {
            void handleReject(request).catch(() => undefined);
          }}
        />
      ))}
    </View>
  );
}
