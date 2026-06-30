# Refatorações Realizadas

## Refatoração 1 — Extração de expressão repetida para variável nomeada

**Arquivo:** `backend/src/modules/conversations/conversations.service.ts`

**Problema identificado:**
A expressão `(dto.text ?? '')` aparecia três vezes dentro do mesmo bloco ternário, tornando o código redundante e mais difícil de ler.

**Motivação da refatoração:**
Expressões idênticas repetidas várias vezes em sequência dificultam a manutenção: qualquer alteração na expressão precisaria ser replicada em todos os pontos. Além disso, a repetição visualmente polui o trecho de código.

**Descrição da melhoria:**
Extração da expressão para a variável `messageText` antes do bloco `$transaction`. Os três usos de `(dto.text ?? '')` foram substituídos pela variável, tornando o ternário mais legível:

```typescript
// Antes
body:
  dto.type === MessageType.AUDIO
    ? 'Mensagem de audio'
    : (dto.text ?? '').length > 120
      ? `${(dto.text ?? '').slice(0, 117)}...`
      : (dto.text ?? ''),

// Depois
const messageText = dto.text ?? '';
body:
  dto.type === MessageType.AUDIO
    ? 'Mensagem de audio'
    : messageText.length > 120
      ? `${messageText.slice(0, 117)}...`
      : messageText,
```

**Impacto no sistema:**
Nenhum impacto funcional. O comportamento em tempo de execução é idêntico. O código fica mais fácil de ler e de modificar caso a lógica de truncamento mude no futuro.

---

## Refatoração 2 — Extração de método privado para eliminar validação duplicada

**Arquivo:** `backend/src/modules/contracts/contracts.service.ts`

**Problema identificado:**
Os métodos `replyReview` e `reportReview` continham exatamente o mesmo par de verificações: busca da avaliação no banco, checagem de existência e checagem de propriedade pelo profissional. O bloco duplicado somava 12 linhas repetidas.

**Motivação da refatoração:**
Código duplicado aumenta o risco de inconsistências: uma correção de bug ou mudança de mensagem de erro precisaria ser feita em dois lugares separados. A duplicação também mascara o fato de que ambos os métodos compartilham a mesma regra de acesso.

**Descrição da melhoria:**
Extração das verificações para o método privado `getOwnReview(userId, id)`. Ambos os métodos agora chamam esse helper, que centraliza a busca e os dois `if`s de guarda:

```typescript
// Antes (repetido em dois métodos)
const review = await this.prisma.review.findUnique({ where: { id }, include: { professional: true } });
if (!review) { throw new NotFoundException('Avaliacao nao encontrada.'); }
if (review.professional.userId !== userId) { throw new ForbiddenException('...'); }

// Depois
private async getOwnReview(userId: string, id: string) {
  const review = await this.prisma.review.findUnique({ ... });
  if (!review) { throw new NotFoundException('Avaliacao nao encontrada.'); }
  if (review.professional.userId !== userId) { throw new ForbiddenException('...'); }
  return review;
}
```

**Impacto no sistema:**
Nenhum impacto funcional. A lógica de autorização é idêntica, agora centralizada. Futuras alterações na regra de acesso a avaliações precisam ser feitas em um único lugar.

---

## Refatoração 3 — Renomeação de variável para nome mais descritivo

**Arquivo:** `front-end/src/pages/profissional/cadastrar-profissional.tsx`

**Problema identificado:**
A variável `dayMap` não descrevia adequadamente sua finalidade. Ela mapeia IDs locais de dias da semana (S, T, Q1, Q2, Sx, Sa, D) para os valores do enum `DayOfWeek` da API (MONDAY, TUESDAY, etc.). O nome `dayMap` é genérico demais — qualquer dicionário de dias poderia se chamar assim.

**Motivação da refatoração:**
Nomes de variáveis vagos forçam o leitor a inspecionar o valor para entender o propósito. Um nome que expressa o mapeamento diretamente elimina esse esforço cognitivo.

**Descrição da melhoria:**
Renomeação de `dayMap` para `dayIdToWeekday`, tornando explícito que o mapa converte IDs locais de dias para os valores do enum `DayOfWeek`:

```typescript
// Antes
const dayMap: Record<string, string> = { S: "MONDAY", ... };
availability: availableDays.map((day) => ({ dayOfWeek: dayMap[day], ... })),

// Depois
const dayIdToWeekday: Record<string, string> = { S: "MONDAY", ... };
availability: availableDays.map((day) => ({ dayOfWeek: dayIdToWeekday[day], ... })),
```

**Impacto no sistema:**
Nenhum impacto funcional. A renomeação é puramente local ao escopo da função `handleSave`.

---

## Refatoração 4 — Remoção de estado redundante

**Arquivo:** `front-end/src/pages/profissional/cadastrar-profissional.tsx`

**Problema identificado:**
O estado `hasProfilePhoto` era sempre atualizado para `true` ao mesmo tempo que `profilePhotoUrl` recebia uma URL. Isso significa que `hasProfilePhoto === true` era equivalente a `profilePhotoUrl !== null`. O terceiro ramo do ternário que usava `hasProfilePhoto` (para exibir as iniciais "JN") era inalcançável: só seria exibido quando `profilePhotoUrl` fosse nulo e `hasProfilePhoto` fosse verdadeiro, situação que não ocorre no fluxo real.

**Motivação da refatoração:**
Estado redundante aumenta a superfície de possíveis bugs (os dois precisam ser mantidos em sincronia manualmente) e introduz um ramo morto de código que confunde o leitor.

**Descrição da melhoria:**
Remoção do estado `hasProfilePhoto` e do `setHasProfilePhoto(true)`. O ternário de três ramos foi simplificado para dois ramos, usando apenas `profilePhotoUrl`:

```tsx
// Antes
const [hasProfilePhoto, setHasProfilePhoto] = useState(false);
// ...
{profilePhotoUrl ? <Image .../> : hasProfilePhoto ? <Text>JN</Text> : <Ionicons .../>}

// Depois
{profilePhotoUrl ? <Image .../> : <Ionicons .../>}
```

**Impacto no sistema:**
Nenhum impacto visual ou funcional perceptível pelo usuário. O ramo removido (`<Text>JN</Text>`) nunca era exibido na prática. O componente fica com menos estado para gerenciar.

---

## Refatoração 5 — Fusão de dois `if`s com condição base idêntica

**Arquivo:** `front-end/src/pages/profissional/area-profissional.tsx`

**Problema identificado:**
Dois `if`s consecutivos verificavam a mesma condição base (`activeArea === "opportunities" && selectedService`) antes de checar `serviceView`. A condição comum era duplicada, tornando o código mais longo sem ganho de clareza.

**Motivação da refatoração:**
Repetir a mesma guarda em dois `if`s separados faz o leitor checar mentalmente se as condições são idênticas. Unificá-las em um único bloco torna a intenção imediata: "se estou na área de oportunidades com um serviço selecionado, decido qual tela mostrar pelo valor de `serviceView`."

**Descrição da melhoria:**
Os dois `if`s foram fundidos em um único bloco externo com o `if (serviceView === "details")` interno:

```tsx
// Antes
if (activeArea === "opportunities" && selectedService && serviceView === "details") {
  return <ServiceDetailsScreen .../>;
}
if (activeArea === "opportunities" && selectedService && serviceView === "message") {
  return <ServiceMessageScreen .../>;
}

// Depois
if (activeArea === "opportunities" && selectedService && serviceView) {
  if (serviceView === "details") {
    return <ServiceDetailsScreen .../>;
  }
  return <ServiceMessageScreen .../>;
}
```

**Impacto no sistema:**
Nenhum impacto funcional. O comportamento é idêntico: `serviceView` só assume `"details"` ou `"message"` (ou `null`), então a guarda `serviceView` (truthy) cobre exatamente os mesmos casos dos dois `if`s anteriores combinados.
