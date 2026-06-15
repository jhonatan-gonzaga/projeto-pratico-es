Neste arquivo markdown está contido todas as **tabelas de equivalência** da persona de **Suporte**, com base em todas as **histórias de usuário dessa persona**.
# Suporte
US https://github.com/jhonatan-gonzaga/projeto-pratico-es/issues/21 - Existência de um chat de suporte com duas partes, podendo serem a persona de **Suporte** & **Cliente** & **Profissional** & **Lojista**.

**Tabela 1 (US https://github.com/jhonatan-gonzaga/projeto-pratico-es/issues/21): Acesso ao Chat de Suporte pelo Cliente**.

| Condição de Entrada                            | Classes Válidas                               | Classes Inválidas                                          | Classes Inválidas                                   |
| ---------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------- |
| Status da conta do cliente                     | Conta ativa (1)                               | Conta inativa (2)                                          | Sem conta cadastrada (3)                            |
| Horário da tentativa de acesso                 | Dentro do horário comercial (08:00–18:00) (4) | Antes do início do horário comercial (antes das 08:00) (5) | Após o fim do horário comercial (após as 18:00) (6) |
| Número de chats simultâneos ativos por suporte | Entre 0 e 3 chats simultâneos (7)             | 4 chats simultâneos (8)                                    |                                                     |

**Casos de Teste – Tabela 1: Acesso ao Chat de Suporte pelo Cliente**

| Classes de Equivalência | Entradas                                    | Resultado Esperado                                                  |
| ----------------------- | ------------------------------------------- | ------------------------------------------------------------------- |
| 1, 4, 7                 | Conta ativa; 10:00; 2 chats ativos          | Acesso ao chat de suporte permitido                                 |
| **2**, 4, 7             | Conta inativa; 10:00; 2 chats ativos        | Acesso negado - conta inativa                                       |
| **3**, 4, 7             | Sem conta cadastrada; 10:00; 2 chats ativos | Acesso negado - usuário sem conta                                   |
| 1, **5**, 7             | Conta ativa; 07:30; 2 chats ativos          | Acesso negado - fora do horário de atendimento                      |
| 1, **6**, 7             | Conta ativa; 19:00; 2 chats ativos          | Acesso negado - fora do horário de atendimento                      |
| 1, 4, **8**             | Conta ativa; 10:00; 4 chats ativos          | Acesso negado - limite de chats simultâneos atingido pelo atendente |

- Resultado válido: 1, 4, 7
- Resultado inválido:
    - 2, 4, 7
    - 3, 4, 7
    - 1, 5, 7
    - 1, 6, 7
    - 1, 4, 8

**Tabela 2 (US https://github.com/jhonatan-gonzaga/projeto-pratico-es/issues/21): Encerramento por Inatividade do Cliente**.

| Condição de Entrada                     | Classes Válidas                                              | Classes Inválidas                    |
| --------------------------------------- | ------------------------------------------------------------ | ------------------------------------ |
| Tempo de inatividade do cliente no chat | Inatividade igual ou superior a 5 minutos (300 segundos) (1) | Inatividade inferior a 5 minutos (2) |

**Casos de Teste – Tabela 2: Encerramento por Inatividade do Cliente**

| Classes de Equivalência | Entradas                               | Resultado Esperado                                                   |
| ----------------------- | -------------------------------------- | -------------------------------------------------------------------- |
| 1                       | 300 segundos de inatividade do cliente | Chat encerrado automaticamente                                       |
| **2**                   | 240 segundos de inatividade do cliente | Chat mantido ativo - tempo insuficiente para encerramento automático |

- Resultado válido: 1
- Resultado inválido:
    - 2

**Tabela 3 (US https://github.com/jhonatan-gonzaga/projeto-pratico-es/issues/21): Definição do Status "Problema Resolvido"** no Chat.

| Condição de Entrada                                     | Classes Válidas                                                  | Classes Inválidas                                       |
| ------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------- |
| Tempo de conversa ativa ao definir "problema resolvido" | Igual ou superior a 1 minuto (60 segundos) de conversa ativa (1) | Inferior a 1 minuto (60 segundos) de conversa ativa (2) |
**Casos de Teste – Tabela 3: Definição do Status "Problema Resolvido"** no Chat

| Classes de Equivalência | Entradas                      | Resultado Esperado                                          |
| ----------------------- | ----------------------------- | ----------------------------------------------------------- |
| 1                       | 60 segundos de conversa ativa | Status "Problema Resolvido" definido com sucesso            |
| **2**                   | 45 segundos de conversa ativa | Definição bloqueada - tempo mínimo de conversa não atingido |

- Resultado válido: 1
- Resultado inválido:
    - 2
- - -

US https://github.com/jhonatan-gonzaga/projeto-pratico-es/issues/20 - Troca de canal no chat da persona de **Suporte** & **Cliente** & **Profissional** & **Lojista**.

**Tabela 1 (US https://github.com/jhonatan-gonzaga/projeto-pratico-es/issues/20): Consentimento do Cliente para Troca de Canal**

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
|---|---|---|---|
| Resposta do cliente ao menu de troca de canal | Cliente clica em "Consentir troca para WhatsApp" (1) | Cliente clica em "Recusar troca para WhatsApp" (2) | Cliente não interage com o menu de consentimento (3) |
**Casos de Teste – Tabela 1: Consentimento do Cliente para Troca de Canal**

| Classes de Equivalência | Entradas                                         | Resultado Esperado                                                                                     |
| ----------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| 1                       | Cliente clica em "Consentir troca para WhatsApp" | Chat encerrado com status "Transferido para o WhatsApp".                                               |
| **2**                   | Cliente clica em "Recusar troca para WhatsApp"   | Conversa continua normalmente. mensagem "Troca de canal para WhatsApp **Recusada**" registrada no chat |
| **3**                   | Cliente não interage com o menu de consentimento | Redirecionamento não realizado.                                                                        |

- Resultado válido: 1
- Resultado inválido:
    - 2
    - 3
- - -

US https://github.com/jhonatan-gonzaga/projeto-pratico-es/issues/22 - Envio de Áudio no chat da persona de **Suporte** & **Cliente** & **Profissional** & **Lojista**.

**Tabela 1 (US https://github.com/jhonatan-gonzaga/projeto-pratico-es/issues/22): Envio de áudio no Chat

| Condição de Entrada                     | Classes Válidas                                                   | Classes Inválidas                                             | Classes Inválidas                                |
| --------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------ |
| Duração do áudio gravado antes do envio | Entre 1 segundo e 2 minutos (1)                                   | Superior a 2 minutos (2)                                      | Zero segundos (gravação vazia, sem conteúdo) (3) |
| Ação do usuário com o botão de áudio    | Manter o botão pressionado para gravar e soltá-lo para enviar (4) | Deslizar o botão para cima (cancela a gravação sem envio) (5) |                                                  |
**Casos de Teste – Tabela 1: Envio de Áudio no Chat**

| Classes de Equivalência | Entradas                                               | Resultado Esperado                                                     |
| ----------------------- | ------------------------------------------------------ | ---------------------------------------------------------------------- |
| 1, 4                    | Gravação de 60 segundos; manter pressionado e soltar   | Áudio enviado com sucesso                                              |
| **2**, 4                | Gravação de 2 min e 1 s; manter pressionado e soltar   | áudio não enviado - Gravação rejeitada, alerta de tempo máximo exibido |
| **3**, 4                | Toque instantâneo (0 s); manter e soltar imediatamente | Áudio não enviado - gravação sem conteúdo                              |
| 1, **5**                | Gravação de 30 segundos; deslizar o botão para cima    | Áudio não enviado - Gravação cancelada                                 |

- Resultado válido: 1, 4
- Resultado inválido:
    - 2, 4
    - 3, 4
    - 1, 5
- - -

US https://github.com/jhonatan-gonzaga/projeto-pratico-es/issues/44 - Envio de imagem (print) do sistema no chat da persona de **Suporte** & **Cliente** & **Profissional** & **Lojista**.

**Tabela 1 (US https://github.com/jhonatan-gonzaga/projeto-pratico-es/issues/44): Envio de imagens

| Condição de Entrada                                           | Classes Válidas                                            | Classes Inválidas                                               |
| ------------------------------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------- |
| Número de imagens enviadas dentro de um intervalo de 1 minuto | Duas ou menos imagens por minuto (1)                       | Mais de 2 imagens por minuto (2)                                |
*Não há como enviar texto nessa mensagem, pois nem mesmo há caixa de texto para escrever. Portanto, não é uma classe inválida que pode realmente acontecer.

**Casos de Teste – Tabela 1: Envio de Imagens**

| Classes de Equivalência | Entradas                       | Resultado Esperado                    |
| ----------------------- | ------------------------------ | ------------------------------------- |
| 1                       | 2 imagens enviadas em 1 minuto | Ambas as imagens enviadas com sucesso |
| **2**                   | 3 imagens enviadas em 1 minuto | Terceira imagem bloqueada             |

- Resultado válido: 1
- Resultado inválido:
    - 2

**Tabela 2 (US https://github.com/jhonatan-gonzaga/projeto-pratico-es/issues/44): Armazenamento das Imagens Enviadas**

| Condição de Entrada                             | Classes Válidas                        | Classes Inválidas                     |
| ----------------------------------------------- | -------------------------------------- | ------------------------------------- |
| Tempo decorrido desde o envio da imagem no chat | Imagem enviada há 60 dias ou menos (1) | Imagem enviada há mais de 60 dias (2) |
**Casos de Teste – Tabela 2: Armazenamento das Imagens Enviadas**

| Classes de Equivalência | Entradas                  | Resultado Esperado                    |
| ----------------------- | ------------------------- | ------------------------------------- |
| 1                       | Imagem enviada há 30 dias | Imagem disponível e acessível no chat |
| **2**                   | Imagem enviada há 61 dias | Imagem indisponível e excluída        |

- Resultado válido: 1
- Resultado inválido:
    - 2
- - -

US https://github.com/jhonatan-gonzaga/projeto-pratico-es/issues/19 - Existência de um sistema de registro de atendimentos (Logs) da persona de **Suporte**.

**Tabela 1 (US https://github.com/jhonatan-gonzaga/projeto-pratico-es/issues/19): Exclusão de Log**

| Condição de Entrada                                     | Classes Válidas                                           | Classes Inválidas                                     |
| ------------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------- |
| Justificativa fornecida ao solicitar exclusão de um log | Justificativa preenchida com texto válido (não vazia) (1) | Justificativa não fornecida (campo vazio ou nulo) (2) |
**Casos de Teste – Tabela 1: Exclusão de Log**

| Classes de Equivalência | Entradas                                                     | Resultado Esperado       |
| ----------------------- | ------------------------------------------------------------ | ------------------------ |
| 1                       | Justificativa: "Atendimento duplicado registrado por engano" | Log excluído com sucesso |
| **2**                   | Justificativa: "" (campo vazio)                              | Exclusão bloquead        |

- Resultado válido: 1
- Resultado inválido:
    - 2

**Tabela 2 (US https://github.com/jhonatan-gonzaga/projeto-pratico-es/issues/19): Vinculação de Log a um Chat de Suporte**

| Condição de Entrada                   | Classes Válidas                  | Classes Inválidas                          | Classes Inválidas                       |
| ------------------------------------- | -------------------------------- | ------------------------------------------ | --------------------------------------- |
| Status do chat a ser vinculado ao log | Chat com status "finalizado" (1) | Chat com status "ativo" (em andamento) (2) | Chat com status "em fila de espera" (3) |
**Casos de Teste – Tabela 2: Vinculação de Log a um Chat de Suporte**

|Classes de Equivalência|Entradas|Resultado Esperado|
|---|---|---|
|1|Chat com status "finalizado"|Vinculação ao log realizada com sucesso|
|**2**|Chat com status "ativo"|Vinculação bloqueada — chat ainda em andamento|
|**3**|Chat com status "em fila de espera"|Vinculação bloqueada — chat ainda não iniciado|

- Resultado válido: 1
- Resultado inválido:
    - 2
    - 3

**Tabela 3 (US https://github.com/jhonatan-gonzaga/projeto-pratico-es/issues/19): Registro de Logs**

| Condição de Entrada                    | Classes Válidas                                            | Classes Inválidas                                               |
| -------------------------------------- | ---------------------------------------------------------- | --------------------------------------------------------------- |
| Dados fornecidos ao registrar novo log | Log criado com todos os dados obrigatórios preenchidos (1) | Tentativa de criação de log com dados obrigatórios ausentes (2) |
**Casos de Teste – Tabela 3: Registro de Logs**

| Classes de Equivalência | Entradas                                         | Resultado Esperado         |
| ----------------------- | ------------------------------------------------ | -------------------------- |
| 1                       | Log com todos os campos obrigatórios preenchidos | Log registrado com sucesso |
| **2**                   | Log com campos obrigatórios ausentes             | Registro bloqueado         |
- Resultado válido: 1
- Resultado inválido:
    - 2

**Tabela 4 (US https://github.com/jhonatan-gonzaga/projeto-pratico-es/issues/19): Edição de Logs**

| Condição de Entrada   | Classes Válidas                                  | Classes Inválidas                                          |
| --------------------- | ------------------------------------------------ | ---------------------------------------------------------- |
| Alvo da edição de log | Edição realizada em log existente no sistema (3) | Tentativa de editar log que não existe ou foi excluído (4) |
**Casos de Teste – Tabela 3: Edição de Logs**

| Classes de Equivalência | Entradas                                    | Resultado Esperado         |
| ----------------------- | ------------------------------------------- | -------------------------- |
| 1                       | Edição em log existente no sistema          | Log atualizado com sucesso |
| 2                       | Tentativa de editar log excluído do sistema | Edição bloqueada           |

- Resultado válido: 1
- Resultado inválido:
    - 2