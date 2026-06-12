# 1. Diagramas de Componentes C4

Este documento detalha a arquitetura de componentes do sistema Conecta Obra Itacoatiara, seguindo o nível 3 do modelo C4. Ele descreve como os contêineres são subdivididos em componentes lógicos, suas responsabilidades e as interações entre eles, fornecendo uma visão clara da organização interna do software.

---

## 1.1 Visão Geral do Ecossistema Mobile

Este diagrama apresenta a porta de entrada do sistema e ilustra como a interface unificada (App Mobile) direciona os quatro principais atores (Cliente, Profissional, Lojista e Suporte) para suas respectivas jornadas. Ele também mapeia os serviços centrais de backend e as integrações com APIs de terceiros.

<div align="center">
  <img width="16384" height="16328" alt="diagrama de componente-visão Geral" src="https://github.com/user-attachments/assets/b275af95-57c7-43a3-a474-f05fade160fc" />
  <p><b>Figura 1:</b> Diagrama de Componentes - Visão Geral do Aplicativo Mobile.</p>
</div>

### Componentes de Interface (UI Components)
A camada de apresentação é composta por painéis especializados que isolam a experiência de cada persona:
- **App Mobile (Main Entry):** Ponto central de inicialização, responsável pelo carregamento do módulo de autenticação e roteamento baseado no perfil do usuário.
- **AccessScreen (Gestão de Acessos):** Módulo comum para login, criação de contas, validação via SMS e edição de dados cadastrais.
- **ClientDashboard:** Interface focada na busca de profissionais, gerenciamento de vagas, histórico de contratações e avaliações.
- **ProfessionalDashboard:** Painel para gerenciamento de portfólio, alertas de vagas, envio de propostas e conclusão de serviços.
- **MarketplaceDashboard:** Módulo para o lojista gerenciar catálogo, estoque, promoções e rastreamento de pedidos.
- **SupportDashboard:** Central administrativa para mediação de conflitos, auditoria de contas e suporte direto.

### Serviços de Backend (Core Services)
Os serviços modulares processam as regras de negócio da plataforma:
- **AuthService:** Orquestra a segurança e validação de permissões.
- **SearchController / MarketService:** Gerenciam motores de busca e catalogação de produtos.
- **VagaService / PropostaService:** Controlam o ciclo de vida dos anúncios de serviços e candidaturas.
- **ChatService:** Sustenta a comunicação em tempo real entre as partes.
- **Rating & Promotion Services:** Computam ranqueamentos e processam regras de promoções.
- **Support & Audit Services:** Registram logs de atendimento e históricos de auditoria.

---

## 1.2 Módulo de Gestão de Acessos (AccessScreen)

Este diagrama detalha o fluxo de autenticação e acessibilidade inicial. Ele demonstra a interação entre a interface de login, os serviços locais e os provedores de nuvem para garantir uma entrada segura e inclusiva.

<div align="center">
  <img width="10270" height="4060" alt="diagrama de componente - AccessScreen drawio" src="https://github.com/user-attachments/assets/23354d7a-5d7f-4a0c-8d97-d6fcebaa3c0d" />
  <p><b>Figura 2:</b> Diagrama de Componentes - AccessScreen e Autenticação.</p>
</div>

### Componentes e Responsabilidades
- **App Mobile:** Contêiner principal desenvolvido em React Native + Expo + TypeScript.
- **AccessScreen:** Subcomponente responsável pela captura de credenciais e formulários de cadastro.
- **AuthService:** Encapsula o Firebase Auth SDK para gestão de sessões e login via OTP.
- **AccessibilityService:** Orquestra recursos nativos (Expo Speech) para leitura assistida por voz.
- **Infraestrutura Externa:** Utiliza Firebase Auth para validação de identidade e Cloud Firestore para persistência de perfis.

---

## 1.3 Painel do Cliente (ClientDashboard)

Detalha o funcionamento das ferramentas dedicadas ao cliente, incluindo busca, contratação e avaliação de profissionais, além da integração com serviços de geolocalização.

<div align="center">
  <img width="9710" height="8260" alt="diagrama de componente - ClientDashboard drawio" src="https://github.com/user-attachments/assets/57404627-1632-45d8-903d-55667341ae71" />
  <p><b>Figura 3:</b> Diagrama de Componentes - Painel do Cliente.</p>
</div>

### Serviços Locais e Integrações
- **SearchController:** Realiza buscas filtradas integrando-se à Google Maps API para geolocalização.
- **Hiring & Proposal Services:** Gerenciam o ciclo de vida das vagas, desde a publicação até a contratação.
- **Rating Service:** Processa feedbacks e notas de avaliação.
- **ChatService:** Baseado em Firestore Realtime para comunicação direta e alinhamento de orçamentos.
- **Persistência:** Todos os dados são sincronizados em tempo real via Cloud Firestore.

---

## 1.4 Painel do Profissional (ProfessionalDashboard)

Ilustra como a interface do trabalhador autônomo interage com os serviços para gerenciar sua reputação, portfólio e negociações de serviços.

<div align="center">
  <img width="9900" height="6260" alt="diagrama de componente - ProfessionalDashboard drawio" src="https://github.com/user-attachments/assets/ee55cd8e-1064-4807-9d11-3b1ae873f7a3" />
  <p><b>Figura 4:</b> Diagrama de Componentes - Painel do Profissional.</p>
</div>

### Componentes Principais
- **ProposalService:** Gerencia candidaturas e contrapropostas.
- **PortfolioService:** Estrutura o histórico digital com upload de fotos e relatos de trabalhos.
- **RatingService:** Permite a consulta de reputação e feedbacks recebidos.
- **ProfileService:** Gerencia dados cadastrais e validações de conta.
- **ChatService:** Garante a troca de mensagens e notificações de novos contatos de clientes.

---

## 1.5 Módulo de Marketplace e Lojas

Detalha as interfaces comerciais, abrangendo tanto a visão do comprador quanto a administrativa do lojista, focando em catálogo, pedidos e promoções.

<div align="center">
  <img width="8960" height="5755" alt="diagrama de componente - MarketplaceDashboard drawio" src="https://github.com/user-attachments/assets/4f6bfa78-41f3-48a4-a0eb-494f724512f4" />
  <p><b>Figura 5:</b> Diagrama de Componentes - Marketplace e Gestão de Lojas.</p>
</div>

### Funcionalidades e Serviços
- **MarketPlaceService:** Orquestra o guia de lojas e profissionais parceiros por geolocalização.
- **Catalog & Promotion Services:** Permitem o gerenciamento de produtos (fotos, preços, estoque) e destaques promocionais.
- **OrderService:** Controla o fluxo de pedidos e o rastreamento de entregas.
- **ChatService:** Centraliza o suporte comercial para sanar dúvidas sobre produtos e compras.
- **Infraestrutura:** Integração com Google Maps para localização de lojas e Firestore para persistência de dados comerciais.
