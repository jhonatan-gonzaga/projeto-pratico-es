# Relatório de Correção de Defeitos - Trabalho Prático III

Este documento detalha o processo de **Correção dos Defeitos** identificados durante a inspeção de requisitos do Trabalho Prático III. O objetivo é apresentar as análises realizadas, os problemas encontrados e as soluções implementadas para aprimorar a qualidade e a clareza das User Stories (US) do backlog do projeto.

---

##  Detalhamento das Correções Implementadas

Cada seção a seguir apresenta o detalhamento de cada defeito, sua descrição, a solução aplicada e, quando aplicável, as User Stories ajustadas.

### Defeito 1 & 2: Inconsistência e Omissão em US 01

**Número da US:** 01
**Número do Defeito:** 1 e 2
**Tipo de Defeito:** Inconsistência e Omissão

**Descrição do Problema:**
> A Regra de Negócio estabelece que uma promoção deve obrigatoriamente possuir uma data de início e uma data de término. No entanto, os Critérios de Aceitação (CA) originais omitiram essa validação, permitindo a criação de promoções incompletas. Adicionalmente, não havia instruções claras sobre o comportamento esperado do sistema (como a desativação automática do destaque visual e do preço promocional) assim que a data de término fosse atingida, gerando uma contradição entre a RN e os CAs.

**Solução:**
> Foram adicionados novos Critérios de Aceitação na User Story para garantir a validação obrigatória dos campos de data de início e término no momento do cadastro. Além disso, foi especificado que o sistema deve executar a desativação automática do status de promoção e do destaque visual assim que o período de vigência expirar, assegurando a integridade dos preços exibidos aos clientes.
---
### Defeito 3 & 4: Ambiguidade e Inconsistência em US 02

**Número da US:** 02
**Número do Defeito:** 3 e 4
**Tipo de Defeito:** Ambiguidade e Inconsistência

**Descrição do Problema:**
> O Critério de Aceitação original mencionava o compartilhamento de informações com clientes, mas de forma ambígua, sem especificar o canal (interno ou externo). O projeto conta com um chat interno, e o requisito precisava deixar explícito se o compartilhamento seria integrado a essa ferramenta. Havia também uma inconsistência entre o primeiro CA (que exigia endereço completo) e a primeira Regra de Negócio (que permitia salvar apenas com rua e cidade). Por fim, a RN era ambígua ao exigir um "formato válido" para o horário de funcionamento sem especificar o padrão técnico (ex: 24h), e os CAs não detalhavam a interação do usuário para inserção desses horários.

**Solução:**
> Foi especificado no Critério de Aceitação que o compartilhamento das informações de endereço e horário deve ser feito de forma direta e integrada dentro do próprio chat interno do sistema, com uma opção dedicada ao WhatsApp. O critério de preenchimento do endereço foi ajustado para refletir a Regra de Negócio, exigindo apenas rua, número, bairro, cidade para o salvamento. Na Regra de Negócio, o formato oficial de horário foi especificado como 24 horas (HH:MM às HH:MM). Um novo CA foi adicionado para detalhar que a interface deve fornecer campos separados para abertura e fechamento por dia da semana, incluindo a opção para marcar o dia como "Fechado".
---
### Defeito 5: Inconsistência em US 06

**Número da US:** 06
**Número do Defeito:** 5
**Tipo de Defeito:** Inconsistência

**Descrição do Problema:**
> O texto principal da US 06 afirmava que o acordo era fechado "após contato externo", o que contradizia a primeira Regra de Negócio que determinava obrigatoriamente que o "contato inicial deve ocorrer por meio de chat interno". Além disso, o título original da US era "Finalizar Serviço e Permitir Avaliação", mas o escopo real tratava exclusivamente do início/formalização do serviço.

**Solução:**
> O texto descritivo da US 06 foi corrigido para remover a menção a "contato externo", alinhando-a à regra de que a interação ocorre no chat interno. O título da US foi ajustado para "Formalizar Acordo e Iniciar Serviço" para refletir seu real propósito. Adicionalmente, um Critério de Aceitação foi incluído para especificar que o gatilho para iniciar o acordo deve estar acessível dentro da própria tela do chat interno com o cliente.
---
### Defeito 6: Omissão em US 04

**Número da US:** 04
**Número do Defeito:** 6
**Tipo de Defeito:** Omissão

**Descrição do Problema:**
> A Regra de Negócio mencionava um mecanismo de contingência crítico: o agendamento automático da avaliação caso o cliente não responda de imediato. No entanto, os Critérios de Aceitação deixavam uma lacuna técnica e de negócio ao não definir o que significa "imediatamente", qual o prazo limite para a resposta direta, como o sistema agendaria essa tarefa em segundo plano e qual canal de notificação seria usado para alertar o cliente posteriormente. O CA original também não especificava o canal da solicitação inicial.

**Solução:**
> Foram adicionados Critérios de Aceitação que estipulam o prazo de tolerância de 24 horas para a resposta imediata. Foi definido o comportamento do agendamento (envio de lembretes periódicos via notificação push) e o prazo limite final de 7 dias para que a avaliação seja computada. Além disso, foi especificado que a solicitação inicial de avaliação ocorre dentro do chat interno assim que o profissional finaliza o serviço.
---
### Defeito 7: Omissão em US 14

**Número da US:** 14
**Número do Defeito:** 7
**Tipo de Defeito:** Omissão

**Descrição do Problema:**
> O requisito falhava ao não estabelecer as regras de governança, restrições de acesso e políticas de concorrência do chat de suporte. Não estava claro o gatilho que permite ao cliente abrir esse canal (se qualquer usuário pode iniciar a qualquer momento ou apenas quem possui um serviço ativo/recente), se havia limitação por horário de atendimento e como o sistema gerenciava a fila de espera quando múltiplos atendentes e clientes estavam online simultaneamente.

**Solução:**
> Foram adicionados Critérios de Aceitação que definem a existência de uma fila de atendimento e o gatilho de abertura do chat (acesso através de uma central de ajuda vinculada a um perfil ou pedido, para clientes com conta ativa). Foi detalhado o comportamento do sistema para lidar com a inatividade do cliente, permitindo liberar o slot do atendente após 5 minutos. Nas Regras de Negócio, foi especificado o horário de funcionamento (08:00 às 18:00) e as mensagens de indisponibilidade fora desse período.
---
### Defeito 8: Inconsistência em US 08

**Número da US:** 08
**Número do Defeito:** 8
**Tipo de Defeito:** Inconsistência

**Descrição do Problema:**
> O requisito criava uma quebra no fluxo de auditoria e governança do sistema ao migrar o atendimento para um ambiente externo (WhatsApp), perdendo a rastreabilidade da conversa. O critério original permitia encerrar o chamado como "problema resolvido" imediatamente após a migração, sem prova de solução. Havia também um erro de concorrência, pois manter o atendimento externo preso ao limite de slots do atendente no app era inviável, já que o sistema não detectava o término da conversa no WhatsApp.

**Solução:**
> O direcionamento para o WhatsApp foi redefinido como uma ação de transbordo. O sistema agora deve registrar um log contendo o motivo da transferência e o consentimento do cliente antes de redirecionar. A sessão no aplicativo não é mais marcada como "resolvida"; em vez disso, o status muda para "Transferido para o WhatsApp" ou "Em atendimento externo", liberando o slot do atendente para que a fila interna continue. O encerramento definitivo e a avaliação do suporte de chamados transferidos serão disparados de forma assíncrona por e-mail ou central de notificações após 24 horas da transferência.
---
### Defeito 9: Ambiguidade em US 15

**Número da US:** 15
**Número do Defeito:** 9
**Tipo de Defeito:** Ambiguidade

**Descrição do Problema:**
> O requisito era ambíguo ao não especificar quais elementos de interface faziam parte do escopo de leitura do Text-to-Speech (TTS), gerando dúvidas se cobriria apenas o rótulo do campo ou também textos de ajuda e mensagens de erro. Havia uma falha de usabilidade e acessibilidade nos Critérios de Aceitação, com inconsistência na nomenclatura do componente de acionamento (ícone de alto-falante vs "Ouvir") e uma abordagem inadequada para detecção de volume de hardware.

**Solução:**
> Foi delimitado explicitamente no escopo da User Story e nos Critérios de Aceitação que o TTS cobrirá o rótulo principal, a descrição de ajuda e as mensagens de erro associadas ao campo, seguindo a ordem: Rótulo do campo → Texto de ajuda/instrução (se houver) → Mensagem de erro ativa (se houver). A nomenclatura do componente de acionamento foi padronizada para "ícone de alto-falante". O critério de volume foi ajustado para focar em uma indicação visual simples e acessível na interface (animação de ondas sonoras) e um aviso textual/visual sugerindo a ativação do som caso o sistema detecte que a saída de áudio está silenciada. Uma nova Regra de Negócio foi adicionada para que o TTS leia as opções de campos de seleção (combobox, checkbox e radio button) de forma individualizada. 

---

### Defeito 10: Omissão em US (#28)

**Número da US:** 05

**Número do Defeito:** 10

**Tipo de Defeito:** Omissão


**Descrição do Problema:**

> O requisito não define quais informações são obrigatórias para o perfil. Pode haver omissão de dados essenciais (ex.: nome, contato, área de atuação), o que compromete a completude do requisito e pode gerar inconsistências no uso da plataforma.

**Solução:**
> Definir no requisito os campos obrigatórios do perfil profissional, evitando ambiguidades e inconsistências no cadastro.
Adicionar regras de validação para garantir que informações essenciais sejam preenchidas antes da publicação do perfil.
Descrever de forma mais clara quais dados podem ser incluídos em “informações e serviços” e como o suporte de TTS funcionará durante a criação do perfil.

---

### Defeito 11: Ambiguidade em US 

**Número do Defeito:** 11

**Tipo de Defeito:** ambiguidade

**Descrição do Problema:**
> O Critério de Aceitação define dois estados distintos — "perfil salvo" e "perfil completo" — com condições diferentes, mas a Regra de Negócio não faz essa distinção, agrupando tudo em uma única regra e podendo gerar confusão na implementação.


**Solução:**
> Separar claramente os conceitos de “perfil salvo” e “perfil completo” nas Regras de Negócio, mantendo consistência com os Critérios de Aceitação.
Especificar que um perfil salvo representa apenas o cadastro válido das informações obrigatórias, enquanto o perfil completo corresponde ao perfil apto para exibição e recebimento de ofertas.
Detalhar explicitamente quais restrições se aplicam a cada estado do perfil, evitando interpretações diferentes durante a implementação.

---

### Defeito 12: Fato Incorreto em US 06 (#30)

**Número da US:** 06

**Número do Defeito:** 12

**Tipo de Defeito:** Fato Incorreto

**Descrição do Problema:**
> O requisito depende de uma ação fora da plataforma (acordo externo). Isso gera risco de fato incorreto, pois o sistema não tem como validar ou registrar adequadamente esse processo, comprometendo a confiabilidade da funcionalidade.

**Solução:**
> Definir no requisito como o sistema irá registrar e validar a confirmação do acordo realizado externamente, reduzindo inconsistências nas informações armazenadas.
Adicionar critérios de aceitação especificando quais dados devem ser informados no momento da confirmação (ex.: cliente, serviço acordado, data e status do acordo).
Especificar regras de negócio para deixar claro que a plataforma apenas registra a confirmação fornecida pelo profissional, sem validar automaticamente o acordo externo realizado entre as partes.

---

### Defeito 13: Fato Incorreto em US 07 (#29)

**Número da US:** 07

**Número do Defeito:** 12

**Tipo de Defeito:** Omissão

**Descrição do Problema:**
> O requisito não define critérios de compatibilidade entre ofertas e área do profissional. Isso gera omissão, pois não há clareza sobre como o sistema filtra ou valida as oportunidades, podendo resultar em ofertas irrelevantes ou incorretas para o usuário.

**Solução:**
> Adicionar critérios de aceitação definindo como o sistema identifica a compatibilidade entre as ofertas e a área de atuação do profissional.
Especificar regras de filtragem, considerando informações como categoria do serviço, habilidades cadastradas e localização do profissional.
Detalhar o comportamento do sistema para impedir ou sinalizar ofertas incompatíveis, garantindo que apenas oportunidades relevantes sejam exibidas ao usuário.

---

### Defeito 14 : Ambiguidade em US 03 (#27)

**Número da US:** 03

**Número do Defeito:** 14

**Tipo de Defeito:** Ambiguidade

**Descrição do Problema:**
> O requisito não detalha como o TTS será acionado (automático, botão, configuração). Essa falta de clareza gera ambiguidade na implementação e pode resultar em diferentes interpretações por parte da equipe de desenvolvimento.


**Solução:**
> Especificar no requisito como o recurso de TTS será acionado durante a validação do código de acesso.
Definir se a leitura do código ocorrerá automaticamente, por meio de um botão específico ou através de uma configuração de acessibilidade ativada pelo usuário.
Adicionar critérios de aceitação detalhando o comportamento do TTS, incluindo quando a leitura será iniciada, possibilidade de repetição do código e controles de áudio disponíveis ao usuário


---


### Defeito 26 & 29: Omissão em US 12

**Número da US:** 12 (#22)

**Número do Defeito:** 26 e 29

**Tipo de Defeito:** Omissão

**Número da issue contendo o defeito:** #116 e #119 (Duplicado)

**Descrição do Problema:**

> O limite de 2 minutos para áudios é especificado tanto no Critério de Aceitação quanto na Regra de Negócio com o mesmo propósito funcional, sem que a RN acrescente qualquer informação complementar.

**Solução:**

> Adicionado a finalidade da regra na RN:
> 
> - Áudios enviados podem ter, no máximo, dois minutos **para limitar a consumo de armazenamento de dados.**

---

### Defeito 27: Inconsistência em US 06 e US 07

**Número da US:** 06 (#30) e 07 (#29)

**Número do Defeito:** 27

**Tipo de Defeito:** Inconsistência

**Número da issue contendo o defeito:** #118

**Descrição do Problema:**

> O Critério de Aceitação desta US usa o termo "Andamento" para nomear o status do serviço, enquanto a US #29 utiliza "Em andamento" para o mesmo estado. A inconsistência de nomenclatura entre histórias pode gerar divergência na implementação.

**Solução:**

> Mudança na nomeclatura do estado na US #30:O status deve mudar para “Em Andamento”.

---

### Defeito 28 & 30: Ambiguidade em US 10

**Número da US:** 10 (#26)

**Número do Defeito:** 28 e 30

**Tipo de Defeito:** Ambiguidade

**Número da issue contendo o defeito:** #114 e #115 (Duplicado)

**Descrição do Problema:**

> A Regra de Negócio afirma que a mensagem deve conter informações mínimas obrigatórias, sem definir quais são essas informações. O Critério de Aceitação já lista nome, preço e link, mas a RN deveria formalizar esse conjunto com precisão.

**Solução:**

> - Adicionado as especificações na regra de negócio (RN): nome do produto, preço do produto e link da página, juntamente com o nome do aplicativo acima de todos (Conecta Obra Itacoatiara)

---

### Defeito 31: Ambiguidade em US 11

**Número da US:** 11 (#25)

**Número do Defeito:** 31

**Tipo de Defeito:** Ambiguidade

**Número da issue contendo o defeito:** #120

**Descrição do Problema:**

> A Regra de Negócio determina que o sistema deve revisar as informações para verificar se há erros, sem especificar quais erros devem ser verificados, quais validações são aplicadas ou qual o comportamento esperado do sistema ao encontrar um erro.

**Solução:**

> Especificados os erros:
> 
> As informações deve ser revisadas pelo sistema para verificar se há erros: Preço negativo ou não numérico.
> 
> Especificados o que ocorre caso o sistema encontre tais erros utilizando um CA:
> 
> Se houver algum erro identificado pelo sistema, impedir a atualização do preço e indicar ao usuário o erro via um sublinhado vermelho no campo estipulado.

---

### Defeito 32: Informação Estranha em US 09 e US 11

**Número da US:** 09 (#24) e 11 (#25)

**Número do Defeito:** 32

**Tipo de Defeito:** Informação Estranha

**Número da issue contendo o defeito:** #121

**Descrição do Problema:**

> O Critério de Aceitação restringe a edição apenas ao preço, sendo que a US #24 já prevê edição completa do produto, incluindo o preço. Criar uma funcionalidade isolada para editar apenas o preço, sem justificativa de UX ou negócio, introduz redundância sem valor agregado.

**Solução:**

> Excluído o CA in #25 dizendo que só é possível editar os preços. A #25 agora é uma US para o caso de editar especificamente o preço:~~Deve permitir editar apenas o preço~~

---

### Defeito 33: Omissão em US 08

**Número da US:** 08 (#20)

**Número do Defeito:** 33

**Tipo de Defeito:** Omissão

**Número da issue contendo o defeito:** #117

**Descrição do Problema:**

> A Regra de Negócio exige que o suporte peça permissão do cliente para trocar de canal, mas nenhum Critério de Aceitação valida esse fluxo — não está definido como a permissão é solicitada, o que ocorre se o cliente recusar e como o sistema registra essa ação.

**Solução:**

> Adicionado como o usuário de suporte solicita a permissão para a troca de canal:
> 
> - **[novo]** O usuário do suporte pode acionar a opção "Alternar para WhatsApp", o que gerará um link de redirecionamento oficial na tela do cliente, juntamente com um menu com duas opções em forma de botão: "Consentir troca para Whatsapp" e "Recusar troca para Whatsapp".
>     
> - **[novo]** O sistema só deve liberar o redirecionamento após o cliente clicar em um botão de consentimento ("Consentir troca para Whatsapp") na tela dele, aceitando continuar o atendimento fora do aplicativo.
>     
> - O cliente pode recusar a troca de canal clicando no botão "Recusar troca para Whatsapp".
>         
> 
> Adicionado o que acontece em cada uma das opções, juntamente como o sistema registra cada um dos casos:
> 
> - Caso o cliente recuse a troca de canal, a conversa continuará normalmente, com o sistema registrando no chat da consersa com uma mensagem visível para o cliente e o usuário de suporte dizendo "Troca de canal para Whatsapp Recusada"
>    
> - Ao confirmar a transferência, o chat interno atual deve ser encerrado com o status "Transferido para o WhatsApp", salvando automaticamente o histórico da conversa gerado até aquele momento na plataforma.
>     
> - Assim que o status mudar para "Transferido", o slot do atendente deve ser liberado imediatamente, permitindo que ele receba um novo chamado da fila interna.
>
