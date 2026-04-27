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

Esta seção detalha as Histórias de Usuário que estão atualmente na coluna **Implementação** do GitHub Projects, organizadas por persona. Todas as histórias listadas abaixo possuem **Prioridade Alta**, sendo consideradas críticas para o MVP do sistema.

### 4.1. Persona: Dono de Loja
> **Prioridade:** Alta

| ID | User Story | Critérios de Aceitação | Regras de Negócio |
| :--- | :--- | :--- | :--- |
| **US24** | Enquanto Dono de Loja de Materiais de Construção, desejo cadastrar produtos com foto, preço, adicionar descrição do produto e estoque para enviar rapidamente aos clientes pelo celular. | O sistema deve permitir adicionar foto do produto nos formatos JPG ou PNG, limitando o tamanho com no máximo 5MB.<br>O sistema deve permitir editar e excluir produtos cadastrados.<br>O sistema deve limitar a descrição do produto a no máximo 6 linhas.<br>O sistema deve permitir definir a visibilidade do produto por meio da opção "Disponível para venda".<br>O sistema deve exibir o produto para o cliente somente quando a opção "Disponível para venda" estiver ativada.<br>O sistema deve sinalizar os campos obrigatórios com "<br>" (Nome do produto, Preço<br>, Estoque<br>, Categoria<br>).<br>O sistema deve exibir mensagem de sucesso após salvar o produto. | O produto só pode ser salvo com as informações obrigatórias preenchidas: Nome do produto<br>, Preço<br>, Estoque<br>e Categoria<br>.<br>O estoque do produto não pode ser negativo.<br>Se a quantidade do estoque for igual a 0, o produto deve ficar automaticamente com a visibilidade desativada (off) e não deve aparecer para o cliente.<br>Apenas produtos com a opção "Disponível para venda" ativada podem ser exibidos no catálogo para o cliente. |
| **US25** | Enquanto Dono de Loja de Materiais de Construção, desejo atualizar o preço dos produtos rapidamente, para manter as informações corretas para meus clientes. | Deve permitir editar apenas o preço<br>A atualização deve ser salva imediatamente<br>O novo preço deve aparecer no catálogo | O preço não pode ser negativo<br>O preço deve aceitar apenas números<br>O sistema deve registrar a última atualização<br>As informações deve ser revisadas pelo sistema para verificar se há erros |
| **US26** | Enquanto Dono de Loja de Materiais de Construção, desejo compartilhar produtos pelo WhatsApp, para divulgar rapidamente para meus clientes. | O sistema deve permitir compartilhar um produto pelo WhatsApp a partir da página de detalhes do produto ou da lista de produtos.<br>Ao tocar em “Compartilhar no WhatsApp”, o sistema deve abrir o WhatsApp com uma mensagem pronta contendo o nome do produto, preço e link da página.<br>Se o produto estiver indisponível, o sistema deve informar isso na mensagem ou bloquear o envio.<br>O compartilhamento deve funcionar em dispositivos com WhatsApp instalado. | A mensagem deve conter informações mínimas obrigatórias<br>O compartilhamento deve utilizar dados atualizados do produto |
| **US42** | Enquanto Dono de Loja de Materiais de Construção, desejo marcar produtos como promoção com destaque visual e preço promocional, com opção de adicionar desconto, para divulgar ofertas rapidamente aos meus clientes e aumentar as vendas. | O sistema deve permitir marcar um produto como "em promoção".<br>O sistema deve permitir informar um preço promocional para o produto.<br>O produto marcado como promoção deve aparecer com destaque visual na lista de produtos.<br>O sistema deve ter uma aba com a opção de ativar e desativar promoção.<br>O produto deve ter um valor final após o desconto adicionado. | O preço promocional deve ser menor que o preço original.<br>Somente produtos com visibilidade ativa em estoque podem ser marcados como promoção.<br>A promoção deve estar vinculada a um único produto por vez, tendo seu próprio preço promocional independente.<br>O sistema deve ter uma opção de ativar e desativar promoção do produto.<br>A promoção deve ter uma data de inicio e uma data de término. |
| **US43** | Enquanto Dono de Loja de Materiais de Construção, desejo cadastrar o endereço completo da loja e os horários de funcionamento por dia da semana, para enviar facilmente essas informações aos clientes quando solicitarem. | O sistema deve permitir cadastrar o endereço completo da loja (rua, número, bairro, cidade).<br>O sistema deve permitir cadastrar o horário de funcionamento da loja.<br>O lojista deve conseguir editar o endereço e o horário depois de cadastrados.<br>O sistema deve exibir as informações salvas na área de perfil da loja.<br>As informações de endereço e horário devem estar disponíveis para compartilhamento com clientes. | O endereço da loja é obrigatório para salvar o cadastro e o sistema não deve permitir salvar sem informar pelo menos rua e cidade.<br>O horário de funcionamento deve seguir um formato válido. |

### 4.2. Persona: Profissional
> **Prioridade:** Alta

| ID | User Story | Critérios de Aceitação | Regras de Negócio |
| :--- | :--- | :--- | :--- |
| **US27** | Enquanto profissional, desejo validar meu acesso por código enviado ao celular, com opção de ouvir via TTS, para entrar de forma rápida, segura e sem precisar de senha, mesmo em ambiente de trabalho. | O profissional deve informar seu número de celular.<br>O sistema deve enviar automaticamente um código de verificação (OTP).<br>O código deve conter entre 4 a 6 dígitos numéricos.<br>O usuário deve conseguir inserir o código manualmente.<br>O aplicativo deve oferecer a opção de ouvir o código via TTS.<br>O sistema deve validar o código corretamente.<br>Deve existir opção de reenviar o código.<br>O sistema deve exibir erro para código inválido ou expirado.<br>O acesso deve ocorrer sem uso de senha. | O código expira em tempo definido de 5 minutos.<br>O número de tentativas é limitado, somente 5 tentativas.<br>Após limite excedido, o acesso é bloqueado temporariamente durante 30 minutos.<br>O número de celular deve ser único por conta.<br>O sistema deve mascarar o número exibido.<br>O TTS é opcional.<br>Deve haver controle de envio de código (anti<br>spam).<br>O login cria sessão autenticada no dispositivo. |
| **US28** | Enquanto profissional, desejo criar meu perfil com informações, serviços e fotos, com apoio de TTS, para me tornar visível na plataforma e aumentar minhas chances de conseguir trabalho. | O profissional deve preencher nome (mín. 3 caracteres), categoria (obrigatória) e descrição (mín. 20 caracteres).<br>O sistema deve permitir adicionar até 5 fotos de serviços realizados (portfólio de trabalhos do profissional).<br>Cada foto deve ter no máximo 5MB, estar nos formatos JPG ou PNG e representar serviços executados pelo profissional.<br>O sistema deve permitir edição do perfil a qualquer momento.<br>O app deve oferecer leitura via TTS das instruções, podendo ser ativada ou desativada pelo usuário.<br>O perfil é considerado salvo quando todos os campos obrigatórios forem válidos e o sistema exibir a mensagem “Perfil salvo com sucesso”.<br>O perfil é considerado completo quando nome, categoria e descrição forem válidos e houver pelo menos 1 foto válida no portfólio.<br>O profissional só poderá receber ofertas quando o perfil estiver completo, caso contrário o sistema deve bloquear e exibir “Complete seu perfil para receber ofertas”. | Nome, categoria e descrição são obrigatórios com validações mínimas definidas.<br>Perfis incompletos não são exibidos para clientes e não recebem ofertas.<br>O portfólio permite no máximo 5 fotos, cada uma com até 5MB, nos formatos JPG ou PNG e relacionadas aos serviços do profissional.<br>O profissional pode editar o perfil a qualquer momento.<br>O TTS é opcional e pode ser ativado ou desativado. |
| **US29** | Enquanto profissional, desejo visualizar e aceitar ofertas de serviço disponíveis para me candidatar rapidamente a oportunidades de trabalho compatíveis com minha área. | O sistema deve notificar o profissional sobre novas ofertas.<br>O profissional deve visualizar a lista de ofertas com nome do serviço, cliente, valor, data, horário e endereço.<br>O profissional deve visualizar na tela de detalhes do serviço as informações completas contendo nome do serviço, nome do cliente, status do serviço<br>O status do serviço exibido nos detalhes deve assumir os valores “Aguardando aprovação”, “Em andamento” ou “Concluído”, permitindo ações como cancelar ou reabrir quando aplicável.<br>O botão “Aceitar Oferta” deve estar disponível diretamente no card da oferta na lista principal.<br>Deve existir o botão “Cancelar” disponível após a candidatura, permitindo desistir quando aplicável.<br>Ao aceitar a oferta, o profissional deve ser incluído na lista de candidatos.<br>O sistema deve exibir a mensagem “Candidatura registrada com sucesso”. | Apenas profissionais com perfil completo podem aceitar ofertas.<br>Um profissional não pode ter mais de uma candidatura ativa para a mesma oferta, podendo cancelar a candidatura e se candidatar novamente enquanto o status estiver “Aguardando aprovação”.<br>Após aceitar a oferta, o botão deve ser desabilitado ou alterado para indicar o novo status.<br>A ação “Cancelar” não deve gerar nova candidatura e deve apenas alterar o estado atual quando permitido.<br>A lista de candidatos deve ser atualizada imediatamente após a candidatura.<br>O status “Aguardando aprovação” permanece até a decisão do cliente. |
| **US30** | Enquanto profissional, desejo confirmar no aplicativo que fechei um acordo com o cliente após contato externo, para iniciar o serviço oficialmente com segurança e registro na plataforma. | O botão “Acordo Fechado! Iniciar Serviço” deve estar disponível após contratação.<br>Ao clicar, o sistema deve notificar o cliente.<br>O cliente deve confirmar o início do serviço.<br>O app deve oferecer leitura via TTS dos termos do acordo.<br>O serviço deve ser iniciado apenas após confirmação do cliente.<br>O status deve mudar para “Andamento”. | O contato inicial deve ocorrer por meio de chat interno disponível no aplicativo.<br>O serviço só inicia com confirmação dupla (profissional + cliente).<br>O sistema registra data/hora de início.<br>Sem confirmação do cliente, o serviço não é formalizado.<br>O TTS deve ser opcional. |
| **US31** | Enquanto profissional, desejo finalizar o serviço no aplicativo e permitir a avaliação do cliente, para registrar minha entrega e melhorar minha reputação na plataforma. | Deve existir opção “Detalhe do Serviço” para visualizar informações completas do serviço.<br>Deve existir botão “Finalizar Serviço”.<br>Ao finalizar, o status deve mudar para “Concluído”.<br>O sistema deve solicitar avaliação ao cliente após a finalização.<br>O app deve oferecer TTS opcional para leitura das instruções de avaliação.<br>O profissional deve poder adicionar fotos do serviço realizado.<br>A avaliação deve ser registrada no sistema. | A avaliação está vinculada ao serviço concluído.<br>A reputação é baseada nas avaliações recebidas.<br>Fotos podem ser exibidas no perfil do profissional.<br>Um serviço só pode ser finalizado uma vez.<br>O sistema agenda a avaliação para o cliente caso ele não responda imediatamente. |

### 4.3. Persona: Suporte
> **Prioridade:** Alta

| ID | User Story | Critérios de Aceitação | Regras de Negócio |
| :--- | :--- | :--- | :--- |
| **US44** | Enquanto suporte, desejo receber e enviar prints nos chats de suporte, para permitir uma maior facilidade de atendimento. | O usuário de suporte pode enviar imagens de prints do aplicativo no chat utilizando o botão "enviar imagem".<br>O usuário de suporte pode clicar na imagem para ver com um maior zoom, preenchendo toda a tela.<br>O usuário de suporte não pode enviar texto e imagem na mesma mensagem. | Não deve ser possível enviar mais do que duas imagens por minuto. Fazer tal ação exibe um alerta.<br>O sistema deve armazenar as imagens enviadas de ambas as partes por um prazo de 60 dias. |
| **US19** | Enquanto Suporte, desejo ter um sistema de registro de atendimentos (Logs), na qual terá o registro de todos os chats de suporte que tive, para melhorar como suporte ao analisar os problemas passados. | O usuário de suporte pode registrar novos logs utilizando o sistema de logs.<br>O usuário de suporte pode excluir logs, contanto que disponha uma justificativa para tal.<br>O usuário de suporte pode editar logs passados.<br>O usuário pode fazer um link com um chat de suporte específico no log, contanto que tal chat já estaja com status de finalizado. | Todos os chats de suporte que foram excluídos devem ser armazenados em forma de backup. |
| **US22** | Enquanto Suporte, desejo enviar áudio no chat de suporte para melhor comunicação com o cliente sobre seu problema. | :<br>O usuário de suporte clica no ícone de "mandar áudio", mantém pressionado para gravar e solta para enviar quando satisfeito.<br>O usuário de suporte pode enviar quantos áudios quiser.<br>O usuário de suporte cancela a gravação deslizando o botão para cima.<br>Áudios têm no máximo 2 minutos. Gravações que excedem esse limite são rejeitadas com alerta.<br>O usuário de suporte pode clicar para ouvir o próprio áudio enviado no chat. | :<br>Áudios enviados podem ter, no máximo, dois minutos. |
| **US21** | Enquanto Suporte, desejo um chat de suporte exclusivo para entrar em contato com clientes que precisam de ajuda, auxiliando de forma fácil, prática e rápida. | :<br>O sistema conecta o suporte e cliente automaticamente via chat.<br>O suporte define um chat como "problema resolvido" após o término.<br>O status do chat "problema resolvido" só é permitido após no mínimo 1 minuto de conversa ativa.<br>O suporte transita entre até quatro chats simultâneos livremente. | :<br>Máximo de 4 chats simultâneos por suporte.<br>Toda nova conversa envia uma mensagem automática ao cliente explicando o funcionamento do suporte e os valores da empresa com o cliente. |
| **US20** | Enquanto suporte, desejo trocar de canal do chat de suporte para Whatsapp, para ter um ambiente melhor para o cliente. | :<br>O usuário pode trocar o canal de comunicação para o Whatsapp ao pressionar a opção "Alternar canal de comunicação".<br>O usuário poderá colocar o chat como "problema resolvido" sem nenhum impedimento após a troca de canal.<br>O máximo de quatro chats também vale para o chat com canal no Whatsapp, enquanto não estiver com o status de "problema resolvido". | :<br>O Suporte deverá pedir permissão do cliente para poder trocar de canal. |

### 4.4. Persona: Cliente
> **Prioridade:** Alta

| ID | User Story | Critérios de Aceitação | Regras de Negócio |
| :--- | :--- | :--- | :--- |
| **US70** | Enquanto Cliente com dificuldades de leitura, desejo acionar a funcionalidade de texto para voz nos rótulos do formulário, para compreender de forma auditiva as informações solicitadas. | falante ao lado de um campo durante o preenchimento.
O sistema deve permitir a interrupção instantânea da reprodução ao clicar novamente no ícone de alto<br>falante enquanto um áudio está sendo reproduzido.
O sistema deve permitir a exibição de uma notificação em texto sugerindo o aumento do volume do dispositivo ao clicar em "Ouvir" com o volume no mudo. | BR). |
| **US76** | Enquanto Cliente, desejo enviar e receber mensagens de texto em tempo real com um profissional no chat do app, para alinhar orçamentos, escopos e datas. | O sistema deve permitir que a mensagem digitada surja na tela imediatamente com um marcador de "Enviado" ao tocar em enviar na interface de chat.
O sistema deve permitir a visualização da marcação de leitura ("Lida") ao lado da mensagem enviada após o profissional visualizar a conversa.
O sistema deve permitir a exibição de um balão automático de aviso de segurança após processar o envio de uma mensagem contendo uma string formatada como número de celular.

 | Varredura de padrões (RegEx) para identificação de números telefônicos e links, visando disparar alertas de educação e segurança da plataforma. |
