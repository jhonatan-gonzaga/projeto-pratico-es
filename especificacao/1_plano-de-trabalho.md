<div align="justify">

# PLANO DE TRABALHO

| Campo | Detalhamento |
| :--- | :--- |
| **Nome do Projeto:** | **Conecta Obra Itacoatiara**<br>Codinome: COI-2026 |
| **Versão:** | 1.0 |
| **Status:** | Em desenvolvimento |
| **Número de Controle SRBR-M:** | 2026.IHC.TP3.001 |
| **Executor Principal:** | Equipe de Engenharia de Software - Grupo IHC |
| **Coordenador do Projeto:** | Prof. Andrey Antonio de Oliveira Rodrigues |

---

## HISTÓRICO DE VERSÕES

| Versão | Descrição | Autor | Data |
| :--- | :--- | :--- | :--- |
| 1.0 | Elaboração do Plano de Trabalho | Grupo IHC | 31/03/2026 |

---

## 1. INTRODUÇÃO

A introdução apresenta um panorama geral do projeto, contextualizando seu propósito, justificativa e características principais.

### 1.1 Objeto
O projeto consiste no desenvolvimento de uma plataforma digital denominada **Conecta Obra Itacoatiara**. O sistema atua como um hub de conexão entre clientes, profissionais da construção civil e lojistas de materiais, facilitando a contratação de serviços e a aquisição de insumos de forma centralizada e segura.

### 1.2 Motivação, Justificativa e Oportunidade
Atualmente, moradores de Itacoatiara enfrentam dificuldades para encontrar profissionais de confiança de forma ágil, dependendo de indicações informais. Profissionais sofrem com a inconstância de trabalho e lojistas perdem vendas por falta de presença digital integrada. O sistema visa automatizar e centralizar a gestão dessas conexões, aumentando a eficiência e reduzindo falhas no mercado local.

### 1.3 Caracterização do Projeto
Aqui são definidos atributos que classificam o projeto em diferentes categorias.

#### 1.3.1 Classe
Indica a categoria geral do projeto, especificando suas características principais.

| Classe | Detalhamento |
| :--- | :--- |
| **Sistema Web / Mobile** | O sistema será acessível via navegador e dispositivos móveis, sem necessidade de instalação complexa para clientes finais. |

#### 1.3.2 Enquadrabilidade
A enquadrabilidade define em que contexto ou regulamento o projeto se encaixa.

| Enquadrabilidade | Detalhamento |
| :--- | :--- |
| **Software Educacional** | O sistema será utilizado no contexto acadêmico da disciplina de IHC para prática de design de interação. |
| **Software Comercial** | A solução possui viés de marketplace para geração de oportunidades de negócio locais. |

#### 1.3.3 Tipo
| Tipo | Detalhamento |
| :--- | :--- |
| **Diretório de Serviços** | Plataforma de listagem, busca e reputação de prestadores de serviço e fornecedores. |

---

## 2. INFORMAÇÕES GERAIS

Esta seção define o que o projeto pretende desenvolver, suas limitações, tecnologias utilizadas e a inovação que ele traz.

### 2.1 Escopo Geral
O projeto visa desenvolver um sistema que conecte clientes a profissionais da construção civil, permitindo o anúncio de demandas, visualização de portfólios, cotação de materiais em lojas parceiras e avaliação mútua.

#### 2.1.1 Escopo Específico
O escopo específico detalha as funcionalidades e requisitos que serão implementados:
- Cadastro e gestão de perfis (Cliente, Profissional, Lojista e Suporte).
- Módulo de acessibilidade com recurso *Text-to-Speech* (TTS).
- Fluxo de anúncio de serviços com anexação de fotos e descrição.
- Guia "Onde Comprar" com catálogo de produtos e promoções.
- Sistema de ranqueamento e avaliações 5 estrelas.

#### 2.1.2 Escopo Negativo
O escopo negativo define o que não será desenvolvido, evitando expectativas erradas:
- Não haverá processamento de pagamentos dentro do app (pagamentos offline).
- Não haverá chat interno para negociação (direcionamento para WhatsApp).
- Não haverá módulo de logística ou entrega de materiais.

### 2.2 Ambiente de Desenvolvimento
Aqui são descritas as tecnologias e ferramentas que serão utilizadas no desenvolvimento do projeto.

| Componente | Tecnologia/Ferramenta |
| :--- | :--- |
| **Metodologia** | Scrum com sprints semanais |
| **Gerenciamento de Backlog** | GitHub Projects |
| **Repositório de Código** | GitHub |
| **Modelagem de Software** | Figma e Draw.io (Diagramas MoLIC e HTA) |
| **Desenvolvimento do MVP** | React Native / TypeScript |

### 2.3 Características Inovadoras do Projeto
O projeto destaca-se pela inclusão digital através de interfaces assistidas por voz (*Text-to-Speech*), permitindo que profissionais com baixa literacia digital gerenciem seus perfis e aceitem ofertas com facilidade. Além disso, a integração direta com o catálogo de lojistas locais cria um ecossistema único para a construção civil na região.

### 2.4 Resultados Esperados
Aqui são listados os principais resultados esperados após a conclusão do projeto:
- Plataforma funcional conectando os três pilares do setor em Itacoatiara.
- Melhoria na reputação e visibilidade dos profissionais autônomos.
- Facilitação do processo de compra de materiais para o cliente final.
- Interface validada por critérios de usabilidade e comunicabilidade.

---

## 3. METODOLOGIA DE PROJETO

Esta seção descreve como o projeto será conduzido, desde a concepção até a entrega do MVP, detalhando as fases, equipe e cronograma.

### 3.1 Estrutura do Projeto
O desenvolvimento do projeto será dividido em cinco fases principais, seguindo a abordagem ágil:
1.  **Ideação:** Briefing e Matriz CSD.
2.  **Levantamento de Requisitos:** Personas e Jornadas do Usuário.
3.  **Projeto e Arquitetura:** Design de Interação (Metamensagem, HTA, MoLIC).
4.  **Projeto dos Casos de Teste:** Avaliação Heurística e Planejamento de Testes.
5.  **Desenvolvimento do MVP:** Implementação da interface de alta fidelidade e funções core.

### 3.2 Equipe de Projeto: Papéis e Responsabilidades dos integrantes
A equipe do projeto será composta por 5 alunos, com papéis definidos para otimizar o desenvolvimento.

| Papel | Responsabilidades |
| :--- | :--- |
| **Jhonatan Gonzaga** | Liderança técnica e gestão de métricas de usabilidade. |
| **Alyce Benevides** | Design de interface (UI) e avaliação de comunicabilidade. |
| **Oliviê Kalil** | Análise de requisitos e documentação de inspeção. |
| **Rodrigo Torres** | Desenvolvimento frontend e etiquetagem de rupturas. |
| **Victor dos Santos** | Garantia de qualidade (QA) e especialista em acessibilidade. |

---

## 4. DESPESAS

### 4.1 Dispêndios

#### 4.1.1 Equipamentos e Programa de Computador
A infraestrutura tecnológica necessária para o projeto envolve:
- Servidores de hospedagem para a API e Banco de Dados.
- Licenças de ferramentas de design e prototipagem.

#### 4.1.2 Materiais de Consumo
Os materiais de consumo previsto para o desenvolvimento do projeto são os seguintes:

| Item | Descrição dos Equipamentos | Quant. | Valor unit (R$) | Valor Total (R$) |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Hospedagem de Nuvem (Mensal) | 6 | 100,00 | 600,00 |
| 2 | Licenças Figma Professional | 1 | 400,00 | 400,00 |
| 3 | Materiais de escritório e prototipagem | 1 | 200,00 | 200,00 |
| | **Total** | | | **1.200,00** |

### 4.2 Resumo Financeiro e Valor Total
Segue o resumo financeiro dos itens anteriores:

| ITEM | VALOR TOTAL | % |
| :--- | :--- | :--- |
| Recursos Humanos Diretos (Bolsas/Estágios) | 0,00 | 0,00% |
| Materiais de Consumo | 1200,00 | 100,00% |
| **TOTAL** | **R$ 1.200,00** | **100%** |

---

<p align="center">
  <b>Documento gerado conforme especificações da disciplina de IHC</b><br>
  Engenharia de Software - 2026
</p>

</div>
