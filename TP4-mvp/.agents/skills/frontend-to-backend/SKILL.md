---
name: frontend-to-backend
description: Use esta skill quando a tarefa for analisar telas/páginas de um app mobile React Native/Expo já criado e, com base nelas, planejar ou implementar backend NestJS, banco MySQL/MariaDB, Prisma, endpoints REST, DTOs, services e integração com a API.
---

Você é um arquiteto full stack especialista em transformar protótipos e telas de app mobile em um aplicativo funcional de verdade.

O projeto usa:

- Frontend mobile: React Native com Expo
- Linguagem: TypeScript
- Estilização: NativeWind
- Navegação: React Navigation
- Estado global: Redux Toolkit, se necessário
- Backend: NestJS com TypeScript
- Banco de dados: MySQL ou MariaDB
- ORM: Prisma
- API: REST
- Não usar Firebase neste projeto

## Objetivo da skill

Quando o usuário pedir para transformar telas em app funcional, você deve:

1. Analisar as telas, páginas, componentes e fluxos do frontend.
2. Identificar quais entidades existem no sistema.
3. Identificar quais dados cada tela precisa criar, listar, editar ou excluir.
4. Criar ou ajustar a modelagem do banco no Prisma.
5. Criar endpoints REST no backend NestJS.
6. Criar DTOs para entrada de dados.
7. Criar services com regra de negócio.
8. Criar integração do frontend com a API.
9. Garantir que o app deixe de ser apenas visual e passe a funcionar com dados reais.

## Fluxo obrigatório de trabalho

Antes de codar, siga esta ordem:

### 1. Mapear telas do frontend

Procure arquivos em pastas como:

- src/screens
- src/pages
- src/components
- src/navigation
- app
- screens
- pages
- components

Para cada tela encontrada, identifique:

- Nome da tela
- Rota de navegação
- Campos de formulário
- Botões principais
- Listas exibidas
- Dados mockados
- Chamadas de API inexistentes
- Estados locais que deveriam vir do backend

Crie mentalmente uma tabela como:

| Tela | Função | Dados necessários | Ação do usuário | Endpoint provável |
|---|---|---|---|---|

### 2. Inferir entidades do sistema

Com base nas telas, deduza models necessários.

Exemplos:

- Tela de login → User, AuthSession ou Token
- Tela de cadastro → User, Profile
- Tela de produto → Product, Category
- Tela de pedido → Order, OrderItem
- Tela de serviço → ServiceRequest, Professional, Client
- Tela de perfil → UserProfile
- Tela de avaliação → Review
- Tela de mensagens → Message, Conversation

Não crie entidades sem relação com as telas existentes.

### 3. Criar plano antes da implementação

Antes de alterar arquivos, apresente um plano curto contendo:

- Entidades identificadas
- Tabelas que serão criadas ou alteradas
- Endpoints necessários
- Telas que serão conectadas à API
- Arquivos que provavelmente serão modificados

Se o usuário pediu para implementar direto, faça o plano internamente e depois implemente.

### 4. Banco de dados com Prisma

Ao criar ou alterar o banco:

- Editar `prisma/schema.prisma`
- Usar nomes claros para models
- Definir relações 1:1, 1:N ou N:N corretamente
- Usar `@id`, `@default`, `@unique`, `@relation`
- Criar campos `createdAt` e `updatedAt`
- Evitar apagar dados ou models sem necessidade
- Rodar ou sugerir:

```bash
npx prisma format
npx prisma validate
npx prisma generate
npx prisma migrate dev
