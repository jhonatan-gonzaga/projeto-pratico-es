# Projeto e Arquitetura - Conecta Obra Itacoatiara

Este diretório contém a documentação técnica detalhada da arquitetura do sistema **Conecta Obra Itacoatiara**. A documentação está estruturada seguindo o modelo **C4**, integrando padrões como **Clean Architecture** e **MVVM** para garantir um sistema escalável, testável e de fácil manutenção.

## Sumário da Documentação

Abaixo estão listados os documentos que compõem a arquitetura do projeto, organizados por nível de detalhamento e propósito técnico:

1.  **[Padrões Arquiteturais](1-padroes-arquiteturais.md)**
    *   Descrição da Clean Architecture e do padrão MVVM.
    *   Justificativa das escolhas tecnológicas para escalabilidade, testabilidade e independência de frameworks.
2.  **[Tech Stack Map](2-tech-stack.md)**
    *   Mapeamento completo das tecnologias utilizadas (React Native, Node.js, Firebase, MySQL, etc.).
    *   Detalhamento do fluxo de dados e integrações com serviços externos.
3.  **[C4 Nível 1: Contexto](3-c4-contexto.md)**
    *   Visão de alto nível do sistema e suas interações com usuários (Clientes, Profissionais, Lojistas) e sistemas externos.
4.  **[C4 Nível 2: Containers](4-c4-containers.md)**
    *   Detalhamento dos contêineres do sistema (App Mobile, API Backend, Bancos de Dados) e como eles se comunicam.
5.  **[C4 Nível 3: Componentes](5-c4-componentes.md)**
    *   Decomposição dos contêineres em componentes lógicos, detalhando serviços internos e controladores de interface.
6.  **[C4 Nível 4: Código (Diagramas de Classe)](6-c4-codigo.md)**
    *   Estrutura granular de classes, atributos e métodos, mapeando as entidades de domínio e lógica de negócio.
7.  **[Matriz de Rastreabilidade](7-rastreabilidade.md)**
    *   Conexão direta entre as Histórias de Usuário (Issues), os módulos funcionais e os diagramas de classe, garantindo que todos os requisitos sejam atendidos.

---

## Como navegar nesta documentação

Para uma compreensão progressiva do sistema, recomenda-se seguir a ordem numérica dos arquivos. Comece pelos **Padrões Arquiteturais** e a **Tech Stack** para entender as fundações tecnológicas, e então siga os níveis do modelo **C4** (do Contexto ao Código) para aprofundar-se na implementação técnica.

---

## Ferramentas de Inteligência Artificial Utilizadas

Para a criação e organização desta documentação e dos artefatos do projeto, foram utilizadas as seguintes ferramentas de Inteligência Artificial:

-   **Manus:** Utilizado para a organização e estruturação dos diretórios e arquivos de documentação, garantindo consistência e padronização.
-   **ChatGPT:** Empregado como ferramenta de auxílio na concepção e refinamento dos diagramas arquiteturais, contribuindo para a clareza e precisão das representações visuais.
