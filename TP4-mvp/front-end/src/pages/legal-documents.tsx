import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";

type LegalDocumentType = "terms" | "privacy";

type LegalSection = {
  body: string;
  title: string;
};

const termsSections: LegalSection[] = [
  {
    title: "1. Apresentacao",
    body:
      "O Conecta Obra Itacoatiara conecta clientes e profissionais autonomos em Itacoatiara-AM para servicos de reparo, reforma, manutencao e construcao. A plataforma organiza perfis, solicitacoes, comunicacao, avaliacoes e registros, mas nao executa obras nem participa diretamente da negociacao final.",
  },
  {
    title: "2. Cadastro e seguranca",
    body:
      "O usuario deve informar dados verdadeiros e atualizados, como nome, telefone, e-mail, senha, foto, endereco aproximado, categoria profissional e demais informacoes necessarias. Senhas e credenciais sao pessoais e devem ser protegidas.",
  },
  {
    title: "3. Uso permitido",
    body:
      "A plataforma deve ser usada de forma etica, segura e respeitosa para buscar, divulgar, solicitar e negociar servicos de construcao, reforma, pintura, eletrica, hidraulica, manutencao e atividades semelhantes.",
  },
  {
    title: "4. Responsabilidades do cliente",
    body:
      "O cliente deve descrever corretamente a demanda, negociar valores, materiais, datas e garantias diretamente com o profissional, tratar usuarios com respeito e avaliar apenas experiencias reais.",
  },
  {
    title: "5. Responsabilidades do profissional",
    body:
      "O profissional deve manter perfil verdadeiro, responder solicitacoes com clareza, executar apenas servicos para os quais tenha capacidade tecnica e usar no portfolio somente imagens proprias ou autorizadas.",
  },
  {
    title: "6. Solicitacoes, contratacao e pagamento",
    body:
      "O envio de solicitacao nao gera contratacao automatica. A contratacao ocorre quando cliente e profissional concordam sobre escopo, preco, prazo, materiais, deslocamento e pagamento. Na versao MVP, pagamentos ocorrem diretamente entre as partes.",
  },
  {
    title: "7. Avaliacoes e conteudos",
    body:
      "Avaliacoes, fotos, mensagens e descricoes devem ser verdadeiras, respeitosas e autorizadas. Conteudos ofensivos, fraudulentos, discriminatorios ou ilicitos podem ser limitados, ocultados ou removidos.",
  },
  {
    title: "8. Condutas proibidas",
    body:
      "E proibido criar perfil falso, usar dados de terceiros, enviar spam, golpes, links maliciosos, manipular avaliacoes, coletar dados para finalidade externa ou explorar falhas tecnicas da plataforma.",
  },
  {
    title: "9. Privacidade, disponibilidade e conta",
    body:
      "O tratamento de dados segue a Politica de Privacidade e a LGPD. Funcionalidades do MVP podem mudar, ser suspensas ou corrigidas. Contas que violem as regras podem ser suspensas ou encerradas.",
  },
  {
    title: "10. Contato",
    body:
      "Duvidas e solicitacoes relacionadas aos Termos de Uso podem ser enviadas para jhonatangonzagagaldino@gmail.com. Versao do documento: 2.0, atualizada em 28 de junho de 2026.",
  },
];

const privacySections: LegalSection[] = [
  {
    title: "1. Apresentacao",
    body:
      "A Politica de Privacidade explica como o Conecta Obra Itacoatiara coleta, utiliza, armazena, compartilha e protege dados pessoais de clientes e profissionais, observando os principios da LGPD.",
  },
  {
    title: "2. Dados coletados",
    body:
      "Podem ser coletados nome, telefone, e-mail, foto, login, senha com hash, tokens, solicitacoes, local do servico, categorias, portfolio, avaliacoes, mensagens, dados tecnicos e registros de seguranca.",
  },
  {
    title: "3. Finalidades",
    body:
      "Os dados sao usados para criar e autenticar contas, exibir perfis, permitir solicitacoes, facilitar comunicacao, registrar avaliacoes, melhorar a experiencia, prevenir abuso e cumprir obrigacoes legais.",
  },
  {
    title: "4. Dados sensiveis",
    body:
      "A plataforma nao preve coleta de dados sensiveis no MVP. Caso o usuario insira espontaneamente informacao sensivel em campos livres, recomenda-se sua remocao ou anonimizacao quando nao for necessaria.",
  },
  {
    title: "5. Compartilhamento e visibilidade",
    body:
      "Dados podem ser compartilhados com servicos tecnicos necessarios, como autenticacao, banco de dados, armazenamento de midia e mensagens transacionais. A plataforma nao vende dados pessoais.",
  },
  {
    title: "6. Exibicao publica",
    body:
      "No perfil profissional podem aparecer nome, foto, categoria, descricao, area de atendimento, portfolio e avaliacoes. Informacoes da demanda podem ser compartilhadas com o profissional escolhido.",
  },
  {
    title: "7. Retencao e seguranca",
    body:
      "Dados sao mantidos enquanto a conta estiver ativa ou enquanto forem necessarios para seguranca, historico, obrigacoes legais e solucao de conflitos. Senhas devem ser armazenadas com hash e credenciais ficam em variaveis de ambiente.",
  },
  {
    title: "8. Direitos do titular",
    body:
      "O usuario pode solicitar acesso, correcao, confirmacao de tratamento, informacoes sobre compartilhamento, revogacao de consentimento e exclusao de conta, respeitadas excecoes legais.",
  },
  {
    title: "9. Conta, incidentes e atualizacoes",
    body:
      "A exclusao da conta ou revogacao de permissoes pode limitar recursos. Incidentes relevantes devem ser avaliados e comunicados quando aplicavel. Esta politica pode ser atualizada.",
  },
  {
    title: "10. Contato",
    body:
      "Solicitacoes sobre privacidade podem ser enviadas para jhonatangonzagagaldino@gmail.com. Versao do documento: 2.0, atualizada em 28 de junho de 2026.",
  },
];

const documentContent = {
  terms: {
    title: "Termos de Uso",
    subtitle: "Conecta Obra Itacoatiara - clientes e profissionais",
    sections: termsSections,
  },
  privacy: {
    title: "Politica de Privacidade",
    subtitle: "Coleta, uso, armazenamento e protecao de dados pessoais",
    sections: privacySections,
  },
};

export function LegalDocumentScreen({
  onBack,
  type,
}: {
  onBack: () => void;
  type: LegalDocumentType;
}) {
  const content = documentContent[type];

  return (
    <View className="h-full w-full max-w-[480px] self-center bg-background">
      <View className="flex-row items-center gap-3 border-b border-black/5 px-5 pb-4 pt-12">
        <Pressable
          onPress={onBack}
          className="h-10 w-10 items-center justify-center rounded-full bg-card shadow-sm"
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Ionicons name="arrow-back" size={18} color="#0f1720" />
        </Pressable>
        <View className="flex-1">
          <Text className="text-xl font-bold text-foreground">{content.title}</Text>
          <Text className="mt-0.5 text-xs leading-4 text-muted-foreground">
            {content.subtitle}
          </Text>
        </View>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerClassName="gap-4 px-4 pb-8 pt-5"
        showsVerticalScrollIndicator={false}
      >
        <View className="rounded-[12px] bg-card p-4 shadow-sm shadow-black/5">
          <Text className="text-xs font-semibold uppercase tracking-[1.2px] text-muted-foreground">
            Documento
          </Text>
          <Text className="mt-1 text-sm leading-6 text-muted-foreground">
            Projeto Conecta Obra Itacoatiara. Responsavel: Equipe do Projeto.
            Contato: jhonatangonzagagaldino@gmail.com.
          </Text>
        </View>

        {content.sections.map((section) => (
          <View
            key={section.title}
            className="rounded-[12px] bg-card p-4 shadow-sm shadow-black/5"
          >
            <Text className="mb-2 text-base font-bold text-foreground">
              {section.title}
            </Text>
            <Text className="text-sm leading-6 text-muted-foreground">
              {section.body}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

