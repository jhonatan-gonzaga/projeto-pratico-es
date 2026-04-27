# Backlog do Produto

O **Backlog do Produto** é um artefato fundamental no desenvolvimento ágil, servindo como uma lista dinâmica e priorizada de todas as funcionalidades, melhorias e correções necessárias para o projeto.

## 1. Importância do Backlog do Produto

A importância do Backlog do Produto reside na sua capacidade de fornecer uma visão clara e compartilhada do que deve ser construído. Ele permite que a equipe:

*   **Mantenha o Foco no Valor:** Ao priorizar as histórias de usuário, garantimos que as funcionalidades mais críticas para os trabalhadores de Itacoatiara sejam desenvolvidas primeiro.
*   **Promova a Transparência:** Todos os envolvidos podem visualizar o progresso e o que ainda está por vir.
*   **Facilite a Adaptação:** Como uma lista viva, o backlog pode ser refinado à medida que novos aprendizados sobre o mercado local e as necessidades dos usuários surgem.

## 2. Para que serve?

O Backlog do Produto serve como a única fonte de requisitos para qualquer alteração a ser feita no sistema. Suas principais funções incluem:

*   **Planejamento de Sprints:** Fornece a base para a seleção de tarefas que comporão o Backlog do Sprint.
*   **Documentação de Requisitos:** Registra as funcionalidades sob a perspectiva do usuário final (Histórias de Usuário).
*   **Gestão de Expectativas:** Ajuda a alinhar o que será entregue e em qual ordem, baseando-se no valor de negócio e na viabilidade técnica.

## 3. Como foi feito?

A elaboração do backlog para o **Conecta Obra Itacoatiara** seguiu as diretrizes estabelecidas na especificação do trabalho prático, integrando as fases de Inspiração e Ideação do Design Thinking.

### 3.1. Levantamento e Escrita das Histórias
As funcionalidades foram derivadas diretamente das necessidades identificadas nas **Personas** (João, Ana, Marcelo e Eric). Cada item foi redigido seguindo o padrão:
> **Enquanto** [tipo de usuário], **desejo** [funcionalidade], **para** [benefício/objetivo].

### 3.2. Organização no GitHub Projects
O backlog foi estruturado utilizando a ferramenta **GitHub Projects** no modo *Board*, organizado em quatro colunas estratégicas:

| Coluna | Descrição |
| :--- | :--- |
| **Backlog** | Histórias de usuário iniciais, ainda não detalhadas. |
| **Especificação** | Itens em processo de detalhamento com critérios de aceitação e regras de negócio. |
| **Revisão** | Histórias que aguardam a validação final da equipe. |
| **Implementação** | Funcionalidades prontas para serem desenvolvidas. |

### 3.3. Critérios de Qualidade e Rastreabilidade
Para garantir a robustez do planejamento, foram aplicados os seguintes critérios:

*   **Priorização:** Cada história recebeu um nível de prioridade (Alta, Média ou Baixa), refletindo seu impacto para o ecossistema de construção civil local.
*   **Rastreabilidade:** Todas as histórias estão vinculadas a pelo menos uma persona, garantindo que o desenvolvimento esteja alinhado às dores reais dos usuários de Itacoatiara.
*   **Colaboração:** A especificação contou com a participação ativa de múltiplos integrantes da equipe, evidenciada pelas atribuições (*Assignees*) no GitHub.

---
> **Nota:** O acompanhamento em tempo real das histórias de usuário e seu estado atual de desenvolvimento pode ser visualizado diretamente na aba [Projects](https://github.com/users/jhonatan-gonzaga/projects) do repositório.

## 4. Itens para Implementação

Esta seção detalha as Histórias de Usuário que estão atualmente na coluna **Implementação** do GitHub Projects. Todas as histórias listadas abaixo possuem **Prioridade Alta** e estão organizadas por persona, apresentando de forma estruturada os critérios de aceitação e regras de negócio para cada funcionalidade.

---

### 4.1. Persona: Dono de Loja

| ID | Descrição da User Story |
| :--- | :--- |
| **US24** | Enquanto Dono de Loja de Materiais de Construção, desejo cadastrar produtos com foto, preço, adicionar descrição do produto e estoque para enviar rapidamente aos clientes pelo celular. |
| **US25** | Enquanto Dono de Loja de Materiais de Construção, desejo atualizar o preço dos produtos rapidamente, para manter as informações corretas para meus clientes. |
| **US26** | Enquanto Dono de Loja de Materiais de Construção, desejo compartilhar produtos pelo WhatsApp, para divulgar rapidamente para meus clientes. |
| **US42** | Enquanto Dono de Loja de Materiais de Construção, desejo marcar produtos como promoção com destaque visual e preço promocional, com opção de adicionar desconto, para divulgar ofertas especiais. |
| **US43** | Enquanto Dono de Loja de Materiais de Construção, desejo cadastrar o endereço completo da loja e os horários de funcionamento por dia da semana, para enviar facilmente essas informações aos clientes. |

#### Critérios de Aceitação e Regras de Negócio

**US24 - Cadastro de Produtos**
- O sistema deve permitir o upload de foto do produto
- O cadastro deve incluir campos obrigatórios: foto, preço, descrição e quantidade em estoque
- Os dados devem ser salvos corretamente no banco de dados
- A descrição deve suportar até 500 caracteres

**US25 - Atualização de Preços**
- O sistema deve permitir edição rápida do preço de um produto
- As alterações devem ser refletidas imediatamente na plataforma
- Histórico de alterações de preço deve ser registrado para auditoria

**US26 - Compartilhamento via WhatsApp**
- O sistema deve gerar um link compartilhável para cada produto
- O compartilhamento deve incluir foto, nome, preço e descrição
- A funcionalidade deve integrar com a API do WhatsApp Web ou versão mobile

**US42 - Produtos em Promoção**
- O sistema deve permitir marcar um produto como "em promoção"
- Deve exibir destaque visual (ex: badge, cor diferente) para produtos promocionais
- Deve permitir inserção de desconto em valor ou percentual
- O preço promocional deve ser exibido destacadamente

**US43 - Informações da Loja**
- O cadastro deve incluir campos para endereço completo (rua, número, complemento, bairro, cidade, CEP)
- Deve permitir informar horários de funcionamento por dia da semana
- Deve validar o formato do CEP antes de salvar
- As informações devem ser acessíveis para clientes consultarem

---

### 4.2. Persona: Profissional

| ID | Descrição da User Story |
| :--- | :--- |
| **US27** | Enquanto profissional, desejo validar meu acesso por código enviado ao celular, com opção de ouvir via TTS, para entrar de forma rápida, segura e sem precisar de senha, mesmo em ambientes barulhentos. |
| **US28** | Enquanto profissional, desejo criar meu perfil com informações, serviços e fotos, com apoio de TTS, para me tornar visível na plataforma e aumentar minhas chances de conseguir trabalho. |
| **US29** | Enquanto profissional, desejo visualizar e aceitar ofertas de serviço disponíveis para me candidatar rapidamente a oportunidades de trabalho compatíveis com minha área. |
| **US30** | Enquanto profissional, desejo confirmar no aplicativo que fechei um acordo com o cliente após contato externo, para iniciar o serviço oficialmente com segurança e registro na plataforma. |
| **US31** | Enquanto profissional, desejo finalizar o serviço no aplicativo e permitir a avaliação do cliente, para registrar minha entrega e melhorar minha reputação na plataforma. |

#### Critérios de Aceitação e Regras de Negócio

**US27 - Validação por Código OTP**
- O sistema deve enviar código de 6 dígitos via SMS ao celular do profissional
- Deve permitir ativar e desativar a leitura via TTS do código
- O código deve expirar em 10 minutos
- Deve permitir até 3 tentativas de código incorreto antes de bloquear temporariamente
- A opção de TTS deve incluir controle de volume

**US28 - Criação de Perfil Profissional**
- O perfil deve incluir: nome, especialidades, descrição, fotos (até 5), avaliações
- Deve permitir upload de múltiplas fotos do profissional e seu trabalho
- TTS deve funcionar em campos de texto editáveis
- O perfil deve ser visível para clientes após validação
- Deve permitir edições do perfil a qualquer momento

**US29 - Visualização e Aceitação de Ofertas**
- O sistema deve exibir ofertas de serviço compatíveis com a área do profissional
- Deve permitir aceitar ou recusar ofertas com um clique
- Deve exibir detalhes da oferta: tipo de serviço, localização, budget, prazo
- Ofertas aceitas devem ser movidas para "Serviços em Andamento"
- Deve notificar o profissional sobre novas ofertas relevantes

**US30 - Confirmação de Acordo**
- O profissional deve poder confirmar que fechou um acordo com o cliente
- A confirmação deve gerar um registro oficial no sistema
- Deve permitir inserção de detalhes do acordo (data, valor, escopo)
- O serviço deve mudar de status para "Confirmado" após esta ação
- Uma notificação deve ser enviada ao cliente confirmando o acordo

**US31 - Finalização de Serviço e Avaliação**
- O profissional deve poder marcar o serviço como "Concluído"
- O cliente deve poder avaliar o profissional (nota de 1 a 5 estrelas e comentário)
- A avaliação deve ser registrada no histórico do profissional
- O sistema deve calcular a nota média do profissional
- Deve existir um resumo visual da reputação (ex: estrelas)

---

### 4.3. Persona: Suporte

| ID | Descrição da User Story |
| :--- | :--- |
| **US19** | Enquanto Suporte, desejo ter um sistema de registro de atendimentos (Logs), no qual terá o registro de todos os chats de suporte que tive, para melhorar como suporte ao analisar os problemas. |
| **US20** | Enquanto Suporte, desejo trocar de canal do chat de suporte para WhatsApp, para ter um ambiente melhor para o cliente. |
| **US21** | Enquanto Suporte, desejo um chat de suporte exclusivo para entrar em contato com clientes que precisam de ajuda, auxiliando de forma fácil, prática e rápida. |
| **US22** | Enquanto Suporte, desejo enviar áudio no chat de suporte para melhor comunicação com o cliente sobre seu problema. |
| **US44** | Enquanto Suporte, desejo receber e enviar prints nos chats de suporte, para permitir uma maior facilidade de atendimento. |

#### Critérios de Aceitação e Regras de Negócio

**US19 - Sistema de Logs de Atendimentos**
- Todas as conversas de suporte devem ser registradas automaticamente
- Os logs devem incluir: data/hora, usuário, conteúdo, tipo de interação
- Deve permitir buscar logs por data, usuário ou palavra-chave
- Os logs devem ser acessíveis apenas para a equipe de suporte
- Deve manter histórico por pelo menos 90 dias
- Deve permitir exportar relatórios de atendimentos

**US20 - Integração com WhatsApp**
- O suporte deve poder trocar o canal de comunicação de chat para WhatsApp
- A conversa anterior deve ser acessível no novo canal
- O cliente deve receber notificação da mudança de canal
- O sistema deve suportar sincronização entre canais
- Os logs devem registrar a troca de canal

**US21 - Chat de Suporte**
- O sistema deve oferecer um chat dedicado para suporte
- Deve permitir atribuição de tickets a agentes de suporte específicos
- Deve exibir fila de atendimento visível para a equipe
- Deve permitir notas internas entre agentes (não visíveis ao cliente)
- Deve incluir templates de respostas comuns para agilizar atendimento

**US22 - Envio de Áudio**
- O suporte deve poder gravar e enviar mensagens de áudio
- Áudios devem ter limite de até 2 minutos de duração
- O sistema deve permitir reproduzir áudios no chat
- Áudios devem ser salvos no histórico de conversa
- Deve indicar quando o áudio foi ouvido pelo cliente

**US44 - Envio de Prints/Imagens**
- O suporte deve poder capturar e enviar prints da tela
- Deve permitir upload de imagens do computador
- Imagens devem ser visualizáveis no chat em tempo real
- Deve suportar formatos: JPG, PNG, GIF (máx 5MB)
- Deve permitir adicionar anotações/setas em imagens antes de enviar

---

### 4.4. Persona: Cliente

| ID | Descrição da User Story |
| :--- | :--- |
| **US70** | Enquanto Cliente com dificuldades de leitura, desejo acionar a funcionalidade de texto para voz nos rótulos do formulário, para compreender de forma auditiva as informações solicitadas. |
| **US76** | Enquanto Cliente, desejo enviar e receber mensagens de texto em tempo real com um profissional no chat do app, para alinhar orçamentos, escopos e datas. |

#### Critérios de Aceitação e Regras de Negócio

**US70 - Texto para Voz (TTS) em Formulários**
- O sistema deve exibir um ícone de alto-falante próximo a cada rótulo de campo
- Ao clicar, o sistema deve reproduzir o texto do rótulo via TTS
- Deve permitir interrupção instantânea da reprodução ao clicar novamente
- Deve suportar múltiplas linguagens (português brasileiro incluído)
- Deve permitir seleção de velocidade de fala (normal, rápido, lento)
- Quando o volume do dispositivo está no mudo, deve exibir notificação sugerindo aumentar o volume
- Deve funcionar em diferentes navegadores e dispositivos

**US76 - Chat em Tempo Real com Profissional**
- O sistema deve permitir envio e recebimento de mensagens de texto em tempo real
- Deve exibir indicador de "digitando" quando o outro usuário está digitando
- Deve exibir marcação de "Lida" ao lado da mensagem enviada após o profissional visualizar
- Deve permitir visualizar histórico completo da conversa
- Deve notificar o usuário sobre novas mensagens
- Deve implementar varredura de padrões (RegEx) para identificar números telefônicos e links, disparando alertas de educação e segurança
- Ao identificar um padrão de número de celular ou link, deve exibir um balão automático de aviso de segurança
- O aviso deve orientar o usuário sobre riscos de compartilhar informações pessoais ou clicar em links suspeitos
- Deve manter o histórico de mensagens por pelo menos 180 dias
- Deve permitir buscar mensagens anteriores por palavra-chave

---

## Resumo de Priorização

Todas as histórias de usuário listadas na seção 4 possuem **Prioridade Alta**, indicando que devem ser implementadas nas primeiras sprints do projeto. Esta priorização reflete o alinhamento direto com as necessidades críticas das personas do **Conecta Obra Itacoatiara** e o valor de negócio essencial para o lançamento da plataforma.

O acompanhamento detalhado do progresso de cada história pode ser visualizado no [GitHub Projects](https://github.com/users/jhonatan-gonzaga/projects) do repositório.
