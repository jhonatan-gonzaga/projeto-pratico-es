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
Para garantir a robustez do planejamento, foram aplicados los seguintes critérios:

*   **Priorização:** Cada história recebeu um nível de prioridade (Alta, Média ou Baixa), refletindo seu impacto para o ecossistema de construção civil local.
*   **Rastreabilidade:** Todas as histórias estão vinculadas a pelo menos uma persona, garantindo que o desenvolvimento esteja alinhado às dores reais dos usuários de Itacoatiara.
*   **Colaboração:** A especificação contou com a participação ativa de múltiplos integrantes da equipe, evidenciada pelas atribuições (*Assignees*) no GitHub.

---
> **Nota:** O acompanhamento em tempo real das histórias de usuário e seu estado atual de desenvolvimento pode ser visualizado diretamente na aba [Projects](https://github.com/users/jhonatan-gonzaga/projects/2) deste repositório.

## 4. Itens para Implementação

Esta seção apresenta as Histórias de Usuário que estão atualmente na coluna **Implementação** do GitHub Projects, detalhando seus requisitos fundamentais para o desenvolvimento.

| ID | User Story | Critérios de Aceitação | Regras de Negócio | Prioridade | Persona |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **US01** (#24) | Enquanto Dono de Loja, desejo cadastrar produtos com nome, descrição, preço e fotos, para que os clientes visualizem meu catálogo. | - Inserção de nome, descrição e preço.<br>- Upload de pelo menos uma foto.<br>- Visibilidade no catálogo após cadastro. | - Preço deve ser positivo.<br>- Nome do produto é obrigatório. | Alta | Dono de Loja |
| **US02** (#25) | Enquanto Dono de Loja, desejo atualizar o preço dos produtos rapidamente, para manter as informações corretas. | - Edição do preço de produto existente.<br>- Atualização instantânea no catálogo. | - Somente o dono da loja pode alterar os preços. | Alta | Dono de Loja |
| **US03** (#26) | Enquanto Dono de Loja, desejo compartilhar produtos pelo WhatsApp, para divulgar rapidamente para meus clientes. | - Botão "Compartilhar no WhatsApp" em cada produto.<br>- Link direto para a página do produto. | - O link deve ser válido e acessível publicamente. | Alta | Dono de Loja |
| **US04** (#42) | Enquanto Dono de Loja, desejo marcar produtos como promoção com destaque visual e preço promocional, para aumentar as vendas. | - Definição de preço promocional ou % de desconto.<br>- Selo de "Promoção" visível no card. | - Preço promocional deve ser menor que o original. | Alta | Dono de Loja |
| **US05** (#43) | Enquanto Dono de Loja, desejo cadastrar o endereço e horários da loja, para informar facilmente aos clientes. | - Campos para endereço completo.<br>- Seletor de horários por dia da semana. | - Endereço deve ser validado (campos obrigatórios). | Alta | Dono de Loja |
| **US06** (#27) | Enquanto profissional, desejo validar acesso por código SMS/TTS, para entrar de forma rápida e segura sem senha. | - Envio de código de 6 dígitos via SMS.<br>- Botão para ouvir código via TTS.<br>- Acesso após código correto. | - Código expira em 5 minutos.<br>- Máximo de 3 tentativas por código. | Alta | Profissional |
| **US07** (#28) | Enquanto profissional, desejo criar perfil com informações, serviços e fotos, para me tornar visível na plataforma. | - Preenchimento de nome, especialidade e descrição.<br>- Upload de fotos de trabalhos.<br>- Instruções via TTS. | - Perfil ativo apenas após campos obrigatórios. | Alta | Profissional |
| **US08** (#29) | Enquanto profissional, desejo visualizar e aceitar ofertas de serviço, para me candidatar a oportunidades compatíveis. | - Listagem de serviços na região.<br>- Botão para "Aceitar" ou "Candidatar-se". | - Apenas ofertas compatíveis com especialidades. | Alta | Profissional |
| **US09** (#30) | Enquanto profissional, desejo confirmar acordo com o cliente no app, para iniciar o serviço com registro oficial. | - Opção para marcar como "Acordado".<br>- Notificação de confirmação para o cliente. | - Status muda para "Em andamento" após ambos confirmarem. | Alta | Profissional |
| **US10** (#31) | Enquanto profissional, desejo finalizar o serviço e permitir avaliação, para melhorar minha reputação. | - Botão para "Finalizar Serviço".<br>- Formulário de avaliação (estrelas e comentário). | - Avaliação disponível apenas após finalização. | Alta | Profissional |
| **US11** (#20) | Enquanto suporte, desejo trocar de canal do chat para Whatsapp, para melhor atendimento ao cliente. | - Opção de migrar conversa para WhatsApp.<br>- Captura automática do número do cliente. | - Migração requer consentimento do cliente. | Alta | Suporte |
