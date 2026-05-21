# Tech Stack Map: Conecta Obra Itacoatiara (Versão Mobile)

Este documento detalha a infraestrutura tecnológica sugerida para o projeto **Conecta Obra Itacoatiara**, com foco no desenvolvimento de um aplicativo móvel. A arquitetura permanece fiel aos padrões **Clean Architecture** e **MVVM**, garantindo a separação de interesses, escalabilidade e manutenibilidade do sistema.

## 1. Integração entre Tecnologias e Fluxo de Dados

O ecossistema tecnológico do projeto foi projetado para garantir que a comunicação entre o aplicativo móvel e o servidor ocorra de forma eficiente e segura. Abaixo, descrevemos como as tecnologias se conectam:

*   **Frontend (React Native) para Backend**: O aplicativo móvel, construído com **React Native** e **TypeScript**, utiliza o **Axios** para realizar requisições assíncronas para a API **Node.js (NestJS)**. O **Redux Toolkit** no frontend gerencia o estado da aplicação, garantindo a consistência dos dados e a reatividade da interface.
*   **Segurança e Autenticação**: O fluxo de autenticação é gerenciado pelo **Firebase Auth**. Após a autenticação bem-sucedida no aplicativo, um token é obtido e enviado no cabeçalho `Authorization` de cada requisição para o Backend. O servidor valida esse token via **Firebase Admin SDK** para proteger as rotas e garantir o acesso autorizado aos recursos.
*   **Persistência e Acesso a Dados**: O Backend utiliza o **Prisma ORM** para interagir com o banco de dados **MySQL**. Essa camada de abstração facilita o mapeamento de objetos TypeScript para o banco de dados e vice-versa, reduzindo a necessidade de SQL manual e mantendo a lógica de negócio (Domain) independente da infraestrutura de dados.
*   **Acessibilidade e Experiência do Usuário**: O recurso de **Text-to-Speech (TTS)**, implementado via **Expo Speech**, é integrado diretamente na camada de visualização (View) do aplicativo. Isso permite que as informações processadas pelo **ViewModel** sejam lidas em voz alta para o usuário, promovendo a inclusão digital conforme os requisitos do projeto.
*   **Serviços Externos**: As integrações com **Google Maps API** (para geolocalização) e **Twilio WhatsApp API** (para comunicação) são gerenciadas pela camada de **Data** no backend e consumidas pelo frontend mobile. Isso permite funcionalidades como busca de profissionais próximos, localização de lojas e suporte direto ao usuário via WhatsApp.

---

## 2. Tabela Detalhada da Tech Stack (Obrigatória)

A tabela abaixo apresenta a divisão por camadas, as tecnologias sugeridas e as respectivas justificativas de uso para o projeto Conecta Obra Itacoatiara, com foco na versão mobile.

| Camada | Tecnologia | Justificativa de Uso |
| :--- | :--- | :--- |
| **Frontend (Mobile - Framework)** | React Native (Expo) | Plataforma robusta para desenvolvimento mobile cross-platform, permitindo reutilização de código entre iOS e Android e acesso simplificado a APIs nativas [1]. |
| **Frontend (Mobile - Visualização)** | Expo Go | Ferramenta essencial para visualização e teste rápido do aplicativo em dispositivos reais durante o desenvolvimento, agilizando o ciclo de feedback.
| **Frontend (Mobile - Linguagem)** | TypeScript | Adiciona tipagem estática ao JavaScript, melhorando a manutenibilidade, detecção de erros em tempo de desenvolvimento e escalabilidade do código [1]. |
| **Frontend (Mobile - Estado/MVVM)** | Redux Toolkit | Centraliza o estado global da aplicação e gerencia a lógica de apresentação (ViewModel) de forma previsível, facilitando a implementação do padrão MVVM [5]. |
| **Frontend (Mobile - Estilização)** | Tailwind CSS (NativeWind) | Framework CSS utilitário que permite criar interfaces modernas e responsivas com alta produtividade e consistência visual. |
| **Frontend (Mobile - Navegação)** | React Navigation | Solução padrão e flexível para navegação em aplicativos React Native, suportando diferentes tipos de navegadores e integração com Deep Linking. |
| **Frontend (Mobile - Testes)** | Jest & React Native Testing Library | Jest para testes unitários e de integração, e React Native Testing Library para testes de componentes focados na experiência do usuário, garantindo a qualidade da interface. |
| **Backend (Aplicação)** | Node.js (NestJS) | Fornece uma estrutura modular e robusta para implementar a Clean Architecture e gerenciar as regras de negócio do sistema de forma escalável. |
| **Backend (Infraestrutura)** | Prisma ORM | Facilita a comunicação segura com o banco de dados, mapeando entidades TypeScript para o banco de dados e abstraindo consultas SQL complexas. |
| **Banco de Dados** | MySQL | Alternativa de banco de dados relacional amplamente utilizada, oferecendo flexibilidade e compatibilidade com diversas ferramentas e ambientes. |
| **Infraestrutura (Cloud)** | AWS ou Google Cloud | Provedores de nuvem líderes de mercado, oferecendo serviços de hospedagem escalável para a API, banco de dados e armazenamento de ativos de mídia [1]. |
| **Serviços (Segurança)** | Firebase Auth | Centraliza a autenticação e gestão de identidade dos usuários com suporte a diversos provedores (e-mail/senha, Google, etc.) [3]. |
| **Serviços (Acessibilidade)** | Expo Speech (TTS) | Biblioteca nativa para converter texto em fala, essencial para a proposta de inclusão digital e navegação assistida do projeto [6]. |
| **Serviços (Localização)** | Google Maps API | Provê serviços de geolocalização para busca de profissionais próximos, localização de lojas e cálculo de rotas [3]. |
| **Serviços (Mensageria)** | Twilio WhatsApp API | Habilita a comunicação direta e notificações automáticas via WhatsApp entre os usuários e o suporte, conforme os requisitos do projeto [2]. |
| **Qualidade (Testes)** | Jest & Supertest (Backend) | Jest para testes unitários e de integração no backend, e Supertest para testes de API, garantindo a robustez dos serviços. |
| **Gestão (Processos)** | GitHub Projects | Ferramenta para organização do backlog, sprints e acompanhamento visual do progresso do desenvolvimento ágil [1]. |
| **Gestão (Documentação)** | Notion | Central de conhecimento para registro de daily scrums, requisitos detalhados, guias de arquitetura e outras documentações [4]. |

---

## Referências

[1] [Plano de Trabalho - 1_plano-de-trabalho.md](https://github.com/jhonatan-gonzaga/projeto-pratico-es/blob/main/TP1/especificacao/1_plano-de-trabalho.md)
[2] [Design Thinking - 2_design-thinking.md](https://github.com/jhonatan-gonzaga/projeto-pratico-es/blob/main/TP1/especificacao/2_design-thinking.md)
[3] [Padrões Arquiteturais - 1-padroes-arquiteturais.md](https://github.com/jhonatan-gonzaga/projeto-pratico-es/blob/main/TP2/Conecta-Obra-Itacoatiara/projeto-e-arquitetura/1-padroes-arquiteturais.md)
[4] [README.md - TP1](https://github.com/jhonatan-gonzaga/projeto-pratico-es/blob/main/TP1/README.md)
[5] [Implementing Clean Architecture with MVVM and Redux Toolkit in React Native](https://medium.com/@mohamed.ma872/implementing-clean-architecture-with-mvvm-and-redux-toolkit-in-react-native-0aeff1b2014c)
[6] [Expo Speech Documentation](https://docs.expo.dev/versions/latest/sdk/speech/)
