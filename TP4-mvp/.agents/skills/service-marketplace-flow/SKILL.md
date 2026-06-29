
---

## name: service-marketplace-flow
description: Use esta skill quando a tarefa envolver o fluxo principal de um app marketplace de serviços, onde clientes contratam profissionais pelo perfil, clientes anunciam serviços, profissionais se candidatam a vagas, e profissionais podem aceitar ou recusar contratações diretas.

Você é especialista em regras de negócio para marketplace de serviços em aplicativo mobile.

O projeto é um app mobile onde existem dois perfis principais:

* Cliente
* Profissional

O app deve permitir dois fluxos principais de contratação:


1. Contratação direta pelo perfil do profissional.
2. Anúncio de serviço pelo cliente, com candidatura dos profissionais.

## Objetivo da skill

Sempre que o usuário pedir criação ou alteração de telas, backend, banco de dados, endpoints, DTOs, services ou regras de negócio relacionadas a contratação de profissionais, use este fluxo como referência obrigatória.

O app não deve funcionar apenas como tela visual. Ele deve ter fluxo real com banco de dados, API e estados de contratação.

## Fluxo 1: cliente contrata profissional pelo perfil

Neste fluxo, o cliente acessa o perfil público de um profissional e solicita uma contratação direta.

### Passos


1. Cliente acessa o perfil público do profissional.
2. Cliente clica em "Contratar", "Solicitar orçamento" ou ação semelhante.
3. Cliente informa os dados do serviço, como:
   * título ou tipo do serviço
   * descrição
   * endereço ou local
   * data desejada
   * observações
   * valor sugerido, se existir
4. O sistema cria uma solicitação de contratação direta.
5. O profissional recebe essa solicitação.
6. O profissional pode aceitar ou recusar.
7. Se aceitar, o serviço vira uma contratação ativa.
8. Se recusar, o cliente é informado e o pedido fica recusado.

### Regras

* O profissional não é obrigado a aceitar contratação direta.
* Enquanto o profissional não responde, o status deve ficar pendente.
* O cliente deve conseguir ver o status da solicitação.
* O profissional deve conseguir listar solicitações recebidas.
* A recusa deve mudar o status, não apagar o registro.
* Uma contratação aceita deve gerar ou ativar um serviço contratado.

## Fluxo 2: cliente anuncia um serviço

Neste fluxo, o cliente publica uma vaga/serviço e vários profissionais podem se candidatar.

### Passos


1. Cliente cria um anúncio de serviço.
2. O anúncio fica visível para profissionais compatíveis.
3. Profissionais podem visualizar os anúncios disponíveis.
4. Profissionais podem se candidatar ao anúncio.
5. O cliente visualiza os profissionais candidatos.
6. O cliente escolhe um profissional.
7. O sistema marca o profissional escolhido.
8. O serviço vira uma contratação ativa.
9. Os demais candidatos podem ficar como não selecionados.

### Regras

* Um anúncio pode receber várias candidaturas.
* Um profissional só pode se candidatar uma vez ao mesmo anúncio.
* O cliente escolhe apenas um profissional para executar o serviço.
* Depois que o cliente escolhe um profissional, o anúncio deve sair do estado aberto.
* O profissional escolhido deve ser notificado ou aparecer como selecionado.
* Candidaturas não escolhidas não devem ser apagadas; devem mudar de status.

## Fluxo 3: profissional recebe anúncios e se candidata

Neste fluxo, o profissional visualiza oportunidades disponíveis e se candidata.

### Passos


1. Profissional acessa a lista de anúncios de serviços.
2. Profissional abre os detalhes do anúncio.
3. Profissional clica em "Candidatar-se".
4. Profissional pode enviar:
   * proposta de valor
5. O sistema registra a candidatura.
6. O cliente passa a ver essa candidatura no anúncio.

### Regras

* Profissional não pode se candidatar duas vezes ao mesmo anúncio.
* Profissional não pode se candidatar a anúncio encerrado.
* Profissional deve conseguir acompanhar suas candidaturas.
* Profissional deve ver se foi selecionado, recusado ou se ainda está pendente.

## Status recomendados

Use enums ou constantes para controlar o fluxo.

### Status de anúncio de serviço

* ABERTO
* EM_ANALISE
* PROFISSIONAL_ESCOLHIDO
* EM_ANDAMENTO
* CONCLUIDO
* CANCELADO

### Status de candidatura

* PENDENTE
* SELECIONADA
* RECUSADA
* CANCELADA

### Status de solicitação direta

* PENDENTE
* ACEITA
* RECUSADA
* CANCELADA

### Status de contratação/serviço

* AGUARDANDO_ACEITE
* AGUARDANDO_INICIO
* EM_ANDAMENTO
* CONCLUIDO
* CANCELADO
* RECUSADO 

  \
  # Regras de autorização

Sempre verificar:

* Cliente só pode criar anúncio de serviço.
* Cliente só pode escolher profissional em anúncio criado por ele.
* Profissional só pode se candidatar a anúncio aberto.
* Profissional só pode aceitar ou recusar solicitação direta enviada para ele.
* Cliente só pode cancelar solicitação direta criada por ele.
* Usuário não pode alterar dados de outro perfil sem permissão.
* Admin pode ter permissões extras, se o projeto possuir admin.

## Integração com frontend mobile

Ao analisar telas do app mobile, mapear:

* Tela de perfil público do profissional
  * deve consumir GET /professionals/:id
  * botão Contratar deve criar POST /direct-hire-requests
* Tela de criar anúncio
  * deve criar POST /service-announcements
* Tela de anúncios disponíveis para profissional
  * deve consumir GET /service-announcements
* Tela de detalhes do anúncio
  * deve permitir POST /service-announcements/:id/applications
* Tela de candidaturas recebidas pelo cliente
  * deve consumir GET /service-announcements/:id/applications
  * deve permitir PATCH /applications/:id/select
* Tela de solicitações diretas recebidas pelo profissional
  * deve consumir GET /direct-hire-requests/me/professional
  * deve permitir aceitar ou recusar
* Tela de meus serviços/contratos
  * deve consumir GET /contracts/me/client ou GET /contracts/me/professional

## Ao implementar

Antes de alterar arquivos:


1. Identificar quais telas já existem.
2. Identificar quais dados estão mockados.
3. Identificar quais ações ainda não têm API.
4. Mapear tela → entidade → endpoint.
5. Planejar banco, backend e integração.

Ao codar:


1. Criar ou ajustar schema Prisma.
2. Criar DTOs.
3. Criar services.
4. Criar controllers.
5. Criar endpoints.
6. Atualizar services/api.ts no frontend.
7. Remover mocks quando a API estiver pronta.
8. Adicionar loading, error e empty state nas telas.

## O que não fazer

* Não transformar contratação direta em aceite automático.
* Não permitir profissional se candidatar várias vezes ao mesmo anúncio.
* Não apagar candidatura recusada; alterar status.
* Não deixar cliente escolher mais de um profissional no mesmo anúncio.
* Não permitir profissional aceitar solicitação que não foi enviada para ele.
* Não misturar regras de negócio dentro da tela mobile.
* Não colocar SQL direto no controller.
* Não usar Firebase neste projeto.
* Não salvar senha sem hash.
* Não colocar token ou segredo no frontend.

## Resultado esperado

Quando esta skill for usada, o Codex deve entregar ou implementar:

* Fluxo correto de contratação direta.
* Fluxo correto de anúncio e candidatura.
* Banco coerente com cliente, profissional, anúncios, candidaturas e contratos.
* Backend NestJS organizado em módulos, controllers, services e DTOs.
* API REST funcional.
* Frontend conectado à API.
* Estados claros para cada etapa do serviço.


