# Backlog do Produto

O **Backlog do Produto** é um artefato fundamental no desenvolvimento ágil, servindo como uma lista dinâmica e priorizada de todas as funcionalidades, melhorias e correções necessárias para o produto. No contexto do projeto **Conecta Obra Itacoatiara**, ele atua como o guia central para transformar as necessidades dos profissionais autônomos e clientes em entregas de software tangíveis.

## 1. Importância do Backlog do Produto

A importância do Backlog do Produto reside na sua capacidade de fornecer uma visão clara e compartilhada do que deve ser construído. Ele permite que a equipe:

*   **Mantenha o Foco no Valor:** Ao priorizar as histórias de usuário, garantimos que as funcionalidades mais críticas para os trabalhadores de Itacoatiara sejam desenvolvidas primeiro.
*   **Promova a Transparência:** Todos os envolvidos  podem visualizar o progresso e o que ainda está por vir.
*   **Facilite a Adaptação:** Como uma lista viva, o backlog pode ser refinado à medida que novos aprendizados sobre o mercado local e as necessidades dos usuários surgem.

## 2. Para que serve?

O Backlog do Produto serve como a única fonte de requisitos para qualquer alteração a ser feita no sistema. Suas principais funções incluem:

*   **Planejamento de Sprints:** Fornece a base para a seleção de tarefas que comporão o Backlog do Sprint.
*   **Documentação de Requisitos:** Registra as funcionalidades sob a perspectiva do usuário final (Histórias de Usuário).
*   **Gestão de Expectativas:** Ajuda a alinhar o que será entregue e em qual ordem, baseando-se no valor de negócio e na viabilidade técnica.

## 3. Como foi feito?

A elaboração do backlog para o **Conecta Obra Itacoatiara** seguiu as diretrizes estabelecidas na especificação do trabalho prático, integrando as fases de Inspiração e Ideação do Design Thinking.

### 3.1. Levantamento e Escrita das Histórias
As funcionalidades foram derivadas diretamente das necessidades identificadas nas **Personas** (João, Ana, Marcelo e Eric). Cada item foi redigido seguindo o padrão:
> **Enquanto** [tipo de usuário], **desejo** [funcionalidade], **para** [benefício/objetivo].

### 3.2. Organização no GitHub Projects
O backlog foi estruturado utilizando a ferramenta **GitHub Projects** no modo *Board*, organizado em quatro colunas estratégicas:

| Coluna | Descrição |
| :--- | :--- |
| **Backlog** | Histórias de usuário iniciais, ainda não detalhadas. |
| **Especificação** | Itens em processo de detalhamento com critérios de aceitação e regras de negócio. |
| **Revisão** | Histórias que aguardam a validação final da equipe. |
| **Implementação** | Funcionalidades prontas para serem desenvolvidas. |

### 3.3. Critérios de Qualidade e Rastreabilidade
Para garantir a robustez do planejamento, foram aplicados os seguintes critérios:

*   **Priorização:** Cada história recebeu um nível de prioridade (Alta, Média ou Baixa), refletindo seu impacto para o ecossistema de construção civil local.
*   **Rastreabilidade:** Todas as histórias estão vinculadas a pelo menos uma persona, garantindo que o desenvolvimento esteja alinhado às dores reais dos usuários de Itacoatiara.
*   **Colaboração:** A especificação contou com a participação ativa de múltiplos integrantes da equipe, evidenciada pelas atribuições (*Assignees*) no GitHub.

---
> **Nota:** O acompanhamento em tempo real das histórias de usuário e seu estado atual de desenvolvimento pode ser visualizado diretamente na aba [Projects](https://github.com/users/jhonatan-gonzaga/projects/2) deste repositório.

## 4. Itens para Implementação

Esta seção detalha as Histórias de Usuário que estão atualmente na coluna **Implementação** do GitHub Projects, incluindo seus critérios de aceitação, regras de negócio, prioridade e a persona associada.

### 4.1. Gestão de Produtos e Loja (Dono de Loja)

#### US01 - Cadastro de Produtos (#24)
*   **User Story:** Enquanto Dono de Loja de Materiais de Construção, desejo cadastrar meus produtos com nome, descrição, preço e fotos, para que os clientes possam visualizar meu catálogo.
*   **Critérios de Aceitação:**
    *   O sistema deve permitir a inserção de nome, descrição e preço.
    *   O sistema deve permitir o upload de pelo menos uma foto por produto.
    *   O produto cadastrado deve ficar visível no catálogo da loja.
*   **Regras de Negócio:**
    *   O preço deve ser um valor positivo.
    *   O nome do produto é obrigatório.
*   **Prioridade:** Alta
*   **Persona:** Dono de Loja

#### US02 - Atualização de Preços (#25)
*   **User Story:** Enquanto Dono de Loja de Materiais de Construção, desejo atualizar o preço dos produtos rapidamente, para manter as informações corretas para meus clientes.
*   **Critérios de Aceitação:**
    *   O sistema deve permitir a edição do preço de um produto existente.
    *   A atualização deve ser refletida instantaneamente no catálogo.
*   **Regras de Negócio:**
    *   Somente o dono da loja pode alterar os preços de seus produtos.
*   **Prioridade:** Alta
*   **Persona:** Dono de Loja

#### US03 - Compartilhamento via WhatsApp (#26)
*   **User Story:** Enquanto Dono de Loja de Materiais de Construção, desejo compartilhar produtos pelo WhatsApp, para divulgar rapidamente para meus clientes.
*   **Critérios de Aceitação:**
    *   Deve haver um botão de "Compartilhar no WhatsApp" em cada produto.
    *   O link compartilhado deve levar diretamente à página do produto.
*   **Regras de Negócio:**
    *   O link deve ser válido e acessível publicamente.
*   **Prioridade:** Alta
*   **Persona:** Dono de Loja

#### US04 - Promoções e Descontos (#42)
*   **User Story:** Enquanto Dono de Loja de Materiais de Construção, desejo marcar produtos como promoção com destaque visual e preço promocional, com opção de adicionar desconto, para divulgar ofertas rapidamente aos meus clientes e aumentar as vendas.
*   **Critérios de Aceitação:**
    *   Opção de definir um "Preço Promocional" ou "% de Desconto".
    *   Selo de "Promoção" visível no card do produto.
*   **Regras de Negócio:**
    *   O preço promocional deve ser menor que o preço original.
*   **Prioridade:** Alta
*   **Persona:** Dono de Loja

#### US05 - Cadastro de Endereço e Horários (#43)
*   **User Story:** Enquanto Dono de Loja de Materiais de Construção, desejo cadastrar o endereço completo da loja e os horários de funcionamento por dia da semana, para enviar facilmente essas informações aos clientes quando solicitarem.
*   **Critérios de Aceitação:**
    *   Campos para Rua, Número, Bairro e Cidade.
    *   Seletor de horários para cada dia da semana (Seg-Dom).
*   **Regras de Negócio:**
    *   O endereço deve ser validado (campos obrigatórios).
*   **Prioridade:** Alta
*   **Persona:** Dono de Loja

### 4.2. Fluxo do Profissional (Profissional)

#### US06 - Acesso via Código SMS/TTS (#27)
*   **User Story:** Enquanto profissional, desejo validar meu acesso por código enviado ao celular, com opção de ouvir via TTS, para entrar de forma rápida, segura e sem precisar de senha, mesmo em ambiente de trabalho.
*   **Critérios de Aceitação:**
    *   O sistema deve enviar um código de 6 dígitos via SMS.
    *   Deve haver um botão para ouvir o código via áudio (TTS).
    *   O acesso deve ser concedido após a inserção do código correto.
*   **Regras de Negócio:**
    *   O código deve expirar em 5 minutos.
    *   Máximo de 3 tentativas de inserção por código.
*   **Prioridade:** Alta
*   **Persona:** Profissional

#### US07 - Criação de Perfil Profissional (#28)
*   **User Story:** Enquanto profissional, desejo criar meu perfil com informações, serviços e fotos, com apoio de TTS, para me tornar visível na plataforma e aumentar minhas chances de conseguir trabalho.
*   **Critérios de Aceitação:**
    *   O sistema deve permitir preencher nome, especialidade e descrição.
    *   Deve permitir o upload de fotos de trabalhos anteriores.
    *   Opção de ouvir as instruções de preenchimento via TTS.
*   **Regras de Negócio:**
    *   O perfil só fica ativo após o preenchimento dos campos obrigatórios.
*   **Prioridade:** Alta
*   **Persona:** Profissional

#### US08 - Visualização e Aceite de Ofertas (#29)
*   **User Story:** Enquanto profissional, desejo visualizar e aceitar ofertas de serviço disponíveis para me candidatar rapidamente a oportunidades de trabalho compatíveis com minha área.
*   **Critérios de Aceitação:**
    *   O sistema deve listar serviços abertos na região do profissional.
    *   Deve haver um botão para "Aceitar" ou "Candidatar-se".
*   **Regras de Negócio:**
    *   O profissional só pode ver ofertas compatíveis com suas especialidades cadastradas.
*   **Prioridade:** Alta
*   **Persona:** Profissional

#### US09 - Confirmação de Acordo (#30)
*   **User Story:** Enquanto profissional, desejo confirmar no aplicativo que fechei um acordo com o cliente após contato externo, para iniciar o serviço oficialmente com segurança e registro na plataforma.
*   **Critérios de Aceitação:**
    *   Deve haver uma opção para marcar o serviço como "Acordado".
    *   O cliente deve receber uma notificação para confirmar o acordo.
*   **Regras de Negócio:**
    *   O status do serviço muda para "Em andamento" após a confirmação de ambas as partes.
*   **Prioridade:** Alta
*   **Persona:** Profissional

#### US10 - Finalização e Avaliação (#31)
*   **User Story:** Enquanto profissional, desejo finalizar o serviço no aplicativo e permitir a avaliação do cliente, para registrar minha entrega e melhorar minha reputação na plataforma.
*   **Critérios de Aceitação:**
    *   Botão para "Finalizar Serviço".
    *   Formulário de avaliação para o cliente (estrelas e comentário).
*   **Regras de Negócio:**
    *   A avaliação só pode ser feita após a finalização do serviço pelo profissional.
*   **Prioridade:** Alta
*   **Persona:** Profissional

### 4.3. Suporte e Atendimento (Suporte)

#### US11 - Migração para WhatsApp (#20)
*   **User Story:** Enquanto suporte, desejo trocar de canal do chat de suporte para Whatsapp, para ter um ambiente melhor para o cliente.
*   **Critérios de Aceitação:**
    *   O sistema deve oferecer a opção de migrar a conversa para o WhatsApp.
    *   O número do cliente deve ser capturado automaticamente se disponível.
*   **Regras de Negócio:**
    *   A migração só pode ocorrer com o consentimento do cliente.
*   **Prioridade:** Alta
*   **Persona:** Suporte
