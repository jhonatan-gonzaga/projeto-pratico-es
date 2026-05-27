# 1. Objetivo do Diagrama

---
# 2 Diagrma completo - Visão Geral do Aplicativo Mobile
Este diagrama de componentes apresenta a visão geral e a porta de entrada do ecossistema mobile. Ele ilustra como uma interface unificada (App Mobile) direciona os
quatro principais atores do sistema (Cliente, Profissional, Lojista e Suporte) para suas respectivas jornadas e
painéis especializados, além de mapear os serviços centrais de backend e as integrações com APIs terceiras necessárias para sustentar as regras de negócio.

<div align="center">
  <img width="16384" height="16328" alt="diagrama de componente-visão Geral" src="https://github.com/user-attachments/assets/b275af95-57c7-43a3-a474-f05fade160fc" />
  <p>figura 1 - diagrama de componente-visão Geral drawio"</p>
</div>


## 2.1 Componentes de Interface (UI Components)
A camada frontal é subdividida em painéis especializados que isolam a experiência de cada persona:
- **App Mobile (Main Entry)**: O ponto central de inicialização do aplicativo, responsável por carregar o módulo de autenticação e rotear o usuário com base em seu perfil.
- **AccessScreen (Gestão de Acessos)**: Módulo comum responsável pelo login, criação de contas, validação de acessos via celular e edição dos dados cadastrais básicos.
- **ClientDashboard (Painel do Cliente)**: Centraliza a busca e filtragem de profissionais, a publicação e gerenciamento de vagas de serviços, o histórico de contratações e o sistema de avaliações.
- **ProfessionalDashboard (Painel do Profissional)**: Interface dedicada ao trabalhador autônomo para gerenciamento de seu portfólio digital, recebimento de alertas de vagas compatíveis, envio de contrapropostas e conclusão de ordens de serviço.
- **MarketplaceDashboard (Painel do Lojista / Guia "Onde Comprar")**: Módulo focado no dono de loja para cadastro e atualização do catálogo de produtos, gerenciamento de estoque, aplicação de destaques promocionais e rastreamento de entregas.
- **SupportDashboard (Painel de Suporte)**: Central de atendimento administrativa utilizada para mediar conflitos, auditoria de contas denunciadas e suporte direto aos usuários.

# 2.2 Serviços de Backend (Core Services)
Os painéis consomem um conjunto de serviços modulares que processam as regras de negócio da plataforma:

- **AuthService**: Orquestra a segurança, validação de tokens e níveis de permissão dos perfis.
- **SearchController** / MarketService: Gerenciam os motores de busca, filtragem por notas/categorias e a catalogação dos produtos das lojas parceiras.
- **VagaService** / PropostaService: Controlam o ciclo de vida dos anúncios de emprego, desde a publicação textual do cliente até a candidatura e o fechamento do acordo pelo profissional.
- **ChatService**: Sustenta a comunicação em tempo real entre as pontas (Cliente $\leftrightarrow$ Profissional e Cliente $\leftrightarrow$ Lojista).
- **RatingService & PromotionService**: Computam o ranqueamento dos profissionais pós-serviço e processam as regras visuais de promoções do marketplace.
- **SupportService & AuditService**: Registram os logs de atendimento e os históricos de auditoria para denúncias de conduta inadequada.

# 2.3 ntegrações e Serviços Externos (Third-Party APIs)

Para estender as funcionalidades do ecossistema, o aplicativo se conecta a microsserviços e gateways externos:

- **Firebase Auth / Telecom API**: Utilizados para a validação robusta de acesso via código SMS/Celular.
- **Google Maps API**: Fornece a inteligência de geolocalização para cadastro de endereços comerciais e cálculo de raio de distância para a busca de profissionais e lojas populares.
- **Text-to-Speech (TTS) API**: Provedor do recurso de acessibilidade, realizando a leitura de tela de formulários, mensagens de chat e avaliações em áudio.
- **WhatsApp API**: Permite a transição omnicanal do suporte, movendo atendimentos complexos do chat interno diretamente para o mensageiro externo.
- **Banco de Dados Central**: Entidade persistente que unifica o estado e o histórico de toda a aplicação.
