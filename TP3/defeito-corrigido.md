# Relatório de Correção de Defeitos - Trabalho Prático III

Este documento detalha o processo de **Correção dos Defeitos** identificados durante a inspeção de requisitos do Trabalho Prático III. O objetivo é apresentar as análises realizadas, os problemas encontrados e as soluções implementadas para aprimorar a qualidade e a clareza das User Stories (US) do backlog do projeto.

---

##  Sumário Executivo dos Defeitos Corrigidos

A tabela a seguir apresenta um resumo conciso dos defeitos abordados neste relatório, categorizados por User Story, tipo de defeito e uma breve descrição do problema central.

| ID do Defeito | US Afetada | Tipo de Defeito | Descrição Sumária do Problema |
| :------------ | :--------- | :-------------- | :---------------------------- |
| 1             | US 01      | Inconsistência  | Ausência de validação obrigatória para datas de início e término de promoções nos Critérios de Aceitação (CA). |
| 2             | US 01      | Omissão         | Contradição entre Regra de Negócio (RN) e CA sobre a obrigatoriedade e comportamento do sistema para o período de vigência de promoções. |
| 3             | US 02      | Ambiguidade     | Falta de especificação do canal de compartilhamento de informações de endereço e horário, e inconsistência nos campos obrigatórios de endereço. |
| 4             | US 02      | Inconsistência  | Ambiguidade no formato de horário e ausência de detalhamento da interface para inserção de horários por dia da semana. |
| 5             | US 06      | Inconsistência  | Conflito entre a menção de "contato externo" na US e a obrigatoriedade de "chat interno" na RN para formalização de acordos. |
| 6             | US 04      | Omissão         | Indefinição de prazos e mecanismos para o agendamento automático de avaliações de clientes. |
| 7             | US 14      | Omissão         | Ausência de regras claras de governança, acesso e gestão de concorrência para o chat de suporte. |
| 8             | US 08      | Inconsistência  | Perda de rastreabilidade e auditoria ao migrar atendimentos para o WhatsApp, e falha na liberação de slots de atendente. |
| 9             | US 15      | Ambiguidade     | Falta de especificação do escopo de leitura do Text-to-Speech (TTS) para elementos de formulário e inconsistências de usabilidade. |

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
