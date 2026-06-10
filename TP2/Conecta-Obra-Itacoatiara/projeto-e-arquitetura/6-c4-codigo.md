# Diagrama de Classes do Profissional

<img width="1946" height="1239" alt="diagrama de class2" src="https://github.com/user-attachments/assets/7e0c4c12-f4d2-4db6-89d1-cded8e806154" />


Este documento fornece uma explicação técnica e funcional de cada classe e fluxo presente no diagrama de classes do **Painel do Profissional**, correlacionando-os com os itens de rastreabilidade definidos no projeto.

---

## 1. Descrição das Classes

### 1.1. Classe `User` (Base)
A classe base que define a identidade comum a todos os usuários da plataforma.
- **Atributos**: Gerencia informações básicas como `id`, `name`, `phoneNumber`, `email` e o provedor de autenticação (`authProvider`).
- **Métodos**: Foca em autenticação (`login`, `logout`, `validateVerificationCode`) e manutenção de dados básicos.

### 1.2. Classe `Professional`
Uma especialização da classe `User`, contendo atributos específicos para quem presta serviços.
- **Atributos**: Inclui `category` (ex: eletricista, pedreiro), `description`, `rating` (nota média) e `notificationsEnabled`.
- **Métodos**: Gerencia o ciclo de vida do profissional, como `createProfile`, `acceptOffer`, `sendCounterProposal` e `finalizeService`.

### 1.3. Classe `Portfolio`
Responsável por armazenar o histórico visual e descritivo do profissional.
- **Atributos**: Lista de fotos (`photos`), categoria e descrição dos trabalhos.
- **Métodos**: Permite a manutenção do portfólio através de `addPhoto`, `removePhoto` e `updateProfile`.

### 1.4. Classe `Notification`
Sistema de alertas para o usuário.
- **Atributos**: `title`, `content` e status de leitura (`read`).
- **Métodos**: `send()` para disparar o alerta e `markAsRead()` para controle do usuário.

### 1.5. Classes `Review` e `RatingService`
Gerenciam o feedback dos clientes.
- **Review**: Armazena a nota (`score`) e o comentário (`comment`) de um serviço específico.
- **RatingService**: Serviço auxiliar para calcular a média de avaliações (`calculateAverage`) do profissional.

### 1.6. Classes `Proposal` e `ProposalService`
Coração da negociação entre profissional e cliente.
- **Proposal**: Representa uma oferta financeira e técnica, com `proposedValue`, `message` e um `status` (PENDING, ACCEPTED, etc.).
- **ProposalService**: Orquestra a criação, aceitação, rejeição e cancelamento de propostas.

### 1.7. Classe `ServiceOffer`
Representa a vaga ou serviço publicado pelo cliente.
- **Atributos**: `title`, `description`, `value` e o status atual (`ServiceStatus`).
- **Relacionamento**: Agrega múltiplas propostas e candidatos.

### 1.8. Módulo de Chat (`ChatService`, `Chat`, `Message`)
Infraestrutura de comunicação em tempo real.
- **Chat**: Instância de conversa entre dois usuários.
- **Message**: Unidade de informação enviada, com conteúdo e timestamp.
- **ChatService**: Gerencia o envio de mensagens e notificações de novas mensagens.

---

## 2. Explicação dos Fluxos (Referência: Rastreabilidade Item 4)

Abaixo, os fluxos do diagrama são explicados conforme os requisitos do **Painel do Profissional**:

### 4.1 Notificações de Vagas
Quando uma nova `ServiceOffer` é criada e é compatível com a categoria do `Professional`, o sistema utiliza a classe `Notification` para disparar um alerta. O método `send()` da `Notification` é invocado, permitindo que o profissional visualize a oportunidade no seu painel.

### 4.2 Chat de Conversas
Este fluxo ocorre através da associação entre `ServiceOffer` e `ChatService`. Ao iniciar uma negociação, um `Chat` é criado. O `ChatService` orquestra o envio de `Message` entre o Cliente e o Profissional, garantindo que ambos recebam notificações de novas mensagens e possam alinhar detalhes do serviço.

### 4.3 Gestão de Propostas
O `Professional` utiliza o `ProposalService` para interagir com uma `ServiceOffer`. 
1. O profissional visualiza a vaga (`ServiceOffer`).
2. Ele cria uma `Proposal` com seu valor e mensagem.
3. O status da proposta é controlado pelo enum `ProposalStatus`.
4. O profissional pode enviar contrapropostas ou cancelar sua candidatura através dos métodos do `ProposalService`.

### 4.4 Portfólio Digital
Este fluxo envolve a classe `Professional` e sua composição com a classe `Portfolio`. O profissional utiliza métodos como `editProfile` e `uploadPortfolioPhoto` (via `ProfileService`) para manter seu `Portfolio` atualizado, o que é essencial para atrair novos clientes e validar sua experiência.

### 4.5 Conclusão de Serviços
Após a execução do trabalho, o `Professional` aciona o método `finalizeService()`. Isso altera o status da `ServiceOffer` para `CONCLUIDO` (via enum `ServiceStatus`). Esse gatilho permite que o sistema libere o fluxo de avaliação (`Review`), onde o cliente poderá dar uma nota que será processada pelo `RatingService` para atualizar o perfil do profissional.
