import { LegalDocumentScreen } from "../legal-documents";

export function TermsOfUseScreen({
  onBack,
  onProfilePress,
}: {
  onBack: () => void;
  onProfilePress: () => void;
}) {
  void onProfilePress;
  return <LegalDocumentScreen type="terms" onBack={onBack} />;
}
