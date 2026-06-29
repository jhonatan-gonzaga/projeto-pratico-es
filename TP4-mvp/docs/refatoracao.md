# Refatoração — Backend (TP4-mvp/backend)

Refatoração realizada um arquivo por vez nos services do backend NestJS, com validação de compilação (`tsc --noEmit`) ao final.

## 1. Duplicação do include de contrato entre 3 services

**Arquivos afetados:** `src/modules/contracts/contracts.service.ts`, `src/modules/applications/applications.service.ts`, `src/modules/direct-requests/direct-requests.service.ts` (novo arquivo criado: `src/modules/contracts/contract-include.ts`)

### Problema identificado
O objeto Prisma `include` usado para montar a resposta completa de um `Contract` (cliente, profissional, anúncio, candidatura, solicitação direta, histórico de status, conversas e avaliação) estava copiado literalmente em três arquivos diferentes. Em `contracts.service.ts` havia uma versão completa; em `applications.service.ts` (método `accept`) e `direct-requests.service.ts` (método `accept`) havia cópias quase idênticas, mas levemente divergentes (sem `statusHistory` e sem paginação/ordenação das mensagens da conversa).

### Descrição da melhoria
Foi extraída uma única constante `contractInclude` para o novo arquivo `src/modules/contracts/contract-include.ts`, importada pelos três services. As cópias divergentes em `applications.service.ts` e `direct-requests.service.ts` foram substituídas pela mesma constante, padronizando o formato de retorno de um contrato em toda a API.

### Motivação da refatoração
Três cópias do mesmo objeto significam três pontos para atualizar sempre que o formato de retorno de um contrato mudar (ex.: incluir um novo campo da fatura). Isso é uma fonte recorrente de bugs por divergência silenciosa — como já havia ocorrido aqui, onde duas das três cópias estavam desatualizadas em relação à versão "canônica".

### Impacto no sistema
- Endpoints que retornam um contrato completo (criação de contrato via candidatura aceita, via solicitação direta aceita, ou consulta direta) agora retornam exatamente o mesmo formato, incluindo `statusHistory` e a última mensagem ordenada de cada conversa — informação que antes faltava nas respostas de `applications.service.ts` e `direct-requests.service.ts`.
- Qualquer alteração futura no formato de retorno de um contrato passa a ser feita em um único lugar.
- Nenhuma mudança de comportamento para os consumidores existentes além do enriquecimento dos dois endpoints citados.

---

## 2. Verificação repetida de dono da avaliação (review)

**Arquivo afetado:** `src/modules/contracts/contracts.service.ts`

### Problema identificado
Os métodos `replyReview` e `reportReview` repetiam o mesmo bloco de código: buscar a `Review` pelo id incluindo o profissional, lançar `NotFoundException` se não existir, e lançar `ForbiddenException` se o usuário autenticado não for o profissional avaliado — alterando apenas a mensagem de erro.

### Descrição da melhoria
O bloco comum foi extraído para o método privado `getOwnReview(userId, id, forbiddenMessage)`, que centraliza a busca e as duas validações, recebendo a mensagem de erro específica de cada caso de uso como parâmetro.

### Motivação da refatoração
Lógica de autorização duplicada é particularmente arriscada: se uma regra de negócio mudar (por exemplo, permitir que um admin também responda/reporte), só um dos dois lugares poderia ser atualizado por engano, criando uma inconsistência de segurança entre as duas rotas.

### Impacto no sistema
- Nenhuma mudança no comportamento observável dos endpoints `replyReview` e `reportReview`.
- Reduz a chance de uma regra de autorização ser corrigida em um método e esquecida no outro.

---

## 3. Recriação do mapa de transições de status a cada chamada

**Arquivo afetado:** `src/modules/contracts/contracts.service.ts`

### Problema identificado
O método `assertStatusTransition` reconstruía o objeto `allowed` (mapa de transições válidas de `ContractStatus`) a cada chamada, dentro do corpo do método de instância.

### Descrição da melhoria
O mapa foi movido para uma constante de módulo `allowedStatusTransitions`, definida uma única vez fora da classe.

### Motivação da refatoração
O mapa é estático — não depende de nenhum parâmetro do método nem de estado da instância — então recriá-lo em toda chamada é trabalho redundante e também deixa a regra de negócio (quais transições de status são permitidas) menos visível, escondida no meio de um método em vez de ficar no topo do arquivo como uma regra de domínio nomeada.

### Impacto no sistema
- Nenhuma mudança de comportamento.
- Pequena melhoria de performance (evita realocar o objeto em toda atualização de status de contrato).
- Regra de transições de status fica mais fácil de localizar e revisar isoladamente.

---

## 4. Duplicação do include de avaliações no perfil profissional

**Arquivo afetado:** `src/modules/professionals/professionals.service.ts`

### Problema identificado
Os métodos `findOne` (consulta pública de um profissional) e `findMe` (perfil do profissional autenticado) montavam o mesmo include estendido — `professionalInclude` mais a lista de `reviews` com o cliente e usuário relacionados — repetindo o mesmo bloco de objeto duas vezes.

### Descrição da melhoria
Foi criada a constante `professionalWithReviewsInclude`, que estende `professionalInclude` com o bloco de `reviews`, e os dois métodos passaram a usá-la diretamente.

### Motivação da refatoração
Mesmo princípio dos itens anteriores: duas cópias do mesmo include tendem a divergir silenciosamente ao longo do tempo (por exemplo, alguém adiciona um campo em um dos dois lugares e esquece o outro), gerando inconsistência entre o que o profissional vê do próprio perfil e o que o cliente vê ao consultar esse profissional.

### Impacto no sistema
- Nenhuma mudança de comportamento observável.
- Garante que o perfil público e o perfil "meu perfil" do profissional sempre retornem o mesmo formato de avaliações.

---

## Validação (backend)

Após cada alteração, o projeto foi validado com:

```bash
npx prisma generate
npx tsc --noEmit -p tsconfig.json
```

Resultado: compilação limpa, sem erros de tipo, confirmando que as substituições de includes e a extração dos métodos auxiliares preservaram a tipagem e o comportamento esperado pelo Prisma Client.

---

## 5. Duplicação do handler de upload de foto entre telas de projeto (front-end)

**Arquivos afetados:** `front-end/src/pages/profissional/adicionar-projeto.tsx`, `front-end/src/pages/profissional/editar-projeto.tsx` (novo arquivo criado: `front-end/src/services/use-project-image-upload.ts`)

### Problema identificado
As telas `AddProjectScreen` (criar projeto) e `EditProjectScreen` (editar projeto) tinham a função `handlePickImage` copiada de forma byte-a-byte idêntica, junto com os três estados que ela manipula (`isUploadingImage`, `uploadError` e a atualização de `images`). A função chama `pickAndUploadImage()`, trata o resultado adicionando a nova imagem à lista (marcando como `COVER` se for a primeira), abre a tela de detalhes da foto, e trata erro de upload convertendo para uma mensagem amigável — tudo replicado nos dois arquivos.

### Descrição da melhoria
Foi criado o hook `useProjectImageUpload(images, setImages, onImageAdded)` em `front-end/src/services/use-project-image-upload.ts`, que encapsula os estados `isUploadingImage`/`uploadError` e a lógica de `handlePickImage`. As duas telas passaram a chamar esse hook, ficando responsáveis apenas por decidir o que fazer quando uma imagem é adicionada (abrir a tela de detalhes da foto), via callback `onImageAdded`.

### Motivação da refatoração
Upload de imagem é um fluxo sensível a erros (permissão de galeria negada, falha de rede, etc.) e ter a mesma lógica de tratamento de erro duplicada em duas telas significa que uma correção de bug (por exemplo, uma mensagem de erro mais específica, ou um retry) precisaria ser replicada manualmente nos dois lugares — exatamente o tipo de duplicação que gera comportamento divergente ao longo do tempo entre "criar projeto" e "editar projeto".

### Impacto no sistema
- Nenhuma mudança de comportamento observável pelo usuário: as duas telas continuam funcionando exatamente como antes (mesmos estados de loading, mesma mensagem de erro, mesmo fluxo para a tela de detalhes da foto).
- Qualquer melhoria futura no fluxo de upload de foto de projeto (nova validação, retry, mensagem de erro mais específica) passa a ser feita em um único lugar e vale automaticamente para as duas telas.
- Validado com `tsc --noEmit`: nenhum novo erro de tipo introduzido nos arquivos alterados (os 5 erros de módulo pré-existentes no projeto — `expo-image-picker`, `expo-av`, `@react-native-community/datetimepicker` — são causados por dependências nativas não instaladas em `node_modules` e não têm relação com esta refatoração).
