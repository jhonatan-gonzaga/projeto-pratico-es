# 1. Descrição do padrão arquitetural
Esta seção visa descrever os padrões arquiteturais escolhidos, explicando seus conceitos fundamentais e como eles se complementam para estruturar o sistema. Assim, será explicado a arquitetura limpa (clean arquiteture), a arquitetura Model-View-ViewModel e, finalmente, a combinação de ambas para formar a arquitetura que será usada no aplicativo Conecta Obra Itacoatiara.

## 1.1 Arquitetura Limpa
A arquitetura limpa, ou clean arquitecture, é organizada, à princípio, como na figura 1. Porém, apesar da arquitetura ser a mesma, geralmente os projetos optam por uma abstração um pouco maior, representada na figura 2. Um dos exemplos é o [Android](https://developer.android.com/topic/architecture?hl=pt-br). Assim, temos três componentes: Apresentação, Domínio e Data.

<img width="720"  alt="image" src="https://github.com/user-attachments/assets/5bd34486-4ea8-40ab-85ea-5bf1f9bcc212" />

Figura 1 - Representação visual da clean architecture. Fonte: Túlio, Marco. Engenharia de Software Moderna.


<img width="720"  alt="image" src="https://github.com/user-attachments/assets/683a8814-14ee-495d-941d-64ea9148beab" />

Figura 2 - Representação visual da abstração da clean architecture. Fonte: [(Medium, 2024)](https://medium.com/@DrunknCode/clean-architecture-simplified-and-in-depth-guide-026333c54454).

### 1.1.1 Apresentação
Apresentação, como o próprio nome já indica, é responsável por gerenciar o que o usuário vê, ou seja, os dados do aplicativo na tela. Assim, para qualquer mudança de estado, como o pressionar de um botão, tal componente precisa atualizar o que está sendo exibido, de acordo com os dados que possui.

### 1.1.2 Domínio
Domínio, ou Domain, é o ponto de intermediação entre a Apresentação e a Data. Nela, temos as regras de negócios puras de todas as personas/entidades [(Dev, 2025)](https://dev.to/yuripeixinho/clean-architecture-arquitetura-limpa-33e1). Assim, caso os dados ou as requisições não estejam de acordo com a regra de negócio estipulada, o fluxo é parado.

### 1.1.3 Data
Nesta camada é contido os dados do aplicativo em si e a lógica de negócios, ao contrário da camada de apresentação, onde há dados e lógica de interface [(Android, 2026)](https://developer.android.com/topic/architecture/data-layer?hl=pt-br). Assim, ela que cuida de todos os dados e lógica como o banco de dados, ou APIs.

## 1.2 Arquitetura Model-View-ViewModel
A arquitetura MVVM (Model-View-ViewModel) é separada em três componentes: Model, View e View-Model. Segundo [Cem, Onur (2023)](https://medium.com/@onurcem.isik/introduction-to-mvvm-architecture-5c5558c3679), o componente "exibição" (view) cuida da representação visual do aplicativo ou site ao usuário, enquanto que o "modelo" (model) representa os dados. O componente View-Model age como uma ponte entre os dois componentes. A figura 1 é uma representação visual do fluxo da arquitetura.


<img width="832" height="191" alt="image" src="https://github.com/user-attachments/assets/8e8e4de0-dcf8-4c3c-95c9-dd18ba05719c" />

Figura 3 - Representação visual no modelo MVVM. Fonte: [Microsoft (2024)](https://learn.microsoft.com/pt-br/dotnet/architecture/maui/mvvm).

### 1.2.1 View
Segundo [Microsoft (2024)](https://learn.microsoft.com/pt-br/dotnet/architecture/maui/mvvm), "a exibição é responsável por definir a estrutura, o layout e a aparência do que o usuário vê na tela". Porém, quem realmente vai dizer o que deverá ser colocado na página ou no aplicativo será o View-Model.

### 1.2.2 View-Model
Também chamado de modelo de exibição. Segundo [Microsoft (2024)](https://learn.microsoft.com/pt-br/dotnet/architecture/maui/mvvm), "O modelo de exibição implementa propriedades e comandos aos quais a exibição pode associar dados e notifica a exibição de quaisquer alterações de estado por meio de eventos de notificação de alteração". Ou seja, qualquer alteração de estado, como o clicar de um botão ou o scrollar de um página, o View-Model notifica a visualização, ou view, que, por sua vez, altera de acordo com os dados disponíveis o layout e os componentes apresentados para o usuário.

### 1.2.3 Model
Model fica responsável pelos dados e como estes serão transferidos para o view-model, que será passado para o view. Ele é comparável com o componente "data" na arquitetura limpa, porém, neste caso, ele também assumiria o papel de "domínio". Segundo [Microsoft (2024)](https://learn.microsoft.com/pt-br/dotnet/architecture/maui/mvvm), o modelo "encapsula a lógica de negócios e os dados do aplicativo".

<div>
  <img width="16384" height="7389" alt="arquitetura drawio (3)" src="https://github.com/user-attachments/assets/cdbf25c9-4dde-4438-a401-8839ce20f814" />
  <p>Figura X: Diagrama de Arquitetura do Conecta Obra Itacoatiara integrando os padrões Clean Architecture e MVVM.</p>
</div>

## Descrição da Arquitetura do Sistema
A arquitetura do projeto Conecta Obra Itacoatiara foi concebida utilizando a integração dos padrões MVVM (Model-View-ViewModel) e Clean Architecture, conforme ilustrado na Figura X. Essa abordagem garante a separação de interesses, facilitando a manutenção e a escalabilidade do software ao isolar as regras de negócio de detalhes técnicos e de interface.

### 1. Camada de Apresentação (MVVM)
Localizada à esquerda no diagrama, esta camada é responsável pela interação direta com o usuário.

- View: Representa os componentes de interface (UI). Ela é passiva e reage aos Estados de UI emitidos pelo ViewModel para exibir informações ao usuário.
- ViewModel: Atua como mediador. Ele recebe os Eventos de UI (intencionalidade do usuário), processa a lógica de apresentação e invoca os casos de uso do Domínio através da Chamada de Casos de Uso (Execute).

### 2. Camada de Domínio (Domain)
O núcleo central da aplicação contém as Regras de Negócio (RN) específicas para cada persona do ecossistema: Cliente, Profissional, Lojista e Suporte.
- Esta camada é pura e independente de frameworks externos.
- Ela processa as requisições e retorna Entidades (Entities) para a camada de apresentação, garantindo que os dados trafegados sejam objetos de negócio limpos.

### 3. Camada de Dados (Data)
Responsável pela infraestrutura e comunicação externa.
- Serviços Externos: Gerencia integrações com Firebase/Auth (autenticação), APIs de Geolocalização e WhatsApp, além do serviço de acessibilidade TTS (Voz).
- Mapeamento de Dados: Os dados brutos provenientes dessas fontes são convertidos através de Mappers para o formato de Entidades aceito pelo Domínio.
- Persistência de Dados: O sistema utiliza o banco de dados relacional PostgreSQL para o armazenamento permanente e estruturado das informações do projeto.

---

## 1.2. Justificativa da Escolha

### 1.2.1: Justificar a escalabilidade e manutenção.
**Ação:** Utilizar a Clean Architecture para separar o sistema em camadas independentes, onde cada uma possui responsabilidades específicas. A camada de apresentação (MVVM) fica responsável pela interface e interação com o usuário, a camada Domain concentra as regras de negócio e a camada Data gerencia o banco de dados e as integrações externas. Essa separação reduz o acoplamento entre os componentes e evita que mudanças em uma camada afetem diretamente as demais.

**Conexão com o projeto:** No Conecta Obra Itacoatiara, essa organização contribui para a escalabilidade do sistema, permitindo adicionar novos perfis de usuário e funcionalidades de forma mais simples e segura. Caso seja necessário criar novos módulos ou integrações, isso pode ser feito sem modificar toda a estrutura do sistema. Além disso, a arquitetura facilita a manutenção do código a longo prazo, pois a equipe consegue identificar problemas, atualizar funcionalidades e trabalhar simultaneamente em diferentes partes do projeto com mais organização, produtividade e menor risco de conflitos.

### 1.2.2: Justificar a testabilidade.
**Ação:** A independência da lógica de negócios e a separação da interface no padrão MVVM tornam o sistema mais fácil de testar, pois cada camada pode ser validada individualmente. Os Casos de Uso da camada Domain podem ser testados sem depender da interface gráfica ou do banco de dados, enquanto os ViewModels podem ser verificados separadamente para garantir o correto funcionamento das interações da aplicação. Além disso, a utilização de testes unitários ajuda a identificar falhas rapidamente, garantindo maior robustez, estabilidade e confiabilidade ao sistema.

**Conexão com o projeto:** No Conecta Obra Itacoatiara, a testabilidade é essencial para assegurar a qualidade do software, principalmente por se tratar de um sistema comercial com diferentes tipos de usuários e funcionalidades. A realização de testes nos Casos de Uso e ViewModels contribui para evitar erros em processos importantes, como autenticação, comunicação entre usuários, notificações e gerenciamento de serviços, aumentando a segurança e a confiabilidade da plataforma.

### 1.2.3: Justificar a independência de frameworks e UI.
**Ação:** A Clean Architecture garante que a lógica de negócios permaneça independente de frameworks e tecnologias externas, como React Native, Firebase ou bancos de dados. Isso significa que mudanças na interface ou na tecnologia utilizada não afetam diretamente as regras principais do sistema. Além disso, o padrão MVVM separa a lógica de apresentação da View, facilitando alterações na interface sem comprometer o funcionamento da aplicação. Essa independência torna o sistema mais flexível, reutilizável e preparado para futuras evoluções tecnológicas.

**Conexão com o projeto:** No Conecta Obra Itacoatiara, essa organização permite que a plataforma acompanhe mudanças tecnológicas e futuras adaptações com maior facilidade. Caso seja necessário atualizar o framework da interface, trocar serviços externos ou modificar o banco de dados, as regras de negócio continuarão preservadas. Isso aumenta a longevidade do sistema, reduz custos de manutenção e garante maior estabilidade para a evolução contínua da plataforma.

### 1.2.4: Atendimento aos requisitos não funcionais.
**Ação:** A escolha da Clean Architecture e do padrão MVVM contribui diretamente para o atendimento dos requisitos não funcionais do sistema. A separação das regras de negócio em camadas independentes permite otimizar o desempenho da aplicação, reduzindo impactos entre funcionalidades e facilitando a manutenção. O MVVM melhora a usabilidade ao organizar a interface de forma mais estruturada, tornando o desenvolvimento da UI mais eficiente e intuitivo. Além disso, recursos de acessibilidade, como o Text-to-Speech (TTS), podem ser implementados como serviços na camada de infraestrutura, mantendo o sistema organizado e modular.

**Conexão com o projeto:** No Conecta Obra Itacoatiara, essa arquitetura fortalece a experiência do usuário para diferentes perfis da plataforma, como clientes, profissionais e lojistas. O módulo de acessibilidade com suporte a Text-to-Speech amplia a inclusão e facilita o uso do sistema por pessoas com dificuldades visuais ou de leitura. Dessa forma, a arquitetura adotada contribui para um sistema mais eficiente, acessível, organizado e preparado para atender às necessidades dos usuários.

## 1.3. Aplicação no Sistema

### 1.3.1. Mapeamento das Camadas da Clean Architecture no Projeto

A arquitetura do **Conecta Obra Itacoatiara** será estruturada para garantir a separação de responsabilidades, facilitando a manutenção e a escalabilidade do sistema. As camadas da Clean Architecture se manifestarão na seguinte estrutura de pastas e módulos:

* **Camada de Domínio (`domain/`):** Representa o núcleo do sistema, contendo as regras de negócio puras e as entidades fundamentais, independentes de qualquer framework externo.
    * **Entidades:** Classes que representam os objetos de negócio. No contexto do projeto, teremos entidades como `Produto`, `Profissional`, `Cliente`, `Loja` e `Servico`.
    * **Casos de Uso (`usecases/`):** Encapsulam e implementam as regras de negócio específicas descritas no backlog. Por exemplo, para atender à US01, teremos o `CadastrarProdutoUseCase`. Para a US04, implementaremos o `MarcarProdutoPromocaoUseCase`.
* **Camada de Aplicação (`application/`):** Atua como mediadora entre o domínio e as camadas externas, contendo a lógica de orquestração.
    * **Portas/Interfaces (`interfaces/`):** Define os contratos (interfaces) para os repositórios (ex: `IProdutoRepository`) e serviços externos (ex: `IWhatsAppService` para a US03), garantindo que o domínio não dependa de implementações concretas.
* **Camada de Apresentação (`presentation/`):** Responsável pela interface com o usuário, desenvolvida em React Native e TypeScript.
    * **Views (`views/` ou `screens/`):** Os componentes visuais e telas do aplicativo mobile (ex: `ProductListScreen`, `CadastroProdutoScreen`).
    * **ViewModels (`viewmodels/`):** Gerenciam o estado da tela e a lógica de apresentação, conectando as Views aos Casos de Uso.
* **Camada de Infraestrutura (`infrastructure/`):** Contém os detalhes técnicos, frameworks e implementações concretas das interfaces definidas na camada de aplicação.
    * **Repositórios (`repositories/`):** Implementações reais de acesso a dados (banco de dados local ou remoto).
    * **Serviços Externos (`services/`):** Integrações com bibliotecas de terceiros, como o mecanismo de Text-to-Speech (TTS) ou APIs de comunicação.

### 1.3.2. Aplicação do MVVM na Camada de Apresentação

O padrão **Model-View-ViewModel (MVVM)** será empregado para separar a lógica da interface gráfica da lógica de negócios, promovendo um código mais limpo e testável no ecossistema React Native.

* **A View (Componentes React Native):** As telas do aplicativo atuarão como "Views puras". Elas são responsáveis apenas por renderizar a interface e capturar as interações do usuário (toques, digitação). A View não contém regras de validação ou lógica de negócio; ela apenas observa os dados fornecidos pelo ViewModel e notifica o ViewModel sobre as ações do usuário.
* **O ViewModel (Hooks Personalizados):** Em React Native, os ViewModels serão preferencialmente implementados como *Custom Hooks* (ex: `useProductListViewModel`, `useCadastrarProdutoViewModel`). O ViewModel expõe estados (como dados carregados, mensagens de erro ou *loading*) que a View consumirá.
* **Comunicação com o Domínio:** Quando a View registra uma ação (ex: Lojista clica em "Salvar Produto"), ela aciona um método no ViewModel. O ViewModel, por sua vez, prepara os dados e invoca o respectivo Caso de Uso na camada de Domínio (ex: `CadastrarProdutoUseCase`).

**Exemplo prático de Telas:**
Para a exibição do catálogo, teremos a tela `ProductListScreen` (View) que consumirá o `ProductListViewModel`. O ViewModel buscará a lista de produtos ativos através de um caso de uso e controlará o estado visual. Se a opção "Disponível para venda" estiver ativada, o produto será exibido na interface do cliente.

### 1.3.3. Fluxo de Funcionalidade: US01 - Cadastrar produtos

Abaixo, detalhamos o fluxo arquitetural completo para a História de Usuário **US01**, onde o Dono de Loja cadastra produtos para enviar aos clientes pelo celular.

1.  **Interação na View (`CadastrarProdutoScreen`):** O usuário lojista (Persona Eric) preenche o formulário com foto (JPG/PNG, máx 5MB), nome, preço, descrição, estoque e categoria. Ao clicar em salvar, a View repassa esses dados brutos para o `CadastrarProdutoViewModel`.
2.  **Tratamento no ViewModel (`CadastrarProdutoViewModel`):** O ViewModel recebe os dados e pode realizar validações superficiais de apresentação (ex: verificar se os campos obrigatórios marcados com "*" estão vazios). Estando corretos, o ViewModel formata o objeto e aciona a injeção de dependência para chamar o `CadastrarProdutoUseCase`.
3.  **Regras de Negócio no Caso de Uso (`CadastrarProdutoUseCase`):** O Caso de Uso (Camada de Domínio) recebe a requisição e aplica as regras de negócio estritas:
    * Verifica se o estoque é um valor negativo.
    * Aplica a regra de que, se a quantidade do estoque for igual a 0, a visibilidade deve ser automaticamente desativada (off).
    * Cria a entidade `Produto` validada.
4.  **Persistência na Infraestrutura (`ProdutoRepository`):** O Caso de Uso invoca a interface do repositório (Camada de Aplicação) para salvar os dados. A implementação concreta na Infraestrutura realiza a gravação no banco de dados.
5.  **Retorno para a View:** O Repositório confirma a gravação para o Caso de Uso, que retorna um sucesso para o ViewModel. O ViewModel atualiza seu estado, fazendo com que a View (`CadastrarProdutoScreen`) exiba a mensagem de sucesso exigida pelos critérios de aceitação: "Produto salvo com sucesso".
