# 1. Diagrama de componentes

---
# 2 Diagrma completo - Visão Geral do Aplicativo Mobile
Este diagrama de componentes apresenta a visão geral e a porta de entrada do ecossistema mobile. Ele ilustra como uma interface unificada (App Mobile) direciona os
quatro principais atores do sistema (Cliente, Profissional, Lojista e Suporte) para suas respectivas jornadas e
painéis especializados, além de mapear os serviços centrais de backend e as integrações com APIs terceiras necessárias para sustentar as regras de negócio.

<div align="center">
  <img width="16384" height="16328" alt="diagrama de componente-visão Geral" src="https://github.com/user-attachments/assets/b275af95-57c7-43a3-a474-f05fade160fc" />
  <p>figura 1 - diagrama de componente-visão Geral "</p>
</div>


## 2.1 Componentes de Interface (UI Components)
A camada frontal é subdividida em painéis especializados que isolam a experiência de cada persona:
- **App Mobile (Main Entry)**: O ponto central de inicialização do aplicativo, responsável por carregar o módulo de autenticação e rotear o usuário com base em seu perfil.
- **AccessScreen (Gestão de Acessos)**: Módulo comum responsável pelo login, criação de contas, validação de acessos via celular e edição dos dados cadastrais básicos.
- **ClientDashboard (Painel do Cliente)**: Centraliza a busca e filtragem de profissionais, a publicação e gerenciamento de vagas de serviços, o histórico de contratações e o sistema de avaliações.
- **ProfessionalDashboard (Painel do Profissional)**: Interface dedicada ao trabalhador autônomo para gerenciamento de seu portfólio digital, recebimento de alertas de vagas compatíveis, envio de contrapropostas e conclusão de ordens de serviço.
- **MarketplaceDashboard (Painel do Lojista / Guia "Onde Comprar")**: Módulo focado no dono de loja para cadastro e atualização do catálogo de produtos, gerenciamento de estoque, aplicação de destaques promocionais e rastreamento de entregas.
- **SupportDashboard (Painel de Suporte)**: Central de atendimento administrativa utilizada para mediar conflitos, auditoria de contas denunciadas e suporte direto aos usuários.

## 2.2 Serviços de Backend (Core Services)
Os painéis consomem um conjunto de serviços modulares que processam as regras de negócio da plataforma:

- **AuthService**: Orquestra a segurança, validação de tokens e níveis de permissão dos perfis.
- **SearchController** / MarketService: Gerenciam os motores de busca, filtragem por notas/categorias e a catalogação dos produtos das lojas parceiras.
- **VagaService** / PropostaService: Controlam o ciclo de vida dos anúncios de emprego, desde a publicação textual do cliente até a candidatura e o fechamento do acordo pelo profissional.
- **ChatService**: Sustenta a comunicação em tempo real entre as pontas (Cliente $\leftrightarrow$ Profissional e Cliente $\leftrightarrow$ Lojista).
- **RatingService & PromotionService**: Computam o ranqueamento dos profissionais pós-serviço e processam as regras visuais de promoções do marketplace.
- **SupportService & AuditService**: Registram os logs de atendimento e os históricos de auditoria para denúncias de conduta inadequada.

## 2.3 ntegrações e Serviços Externos (Third-Party APIs)

Para estender as funcionalidades do ecossistema, o aplicativo se conecta a microsserviços e gateways externos:

- **Firebase Auth / Telecom API**: Utilizados para a validação robusta de acesso via código SMS/Celular.
- **Google Maps API**: Fornece a inteligência de geolocalização para cadastro de endereços comerciais e cálculo de raio de distância para a busca de profissionais e lojas populares.
- **Text-to-Speech (TTS) API**: Provedor do recurso de acessibilidade, realizando a leitura de tela de formulários, mensagens de chat e avaliações em áudio.
- **WhatsApp API**: Permite a transição omnicanal do suporte, movendo atendimentos complexos do chat interno diretamente para o mensageiro externo.
- **Banco de Dados Central**: Entidade persistente que unifica o estado e o histórico de toda a aplicação.

---

# 3. diagrama de componente - AccessScreen
Este diagrama de componentes C4 detalha o fluxo de Gestão de Acessos, Autenticação e Acessibilidade Inicial do aplicativo. Ele demonstra como a tela de login/cadastro (AccessScreen) interage com os serviços locais de autenticação e suporte por voz, bem como a comunicação direta com os provedores de nuvem e APIs externas para garantir uma entrada segura e inclusiva na plataforma.

<div align="center">
<img width="6183" height="3183" alt="diagrama de componente - AccessScreen drawio" src="https://github.com/user-attachments/assets/c4a57f01-64f7-4411-9ec9-c8cafa91339c" />
<p>figura 2 - diagrama de componente - AccessScreen</p>
</div>

## 3.1 Componentes de Interface (UI Component)
- **App Mobile**: O contêiner principal da aplicação (construído em React Native + Expo + TypeScript), que renderiza a interface e gerencia o estado global de navegação.
- **AccessScreen**: Subcomponente de interface gráfica (React Native Screen). É a tela responsável por capturar as credenciais do usuário, gerenciar os formulários de cadastro de perfis (Cliente, Profissional, Lojista e Suporte) e acionar os recursos de leitura assistida.

## 3.2 Serviços Locais (Services)
A camada de interface delega as regras de negócio iniciais para dois serviços que rodam sob o escopo do aplicativo:

- **AuthService**: Componente que encapsula o Firebase Auth SDK. Ele recebe as solicitações da AccessScreen para gerenciar permissões, controlar o tempo de sessão e disparar o fluxo de login via senha ou código dinâmico.
- **AccessibilityService**: Componente responsável por orquestrar os recursos de acessibilidade nativos (Expo Speech). Ele intercepta as interações da tela para coordenar a leitura assistida por voz e comandos de áudio.

## 3.3 Integrações e Infraestrutura Externa (External Services & Cloud)
Os serviços locais atuam como pontes para os seguintes provedores externos:

- **Firebase Auth (Firebase Authentication)**: Serviço de nuvem encarregado de validar a identidade do usuário de forma segura através do mecanismo OTP (One-Time Password) via celular/SMS.
- **Text-to-Speech API (Expo Speech)**: Gateway externo que realiza a conversão de texto em áudio em tempo real, permitindo a leitura assistida do formulário para usuários que necessitam de suporte visual.
- **Cloud Firestore (Firebase Firestore)**: Banco de dados NoSQL na nuvem utilizado para persistir, sincronizar e armazenar os dados de perfil e identificação que foram atualizados ou criados durante o fluxo de acesso.

---

# 4. diagrama de componente - ClientDashboard 
Este diagrama de componentes C4 detalha o funcionamento do Painel do Cliente. Ele ilustra as interações da interface do usuário (ClientDashboard) com os serviços internos que gerenciam a busca de profissionais, publicação de vagas, submissão de propostas, avaliações, chat e gerenciamento de perfil, além de mapear as dependências com serviços externos de geolocalização e persistência.

<div align = "center">
  <img width="6606" height="4956" alt="diagrama de componente - ClientDashboard drawio" src="https://github.com/user-attachments/assets/9abaf499-de96-4be2-b1c6-3e739de45fb9" />
  <p>figura 3 - diagrama de componente - ClientDashboard </p>
</div>

## 4.1 Componentes de Interface (UI Component)
- **App Mobile**: O contêiner global do aplicativo (desenvolvido em React Native + Expo + TypeScript), responsável pela infraestrutura e ciclo de vida do app.
- **ClientDashboard**: Subcomponente de tela (React Native Screen). É a interface dedicada ao cliente, fornecendo ferramentas visuais para pesquisar profissionais, gerenciar vagas abertas, acompanhar o histórico de serviços, enviar avaliações e interagir via chat.


## 4.2 Serviços Locais (Services)
A interface delega as regras de negócio para uma camada de serviços modulares baseada em Firestore e gerenciamento de estado via Redux Toolkit:
- **SearchController**: Componente especializado em realizar buscas e aplicar filtros (como notas e categorias). Ele consome os dados de localização para aproximar clientes e profissionais.
- **HiringService**: Gerencia o ciclo de vida das vagas de emprego abertas pelo cliente, incluindo a publicação textual, anexo de imagens descritivas e cancelamentos.
- **ProposalService**: Controla o fluxo de propostas e candidaturas de profissionais associadas às vagas do cliente, permitindo a visualização de candidatos e fechamento de acordos.
- **RatingService**: Processa o sistema de ranqueamento, computando o feedback e as notas (1 a 5 estrelas) enviadas pelo cliente após a conclusão de um serviço.
- **ProfileService**: Gerencia os dados cadastrais diretos do cliente, permitindo a atualização de dados de identificação e preferências de perfil.
- **PortfolioService**: Funciona como um serviço de consulta para expor o histórico e relatos de trabalhos anteriores dos profissionais parceiros na tela do cliente.
- **ChatService**: Componente baseado em Firestore Realtime encarregado de sustentar a comunicação por texto, envio de imagens e alinhamentos de orçamentos diretamente entre cliente e profissional.

## 4.3 Integrações e Infraestrutura Externa (External Services & Cloud)
Os serviços locais conectam-se às seguintes entidades externas para a execução das tarefas:

- **Google Maps API (Maps SDK)**: Provedor externo consumido pelo SearchController para fornecer mapas dinâmicos e inteligência de geolocalização, permitindo encontrar profissionais nas proximidades.
- **Cloud Firestore (Container Firebase Firestore)**: Banco de dados em nuvem e em tempo real que atua como repositório centralizado de persistência de dados. Ele armazena os históricos de contratações, propostas, mensagens do chat, avaliações e logs estruturados de perfis.
---
# 5 Diagrama de componentes - ProfessionalDashboard
Este diagrama de componentes C4 detalha o funcionamento do Painel do Profissional. Ele ilustra como a interface dedicada ao trabalhador autônomo (ProfessionalDashboard) interage com os serviços internos para gerenciar candidaturas a vagas, atualizar o portfólio digital, acompanhar reputação, ajustar dados de perfil e manter a comunicação com os clientes.


<div align = "center">
  <img width="6687" height="3753" alt="diagrama de componente - ProfessionalDashboard drawio" src="https://github.com/user-attachments/assets/bcc52a35-bdb7-48be-af72-c9e9a8b8b312" />
  <p>figura 4 - diagrama de componente - ProfessionalDashboard </p>
</div>

## 5.1 - Componentes de Interface (UI Component)
- **ProfessionalDashboard**: Subcomponente de tela (React Native Screen). É a área de trabalho do profissional, oferecendo controles visuais para visualizar serviços disponíveis, enviar contrapropostas, gerenciar o portfólio de fotos e relatos, e acessar canais de comunicação direta.

## 5.2 - Serviços Locais (Services)
A interface se conecta a uma camada de serviços locais especializados para a execução das regras de negócio da persona:

- **ProposalService**: Componente central baseado em Firebase Firestore + Redux Toolkit. Ele gerencia o ciclo de candidaturas, permitindo ao profissional visualizar vagas compatíveis, enviar propostas e contrapropostas, gerenciar negociações e cancelar candidaturas quando necessário.
- **PortfolioService**: Componente encarregado de estruturar e gerenciar o portfólio digital e histórico do profissional, viabilizando o upload e exibição de fotos e relatos de trabalhos anteriores.
- **RatingService**: Permite ao profissional consultar suas avaliações, pontuação acumulada e feedback de reputação deixado pelos clientes após a finalização de serviços.
- **ProfileService**: Gerencia os dados cadastrais da persona (Redux Toolkit + Firestore), controlando as informações de perfil, dados de identificação e validações associadas à conta.
- **ChatService**: Componente baseado em Firestore Realtime focado em mensagens e comunicação. Garante a troca de mensagens de texto, recebimento de notificações de novos chats e alinhamento de orçamentos diretamente com os clientes interessados.

## 5.3 - Infraestrutura Externa e Persistência (Cloud Services)
Os microsserviços locais utilizam uma infraestrutura em nuvem unificada para manter a consistência do sistema:

- **Cloud Firestore (Container Firebase Firestore**): Banco de dados NoSQL baseado em nuvem que atua como o repositório central. Ele persiste de forma segura e síncrona os dados de propostas de serviços, histórico de portfólios, avaliações, dados cadastrais e as conversas em tempo real estabelecidas entre o profissional e os clientes.
---

# 6 Diagrama de componente - Marketplace
Este diagrama de componentes C4 detalha o funcionamento do Módulo de Marketplace e Lojas. Ele ilustra como as duas interfaces comerciais — a visão do comprador (MarketplaceDashboard) e a visão administrativa do lojista (StoreDashboard) — interagem com os serviços internos para gerenciar o catálogo de produtos, controle de pedidos, promoções, avaliações e chats comerciais, além de mapear as integrações de geolocalização e persistência.

<div align = "center">
  <img width="6303" height="3723" alt="diagrama de componente - MarketplaceDashboard drawio" src="https://github.com/user-attachments/assets/eb13f3b1-0a9e-4284-83db-0f89cae22c28" />
  <p>figura 5 - diagrama de componente - MarketplaceDashboard </p>
</div>

## 6.1 Componentes de Interface (UI Components)
- **MarketplaceDashboard**: Tela de navegação do usuário focada no guia de lojas, realização de compras e acompanhamento de pedidos. É a interface do catálogo integrado para busca de materiais de construção.
- **StoreDashboard**: Tela administrativa de navegação exclusiva do Dono de Loja, fornecendo ferramentas para gerenciar o estoque, cadastrar produtos, configurar destaques promocionais e responder a clientes.

## 6.2 Serviços Locais (Services)
As interfaces delegam suas ações para uma camada de serviços modulares que processam as regras de negócio de e-commerce e catálogo:

- **MarketPlaceService**: Componente que orquestra o guia de lojas parceiras e profissionais parceiros. Ele faz a ponte de dados geográficos para listar estabelecimentos populares e categorias próximas ao usuário.
- **OrderService**: Gerencia o fluxo de compras, controlando as solicitações de pedidos de materiais e viabilizando o rastreamento das entregas para o lojista e o cliente.
- **RatingService**: Processa o sistema de reputação e feedback, coletando e exibindo as avaliações deixadas pelos clientes sobre os produtos e o atendimento das lojas.
- **CatalogService**: Responsável pelo gerenciamento do catálogo de produtos. Permite ao lojista cadastrar itens (com foto, preço, descrição e estoque) e realizar atualizações rápidas de preços.
- **PromotionService**: Controla as regras de promoções da plataforma, aplicando destaques visuais e anúncios para itens em oferta no guia "Onde Comprar".
- **ChatService**: Componente baseado em Firestore Realtime voltado para o suporte ao cliente na loja. Centraliza a troca de mensagens de texto e imagens para sanar dúvidas sobre produtos e compras.

## 6.3 Integrações e Infraestrutura Externa (External Services & Cloud)
Os serviços comunicam-se com provedores em nuvem para garantir a inteligência geográfica e a integridade dos dados:

- **Google Maps API (Maps SDK)**: API externa consumida pelo MarketPlaceService para fornecer geolocalização e mapas, auxiliando na busca de lojas físicas, rotas e no cadastro de endereços comerciais.
- **Cloud Firestore (Container Firebase Firestore):** Banco de dados centralizado em nuvem e de tempo real que persiste as tabelas de catálogos de produtos, histórico de pedidos, cupons promocionais, logs de avaliações e mensagens de chat.
---
# 7. Diagrama de componente - StoreDashboard
Este diagrama de componentes C4 detalha a arquitetura do Painel Administrativo do Lojista. Ele mapeia como a interface exclusiva do comerciante (StoreDashboard) interage com a camada de serviços locais para executar a gestão de estoques, criação de campanhas promocionais, monitoramento de reputação, atualização cadastral do estabelecimento e o ciclo completo de atendimento a pedidos.
<div align = "center">
  <img width="5673" height="3783" alt="diagrama de componente- StoreDashboard drawio" src="https://github.com/user-attachments/assets/c2283bce-0359-44e5-b6ff-952f8d6dd83a" />
  <p>figura 7 - diagrama de componente - StoreDashboard </p>
</div>
## 7.1 Componentes de Interface (UI Component)
- **StoreDashboard**: Subcomponente de tela (React Native Screen). É a interface de controle do Dono de Loja, centralizando as telas de navegação comercial, relatórios de compras e ferramentas de gerenciamento de produtos.

## 7.2 Serviços Locais (Services)
A camada de interface aciona cinco serviços locais especializados que encapsulam as regras de negócio do e-commerce pelo lado do vendedor:
- **CatalogService**: Componente baseado em Firestore encarregado de gerenciar o catálogo de produtos da loja. Ele processa a criação, edição e exclusão de itens (fotos, descrições, preços e contagem de estoque).
- **PromotionService**: Módulo que configura promoções, descontos e gerencia o destaque visual de anúncios de materiais que aparecerão no feed público do aplicativo.
- **RatingService**: Permite ao lojista consultar as avaliações de produtos e a reputação geral do estabelecimento deixada pelos clientes após as vendas.
- **ProfileService**: Componente responsável por atualizar o perfil e as informações comerciais da loja (Redux Toolkit + Firestore), tais como endereço completo e horários de funcionamento.
- **OrderService**: Microsserviço local que gerencia pedidos e solicitações recebidas. Controla o processamento, validação e acompanhamento logístico até a entrega final dos materiais de construção ao cliente.

## 7.3 Infraestrutura Externa e Persistência (Cloud Services)
Os microsserviços integrados comunicam-se de forma direta com o backend em nuvem para garantir a consistência das operações comerciais:
- **Cloud Firestore (Container Firebase Firestore):** Banco de dados centralizado NoSQL de tempo real. Ele persiste e sincroniza de forma contínua as tabelas de estoque, regras de precificação promocional, logs de avaliações, dados cadastrais e as atualizações de status de entrega de cada pedido gerado.
---

# 8 Diagrama de componentes - Interação Cliente-Profissional (Fluxo de Serviço)
ste diagrama de componentes C4 detalha o ciclo de vida e o fluxo de contratação de ponta a ponta. Ele ilustra como as duas interfaces de usuário principais — a visão do tomador de serviço (ClientDashboard) e a visão do prestador autônomo (ProfessionalDashboard) — operam de forma integrada e concorrente sobre os mesmos serviços locais para realizar buscas, propostas, negociações e comunicações em tempo real.

<div align = "center">
  <img width="6576" height="4383" alt="diagrama de componente- cliente e profissional drawio" src="https://github.com/user-attachments/assets/b8f542ab-3c7f-49f5-9d2a-29337d1e7526" />
  <p>figura 8 - diagrama de componente - Interação Cliente-Profissional (Fluxo de Serviço) </p>
</div>

## 8.1 Componentes de Interface (UI Components)
- **ClientDashboard**: A interface do Cliente, utilizada para disparar a busca geográfica de trabalhadores, cadastrar e gerenciar vagas abertas, analisar candidatos interessados e fechar os acordos.
- **ProfessionalDashboard**: A interface do Profissional, utilizada para inspecionar os serviços publicados na região, enviar propostas de orçamentos, gerenciar o status das candidaturas e atualizar seu portfólio visível ao mercado.

## 8.2 Serviços Locais Partilhados (Shared Core Services)
O ecossistema estabelece o fluxo de trabalho orquestrando chamadas cruzadas nos seguintes componentes de backend:

- **SearchController**: Consome dados de geolocalização para aproximar os usuários. Ele permite que o Cliente filtre os profissionais mais próximos e mapeia as vagas disponíveis na região para exibição no painel do Profissional.
- **HiringService**: Centraliza o ciclo das vagas. O Cliente publica os detalhes textuais e imagens do projeto, enquanto o serviço disponibiliza essas informações para consulta da ponta prestadora.
- **ProposalService**: O motor de negociação da plataforma. Ele recebe o envio de propostas e contrapropostas vindas do Profissional e atualiza, em tempo real, a lista de candidatos e o status da contratação no painel do Cliente para a tomada de decisão.
- **PortfolioService**: Gerencia a vitrine digital. Ele é alimentado pelo Profissional (com fotos e relatos de trabalhos) e consultado diretamente pelo Cliente durante a fase de triagem de candidatos.
- **ChatService**: Componente baseado em Firestore Realtime que estabelece o canal de negociação direta (chat de texto e imagens), permitindo o alinhamento de orçamentos e detalhes do serviço antes e durante a execução do contrato.

## 8.3 Integrações Externas e Persistência de Estado (Cloud Infrastructure)
- **Google Maps API (Maps SDK)**: Fornece o suporte de mapas dinâmicos para o cálculo de distâncias entre o endereço da vaga do cliente e a localização do profissional.
- **Cloud Firestore (Container Firebase Firestore)** :Infraestrutura NoSQL de nuvem que garante o sincronismo de dados em tempo real. Sempre que um profissional envia uma proposta ou uma mensagem no chat, o estado é persistido e replicado imediatamente na tela do cliente correspondente.
---
# 9 Diagrama de componente - SupportDashboard drawio
Este diagrama de componentes C4 detalha a arquitetura do Painel de Suporte. Ele ilustra como a interface administrativa (SupportDashboard) gerencia os chamados de atendimento omnicanal, interage com perfis de usuários sob auditoria e registra logs de segurança, além de detalhar as integrações com APIs de comunicação externa e armazenamento em nuvem.

<div align = "center">
  <img width="6003" height="3783" alt="diagrama de componente- SupportDashboard drawio" src="https://github.com/user-attachments/assets/39d55a48-e80f-44c6-ae9d-c3836915294b" />
  <p>figura 3 - diagrama de componente - SupportDashboard </p>
</div>

## 9.1 Componentes de Interface (UI Component)
- **SupportDashboard**: Subcomponente de tela (React Native Screen). Trata-se da interface exclusiva da persona de Suporte, fornecendo ferramentas visuais para gerenciar chats de atendimento com múltiplas partes, analisar denúncias e transferir chamados para canais externos.

## 9.2 Serviços Locais (Services)
A camada de interface aciona um conjunto de serviços modulares que processam as regras de atendimento, conformidade e auditoria:

- **ProfileService**: Componente baseado em Redux Toolkit + Firestore. É utilizado pelo suporte para consultar e validar informações cadastrais dos perfis envolvidos em chamados ou que foram alvo de denúncias de conduta inadequada.
- **ChatService**: Módulo baseado em Firestore Realtime que sustenta a central de atendimento por texto. Ele permite a criação de chats dinâmicos e a troca de mensagens com arquivos anexados (como imagens/prints do sistema para ajuda visual) entre o suporte e as outras personas (Cliente, Profissional ou Lojista).
- **SupportService**: Componente responsável pelas regras de omnicanalidade do atendimento (Component: WhatsApp API). Ele gerencia a transição dinâmica e a troca de canais de comunicação, permitindo mover o atendimento de dentro do aplicativo para ambientes externos.
- **AuditService**: Microsserviço local especializado em segurança (Component: Firestore). Ele cria registros automáticos e centraliza o sistema de logs de atendimento e auditoria de contas.

## 9.3 Integrações e Infraestrutura Externa (External Services & Cloud)
Os serviços locais dependem das seguintes conexões externas para garantir a operação e a persistência dos dados:

- **WhatsApp API (Twilio/WhatsApp)**: Gateway e canal externo de comunicação integrado ao SupportService. É acionado para encaminhar atendimentos complexos diretamente para o aplicativo de mensagens externo, garantindo a continuidade do suporte ao cliente.
- **Cloud Firestore (Container Firebase Firestore)**: Banco de dados em nuvem e em tempo real. Armazena de maneira persistente e síncrona o histórico de conversas de suporte, metadados de perfis, logs de auditoria detalhados e o status das ocorrências finalizadas.


