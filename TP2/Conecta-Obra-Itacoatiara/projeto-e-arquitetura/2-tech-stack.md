# Tech Stack Map: Conecta Obra Itacoatiara (Versão Web/Vite)

Este documento detalha a infraestrutura tecnológica sugerida para o projeto **Conecta Obra Itacoatiara**, agora integrando o **Vite** como ferramenta de build para o Frontend. A arquitetura permanece fiel aos padrões **Clean Architecture** e **MVVM**, garantindo a separação de interesses e a escalabilidade do sistema.

## 1. Integração entre Tecnologias e Fluxo de Dados

Com a adoção do **Vite**, o fluxo de desenvolvimento e a entrega do Frontend tornam-se mais ágeis. Abaixo, descrevemos como as tecnologias se conectam nesta nova configuração:

*   **Frontend (Vite + React) para Backend**: O Frontend, construído com **React** e **Vite**, utiliza o **Axios** para realizar requisições assíncronas para a API **Node.js (NestJS)**. O Vite otimiza o tempo de carregamento e o Hot Module Replacement (HMR) durante o desenvolvimento, enquanto o TypeScript garante a consistência dos dados.
*   **Segurança e Autenticação**: O fluxo de autenticação é gerenciado pelo **Firebase Auth**. O Frontend obtém o token de acesso e o envia no cabeçalho `Authorization` de cada requisição. O Backend valida esse token via **Firebase Admin SDK** para proteger as rotas.
*   **Persistência e Acesso a Dados**: O Backend utiliza o **Prisma ORM** para se comunicar com o banco de dados **PostgreSQL**. A lógica de negócio no Backend (Domain) consome as entidades mapeadas pelo Prisma, mantendo a independência de infraestrutura.
*   **Acessibilidade e Experiência do Usuário**: Como a aplicação agora utiliza tecnologias Web, o recurso de **Text-to-Speech (TTS)** pode ser implementado via **Web Speech API** (nativa dos navegadores modernos) ou APIs externas como **Google Cloud TTS**, garantindo a inclusão digital proposta.
*   **Serviços Externos**: As integrações com **Google Maps** e **WhatsApp (Twilio)** são expostas pelo Backend e consumidas pelo Frontend, permitindo funcionalidades de geolocalização e suporte direto ao usuário.

---

## 2. Tabela Detalhada da Tech Stack (Obrigatória)

A tabela abaixo apresenta a divisão por camadas, as tecnologias sugeridas e as respectivas justificativas de uso, agora incluindo o **Vite**.

| Camada | Tecnologia | Justificativa de Uso |
| :--- | :--- | :--- |
| **Frontend (Build Tool)** | Vite | Ferramenta de build ultra-rápida que melhora significativamente a experiência de desenvolvimento e otimiza o bundle final. |
| **Frontend (Framework)** | React | Biblioteca principal para construção da interface de usuário baseada em componentes, altamente compatível com MVVM. |
| **Frontend (Lógica)** | TypeScript | Adiciona tipagem estática ao projeto, essencial para manter a integridade entre as camadas de Apresentação e Domínio [1]. |
| **Frontend (Estado/MVVM)** | Redux Toolkit | Centraliza o estado global da aplicação e gerencia a lógica de apresentação (ViewModel) de forma previsível [6]. |
| **Frontend (Estilização)** | Tailwind CSS | Framework CSS utilitário que permite criar interfaces modernas e responsivas com alta produtividade. |
| **Backend (Aplicação)** | Node.js (NestJS) | Fornece uma estrutura modular para implementar a Clean Architecture e gerenciar as regras de negócio do sistema. |
| **Backend (Infraestrutura)** | Prisma ORM | Facilita a comunicação segura com o banco de dados, abstraindo consultas SQL complexas. |
| **Banco de Dados** | PostgreSQL | Armazenamento relacional robusto para gerenciar perfis, anúncios e catálogos de materiais [3]. |
| **Infraestrutura (Cloud)** | AWS ou Google Cloud | Provedor de nuvem para hospedagem escalável da API, banco de dados e arquivos estáticos do frontend [1]. |
| **Serviços (Segurança)** | Firebase Auth | Centraliza a autenticação e gestão de identidade dos usuários de forma segura [3]. |
| **Serviços (Acessibilidade)** | Web Speech API | API nativa do navegador para Text-to-Speech, permitindo a leitura de tela sem dependências externas pesadas. |
| **Serviços (Localização)** | Google Maps API | Provê serviços de geolocalização para busca de profissionais e lojas de materiais [3]. |
| **Serviços (Mensageria)** | Twilio WhatsApp API | Habilita a comunicação direta e notificações automáticas via WhatsApp entre os usuários [2]. |
| **Qualidade (Testes)** | Vitest & Testing Library | Vitest é o framework de testes nativo do Vite, oferecendo velocidade e compatibilidade total com o ambiente de build. |
| **Gestão (Processos)** | GitHub Projects | Ferramenta para organização do backlog, sprints e acompanhamento do progresso do projeto [1]. |

---

## Referências

[1] [Plano de Trabalho - 1_plano-de-trabalho.md](https://github.com/jhonatan-gonzaga/projeto-pratico-es/blob/main/TP1/especificacao/1_plano-de-trabalho.md)
[2] [Design Thinking - 2_design-thinking.md](https://github.com/jhonatan-gonzaga/projeto-pratico-es/blob/main/TP1/especificacao/2_design-thinking.md)
[3] [Padrões Arquiteturais - 1-padroes-arquiteturais.md](https://github.com/jhonatan-gonzaga/projeto-pratico-es/blob/main/TP2/Conecta-Obra-Itacoatiara/projeto-e-arquitetura/1-padroes-arquiteturais.md)
[4] [Vite Documentation](https://vitejs.dev/guide/)
[5] [Implementing Clean Architecture with MVVM and Redux Toolkit in React](https://medium.com/@mohamed.ma872/implementing-clean-architecture-with-mvvm-and-redux-toolkit-in-react-native-0aeff1b2014c)
[6] [Web Speech API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
