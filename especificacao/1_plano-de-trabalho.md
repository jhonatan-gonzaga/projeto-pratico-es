<div align="justify">

# PLANO DE TRABALHO - PROJETO CONECTA OBRA ITACOATIARA

Este documento apresenta o planejamento estratégico e a especificação técnica para o desenvolvimento da plataforma **Conecta Obra Itacoatiara**, um diretório digital projetado para integrar o ecossistema da construção civil local.

---

## 1. IDENTIFICAÇÃO DO PROJETO

| Campo | Detalhamento |
| :--- | :--- |
| **Nome do Projeto** | Conecta Obra Itacoatiara |
| **Codinome** | COI-2026 |
| **Versão** | 1.0 |
| **Status** | Em Desenvolvimento |
| **Número de Controle SRBR-M** | 2026.IHC.TP3.001 (Fictício para controle acadêmico) |
| **Executor Principal** | Equipe de Engenharia de Software - Grupo IHC |
| **Coordenador do Projeto** | Prof. Andrey Antonio de Oliveira Rodrigues |

---

## 2. HISTÓRICO DE VERSÕES

| Versão | Descrição | Autor | Data |
| :--- | :--- | :--- | :--- |
| 1.0 | Elaboração inicial do Plano de Trabalho com base nos requisitos do TP3. | Grupo IHC | 31/03/2026 |

---

## 3. INTRODUÇÃO

### 3.1 Objeto
O projeto consiste no desenvolvimento de uma plataforma digital (aplicativo móvel e web) denominada **Conecta Obra Itacoatiara**. O sistema funciona como um hub de conexão entre três pilares fundamentais da construção civil: **Clientes** (contratantes), **Profissionais** (prestadores de serviço) e **Lojistas** (fornecedores de materiais). Sua função principal é centralizar a busca por mão de obra qualificada, a cotação de insumos e a gestão de pequenos e médios reparos ou obras.

### 3.2 Motivação, Justificativa e Oportunidade
Atualmente, moradores de Itacoatiara enfrentam dificuldades significativas para encontrar profissionais de confiança de forma ágil, dependendo quase exclusivamente de indicações informais e contatos desorganizados no WhatsApp. Por outro lado, profissionais qualificados sofrem com a inconstância de trabalho e falta de canais de divulgação, enquanto lojistas locais perdem oportunidades de venda por falta de presença digital integrada. O **Conecta Obra** resolve esses problemas ao oferecer um ambiente seguro com avaliações reais, portfólios visuais e um guia "Onde Comprar" integrado, aumentando a eficiência do mercado local e reduzindo a insegurança nas contratações.

### 3.3 Caracterização do Projeto

#### 3.3.1 Classe
| Classe | Detalhamento |
| :--- | :--- |
| **Sistema Web/Mobile** | A plataforma será acessível via navegadores e dispositivos móveis, permitindo o uso em campo por profissionais e a conveniência de busca para clientes. |

#### 3.3.2 Enquadrabilidade
| Enquadrabilidade | Detalhamento |
| :--- | :--- |
| **Software de Impacto Social/Comercial** | O projeto se enquadra como uma solução de fomento à economia local, com viés educacional acadêmico dentro da disciplina de Interação Humano-Computador. |

#### 3.3.3 Tipo
| Tipo | Detalhamento |
| :--- | :--- |
| **Diretório e Marketplace de Serviços** | Sistema focado em listagem, filtragem, reputação e intermediação de contato para prestação de serviços. |

---

## 4. INFORMAÇÕES GERAIS

### 4.1 Escopo Geral
O projeto visa entregar uma interface funcional que permita o fluxo completo de contratação: desde o anúncio de uma demanda pelo cliente, a candidatura de profissionais, a negociação via canais externos (WhatsApp) e a finalização com avaliação de desempenho.

#### 4.1.1 Escopo Específico
*   **Módulo de Acessibilidade:** Implementação de *Text-to-Speech* (TTS) para leitura de textos críticos, auxiliando usuários com baixa literacia digital ou deficiência visual.
*   **Gestão de Perfis:** Cadastro diferenciado para Clientes, Profissionais (com portfólio) e Lojistas (com catálogo).
*   **Sistema de Demandas:** Fluxo de "Anunciar Serviço" com anexação de fotos e descrição por voz.
*   **Guia "Onde Comprar":** Listagem de lojas locais com catálogo de produtos e promoções ativas.
*   **Mecanismo de Confiança:** Sistema de avaliação 5 estrelas e ranqueamento baseado em histórico de serviços.

#### 4.1.2 Escopo Negativo
*   **Pagamento Nativo:** Não haverá processamento de transações financeiras dentro do app (pagamentos via PIX ou dinheiro serão feitos offline).
*   **Chat de Negociação:** A negociação detalhada ocorrerá via WhatsApp/Telefone para simplificar o MVP.
*   **Logística de Entrega:** O app não gerenciará o frete de materiais de construção.

### 4.2 Ambiente de Desenvolvimento
| Componente | Tecnologia/Ferramenta |
| :--- | :--- |
| **Metodologia** | Scrum com Sprints semanais |
| **Gestão de Backlog** | GitHub Projects |
| **Repositório de Código** | GitHub |
| **Modelagem de Software** | Draw.io / Figma (Prototipagem de Alta Fidelidade) |
| **Desenvolvimento Frontend** | React Native / TypeScript |
| **Acessibilidade** | Web Speech API / Bibliotecas de TTS nativas |

### 4.3 Características Inovadoras do Projeto
*   **Foco em Acessibilidade Radical:** Uso extensivo de comandos de voz e leitura de tela para incluir profissionais que possuem dificuldades com interfaces puramente textuais.
*   **Ecossistema Integrado:** Diferente de apps genéricos, o Conecta Obra integra o fornecedor de material no ciclo de vida do serviço, fechando o elo da construção civil.

### 4.4 Resultados Esperados
*   Redução no tempo médio de busca por profissionais qualificados em Itacoatiara.
*   Aumento da visibilidade digital para prestadores de serviço autônomos.
*   Criação de uma base de dados confiável de fornecedores de materiais de construção.
*   Interface intuitiva validada por heurísticas de usabilidade e testes com usuários.

---

## 5. METODOLOGIA DE PROJETO

### 5.1 Estrutura do Projeto
O desenvolvimento será dividido em cinco fases iterativas:
1.  **Imersão e Definição:** Briefing, Matriz CSD e Personas.
2.  **Ideação e Design de Interação:** Metamensagem, HTA e MoLIC.
3.  **Design de Interface:** Prototipagem de alta fidelidade e padrões visuais.
4.  **Desenvolvimento do MVP:** Implementação das funcionalidades "Must-Have".
5.  **Avaliação e Ajustes:** Testes de usabilidade e correções baseadas em heurísticas.

### 5.2 Equipe de Projeto: Papéis e Responsabilidades
| Integrante | Papel | Responsabilidades |
| :--- | :--- | :--- |
| **Jhonatan Gonzaga** | Líder de Projeto / Desenvolvedor | Gestão do repositório, integração de sistemas e métricas de usabilidade. |
| **Alyce Benevides** | Designer de UX/UI | Criação de protótipos, edição de mídia e avaliação de comunicabilidade. |
| **Oliviê Kalil** | Analista de Requisitos | Documentação técnica, aplicação de questionários UEQ e análise de dados. |
| **Rodrigo Torres** | Desenvolvedor Frontend | Implementação de interfaces, etiquetagem MAC e edição de vídeos de teste. |
| **Victor dos Santos** | Especialista em QA / Acessibilidade | Avaliação heurística, testes de acessibilidade (TTS) e controle de qualidade. |

---

## 6. DESPESAS E INVESTIMENTOS (ESTIMATIVA)

### 6.1 Materiais de Consumo e Equipamentos
| Item | Descrição | Quant. | Valor Unit. (R$) | Total (R$) |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Infraestrutura de Nuvem (Hospedagem) | 1 | 500,00 | 500,00 |
| 2 | Licenças de Software de Design | 5 | 120,00 | 600,00 |
| 3 | Dispositivos de Teste (Mobile) | 2 | 1.200,00 | 2.400,00 |
| **Total** | | | | **3.500,00** |

### 6.2 Resumo Financeiro
O projeto será executado em regime acadêmico/laboratorial, com custos operacionais estimados em **R$ 3.500,00** para ferramentas e infraestrutura básica durante o período de 6 meses.

---

<p align="center">
  <b>Documento gerado para fins acadêmicos - Disciplina de Interação Humano-Computador</b><br>
  Engenharia de Software - 2026
</p>

</div>
