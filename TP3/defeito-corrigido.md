# Correção de Defeitos - TP3

Este documento registra a etapa de **Correção dos Defeitos** do Trabalho Prático III. Após o processo de inspeção (Detecção, Coleção e Discriminação), os defeitos validados foram documentados e corrigidos para garantir a qualidade e a consistência das User Stories do backlog. Cada item abaixo descreve o problema identificado e a respectiva solução aplicada.

---

## Detalhamento das Correções

numero da US: 01
numero do defeito: 1
tipo de defeito: Inconsistência
Descrição do Problema: A Regra de Negócio estabelece que uma promoção deve obrigatoriamente possuir uma data de início e uma data de término. No entanto, os Critérios de Aceitação atuais omitiram essa validação. Não há instruções sobre a obrigatoriedade desses campos ao salvar a promoção, nem sobre o comportamento esperado do sistema (como a desativação automática do destaque visual e do preço promocional) assim que a data de término for atingida.
solução: Foram adicionados novos Critérios de Aceitação na User Story para garantir que o sistema valide o preenchimento obrigatório dos campos de data de início e término no momento do cadastro e execute a desativação automática do status de promoção e do destaque visual assim que o período de vigência expirar.

---

numero da US: 01
numero do defeito: 2
tipo de defeito: Omissão
Descrição do Problema: Existe uma contradição entre as Regras de Negócio (RN) e os Critérios de Aceitação (CA). A RN obriga a existência de um período de vigência (início e término), mas os CAs não preveem a validação desses campos no salvamento, permitindo que o usuário crie promoções incompletas. Além disso, não há definição sobre o comportamento do sistema quando o prazo expira.
solução: Inserção de critérios de aceitação específicos que forçam a validação das datas no momento do cadastro (impedindo campos vazios) e definem a automação do sistema para encerrar a promoção de forma autônoma ao fim do período estipulado.

---

numero da US: 02
numero do defeito: 3
tipo de defeito: Ambiguidade
Descrição do Problema: O Critério de Aceitação menciona que as informações devem estar disponíveis para compartilhamento com os clientes, mas não especifica através de qual canal ou ferramenta isso deve acontecer. Como o projeto contará com um chat interno, o requisito precisa deixar explícito se o compartilhamento será integrado diretamente a essa ferramenta de conversação ou se haverá suporte para canais externos. Há também uma inconsistência entre o primeiro CA (exige endereço completo) e a primeira RN (permite salvar apenas com rua e cidade).
solução: Especificado no Critério de Aceitação que o compartilhamento das informações de endereço e horário deve ser feito de forma direta e integrada dentro do próprio chat interno do sistema (opção WhatsApp). O critério de preenchimento do endereço foi ajustado para refletir a Regra de Negócio (obrigatoriedade apenas de rua e cidade).

---

numero da US: 02
numero do defeito: 4
tipo de defeito: Inconsistência
Descrição do Problema: A Regra de Negócio é ambígua ao exigir um "formato válido" para o horário sem especificar o padrão técnico (ex: 24h). Os CAs não detalham a interação para inserção desses horários (campos de abertura/fechamento ou opção "fechado"). Mantém-se a inconsistência entre o primeiro CA e a primeira RN quanto aos campos obrigatórios do endereço.
solução: Especificado na Regra de Negócio o formato oficial (24 horas: HH:MM às HH:MM). Adicionado CA para detalhar que a interface deve fornecer campos separados para abertura e fechamento por dia da semana, incluindo a opção "Fechado". A validação do endereço no primeiro critério foi ajustada para concordar com a RN (rua e cidade).

---

numero da US: 06
numero do defeito: 5
tipo de defeito: Inconsistência
Descrição do Problema: O texto da US afirma que o acordo é fechado "após contato externo", mas a RN determina que o "contato inicial deve ocorrer por meio de chat interno". Além disso, o título original mencionava "Finalizar Serviço", enquanto o escopo tratava de "Iniciar Serviço".
solução: Texto descritivo da US corrigido para remover a menção a "contato externo". Título da US ajustado para "Formalizar Acordo e Iniciar Serviço". Adicionado CA especificando que o gatilho para iniciar o acordo deve estar acessível dentro da tela do chat interno.

---

numero da US: 04
numero do defeito: 6
tipo de defeito: Omissão
Descrição do Problema: A RN menciona o agendamento automático da avaliação caso o cliente não responda, mas os CAs não definem o prazo de tolerância ("imediatamente"), como o sistema agenda em segundo plano ou qual canal de notificação será usado. O CA original não especificava o canal da solicitação inicial.
solução: Adicionados CAs estipulando prazo de 24h para resposta imediata e agendamento de lembrete via notificação push. Definido que o link para avaliação fica disponível por 7 dias. Especificado que a solicitação inicial ocorre via chat interno após a finalização do serviço.

---

numero da US: 14
numero do defeito: 7
tipo de defeito: Omissão
Descrição do Problema: O requisito falha ao não estabelecer regras de governança, restrições de acesso e políticas de concorrência do chat de suporte (gatilho de abertura, limitação de horário, gestão de fila).
solução: Adicionados CAs que definem a existência de uma fila de atendimento e o gatilho de abertura (central de ajuda ou detalhes de serviço). Detalhado o comportamento para inatividade (5 min) e especificado o horário comercial (08:00 às 18:00) nas Regras de Negócio.

---

numero da US: 08
numero do defeito: 8
tipo de defeito: Inconsistência
Descrição do Problema: Ao migrar o atendimento para o WhatsApp, a plataforma perde a rastreabilidade e auditoria. O critério permitia encerrar como "resolvido" sem validação. Há erro de concorrência ao manter o slot do atendente preso a uma conversa externa que o sistema não consegue monitorar.
solução: O redirecionamento agora exige consentimento do cliente e registra um log. O status muda para "Transferido para o WhatsApp", liberando imediatamente o slot do atendente. A avaliação final é disparada de forma assíncrona após 24h.

---

numero da US: 15
numero do defeito: 9
tipo de defeito: Ambiguidade
Descrição do Problema: Não especifica quais elementos de interface o TTS deve ler (apenas rótulos ou também placeholders e erros). Há falha de usabilidade no acionamento (ícone de alto-falante vs botão "Ouvir") e na tentativa de detectar volume de hardware.
solução: Delimitado que o TTS cobrirá rótulo, instrução de ajuda e mensagens de erro. Padronizado o ícone de alto-falante. Ajustado o critério de volume para focar em indicação visual de ondas sonoras e aviso de silenciamento no perfil.

---
