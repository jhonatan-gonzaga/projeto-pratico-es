# 6. Diagramas de Classe C4 - Nível de Código

Este documento detalha a estrutura de código do sistema Conecta Obra Itacoatiara através de diagramas de classe C4, focando nas principais entidades, seus atributos, métodos e relacionamentos. A arquitetura segue os princípios da **Clean Architecture** e do padrão **Model-View-ViewModel (MVVM)**, conforme descrito em [1] e [2], garantindo a separação de responsabilidades, testabilidade e manutenibilidade.

## 6.1 Diagrama de Classe - Visão Geral

O diagrama de classe de visão geral apresenta as principais entidades e seus relacionamentos fundamentais, fornecendo uma compreensão de alto nível da estrutura de dados e das interações centrais do sistema. Ele reflete a camada de Domínio da Clean Architecture, onde as regras de negócio puras e as entidades são definidas, independentes de detalhes de implementação ou interface.

<img width="5255" height="3993" alt="diagrama de class-geral" src="https://github.com/user-attachments/assets/d561c829-4bf5-4ac7-96ce-8504a7ff7ab6" />

**Figura 1:** Diagrama de Classe - Visão Geral do Sistema Conecta Obra Itacoatiara.

### Entidades Principais e Relacionamentos:

*   **Usuario (User):** Classe base para todos os usuários do sistema, contendo atributos comuns como `id`, `nome`, `email`, `senha`, `telefone` e `tipoPerfil`. Esta classe é fundamental para a gestão de acessos e perfis.
*   **Cliente (Client):** Herda de `Usuario` e adiciona atributos específicos como `endereco` e `historicoContratacoes`. Representa o usuário que busca e contrata serviços.
*   **Profissional (Professional):** Herda de `Usuario` e inclui atributos como `especialidade`, `portfolio`, `disponibilidade` e `avaliacaoMedia`. Representa o prestador de serviços.
*   **Lojista (Shopkeeper):** Herda de `Usuario` e possui atributos como `nomeLoja`, `cnpj`, `enderecoLoja` e `catalogoProdutos`. Representa o proprietário de uma loja parceira.
*   **Suporte (Support):** Herda de `Usuario` e pode ter atributos como `nivelAcesso` ou `setor`. Representa os membros da equipe de suporte.
*   **Servico (Service):** Representa um serviço oferecido ou solicitado, com atributos como `id`, `titulo`, `descricao`, `status`, `dataCriacao` e `dataConclusao`. Possui um relacionamento com `Cliente` (solicitante) e `Profissional` (executor).
*   **Produto (Product):** Entidade relacionada ao `Lojista`, com atributos como `id`, `nome`, `descricao`, `preco`, `estoque` e `disponivel`. Faz parte do catálogo de produtos das lojas.
*   **Avaliacao (Rating):** Relacionada a `Cliente`, `Profissional` e `Servico`, contendo `id`, `nota`, `comentario` e `dataAvaliacao`. Permite que clientes avaliem serviços e profissionais.
*   **Mensagem (Message):** Parte do `ChatService`, com atributos como `id`, `remetenteId`, `destinatarioId`, `conteudo`, `dataEnvio` e `lida`. Representa as mensagens trocadas entre usuários.
*   **Chat (Chat):** Agrupa `Mensagens` entre dois ou mais usuários, com atributos como `id`, `participantes` e `ultimaMensagem`.

Os relacionamentos entre essas classes demonstram a interconexão das funcionalidades do sistema, desde a gestão de usuários até a oferta de serviços e produtos, comunicação e avaliação. A herança de `Usuario` para `Cliente`, `Profissional`, `Lojista` e `Suporte` exemplifica a reutilização de código e a padronização da gestão de identidades, um pilar da arquitetura do sistema.

## 6.2 Diagrama de Classe - Gestão de Acessos e Perfis

Este diagrama detalha as classes envolvidas na gestão de acessos e perfis de usuário, um aspecto crucial para a segurança e personalização do sistema. Ele ilustra como a autenticação e a autorização são gerenciadas, utilizando a classe `Usuario` como base e estendendo-a para os diferentes tipos de perfis, como `Cliente`, `Profissional`, `Lojista` e `Suporte`. A integração com serviços externos como o Firebase Auth é fundamental para a validação de identidade [3].

<img width="1542" height="1180" alt="diagrama de class login" src="https://github.com/user-attachments/assets/c10b0f05-6088-44b8-862c-9562fceeb5ec" />

**Figura 2:** Diagrama de Classe - Gestão de Acessos e Perfis.

### Classes e Responsabilidades:

*   **Usuario (User):** Classe abstrata ou base que define os atributos e métodos comuns a todos os usuários do sistema. Inclui `id`, `nome`, `email`, `senhaHash`, `telefone`, `dataCadastro`, `ultimoAcesso` e `tipoPerfil` (enum: `CLIENTE`, `PROFISSIONAL`, `LOJISTA`, `SUPORTE`). Métodos podem incluir `autenticar()`, `atualizarPerfil()`, `alterarSenha()`.
*   **Credencial (Credential):** Uma classe associada a `Usuario` que pode conter informações de autenticação mais detalhadas, como `tokenAcesso`, `tokenRefresh`, `dataExpiracaoToken`. Isso permite uma gestão mais granular dos tokens de sessão.
*   **Perfil (Profile):** Uma classe que pode ser associada a `Usuario` para armazenar configurações e preferências específicas do usuário, como `idiomaPreferencial`, `notificacoesAtivas`, `temaApp`.
*   **AuthService (Serviço de Autenticação):** Componente responsável por orquestrar a segurança, validação de tokens e níveis de permissão dos perfis. Interage com serviços externos como Firebase Auth para autenticação e validação de credenciais [3]. Métodos: `login(email, senha)`, `registrar(dadosUsuario)`, `validarToken(token)`, `recuperarSenha(email)`.
*   **FirebaseAuthProvider (Provedor de Autenticação Firebase):** Representa a integração com o Firebase Auth, responsável pela validação robusta de acesso via código SMS/Celular e outros métodos de autenticação [3].

Este diagrama demonstra a modularidade da gestão de usuários, onde a lógica de autenticação é centralizada no `AuthService` e os diferentes perfis herdam características comuns, mas podem ter atributos e comportamentos específicos. A separação de `Credencial` e `Perfil` permite flexibilidade na gestão de segurança e personalização.

## 6.3 Diagrama de Classe - Cliente

O diagrama de classe do Cliente detalha as entidades e interações específicas para a persona do cliente no sistema Conecta Obra Itacoatiara. Ele foca nas funcionalidades de busca de profissionais, publicação de vagas, gerenciamento de contratações e avaliações, refletindo a lógica de negócio da camada de Domínio e as interações com a camada de Aplicação.

<img width="1936" height="1180" alt="diagrama de class cliente" src="https://github.com/user-attachments/assets/56624904-c056-42b7-a5c4-3dd85ab13e34" />

**Figura 3:** Diagrama de Classe - Cliente.

### Classes e Responsabilidades:

*   **Cliente (Client):** Herda de `Usuario`. Contém atributos como `endereco` (para localização de serviços), `historicoContratacoes` (lista de serviços contratados) e `preferenciasBusca`. Métodos podem incluir `buscarProfissional()`, `publicarVaga()`, `avaliarServico()`, `gerenciarVaga()`.
*   **Vaga (JobPosting):** Representa uma solicitação de serviço feita pelo cliente. Atributos: `id`, `titulo`, `descricao`, `dataPublicacao`, `dataLimite`, `status` (aberta, em andamento, concluída, cancelada), `localizacao`. Relacionada a `Cliente` (quem publicou) e pode ter um relacionamento com `Proposta`.
*   **Proposta (Proposal):** Representa a oferta de um profissional para uma `Vaga`. Atributos: `id`, `valorProposto`, `mensagem`, `dataEnvio`, `status` (pendente, aceita, recusada). Relacionada a `Vaga` e `Profissional`.
*   **Avaliacao (Rating):** Permite ao cliente avaliar um `Servico` ou `Profissional`. Atributos: `id`, `nota` (1-5), `comentario`, `dataAvaliacao`. Relacionada a `Cliente`, `Profissional` e `Servico`.
*   **Servico (Service):** Representa um serviço contratado e em execução. Atributos: `id`, `descricao`, `dataInicio`, `dataFim`, `status` (agendado, em progresso, finalizado), `valorTotal`. Relacionada a `Cliente` e `Profissional`.
*   **SearchController (Controlador de Busca):** Componente da camada de Aplicação responsável por processar as requisições de busca de profissionais e serviços, aplicando filtros e ordenações. Interage com a `Google Maps API` para geolocalização [4].
*   **HiringService (Serviço de Contratação):** Gerencia o ciclo de vida das `Vagas` e `Propostas`, desde a publicação até o fechamento do acordo.
*   **RatingService (Serviço de Avaliação):** Processa o sistema de ranqueamento e feedback, calculando a média de avaliações e persistindo os dados.
*   **ChatService (Serviço de Chat):** Facilita a comunicação em tempo real entre `Cliente` e `Profissional` para negociação e acompanhamento de serviços [5].
*   **Google Maps API:** Serviço externo para geolocalização, utilizado para encontrar profissionais próximos ao cliente [4].

Este diagrama ilustra o fluxo completo de interação do cliente, desde a busca e contratação de serviços até a comunicação e avaliação, destacando a interdependência das classes e serviços para fornecer uma experiência completa.

## 6.4 Diagrama de Classe - Lojista

O diagrama de classe do Lojista detalha as entidades e interações específicas para a persona do lojista no sistema Conecta Obra Itacoatiara. Ele foca nas funcionalidades de gerenciamento de produtos, catálogo, promoções e comunicação com clientes, refletindo a lógica de negócio da camada de Domínio e as interações com a camada de Aplicação.

<img width="1595" height="1355" alt="diagrama de class - lojista" src="https://github.com/user-attachments/assets/65d1c1d1-5223-49f2-862c-9562fceeb5ec" />

**Figura 4:** Diagrama de Classe - Lojista.

### Classes e Responsabilidades:

*   **Lojista (Shopkeeper):** Herda de `Usuario`. Contém atributos como `nomeLoja`, `cnpj`, `enderecoLoja`, `descricaoLoja`, `horarioFuncionamento` e `catalogoProdutos` (lista de produtos). Métodos podem incluir `gerenciarProdutos()`, `criarPromocao()`, `responderMensagem()`, `atualizarDadosLoja()`.
*   **Produto (Product):** Representa um item vendido pelo lojista. Atributos: `id`, `nome`, `descricao`, `preco`, `estoque`, `disponivel`, `urlImagem`, `categoria`. Relacionada a `Lojista`.
*   **Promocao (Promotion):** Representa uma oferta ou desconto aplicado a um produto. Atributos: `id`, `nomePromocao`, `descricao`, `dataInicio`, `dataFim`, `percentualDesconto`, `produtoAssociado`. Relacionada a `Produto`.
*   **Pedido (Order):** Representa uma compra realizada por um cliente. Atributos: `id`, `dataPedido`, `status` (pendente, processando, enviado, entregue, cancelado), `valorTotal`, `itensPedido` (lista de produtos e quantidades). Relacionada a `Cliente` e `Lojista`.
*   **CatalogService (Serviço de Catálogo):** Componente da camada de Aplicação responsável por gerenciar o catálogo de produtos do lojista, incluindo criação, atualização, exclusão e consulta de produtos.
*   **PromotionService (Serviço de Promoção):** Gerencia as promoções e ofertas, permitindo ao lojista criar e gerenciar descontos para seus produtos.
*   **OrderService (Serviço de Pedido):** Controla o ciclo de vida dos pedidos, desde a criação pelo cliente até a entrega, incluindo o rastreamento e atualização de status.
*   **ChatService (Serviço de Chat):** Facilita a comunicação em tempo real entre `Lojista` e `Cliente` para dúvidas sobre produtos e pedidos [5].

Este diagrama ilustra o ecossistema do lojista, desde a gestão de seu catálogo de produtos e promoções até o processamento de pedidos e a comunicação com os clientes, evidenciando a complexidade e a interconexão das funcionalidades de e-commerce.

## 6.5 Diagrama de Classe - Profissional

O diagrama de classe do Profissional detalha as entidades e interações específicas para a persona do profissional no sistema Conecta Obra Itacoatiara. Ele foca nas funcionalidades de gerenciamento de portfólio, candidaturas a vagas, acompanhamento de reputação e comunicação com clientes, refletindo a lógica de negócio da camada de Domínio e as interações com a camada de Aplicação.

<img width="1946" height="1239" alt="diagrama de class2" src="https://github.com/user-attachments/assets/7e0c4c12-f4d2-4db6-89d1-cded8e806154" />

**Figura 5:** Diagrama de Classe - Profissional.

### Classes e Responsabilidades:

*   **Profissional (Professional):** Herda de `Usuario`. Contém atributos como `especialidade`, `portfolio` (lista de trabalhos realizados), `disponibilidade`, `avaliacaoMedia`, `localizacaoAtendimento` e `experiencia`. Métodos podem incluir `candidatarVaga()`, `gerenciarPortfolio()`, `atualizarDisponibilidade()`, `responderMensagem()`.
*   **Portfolio (Portfolio):** Representa o conjunto de trabalhos e projetos realizados pelo profissional. Atributos: `id`, `titulo`, `descricao`, `urlImagens`, `dataConclusao`. Relacionada a `Profissional`.
*   **Proposta (Proposal):** Representa a oferta de um profissional para uma `Vaga`. Atributos: `id`, `valorProposto`, `mensagem`, `dataEnvio`, `status` (pendente, aceita, recusada). Relacionada a `Vaga` e `Profissional`.
*   **Vaga (JobPosting):** Representa uma solicitação de serviço feita pelo cliente. Atributos: `id`, `titulo`, `descricao`, `dataPublicacao`, `dataLimite`, `status` (aberta, em andamento, concluída, cancelada), `localizacao`. Relacionada a `Cliente` (quem publicou) e pode ter um relacionamento com `Proposta`.
*   **Avaliacao (Rating):** Permite ao cliente avaliar um `Servico` ou `Profissional`. Atributos: `id`, `nota` (1-5), `comentario`, `dataAvaliacao`. Relacionada a `Cliente`, `Profissional` e `Servico`.
*   **HiringService (Serviço de Contratação):** Gerencia o ciclo de vida das `Vagas` e `Propostas`, permitindo ao profissional visualizar vagas compatíveis, enviar propostas e gerenciar negociações.
*   **PortfolioService (Serviço de Portfólio):** Componente da camada de Aplicação responsável por estruturar e gerenciar o portfólio digital e histórico do profissional, viabilizando o upload e exibição de fotos e relatos de trabalhos anteriores.
*   **RatingService (Serviço de Avaliação):** Permite ao profissional consultar suas avaliações, pontuação acumulada e feedback de reputação deixado pelos clientes após a finalização de serviços.
*   **ChatService (Serviço de Chat):** Facilita a comunicação em tempo real entre `Profissional` e `Cliente` para negociação e acompanhamento de serviços [5].

Este diagrama ilustra o fluxo de trabalho do profissional, desde a gestão de seu portfólio e candidaturas a vagas até a comunicação com os clientes e o acompanhamento de sua reputação, destacando a interdependência das classes e serviços para uma gestão eficiente de sua carreira.

## 6.6 Diagrama de Classe - Suporte

O diagrama de classe do Suporte detalha as entidades e interações específicas para a persona da equipe de suporte no sistema Conecta Obra Itacoatiara. Ele foca nas funcionalidades de mediação de conflitos, auditoria de contas e suporte direto aos usuários, refletindo a lógica de negócio da camada de Domínio e as interações com a camada de Aplicação.

<img width="1418" height="1113" alt="diagrama de class suporte" src="https://github.com/user-attachments/assets/77ee4090-1a5e-4e94-ae99-f92f44d0b926" />

**Figura 6:** Diagrama de Classe - Suporte.

### Classes e Responsabilidades:

*   **Suporte (Support):** Herda de `Usuario`. Contém atributos como `nivelAcesso`, `setor`, `filaAtendimento` e `statusAtendimento`. Métodos podem incluir `atenderChamado()`, `resolverConflito()`, `auditarConta()`, `gerenciarDenuncia()`.
*   **Chamado (Ticket):** Representa uma solicitação de suporte de um usuário. Atributos: `id`, `assunto`, `descricao`, `dataAbertura`, `dataFechamento`, `status` (aberto, em progresso, resolvido, fechado), `prioridade`. Relacionada a `Usuario` (quem abriu) e `Suporte` (quem atende).
*   **Denuncia (Report):** Representa uma denúncia de conduta inadequada de um usuário. Atributos: `id`, `motivo`, `descricao`, `dataDenuncia`, `status` (pendente, em analise, resolvida), `usuarioDenunciado`, `usuarioDenunciante`. Relacionada a `Usuario`.
*   **Auditoria (AuditLog):** Registra logs de ações importantes no sistema para fins de segurança e rastreabilidade. Atributos: `id`, `dataHora`, `usuarioId`, `acao`, `detalhes`. Relacionada a `Usuario`.
*   **SupportService (Serviço de Suporte):** Componente da camada de Aplicação responsável por gerenciar chamados, denúncias e interações da equipe de suporte com os usuários.
*   **AuditService (Serviço de Auditoria):** Registra os logs de atendimento e os históricos de auditoria para denúncias de conduta inadequada.
*   **ChatService (Serviço de Chat):** Facilita a comunicação em tempo real entre `Suporte` e os demais usuários para resolução de problemas [5].

Este diagrama ilustra as ferramentas e processos que a equipe de suporte utiliza para manter a integridade e a qualidade do serviço, garantindo um ambiente seguro e confiável para todos os usuários do Conecta Obra Itacoatiara.

## Referências

[1] [Padrões Arquiteturais - 1-padroes-arquiteturais.md](https://github.com/jhonatan-gonzaga/projeto-pratico-es/blob/main/TP2/Conecta-Obra-Itacoatiara/projeto-e-arquitetura/1-padroes-arquiteturais.md)
[2] [Tech Stack Map - 2-tech-stack.md](https://github.com/jhonatan-gonzaga/projeto-pratico-es/blob/main/TP2/Conecta-Obra-Itacoatiara/projeto-e-arquitetura/2-tech-stack.md)
[3] [Firebase Documentation](https://firebase.google.com/docs)
[4] [Google Maps Platform Documentation](https://developers.google.com/maps/documentation)
[5] [Implementing Clean Architecture with MVVM and Redux Toolkit in React Native](https://medium.com/@mohamed.ma872/implementing-clean-architecture-with-mvvm-and-redux-toolkit-in-react-native-0aeff1b2014c)
