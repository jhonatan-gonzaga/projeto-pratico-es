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
Ação:
Conexão com o projeto:

### 1.2.2: Justificar a testabilidade.
Ação:
Conexão com o projeto:

### 1.2.3: Justificar a independência de frameworks e UI.
Ação:
Conexão com o projeto:

### 1.2.4: Atendimento aos requisitos não funcionais.
Ação:
Conexão com o projeto:
