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

Esta seção detalha as Histórias de Usuário que estão atualmente na coluna **Implementação** do GitHub Projects.

### 4.1. Persona: Dono de Loja

#### US01 - Enquanto Dono de Loja de Materiais de Construção, desejo cadastrar produtos com foto, preço, adicionar descrição do produto e estoque para enviar rapidamente aos clientes pelo celular.

| Campo | Descrição |
| :--- | :--- |
| **ID** | US01 |
| **Título** | Enquanto Dono de Loja de Materiais de Construção, desejo cadastrar produtos com foto, preço, adicionar descrição do produto e estoque para enviar rapidamente aos clientes pelo celular. |
| **Status** | Implementar |
| **Link da Issue** | #24 |

##### Descrição

Enquanto Dono de Loja de Materiais de Construção, desejo cadastrar produtos com foto, preço, adicionar descrição do produto e estoque para enviar rapidamente aos clientes pelo celular.

##### Critérios de Aceitação

| # | Critério |
| :--- | :--- |
| 1 | O sistema deve permitir adicionar foto do produto nos formatos JPG ou PNG, limitando o tamanho com no máximo 5MB. |
| 2 | O sistema deve permitir editar e excluir produtos cadastrados. |
| 3 | O sistema deve limitar a descrição do produto a no máximo 6 linhas. |
| 4 | O sistema deve permitir definir a visibilidade do produto por meio da opção "Disponível para venda". |
| 5 | O sistema deve exibir o produto para o cliente somente quando a opção "Disponível para venda" estiver ativada. |
| 6 | O sistema deve sinalizar os campos obrigatórios com "*" (Nome do produto, Preço*, Estoque*, Categoria*). |
| 7 | O sistema deve exibir mensagem de sucesso após salvar o produto. |

##### Regra de Negócios

| # | Regra |
| :--- | :--- |
| 1 | O produto só pode ser salvo com as informações obrigatórias preenchidas: Nome do produto*, Preço*, Estoque* e Categoria*. |
| 2 | O estoque do produto não pode ser negativo. |
| 3 | Se a quantidade do estoque for igual a 0, o produto deve ficar automaticamente com a visibilidade desativada (off) e não deve aparecer para o cliente. |
| 4 | Apenas produtos com a opção "Disponível para venda" ativada podem ser exibidos no catálogo para o cliente. |

##### Estimativa

Complexidade: **Alta**

---

#### US02 - Atualizar o preço dos produtos rapidamente

| Campo | Descrição |
| :--- | :--- |
| **ID** | US02 |
| **Título** | Atualizar o preço dos produtos rapidamente |
| **Status** | Implementar |
| **Link da Issue** | #25 |

##### Descrição

Enquanto Dono de Loja de Materiais de Construção, desejo atualizar o preço dos produtos rapidamente, para manter as informações corretas para meus clientes.

##### Critérios de Aceitação

| # | Critério |
| :--- | :--- |
| 1 | Deve permitir editar apenas o preço |
| 2 | A atualização deve ser salva imediatamente |
| 3 | O novo preço deve aparecer no catálogo |

##### Regra de Negócios

| # | Regra |
| :--- | :--- |
| 1 | O preço não pode ser negativo |
| 2 | O preço deve aceitar apenas números |
| 3 | O sistema deve registrar a última atualização |
| 4 | As informações deve ser revisadas pelo sistema para verificar se há erros |

##### Estimativa

Complexidade: **Alta**

---

#### US03 - Compartilhar produtos pelo WhatsApp

| Campo | Descrição |
| :--- | :--- |
| **ID** | US03 |
| **Título** | Compartilhar produtos pelo WhatsApp |
| **Status** | Implementar |
| **Link da Issue** | #26 |

##### Descrição

Enquanto Dono de Loja de Materiais de Construção, desejo compartilhar produtos pelo WhatsApp, para divulgar rapidamente para meus clientes.

##### Critérios de Aceitação

| # | Critério |
| :--- | :--- |
| 1 | O sistema deve permitir compartilhar um produto pelo WhatsApp a partir da página de detalhes do produto ou da lista de produtos. |
| 2 | Ao tocar em “Compartilhar no WhatsApp”, o sistema deve abrir o WhatsApp com uma mensagem pronta contendo o nome do produto, preço e link da página. |
| 3 | Se o produto estiver indisponível, o sistema deve informar isso na mensagem ou bloquear o envio. |
| 4 | O compartilhamento deve funcionar em dispositivos com WhatsApp instalado. |

##### Regra de Negócios

| # | Regra |
| :--- | :--- |
| 1 | A mensagem deve conter informações mínimas obrigatórias |
| 2 | O compartilhamento deve utilizar dados atualizados do produto |

##### Estimativa

Complexidade: **Alta**

---

#### US04 - Marcar produtos como promoção com destaque visual e preço promocional, com opção de adicionar desconto

| Campo | Descrição |
| :--- | :--- |
| **ID** | US04 |
| **Título** | Marcar produtos como promoção com destaque visual e preço promocional, com opção de adicionar desconto |
| **Status** | Implementar |
| **Link da Issue** | #42 |

##### Descrição

Enquanto Dono de Loja de Materiais de Construção, desejo marcar produtos como promoção com destaque visual e preço promocional, com opção de adicionar desconto, para divulgar ofertas rapidamente aos meus clientes e aumentar as vendas.

##### Critérios de Aceitação

| # | Critério |
| :--- | :--- |
| 1 | O sistema deve permitir marcar um produto como "em promoção". |
| 2 | O sistema deve permitir informar um preço promocional para o produto. |
| 3 | O produto marcado como promoção deve aparecer com destaque visual na lista de produtos. |
| 4 | O sistema deve ter uma aba com a opção de ativar e desativar promoção. |
| 5 | O produto deve ter um valor final após o desconto adicionado. |

##### Regra de Negócios

| # | Regra |
| :--- | :--- |
| 1 | O preço promocional deve ser menor que o preço original. |
| 2 | Somente produtos com visibilidade ativa em estoque podem ser marcados como promoção. |
| 3 | A promoção deve estar vinculada a um único produto por vez, tendo seu próprio preço promocional independente. |
| 4 | O sistema deve ter uma opção de ativar e desativar promoção do produto. |
| 5 | A promoção deve ter uma data de inicio e uma data de término. |

##### Estimativa

Complexidade: **Alta**

---

#### US05 - Cadastrar o endereço completo da loja e os horários de funcionamento por dia da semana

| Campo | Descrição |
| :--- | :--- |
| **ID** | US05 |
| **Título** | Cadastrar o endereço completo da loja e os horários de funcionamento por dia da semana |
| **Status** | Implementar |
| **Link da Issue** | #43 |

##### Descrição

Enquanto Dono de Loja de Materiais de Construção, desejo cadastrar o endereço completo da loja e os horários de funcionamento por dia da semana, para enviar facilmente essas informações aos clientes quando solicitarem.

##### Critérios de Aceitação

| # | Critério |
| :--- | :--- |
| 1 | O sistema deve permitir cadastrar o endereço completo da loja (rua, número, bairro, cidade). |
| 2 | O sistema deve permitir cadastrar o horário de funcionamento da loja. |
| 3 | O lojista deve conseguir editar o endereço e o horário depois de cadastrados. |
| 4 | O sistema deve exibir as informações salvas na área de perfil da loja. |
| 5 | As informações de endereço e horário devem estar disponíveis para compartilhamento com clientes. |

##### Regra de Negócios

| # | Regra |
| :--- | :--- |
| 1 | O endereço da loja é obrigatório para salvar o cadastro e o sistema não deve permitir salvar sem informar pelo menos rua e cidade. |
| 2 | O horário de funcionamento deve seguir um formato válido. |

##### Estimativa

Complexidade: **Alta**

---

### 4.2. Persona: Profissional

#### US06 - Enviar e receber mensagens de texto em tempo real com um profissional no chat do app

| Campo | Descrição |
| :--- | :--- |
| **ID** | US06 |
| **Título** | Enviar e receber mensagens de texto em tempo real com um profissional no chat do app |
| **Status** | Implementar |
| **Link da Issue** | #76 |

##### Descrição

Enquanto Cliente, desejo enviar e receber mensagens de texto em tempo real com um profissional no chat do app, para alinhar orçamentos, escopos e datas.

##### Critérios de Aceitação

| # | Critério |
| :--- | :--- |
| 1 | O sistema deve permitir que a mensagem digitada surja na tela imediatamente com um marcador de "Enviado" ao tocar em enviar na interface de chat. |
| 2 | O sistema deve permitir a visualização da marcação de leitura ("Lida") ao lado da mensagem enviada após o profissional visualizar a conversa. |
| 3 | O sistema deve permitir a exibição de um balão automático de aviso de segurança após processar o envio de uma mensagem contendo uma string formatada como número de celular. |

##### Regra de Negócios

| # | Regra |
| :--- | :--- |
| 1 | Varredura de padrões (RegEx) para identificação de números telefônicos e links, visando disparar alertas de educação e segurança da plataforma. |

##### Estimativa

Complexidade: **Alta**

---

#### US07 - Validar meu acesso por código enviado ao celular, com opção de ouvir via TTS

| Campo | Descrição |
| :--- | :--- |
| **ID** | US07 |
| **Título** | Validar meu acesso por código enviado ao celular, com opção de ouvir via TTS |
| **Status** | Implementar |
| **Link da Issue** | #27 |

##### Descrição

Enquanto profissional, desejo validar meu acesso por código enviado ao celular, com opção de ouvir via TTS, para entrar de forma rápida, segura e sem precisar de senha, mesmo em ambiente de trabalho.

##### Critérios de Aceitação

| # | Critério |
| :--- | :--- |
| 1 | O profissional deve informar seu número de celular. |
| 2 | O sistema deve enviar automaticamente um código de verificação (OTP). |
| 3 | O código deve conter entre 4 a 6 dígitos numéricos. |
| 4 | O usuário deve conseguir inserir o código manualmente. |
| 5 | O aplicativo deve oferecer a opção de ouvir o código via TTS. |
| 6 | O sistema deve validar o código corretamente. |
| 7 | Deve existir opção de reenviar o código. |
| 8 | O sistema deve exibir erro para código inválido ou expirado. |
| 9 | O acesso deve ocorrer sem uso de senha. |

##### Regra de Negócios

| # | Regra |
| :--- | :--- |
| 1 | O código expira em tempo definido de 5 minutos. |
| 2 | O número de tentativas é limitado, somente 5 tentativas. |
| 3 | Após limite excedido, o acesso é bloqueado temporariamente durante 30 minutos. |
| 4 | O número de celular deve ser único por conta. |
| 5 | O sistema deve mascarar o número exibido. |
| 6 | O TTS é opcional. |
| 7 | Deve haver controle de envio de código (anti-spam). |
| 8 | O login cria sessão autenticada no dispositivo. |

##### Estimativa

Complexidade: **Alta**

---

#### US08 - Criar meu perfil com informações, serviços e fotos, com apoio de TTS

| Campo | Descrição |
| :--- | :--- |
| **ID** | US08 |
| **Título** | Criar meu perfil com informações, serviços e fotos, com apoio de TTS |
| **Status** | Implementar |
| **Link da Issue** | #28 |

##### Descrição

Enquanto profissional, desejo criar meu perfil com informações, serviços e fotos, com apoio de TTS, para me tornar visível na plataforma e aumentar minhas chances de conseguir trabalho.

##### Critérios de Aceitação

| # | Critério |
| :--- | :--- |
| 1 | O profissional deve preencher nome (mín. 3 caracteres), categoria (obrigatória) e descrição (mín. 20 caracteres). |
| 2 | O sistema deve permitir adicionar até 5 fotos de serviços realizados (portfólio de trabalhos do profissional). |
| 3 | Cada foto deve ter no máximo 5MB, estar nos formatos JPG ou PNG e representar serviços executados pelo profissional. |
| 4 | O sistema deve permitir edição do perfil a qualquer momento. |
| 5 | O app deve oferecer leitura via TTS das instruções, podendo ser ativada ou desativada pelo usuário. |
| 6 | O perfil é considerado salvo quando todos os campos obrigatórios forem válidos e o sistema exibir a mensagem “Perfil salvo com sucesso”. |
| 7 | O perfil é considerado completo quando nome, categoria e descrição forem válidos e houver pelo menos 1 foto válida no portfólio. |
| 8 | O profissional só poderá receber ofertas quando o perfil estiver completo, caso contrário o sistema deve bloquear e exibir “Complete seu perfil para receber ofertas”. |

##### Regra de Negócios

| # | Regra |
| :--- | :--- |
| 1 | Nome, categoria e descrição são obrigatórios com validações mínimas definidas. |
| 2 | Perfis incompletos não são exibidos para clientes e não recebem ofertas. |
| 3 | O portfólio permite no máximo 5 fotos, cada uma com até 5MB, nos formatos JPG ou PNG e relacionadas aos serviços do profissional. |
| 4 | O profissional pode editar o perfil a qualquer momento. |
| 5 | O TTS é opcional e pode ser ativado ou desativado. |

##### Estimativa

Complexidade: **Alta**

---

#### US09 - Enquanto profissional, desejo visualizar e aceitar ofertas de serviço disponíveis para me candidatar rapidamente a oportunidades de trabalho compatíveis com minha área.

| Campo | Descrição |
| :--- | :--- |
| **ID** | US09 |
| **Título** | Enquanto profissional, desejo visualizar e aceitar ofertas de serviço disponíveis para me candidatar rapidamente a oportunidades de trabalho compatíveis com minha área. |
| **Status** | Implementar |
| **Link da Issue** | #29 |

##### Descrição

Enquanto profissional, desejo visualizar e aceitar ofertas de serviço disponíveis para me candidatar rapidamente a oportunidades de trabalho compatíveis com minha área.

##### Critérios de Aceitação

| # | Critério |
| :--- | :--- |
| 1 | O sistema deve notificar o profissional sobre novas ofertas. |
| 2 | O profissional deve visualizar a lista de ofertas com nome do serviço, cliente, valor, data, horário e endereço. |
| 3 | O profissional deve visualizar na tela de detalhes do serviço as informações completas contendo nome do serviço, nome do cliente, status do serviço |
| 4 | O status do serviço exibido nos detalhes deve assumir os valores “Aguardando aprovação”, “Em andamento” ou “Concluído”, permitindo ações como cancelar ou reabrir quando aplicável. |
| 5 | O botão “Aceitar Oferta” deve estar disponível diretamente no card da oferta na lista principal. |
| 6 | Deve existir o botão “Cancelar” disponível após a candidatura, permitindo desistir quando aplicável. |
| 7 | Ao aceitar a oferta, o profissional deve ser incluído na lista de candidatos. |
| 8 | O sistema deve exibir a mensagem “Candidatura registrada com sucesso”. |

##### Regra de Negócios

| # | Regra |
| :--- | :--- |
| 1 | Apenas profissionais com perfil completo podem aceitar ofertas. |
| 2 | Um profissional não pode ter mais de uma candidatura ativa para a mesma oferta, podendo cancelar a candidatura e se candidatar novamente enquanto o status estiver “Aguardando aprovação”. |
| 3 | Após aceitar a oferta, o botão deve ser desabilitado ou alterado para indicar o novo status. |
| 4 | A ação “Cancelar” não deve gerar nova candidatura e deve apenas alterar o estado atual quando permitido. |
| 5 | A lista de candidatos deve ser atualizada imediatamente após a candidatura. |
| 6 | O status “Aguardando aprovação” permanece até a decisão do cliente. |

##### Estimativa

Complexidade: **Alta**

---

#### US10 - Confirmar no aplicativo que fechei um acordo com o cliente após contato externo

| Campo | Descrição |
| :--- | :--- |
| **ID** | US10 |
| **Título** | Confirmar no aplicativo que fechei um acordo com o cliente após contato externo |
| **Status** | Implementar |
| **Link da Issue** | #30 |

##### Descrição

Enquanto profissional, desejo confirmar no aplicativo que fechei um acordo com o cliente após contato externo, para iniciar o serviço oficialmente com segurança e registro na plataforma.

##### Critérios de Aceitação

| # | Critério |
| :--- | :--- |
| 1 | O botão “Acordo Fechado! Iniciar Serviço” deve estar disponível após contratação. |
| 2 | Ao clicar, o sistema deve notificar o cliente. |
| 3 | O cliente deve confirmar o início do serviço. |
| 4 | O app deve oferecer leitura via TTS dos termos do acordo. |
| 5 | O serviço deve ser iniciado apenas após confirmação do cliente. |
| 6 | O status deve mudar para “Andamento”. |

##### Regra de Negócios

| # | Regra |
| :--- | :--- |
| 1 | O contato inicial deve ocorrer por meio de chat interno disponível no aplicativo. |
| 2 | O serviço só inicia com confirmação dupla (profissional + cliente). |
| 3 | O sistema registra data/hora de início. |
| 4 | Sem confirmação do cliente, o serviço não é formalizado. |
| 5 | O TTS deve ser opcional. |

##### Estimativa

Complexidade: **Alta**

---

#### US11 - Finalizar o serviço no aplicativo e permitir a avaliação do cliente

| Campo | Descrição |
| :--- | :--- |
| **ID** | US11 |
| **Título** | Finalizar o serviço no aplicativo e permitir a avaliação do cliente |
| **Status** | Implementar |
| **Link da Issue** | #31 |

##### Descrição

Enquanto profissional, desejo finalizar o serviço no aplicativo e permitir a avaliação do cliente, para registrar minha entrega e melhorar minha reputação na plataforma.

##### Critérios de Aceitação

| # | Critério |
| :--- | :--- |
| 1 | Deve existir opção “Detalhe do Serviço” para visualizar informações completas do serviço. |
| 2 | Deve existir botão “Finalizar Serviço”. |
| 3 | Ao finalizar, o status deve mudar para “Concluído”. |
| 4 | O sistema deve solicitar avaliação ao cliente após a finalização. |
| 5 | O app deve oferecer TTS opcional para leitura das instruções de avaliação. |
| 6 | O profissional deve poder adicionar fotos do serviço realizado. |
| 7 | A avaliação deve ser registrada no sistema. |

##### Regra de Negócios

| # | Regra |
| :--- | :--- |
| 1 | A avaliação está vinculada ao serviço concluído. |
| 2 | A reputação é baseada nas avaliações recebidas. |
| 3 | Fotos podem ser exibidas no perfil do profissional. |
| 4 | Um serviço só pode ser finalizado uma vez. |
| 5 | O sistema agenda a avaliação para o cliente caso ele não responda imediatamente. |

##### Estimativa

Complexidade: **Alta**

---

### 4.3. Persona: Suporte

#### US12 - Receber e enviar prints nos chats de suporte

| Campo | Descrição |
| :--- | :--- |
| **ID** | US12 |
| **Título** | Receber e enviar prints nos chats de suporte |
| **Status** | Implementar |
| **Link da Issue** | #44 |

##### Descrição

Enquanto suporte, desejo receber e enviar prints nos chats de suporte, para permitir uma maior facilidade de atendimento.

##### Critérios de Aceitação

| # | Critério |
| :--- | :--- |
| 1 | O usuário de suporte pode enviar imagens de prints do aplicativo no chat utilizando o botão "enviar imagem". |
| 2 | O usuário de suporte pode clicar na imagem para ver com um maior zoom, preenchendo toda a tela. |
| 3 | O usuário de suporte não pode enviar texto e imagem na mesma mensagem. |

##### Regra de Negócios

| # | Regra |
| :--- | :--- |
| 1 | Não deve ser possível enviar mais do que duas imagens por minuto. Fazer tal ação exibe um alerta. |
| 2 | O sistema deve armazenar as imagens enviadas de ambas as partes por um prazo de 60 dias. |

##### Estimativa

Complexidade: **Alta**

---

#### US13 - Ter um sistema de registro de atendimentos (Logs), na qual terá o registro de todos os chats de suporte que tive

| Campo | Descrição |
| :--- | :--- |
| **ID** | US13 |
| **Título** | Ter um sistema de registro de atendimentos (Logs), na qual terá o registro de todos os chats de suporte que tive |
| **Status** | Implementar |
| **Link da Issue** | #19 |

##### Descrição

Enquanto Suporte, desejo ter um sistema de registro de atendimentos (Logs), na qual terá o registro de todos os chats de suporte que tive, para melhorar como suporte ao analisar os problemas passados.

##### Critérios de Aceitação

| # | Critério |
| :--- | :--- |
| 1 | O usuário de suporte pode registrar novos logs utilizando o sistema de logs. |
| 2 | O usuário de suporte pode excluir logs, contanto que disponha uma justificativa para tal. |
| 3 | O usuário de suporte pode editar logs passados. |
| 4 | O usuário pode fazer um link com um chat de suporte específico no log, contanto que tal chat já estaja com status de finalizado. |

##### Regra de Negócios

| # | Regra |
| :--- | :--- |
| 1 | Todos os chats de suporte que foram excluídos devem ser armazenados em forma de backup. |

##### Estimativa

Complexidade: **Alta**

---

#### US14 - Enquanto Suporte, desejo enviar áudio no chat de suporte para melhor comunicação com o cliente sobre seu problema.

| Campo | Descrição |
| :--- | :--- |
| **ID** | US14 |
| **Título** | Enquanto Suporte, desejo enviar áudio no chat de suporte para melhor comunicação com o cliente sobre seu problema. |
| **Status** | Implementar |
| **Link da Issue** | #22 |

##### Descrição

Enquanto Suporte, desejo enviar áudio no chat de suporte para melhor comunicação com o cliente sobre seu problema.

##### Critérios de Aceitação

| # | Critério |
| :--- | :--- |
| 1 | *: |
| 2 | O usuário de suporte clica no ícone de "mandar áudio", mantém pressionado para gravar e solta para enviar quando satisfeito. |
| 3 | O usuário de suporte pode enviar quantos áudios quiser. |
| 4 | O usuário de suporte cancela a gravação deslizando o botão para cima. |
| 5 | Áudios têm no máximo 2 minutos. Gravações que excedem esse limite são rejeitadas com alerta. |
| 6 | O usuário de suporte pode clicar para ouvir o próprio áudio enviado no chat. |
| 7 | *Regras de negócio**: |
| 8 | Áudios enviados podem ter, no máximo, dois minutos. |

##### Regra de Negócios

| # | Regra |
| :--- | :--- |
| 1 | *: |
| 2 | Áudios enviados podem ter, no máximo, dois minutos. |

##### Estimativa

Complexidade: **Alta**

---

#### US15 - Enquanto Suporte, desejo um chat de suporte exclusivo para entrar em contato com clientes que precisam de ajuda, auxiliando de forma fácil, prática e rápida.

| Campo | Descrição |
| :--- | :--- |
| **ID** | US15 |
| **Título** | Enquanto Suporte, desejo um chat de suporte exclusivo para entrar em contato com clientes que precisam de ajuda, auxiliando de forma fácil, prática e rápida. |
| **Status** | Implementar |
| **Link da Issue** | #21 |

##### Descrição

Enquanto Suporte, desejo um chat de suporte exclusivo para entrar em contato com clientes que precisam de ajuda, auxiliando de forma fácil, prática e rápida.

##### Critérios de Aceitação

| # | Critério |
| :--- | :--- |
| 1 | *: |
| 2 | O sistema conecta o suporte e cliente automaticamente via chat. |
| 3 | O suporte define um chat como "problema resolvido" após o término. |
| 4 | O status do chat "problema resolvido" só é permitido após no mínimo 1 minuto de conversa ativa. |
| 5 | O suporte transita entre até quatro chats simultâneos livremente. |
| 6 | *Regras de negócio**: |
| 7 | Máximo de 4 chats simultâneos por suporte. |
| 8 | Toda nova conversa envia uma mensagem automática ao cliente explicando o funcionamento do suporte e os valores da empresa com o cliente. |

##### Regra de Negócios

| # | Regra |
| :--- | :--- |
| 1 | *: |
| 2 | Máximo de 4 chats simultâneos por suporte. |
| 3 | Toda nova conversa envia uma mensagem automática ao cliente explicando o funcionamento do suporte e os valores da empresa com o cliente. |

##### Estimativa

Complexidade: **Alta**

---

#### US16 - Trocar de canal do chat de suporte para Whatsapp

| Campo | Descrição |
| :--- | :--- |
| **ID** | US16 |
| **Título** | Trocar de canal do chat de suporte para Whatsapp |
| **Status** | Implementar |
| **Link da Issue** | #20 |

##### Descrição

Enquanto suporte, desejo trocar de canal do chat de suporte para Whatsapp, para ter um ambiente melhor para o cliente.

##### Critérios de Aceitação

| # | Critério |
| :--- | :--- |
| 1 | *: |
| 2 | O usuário pode trocar o canal de comunicação para o Whatsapp ao pressionar a opção "Alternar canal de comunicação". |
| 3 | O usuário poderá colocar o chat como "problema resolvido" sem nenhum impedimento após a troca de canal. |
| 4 | O máximo de quatro chats também vale para o chat com canal no Whatsapp, enquanto não estiver com o status de "problema resolvido". |
| 5 | *Regras de negócio**: |
| 6 | O Suporte deverá pedir permissão do cliente para poder trocar de canal. |

##### Regra de Negócios

| # | Regra |
| :--- | :--- |
| 1 | *: |
| 2 | O Suporte deverá pedir permissão do cliente para poder trocar de canal. |

##### Estimativa

Complexidade: **Alta**

---

### 4.4. Persona: Cliente

#### US17 - Acionar a funcionalidade de texto para voz nos rótulos do formulário

| Campo | Descrição |
| :--- | :--- |
| **ID** | US17 |
| **Título** | Acionar a funcionalidade de texto para voz nos rótulos do formulário |
| **Status** | Implementar |
| **Link da Issue** | #70 |

##### Descrição

Enquanto Cliente com dificuldades de leitura, desejo acionar a funcionalidade de texto para voz nos rótulos do formulário, para compreender de forma auditiva as informações solicitadas.

##### Critérios de Aceitação

| # | Critério |
| :--- | :--- |
| 1 | O sistema deve permitir a reprodução em áudio do rótulo do campo ao clicar no ícone de alto-falante ao lado de um campo durante o preenchimento. |
| 2 | O sistema deve permitir a interrupção instantânea da reprodução ao clicar novamente no ícone de alto-falante enquanto um áudio está sendo reproduzido. |
| 3 | O sistema deve permitir a exibição de uma notificação em texto sugerindo o aumento do volume do dispositivo ao clicar em "Ouvir" com o volume no mudo. |

##### Regra de Negócios

| # | Regra |
| :--- | :--- |
| 1 | O sistema de TTS deve utilizar uma voz sintetizada humanizada em Português (PT-BR). |

##### Estimativa

Complexidade: **Alta**

---

