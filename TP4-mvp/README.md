# README - TP4-mvp: Conecta Obras

## Sumário
1.  [Visão Geral](#1-visão-geral)
2.  [Estrutura do Projeto](#2-estrutura-do-projeto)
    *   [Backend](#backend)
    *   [Frontend](#frontend)
    *   [Documentação](#documentação)
    *   [Prints](#prints)
    *   [Vídeos](#vídeos)
3.  [Backend](#3-backend)
    *   [Tecnologias](#tecnologias)
    *   [Scripts](#scripts)
    *   [Dependências](#dependências)
4.  [Frontend](#4-frontend)
    *   [Tecnologias](#tecnologias-1)
    *   [Scripts](#scripts-1)
    *   [Dependências](#dependências-1)
5.  [Documentação](#5-documentação)
6.  [Banco de Dados (Prisma Schema)](#6-banco-de-dados-prisma-schema)
7.  [Rastreabilidade](#7-rastreabilidade)
8.  [Ferramentas de IA Utilizadas](#8-ferramentas-de-ia-utilizadas)

## 1. Visão Geral
Este diretório, `TP4-mvp`, contém o Minimum Viable Product (MVP) do projeto **Conecta Obras**. O Conecta Obras é uma plataforma que visa conectar clientes que necessitam de serviços de construção e reforma com profissionais qualificados. O MVP inclui tanto o backend da aplicação (API REST) quanto o frontend (aplicativo móvel).

## 2. Estrutura do Projeto
A pasta `TP4-mvp` está organizada em subdiretórios principais:

*   `backend`: Contém a implementação da API REST utilizando NestJS.
*   `front-end`: Contém o aplicativo móvel desenvolvido com Expo e React Native.
*   `docs`: Armazena a documentação do projeto, incluindo termos de uso, política de privacidade e documentos de rastreabilidade.
*   `prints`: Contém capturas de tela e outros materiais visuais do projeto.
*   `video`: Contém vídeos de demonstração do MVP.

### Backend
O diretório `backend` é a base da API REST do Conecta Obras. Ele gerencia a lógica de negócios, a interação com o banco de dados e a autenticação de usuários.

### Frontend
O diretório `front-end` abriga o código-fonte do aplicativo móvel. Este aplicativo permite que clientes e profissionais interajam com a plataforma, solicitando e oferecendo serviços, respectivamente.

### Documentação
A pasta `docs` contém informações cruciais sobre o projeto, incluindo detalhes sobre os requisitos, políticas e rastreabilidade das funcionalidades.

### Prints
A pasta `prints` contém arquivos Markdown que descrevem e exibem capturas de tela de funcionalidades específicas do aplicativo, como telas de cadastro e login.

### Vídeos
A pasta `video` contém arquivos Markdown que podem referenciar vídeos de demonstração do MVP, como o `demonstracao-mvp.md`.

## 3. Backend

### Tecnologias
O backend foi desenvolvido utilizando as seguintes tecnologias:

*   **NestJS**: Um framework progressivo Node.js para a construção de aplicações do lado do servidor eficientes e escaláveis.
*   **Prisma**: Um ORM (Object-Relational Mapper) de nova geração para Node.js e TypeScript, utilizado para interação com o banco de dados.
*   **MySQL**: O sistema de gerenciamento de banco de dados relacional utilizado para armazenar os dados da aplicação.

### Scripts
Os principais scripts disponíveis no `package.json` do backend são:

*   `build`: Compila o projeto NestJS.
*   `start`: Inicia a aplicação em modo de produção.
*   `start:dev`: Inicia a aplicação em modo de desenvolvimento com `watch`.
*   `prisma:generate`: Gera o cliente Prisma com base no `schema.prisma`.
*   `prisma:migrate`: Executa migrações do banco de dados com Prisma.
*   `prisma:studio`: Inicia o Prisma Studio para visualização e gerenciamento do banco de dados.
*   `seed:categories`: Popula o banco de dados com categorias iniciais.
*   `typecheck`: Verifica erros de tipo com TypeScript.

### Dependências
As principais dependências incluem `@nestjs/common`, `@nestjs/config`, `@nestjs/core`, `@nestjs/jwt`, `@nestjs/platform-express`, `@prisma/client`, `bcrypt`, `class-transformer`, `class-validator`, `reflect-metadata`, e `rxjs`.

## 4. Frontend

### Tecnologias
O frontend foi desenvolvido utilizando as seguintes tecnologias:

*   **Expo**: Um framework e plataforma para aplicativos React Native universais.
*   **React Native**: Um framework para construir aplicativos móveis nativos usando React.
*   **NativeWind**: Uma biblioteca que permite usar classes do Tailwind CSS em componentes React Native.
*   **TailwindCSS**: Um framework CSS utilitário para estilização rápida e responsiva.

### Scripts
Os principais scripts disponíveis no `package.json` do frontend são:

*   `start`: Inicia o servidor de desenvolvimento do Expo.
*   `android`: Inicia o aplicativo no emulador ou dispositivo Android.
*   `ios`: Inicia o aplicativo no simulador ou dispositivo iOS.
*   `web`: Inicia o aplicativo no navegador web.
*   `test`: Executa os testes unitários e de integração.
*   `typecheck`: Verifica erros de tipo com TypeScript.

### Dependências
As principais dependências incluem `@expo/vector-icons`, `@react-native-community/datetimepicker`, `expo`, `expo-av`, `expo-image-picker`, `expo-linear-gradient`, `expo-status-bar`, `nativewind`, `react`, `react-dom`, `react-native`, `react-native-reanimated`, `react-native-safe-area-context`, e `react-native-web`.

## 5. Documentação
A pasta `docs` contém os seguintes documentos:

*   `Termos de Uso e Política de Privacidade/Politica_de_Privacidade_Conecta_Obra_Itacoatiara.md`: Detalhes da política de privacidade da aplicação.
*   `Termos de Uso e Política de Privacidade/Termos_de_Uso_Conecta_Obra_Itacoatiara.md`: Os termos de uso da plataforma.
*   `rastreabilidade-cliente.md`: Documento de rastreabilidade focado nas funcionalidades e telas relacionadas à persona Cliente.
*   `rastreabilidade-profissional.md`: Documento de rastreabilidade focado nas funcionalidades e telas relacionadas à persona Profissional.
*   `rastreabilidade-resumo.md`: Um resumo da rastreabilidade, mapeando telas e User Stories (US) para ambas as personas.
*   `refatoracao.md`: Documento detalhando o processo de refatoração do código.

## 6. Banco de Dados (Prisma Schema)
O arquivo `prisma/schema.prisma` define o esquema do banco de dados, incluindo as seguintes entidades principais:

*   **User**: Informações básicas do usuário, incluindo autenticação.
*   **ClientProfile**: Perfil específico para clientes.
*   **ProfessionalProfile**: Perfil específico para profissionais, com detalhes como especialidades e portfólio.
*   **Application**: Representa a candidatura de um profissional a um pedido de serviço.
*   **DirectRequest**: Pedidos diretos de clientes a profissionais.
*   **Contract**: Contratos de serviço entre clientes e profissionais.
*   **ContractStatusHistory**: Histórico de mudanças de status de um contrato.
*   **PortfolioProject**: Projetos realizados por profissionais, parte do portfólio.
*   **PortfolioProjectImage**: Imagens associadas aos projetos do portfólio.
*   **Review**: Avaliações e comentários de clientes sobre serviços de profissionais.
*   **Conversation**: Conversas entre clientes e profissionais.
*   **Message**: Mensagens individuais dentro de uma conversa.
*   **Notification**: Notificações enviadas aos usuários.
*   **DeviceToken**: Tokens de dispositivo para notificações push.

## 7. Rastreabilidade
Os documentos de rastreabilidade (`rastreabilidade-cliente.md`, `rastreabilidade-profissional.md`, `rastreabilidade-resumo.md`) são cruciais para entender a ligação entre os requisitos do projeto (User Stories) e as telas implementadas no frontend. Eles fornecem um mapeamento detalhado das funcionalidades para cada persona, garantindo que todas as necessidades foram abordadas no MVP.

## 8. Ferramentas de IA Utilizadas
Durante o desenvolvimento e organização deste projeto, as seguintes ferramentas de Inteligência Artificial foram utilizadas:

*   **Frontend**: Codex e Figma Maker
*   **Backend e Banco de Dados**: Codex
*   **Organização do Repositório**: Manus
