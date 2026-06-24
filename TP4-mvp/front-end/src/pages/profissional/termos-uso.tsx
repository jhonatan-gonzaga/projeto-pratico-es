import { ScrollView, Text, View } from "react-native";

import { ProjectHeader } from "../../components/profissional/components";

export function TermsOfUseScreen({
  onBack,
  onProfilePress,
}: {
  onBack: () => void;
  onProfilePress: () => void;
}) {
  return (
    <View className="h-full w-full max-w-[480px] self-center bg-background">
      <ProjectHeader onBack={onBack} onProfilePress={onProfilePress} />

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-4 pb-6 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text className="text-2xl font-bold text-foreground">
            Termos de Uso
          </Text>
          <Text className="mt-1 text-sm text-muted-foreground">
            Texto ficticio para revisao e edicao futura.
          </Text>
        </View>

        <View className="rounded-[12px] bg-card p-4 shadow-sm shadow-black/5">
          <Text className="mb-3 text-base font-bold text-foreground">
            1. Aceite dos termos
          </Text>
          <Text className="text-sm leading-6 text-muted-foreground">
            Ao utilizar o Conecta Obras, o profissional declara que leu e
            concorda com estas condicoes gerais. Este texto e provisorio e deve
            ser revisado pela equipe responsavel antes da publicacao.
          </Text>
        </View>

        <View className="rounded-[12px] bg-card p-4 shadow-sm shadow-black/5">
          <Text className="mb-3 text-base font-bold text-foreground">
            2. Cadastro profissional
          </Text>
          <Text className="text-sm leading-6 text-muted-foreground">
            O profissional deve manter dados verdadeiros, atualizados e
            suficientes para contato, execucao dos servicos e exibicao do perfil
            aos clientes.
          </Text>
        </View>

        <View className="rounded-[12px] bg-card p-4 shadow-sm shadow-black/5">
          <Text className="mb-3 text-base font-bold text-foreground">
            3. Servicos e responsabilidades
          </Text>
          <Text className="text-sm leading-6 text-muted-foreground">
            A negociacao, prazo, qualidade e realizacao do servico sao de
            responsabilidade das partes envolvidas. O aplicativo atua como canal
            de aproximacao entre clientes e profissionais.
          </Text>
        </View>

        <View className="rounded-[12px] bg-card p-4 shadow-sm shadow-black/5">
          <Text className="mb-3 text-base font-bold text-foreground">
            4. Privacidade
          </Text>
          <Text className="text-sm leading-6 text-muted-foreground">
            Informacoes pessoais devem ser utilizadas apenas para comunicacao e
            execucao dos servicos solicitados dentro da plataforma.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
