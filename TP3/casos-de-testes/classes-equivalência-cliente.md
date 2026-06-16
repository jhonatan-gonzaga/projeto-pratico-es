# #43 - Cadastro de informações comerciais

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Endereço da loja | Rua, número, bairro e cidade preenchidos (1) | Campo obrigatório ausente (2) | Campos preenchidos apenas com espaços (3) |
| Horário de funcionamento | Horário em formato HH:MM e fechamento posterior à abertura (4) | Formato de horário inválido (5) | Fechamento igual ou anterior à abertura (6) |
| Situação do dia | Dia marcado como aberto com horário válido ou como fechado (7) | Dia sem configuração definida (8) | Dia marcado como fechado e com horário ativo ao mesmo tempo (9) |
| Envio pelo WhatsApp | Informações salvas enviadas ao cliente pelo chat (10) | Cliente/chat não selecionado (11) | Endereço ou horário ainda não cadastrado (12) |

**Legenda da Tabela:** Classes de Equivalência da US #43.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10 | Endereço completo; segunda aberta 08:00 às 18:00; cliente selecionado | Informações comerciais salvas e disponíveis para envio |
| Caso 2 | 2, 4, 7, 10 | Endereço sem bairro | Sistema impede o salvamento |
| Caso 3 | 3, 4, 7, 10 | Endereço preenchido com espaços em branco | Sistema impede o salvamento |
| Caso 4 | 1, 5, 7, 10 | Horário “8h às 18h” | Sistema exibe erro de formato |
| Caso 5 | 1, 6, 7, 10 | Abertura 18:00; fechamento 08:00 | Sistema exibe erro de horário |
| Caso 6 | 1, 4, 8, 10 | Dia da semana sem horário e sem marcação “Fechado” | Sistema solicita configuração do dia |
| Caso 7 | 1, 4, 9, 10 | Domingo marcado como “Fechado” e com horário 08:00 às 12:00 | Sistema impede configuração conflitante |
| Caso 8 | 1, 4, 7, 11 | Nenhum cliente/chat selecionado | Sistema não envia informações |
| Caso 9 | 1, 4, 7, 12 | Tentativa de envio sem horário cadastrado | Sistema bloqueia envio |

**Legenda da Tabela:** Casos de Teste da US #43.

---

# #28 - Criação de perfil na plataforma

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Nome do profissional | Nome com no mínimo 3 caracteres (1) | Nome com menos de 3 caracteres (2) | Nome vazio ou apenas espaços (3) |
| Categoria | Categoria obrigatória selecionada (4) | Categoria não selecionada (5) | Categoria inexistente/inválida (6) |
| Descrição | Descrição com no mínimo 20 caracteres (7) | Descrição com menos de 20 caracteres (8) | Descrição vazia ou apenas espaços (9) |
| Portfólio | De 1 a 5 fotos válidas JPG/PNG até 5MB (10) | Mais de 5 fotos (11) | Foto acima de 5MB ou formato inválido (12) |
| TTS | TTS ativado ou desativado pelo usuário (13) | Estado do TTS não salvo (14) | Erro ao alternar ativação/desativação (15) |

**Legenda da Tabela:** Classes de Equivalência da US #28.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10, 13 | Nome “Carlos”; categoria “Pedreiro”; descrição válida; 2 fotos JPG; TTS ativado | Perfil salvo e completo |
| Caso 2 | 2, 4, 7, 10, 13 | Nome “Ca” | Sistema impede salvamento |
| Caso 3 | 3, 4, 7, 10, 13 | Nome vazio | Sistema impede salvamento |
| Caso 4 | 1, 5, 7, 10, 13 | Categoria não selecionada | Sistema impede salvamento |
| Caso 5 | 1, 6, 7, 10, 13 | Categoria inexistente | Sistema impede salvamento |
| Caso 6 | 1, 4, 8, 10, 13 | Descrição com 10 caracteres | Sistema impede salvamento |
| Caso 7 | 1, 4, 9, 10, 13 | Descrição vazia | Sistema impede salvamento |
| Caso 8 | 1, 4, 7, 11, 13 | 6 fotos adicionadas | Sistema impede upload excedente |
| Caso 9 | 1, 4, 7, 12, 13 | Foto PDF ou imagem de 8MB | Sistema rejeita a foto |
| Caso 10 | 1, 4, 7, 10, 14 | TTS alterado, mas estado não salvo | Sistema não confirma alteração |
| Caso 11 | 1, 4, 7, 10, 15 | Erro ao ativar/desativar TTS | Sistema informa falha no recurso |

**Legenda da Tabela:** Casos de Teste da US #28.

---

# #27 - Validação de acesso via código no celular

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Número de celular | Número válido e único (1) | Número em formato inválido (2) | Número já vinculado a outra conta (3) |
| Código OTP | Código numérico entre 4 e 6 dígitos (4) | Código com letras ou símbolos (5) | Código com menos de 4 ou mais de 6 dígitos (6) |
| Validade do código | Código informado em até 5 minutos (7) | Código expirado (8) | Código diferente do enviado (9) |
| Tentativas | Até 5 tentativas (10) | Mais de 5 tentativas (11) | Tentativa durante bloqueio temporário (12) |
| Reenvio | Reenvio permitido pelo controle anti-spam (13) | Reenvio solicitado em intervalo bloqueado (14) | Falha no envio do código (15) |

**Legenda da Tabela:** Classes de Equivalência da US #27.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10, 13 | Celular válido; OTP “123456”; dentro de 5 minutos; 1ª tentativa | Login realizado e sessão criada |
| Caso 2 | 2, 4, 7, 10, 13 | Celular “999” | Sistema exibe erro de número inválido |
| Caso 3 | 3, 4, 7, 10, 13 | Celular já cadastrado | Sistema impede associação |
| Caso 4 | 1, 5, 7, 10, 13 | OTP “12AB” | Sistema exibe erro de código inválido |
| Caso 5 | 1, 6, 7, 10, 13 | OTP “123” | Sistema exibe erro de tamanho |
| Caso 6 | 1, 4, 8, 10, 13 | OTP correto após 6 minutos | Sistema informa código expirado |
| Caso 7 | 1, 4, 9, 10, 13 | OTP diferente do enviado | Sistema informa código inválido |
| Caso 8 | 1, 4, 7, 11, 13 | 6ª tentativa de login | Acesso bloqueado por 30 minutos |
| Caso 9 | 1, 4, 7, 12, 13 | Tentativa durante bloqueio | Sistema impede acesso |
| Caso 10 | 1, 4, 7, 10, 14 | Reenvio solicitado repetidamente | Sistema bloqueia por anti-spam |
| Caso 11 | 1, 4, 7, 10, 15 | Falha no envio do SMS/OTP | Sistema informa falha de envio |

**Legenda da Tabela:** Casos de Teste da US #27.

---

# #79 - Denúncia de conduta inadequada

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Motivo da denúncia | Motivo selecionado no dropdown (1) | Motivo em branco (2) | Motivo inexistente/inválido (3) |
| Perfil denunciado | Profissional existente e denunciável (4) | Perfil inexistente (5) | Perfil já banido/removido (6) |
| Confirmação de envio | Denúncia confirmada pelo cliente (7) | Tentativa sem confirmar envio (8) | Botão ativo mesmo sem motivo preenchido (9) |
| Trava preventiva | 3 denúncias distintas e validadas (10) | Denúncias duplicadas do mesmo cliente (11) | Denúncias não validadas pela auditoria (12) |

**Legenda da Tabela:** Classes de Equivalência da US #79.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10 | Motivo “Fraude”; profissional válido; terceira denúncia distinta | Denúncia registrada, protocolo exibido e perfil suspenso preventivamente |
| Caso 2 | 2, 4, 7, 10 | Motivo vazio | Botão permanece inativo |
| Caso 3 | 3, 4, 7, 10 | Motivo fora da lista | Sistema rejeita denúncia |
| Caso 4 | 1, 5, 7, 10 | Profissional inexistente | Sistema impede envio |
| Caso 5 | 1, 6, 7, 10 | Perfil já banido | Sistema impede denúncia |
| Caso 6 | 1, 4, 8, 10 | Cliente não confirma envio | Denúncia não é registrada |
| Caso 7 | 1, 4, 9, 10 | Botão habilitado com motivo vazio | Sistema deve bloquear envio |
| Caso 8 | 1, 4, 7, 11 | Mesmo cliente denuncia várias vezes | Denúncias duplicadas não contam para trava |
| Caso 9 | 1, 4, 7, 12 | Denúncias rejeitadas na validação | Perfil não é suspenso |

**Legenda da Tabela:** Casos de Teste da US #79.

---

# #83 - Painel central de notificações

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Estado da notificação | Notificação não lida recebida (1) | Notificação já lida exibida como não lida (2) | Notificação expirada com mais de 30 dias (3) |
| Exibição do emblema | Emblema vermelho com quantidade correta (4) | Emblema ausente com notificações não lidas (5) | Quantidade exibida incorreta (6) |
| Ordenação | Alertas em ordem cronológica reversa (7) | Alertas em ordem antiga primeiro (8) | Alertas sem data/hora de emissão (9) |
| Marcar como lido | Ação marca tudo como lido e remove emblema (10) | Notificações continuam destacadas (11) | Emblema permanece após leitura (12) |

**Legenda da Tabela:** Classes de Equivalência da US #83.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10 | Cliente recebe 3 notificações novas e marca tudo como lido | Gaveta mostra alertas recentes; emblema removido após leitura |
| Caso 2 | 2, 4, 7, 10 | Notificação lida exibida como nova | Sistema corrige estado visual |
| Caso 3 | 3, 4, 7, 10 | Notificação com 31 dias | Sistema oculta permanentemente |
| Caso 4 | 1, 5, 7, 10 | Notificação não lida sem emblema | Sistema deve exibir emblema |
| Caso 5 | 1, 6, 7, 10 | Existem 3 notificações, mas emblema mostra 5 | Sistema deve corrigir quantidade |
| Caso 6 | 1, 4, 8, 10 | Lista ordenada da mais antiga para a mais nova | Sistema deve reordenar |
| Caso 7 | 1, 4, 9, 10 | Notificação sem data/hora | Sistema não deve ordenar como alerta válido |
| Caso 8 | 1, 4, 7, 11 | “Marcar tudo como lido” não muda visual | Sistema deve atualizar notificações |
| Caso 9 | 1, 4, 7, 12 | Emblema permanece após leitura | Sistema deve remover emblema |

**Legenda da Tabela:** Casos de Teste da US #83.

---

# #84 - Atualização de dados de identificação

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Nome de exibição | Nome preenchido com texto válido (1) | Nome vazio (2) | Nome apenas com espaços (3) |
| Fotografia/avatar | Foto válida enviada da galeria (4) | Arquivo inválido (5) | Falha no upload da foto (6) |
| Salvamento | Clique em “Salvar Modificações” com dados válidos (7) | Tentativa sem dados obrigatórios (8) | Falha de atualização no servidor (9) |
| Propagação visual | Nome/foto atualizados no menu, vagas e interações (10) | Atualização aparece apenas parcialmente (11) | Perfil antigo continua visível (12) |

**Legenda da Tabela:** Classes de Equivalência da US #84.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10 | Nome “Ana Silva”; nova foto válida; salvar | Nome e avatar atualizados em todo o sistema |
| Caso 2 | 2, 4, 7, 10 | Nome vazio | Sistema exibe aviso em vermelho e não salva |
| Caso 3 | 3, 4, 7, 10 | Nome “   ” | Sistema exibe aviso em vermelho e não salva |
| Caso 4 | 1, 5, 7, 10 | Foto em formato inválido | Sistema rejeita avatar |
| Caso 5 | 1, 6, 7, 10 | Upload interrompido | Sistema mantém foto anterior |
| Caso 6 | 1, 4, 8, 10 | Tentativa de salvar sem nome | Sistema bloqueia atualização |
| Caso 7 | 1, 4, 9, 10 | Servidor falha ao salvar | Sistema exibe erro |
| Caso 8 | 1, 4, 7, 11 | Foto muda no menu, mas não nas vagas | Sistema deve sincronizar dados |
| Caso 9 | 1, 4, 7, 12 | Perfil antigo continua visível | Sistema deve atualizar visualização |

**Legenda da Tabela:** Casos de Teste da US #84.

---

# #70 - Leitura de tela do formulário com TTS

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Acionamento do TTS | Clique no ícone de alto-falante de campo válido (1) | Campo sem rótulo associado (2) | Ícone indisponível/inativo (3) |
| Conteúdo narrado | Rótulo, ajuda e erro ativo lidos na ordem correta (4) | Ordem de leitura incorreta (5) | Mensagem de erro ativa não lida (6) |
| Controle da reprodução | Segundo clique interrompe o áudio imediatamente (7) | Áudio não é interrompido (8) | Mais de um áudio toca simultaneamente (9) |
| Indicação visual | Animação de ondas no campo lido (10) | Animação ausente (11) | Animação aparece no campo errado (12) |
| Saída de áudio | Áudio ativo no navegador/app (13) | Saída silenciada sem aviso (14) | Voz não configurada em PT-BR (15) |

**Legenda da Tabela:** Classes de Equivalência da US #70.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10, 13 | Clique no alto-falante de campo com rótulo, ajuda e erro | TTS lê conteúdo corretamente e exibe ondas sonoras |
| Caso 2 | 2, 4, 7, 10, 13 | Campo sem rótulo | Sistema não inicia leitura inválida |
| Caso 3 | 3, 4, 7, 10, 13 | Ícone indisponível | Sistema não executa TTS |
| Caso 4 | 1, 5, 7, 10, 13 | Leitura começa pela mensagem de erro antes do rótulo | Sistema deve corrigir ordem |
| Caso 5 | 1, 6, 7, 10, 13 | Campo com erro ativo não narrado | Sistema deve incluir erro na leitura |
| Caso 6 | 1, 4, 8, 10, 13 | Segundo clique não interrompe áudio | Sistema deve parar reprodução |
| Caso 7 | 1, 4, 9, 10, 13 | Dois campos tocando ao mesmo tempo | Sistema deve permitir apenas uma reprodução |
| Caso 8 | 1, 4, 7, 11, 13 | Sem animação visual | Sistema deve exibir ondas sonoras |
| Caso 9 | 1, 4, 7, 12, 13 | Ondas aparecem em outro campo | Sistema deve corrigir indicação visual |
| Caso 10 | 1, 4, 7, 10, 14 | Saída de áudio silenciada sem aviso | Sistema deve exibir aviso textual e visual |
| Caso 11 | 1, 4, 7, 10, 15 | Voz não está em português brasileiro | Sistema deve usar voz PT-BR |

**Legenda da Tabela:** Casos de Teste da US #70.

---

# #71 - Reprodução em áudio de mensagens

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Mensagem do chat | Mensagem textual válida (1) | Mensagem vazia (2) | Conteúdo não textual sem texto alternativo (3) |
| Botão “Ouvir” | Botão disponível na mensagem (4) | Botão ausente (5) | Botão associado à mensagem errada (6) |
| Limite de caracteres | Texto até 1000 caracteres ou dividido corretamente (7) | Texto acima de 1000 sem aviso (8) | Texto acima de 1000 enviado em requisição única (9) |
| Navegação durante áudio | Minimizar/retroceder pausa automaticamente (10) | Áudio continua após minimizar (11) | Áudio continua após sair da tela (12) |

**Legenda da Tabela:** Classes de Equivalência da US #71.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10 | Mensagem de 300 caracteres; botão “Ouvir”; tela minimizada durante leitura | Mensagem é narrada e pausa ao minimizar |
| Caso 2 | 2, 4, 7, 10 | Mensagem vazia | Sistema não inicia leitura |
| Caso 3 | 3, 4, 7, 10 | Mensagem apenas com imagem sem texto | Sistema não envia ao TTS |
| Caso 4 | 1, 5, 7, 10 | Mensagem sem botão “Ouvir” | Cliente não consegue iniciar leitura |
| Caso 5 | 1, 6, 7, 10 | Botão lê outra mensagem | Sistema deve corrigir associação |
| Caso 6 | 1, 4, 8, 10 | Mensagem com 1500 caracteres sem aviso | Sistema deve avisar divisão de texto |
| Caso 7 | 1, 4, 9, 10 | Mensagem com 1500 caracteres processada de uma vez | Sistema deve dividir requisição |
| Caso 8 | 1, 4, 7, 11 | App minimizado e áudio continua | Sistema deve pausar leitura |
| Caso 9 | 1, 4, 7, 12 | Cliente sai do chat e áudio continua | Sistema deve pausar leitura |

**Legenda da Tabela:** Casos de Teste da US #71.

---

# #72 - Leitura em áudio das avaliações

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Avaliação | Estrelas e texto disponíveis (1) | Avaliação sem estrelas (2) | Avaliação sem texto (3) |
| Botão de leitura | Botão “Ler em voz alta” acionado (4) | Botão ausente (5) | Botão associado à avaliação errada (6) |
| Parsing do texto | Emojis e símbolos removidos antes do TTS (7) | Emojis narrados literalmente (8) | Símbolos não textuais enviados ao TTS (9) |
| Controle de avanço | Toque pula para o próximo comentário (10) | Toque não pula avaliação (11) | Toque reinicia o mesmo comentário (12) |

**Legenda da Tabela:** Classes de Equivalência da US #72.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10 | Avaliação 5 estrelas com texto e emoji; botão acionado; toque durante leitura | Sistema remove emoji, narra estrelas/texto e pula para próxima avaliação |
| Caso 2 | 2, 4, 7, 10 | Avaliação sem estrelas | Sistema não inicia avaliação válida |
| Caso 3 | 3, 4, 7, 10 | Avaliação sem comentário | Sistema não narra texto vazio |
| Caso 4 | 1, 5, 7, 10 | Avaliação sem botão de leitura | Cliente não consegue acionar TTS |
| Caso 5 | 1, 6, 7, 10 | Botão lê comentário errado | Sistema deve corrigir associação |
| Caso 6 | 1, 4, 8, 10 | Emoji narrado como texto | Sistema deve suprimir emoji |
| Caso 7 | 1, 4, 9, 10 | Símbolos especiais enviados ao TTS | Sistema deve realizar parsing |
| Caso 8 | 1, 4, 7, 11 | Toque na tela não pula comentário | Sistema deve iniciar próximo comentário |
| Caso 9 | 1, 4, 7, 12 | Toque reinicia a mesma avaliação | Sistema deve avançar corretamente |

**Legenda da Tabela:** Casos de Teste da US #72.

---

# #73 - Pesquisa de profissionais por categoria

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Categoria selecionada | Categoria pré-definida válida (1) | Categoria vazia (2) | Categoria inexistente (3) |
| Profissionais retornados | Profissionais ativos vinculados à categoria (4) | Profissionais suspensos exibidos (5) | Profissionais banidos exibidos (6) |
| Localidade/resultado | Categoria com profissionais em Itacoatiara (7) | Categoria sem profissionais e sem aviso (8) | Resultados de outra localidade (9) |
| Cartão de resultado | Cartão com foto, nome, especialidade e nota (10) | Cartão com dados obrigatórios ausentes (11) | Nota em formato inválido (12) |

**Legenda da Tabela:** Classes de Equivalência da US #73.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10 | Categoria “Encanador”; profissionais ativos em Itacoatiara | Lista exibe apenas profissionais da categoria com cartões completos |
| Caso 2 | 2, 4, 7, 10 | Nenhuma categoria selecionada | Sistema não executa busca válida |
| Caso 3 | 3, 4, 7, 10 | Categoria inexistente | Sistema rejeita filtro |
| Caso 4 | 1, 5, 7, 10 | Profissional suspenso aparece | Sistema deve ocultar perfil suspenso |
| Caso 5 | 1, 6, 7, 10 | Profissional banido aparece | Sistema deve ocultar perfil banido |
| Caso 6 | 1, 4, 8, 10 | Categoria sem profissionais, mas sem mensagem | Sistema deve exibir “Nenhum profissional cadastrado nesta categoria no momento” |
| Caso 7 | 1, 4, 9, 10 | Busca retorna profissionais de outra cidade | Sistema deve limitar resultados |
| Caso 8 | 1, 4, 7, 11 | Cartão sem nome ou especialidade | Sistema deve impedir cartão incompleto |
| Caso 9 | 1, 4, 7, 12 | Nota exibida como texto inválido | Sistema deve corrigir formato da nota |

**Legenda da Tabela:** Casos de Teste da US #73.

---

# #74 - Filtragem de profissionais por nota

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Filtro de nota | Filtro “A partir de 4 estrelas” ativado (1) | Nota menor que 1 ou maior que 5 (2) | Filtro sem valor definido (3) |
| Perfis exibidos | Apenas perfis com nota igual ou superior à selecionada (4) | Perfil abaixo da nota aparece (5) | Perfil sem nota aparece como aprovado (6) |
| Período das avaliações | Avaliações dos últimos 12 meses consideradas (7) | Avaliações antigas incluídas (8) | Avaliações recentes ignoradas (9) |
| Limpar filtros | Lista restaurada ao clicar em “Limpar Filtros” (10) | Lista continua filtrada (11) | Ordenação padrão não é restaurada (12) |

**Legenda da Tabela:** Classes de Equivalência da US #74.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10 | Filtro 4 estrelas; avaliações recentes; limpar filtros | Lista mostra apenas nota ≥ 4 e depois restaura padrão |
| Caso 2 | 2, 4, 7, 10 | Filtro com nota 6 | Sistema rejeita filtro |
| Caso 3 | 3, 4, 7, 10 | Filtro sem valor | Sistema não aplica filtro inválido |
| Caso 4 | 1, 5, 7, 10 | Perfil nota 3.5 aparece | Sistema deve ocultar perfil |
| Caso 5 | 1, 6, 7, 10 | Perfil sem nota aparece como 4+ | Sistema deve impedir inclusão indevida |
| Caso 6 | 1, 4, 8, 10 | Nota baseada em avaliações de 2 anos atrás | Sistema deve ignorar avaliações antigas |
| Caso 7 | 1, 4, 9, 10 | Avaliação recente ignorada | Sistema deve recalcular nota |
| Caso 8 | 1, 4, 7, 11 | Limpar filtros não altera lista | Sistema deve restaurar resultados |
| Caso 9 | 1, 4, 7, 12 | Lista volta sem ordenação padrão | Sistema deve restaurar ordenação |

**Legenda da Tabela:** Casos de Teste da US #74.

---

# #78 - Favoritar profissionais

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Perfil favoritado | Profissional ativo existente (1) | Perfil inexistente (2) | Perfil suspenso/banido (3) |
| Quantidade de favoritos | Conta com menos de 50 favoritos (4) | Conta já possui 50 favoritos (5) | Profissional já está favoritado (6) |
| Ação no coração | Clique altera coração para preenchido (7) | Ícone não altera estado (8) | Estado visual diferente do estado salvo (9) |
| Menu favoritos | Lista exibe profissionais salvos (10) | Favorito salvo não aparece (11) | Perfil removido continua na lista (12) |

**Legenda da Tabela:** Classes de Equivalência da US #78.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10 | Cliente favorita profissional ativo com 10 favoritos já salvos | Coração fica preenchido e profissional aparece em “Meus Favoritos” |
| Caso 2 | 2, 4, 7, 10 | Perfil inexistente | Sistema impede favoritar |
| Caso 3 | 3, 4, 7, 10 | Perfil suspenso | Sistema impede favoritar |
| Caso 4 | 1, 5, 7, 10 | Cliente já possui 50 favoritos | Sistema exibe limite atingido |
| Caso 5 | 1, 6, 7, 10 | Cliente favorita perfil já salvo | Sistema evita duplicidade ou remove conforme toggle |
| Caso 6 | 1, 4, 8, 10 | Clique no coração não muda ícone | Sistema deve atualizar estado visual |
| Caso 7 | 1, 4, 9, 10 | Ícone preenchido, mas perfil não salvo | Sistema deve sincronizar estado |
| Caso 8 | 1, 4, 7, 11 | Favorito não aparece no menu | Sistema deve listar profissional |
| Caso 9 | 1, 4, 7, 12 | Profissional removido continua listado | Sistema deve remover da lista |

**Legenda da Tabela:** Casos de Teste da US #78.

---

# #75 - Contratação direta de profissional

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Perfil do profissional | Perfil ativo e disponível (1) | Perfil inexistente (2) | Perfil suspenso/banido (3) |
| Texto da demanda | Texto descritivo preenchido (4) | Texto vazio (5) | Texto apenas com espaços (6) |
| Solicitações ativas | Cliente possui menos de 3 solicitações pendentes (7) | Cliente já possui 3 solicitações pendentes (8) | Contagem de solicitações indisponível (9) |
| Estado do botão | Botão “Contratar” habilitado antes do envio (10) | Botão habilitado após solicitação já enviada (11) | Botão desabilitado sem solicitação ativa (12) |

**Legenda da Tabela:** Classes de Equivalência da US #75.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10 | Profissional ativo; demanda preenchida; 2 solicitações pendentes | Solicitação enviada e botão muda para “Solicitação Enviada” |
| Caso 2 | 2, 4, 7, 10 | Perfil inexistente | Sistema impede contratação |
| Caso 3 | 3, 4, 7, 10 | Perfil suspenso | Sistema bloqueia contratação |
| Caso 4 | 1, 5, 7, 10 | Texto da demanda vazio | Sistema impede envio |
| Caso 5 | 1, 6, 7, 10 | Texto apenas com espaços | Sistema impede envio |
| Caso 6 | 1, 4, 8, 10 | Cliente já possui 3 solicitações aguardando resposta | Sistema exibe aviso de limite |
| Caso 7 | 1, 4, 9, 10 | Sistema não consegue verificar contagem | Sistema não deve permitir envio sem validação |
| Caso 8 | 1, 4, 7, 11 | Botão continua “Contratar” após envio | Sistema deve mudar para “Solicitação Enviada” |
| Caso 9 | 1, 4, 7, 12 | Botão desabilitado sem solicitação ativa | Sistema deve habilitar ação |

**Legenda da Tabela:** Casos de Teste da US #75.

---

# #77 - Avaliação de profissional pós-serviço

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Status do serviço | Serviço concluído pelo profissional e aprovado pelo cliente (1) | Serviço não concluído (2) | Serviço não aprovado pelo cliente (3) |
| Nota | Pontuação entre 1 e 5 estrelas (4) | Avaliação sem estrelas (5) | Nota menor que 1 ou maior que 5 (6) |
| Comentário | Comentário preenchido sobre o serviço (7) | Comentário vazio (8) | Comentário apenas com espaços (9) |
| Envio da avaliação | Primeira submissão da avaliação (10) | Tentativa de editar avaliação já enviada (11) | Tentativa de enviar avaliação duplicada (12) |

**Legenda da Tabela:** Classes de Equivalência da US #77.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10 | Serviço concluído e aprovado; 5 estrelas; comentário preenchido | Avaliação enviada e nota atualizada no perfil |
| Caso 2 | 2, 4, 7, 10 | Serviço ainda em andamento | Formulário não é liberado |
| Caso 3 | 3, 4, 7, 10 | Cliente ainda não aprovou conclusão | Formulário não é liberado |
| Caso 4 | 1, 5, 7, 10 | Comentário com texto, mas sem estrelas | Sistema solicita pontuação |
| Caso 5 | 1, 6, 7, 10 | Nota 0 ou 6 | Sistema rejeita pontuação |
| Caso 6 | 1, 4, 8, 10 | Comentário vazio | Sistema impede envio |
| Caso 7 | 1, 4, 9, 10 | Comentário “   ” | Sistema impede envio |
| Caso 8 | 1, 4, 7, 11 | Cliente tenta alterar avaliação enviada | Sistema bloqueia edição |
| Caso 9 | 1, 4, 7, 12 | Cliente tenta enviar segunda avaliação do mesmo serviço | Sistema bloqueia duplicidade |

**Legenda da Tabela:** Casos de Teste da US #77.

---

# #65 - Publicação de vaga textual

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Título | Título com no mínimo 10 caracteres (1) | Título vazio (2) | Título com menos de 10 caracteres (3) |
| Descrição | Descrição preenchida com até 500 caracteres (4) | Descrição vazia (5) | Descrição com mais de 500 caracteres (6) |
| Categoria | Categoria selecionada (7) | Categoria não selecionada (8) | Categoria inválida/inexistente (9) |
| Publicação | Clique em “Publicar” com dados válidos (10) | Falha ao publicar (11) | Vaga publicada com status diferente de “Aberta” (12) |

**Legenda da Tabela:** Classes de Equivalência da US #65.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10 | Título válido; descrição válida; categoria “Pedreiro”; publicar | Vaga aparece no mural e em “Minhas Vagas” com status “Aberta” |
| Caso 2 | 2, 4, 7, 10 | Título vazio | Sistema exibe alerta de obrigatoriedade |
| Caso 3 | 3, 4, 7, 10 | Título “Pintura” | Sistema informa mínimo de caracteres |
| Caso 4 | 1, 5, 7, 10 | Descrição vazia | Sistema impede publicação |
| Caso 5 | 1, 6, 7, 10 | Descrição com 600 caracteres | Sistema rejeita descrição |
| Caso 6 | 1, 4, 8, 10 | Categoria não selecionada | Sistema impede publicação |
| Caso 7 | 1, 4, 9, 10 | Categoria inexistente | Sistema rejeita categoria |
| Caso 8 | 1, 4, 7, 11 | Erro ao publicar | Sistema informa falha |
| Caso 9 | 1, 4, 7, 12 | Vaga criada como “Pendente” | Sistema deve criar vaga como “Aberta” |

**Legenda da Tabela:** Casos de Teste da US #65.

---

# #66 - Anexo de imagens na vaga

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Quantidade de imagens | Até 3 imagens anexadas (1) | Mais de 3 imagens (2) | Lista de anexos corrompida/indefinida (3) |
| Formato do arquivo | Imagem JPG ou PNG (4) | Formato GIF, PDF ou outro (5) | Extensão incompatível com o conteúdo real (6) |
| Tamanho do arquivo | Cada imagem com até 5MB (7) | Imagem maior que 5MB (8) | Tamanho do arquivo não identificado (9) |
| Miniatura/remoção | Miniatura exibida e removível pela lixeira (10) | Miniatura não aparece (11) | Ícone de lixeira não remove imagem (12) |

**Legenda da Tabela:** Classes de Equivalência da US #66.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10 | 3 imagens PNG/JPG com até 5MB | Miniaturas exibidas e imagens aceitas |
| Caso 2 | 2, 4, 7, 10 | 4 imagens anexadas | Sistema impede exceder limite |
| Caso 3 | 3, 4, 7, 10 | Lista de anexos corrompida | Sistema rejeita anexos |
| Caso 4 | 1, 5, 7, 10 | Arquivo PDF | Sistema rejeita formato |
| Caso 5 | 1, 6, 7, 10 | Arquivo renomeado para JPG, mas conteúdo inválido | Sistema rejeita arquivo |
| Caso 6 | 1, 4, 8, 10 | Imagem com 7MB | Sistema exibe erro de tamanho |
| Caso 7 | 1, 4, 9, 10 | Sistema não identifica tamanho | Sistema não deve aceitar upload |
| Caso 8 | 1, 4, 7, 11 | Imagem válida sem miniatura | Sistema deve exibir prévia |
| Caso 9 | 1, 4, 7, 12 | Clique na lixeira não remove imagem | Sistema deve remover imediatamente |

**Legenda da Tabela:** Casos de Teste da US #66.

---

# #67 - Edição de vaga aberta

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Status da vaga | Vaga com status “Aberta” (1) | Vaga com profissional contratado (2) | Vaga cancelada/fechada (3) |
| Carregamento do formulário | Dados originais carregados corretamente (4) | Dados originais ausentes (5) | Dados de outra vaga carregados (6) |
| Novos dados | Descrição e fotos válidas (7) | Foto inválida anexada (8) | Descrição inválida/vazia (9) |
| Salvamento | Alteração salva com sucesso (10) | Usuário sem permissão de edição (11) | Falha ao salvar atualização (12) |

**Legenda da Tabela:** Classes de Equivalência da US #67.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10 | Vaga aberta; formulário carregado; descrição alterada; salvar | Dados atualizados aparecem no mural |
| Caso 2 | 2, 4, 7, 10 | Vaga já possui profissional contratado | Botão de edição fica oculto |
| Caso 3 | 3, 4, 7, 10 | Vaga cancelada | Sistema não permite edição |
| Caso 4 | 1, 5, 7, 10 | Formulário abre sem dados originais | Sistema deve corrigir carregamento |
| Caso 5 | 1, 6, 7, 10 | Formulário carrega dados de outra vaga | Sistema deve impedir edição incorreta |
| Caso 6 | 1, 4, 8, 10 | Nova foto inválida | Sistema rejeita alteração |
| Caso 7 | 1, 4, 9, 10 | Nova descrição vazia | Sistema impede salvamento |
| Caso 8 | 1, 4, 7, 11 | Outro cliente tenta editar vaga | Sistema bloqueia por permissão |
| Caso 9 | 1, 4, 7, 12 | Erro ao salvar | Sistema mantém dados anteriores |

**Legenda da Tabela:** Casos de Teste da US #67.

---

# #68 - Cancelamento de vaga

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Status da vaga | Vaga ativa/aberta (1) | Vaga já cancelada (2) | Vaga concluída ou com profissional contratado (3) |
| Confirmação | Cliente confirma cancelamento no modal (4) | Cliente fecha modal sem confirmar (5) | Modal não é exibido (6) |
| Exclusão lógica | Vaga ocultada do mural e mantida no banco (7) | Vaga apagada fisicamente (8) | Vaga continua no mural público (9) |
| Histórico | Vaga aparece como “Cancelada” em “Minhas Vagas” (10) | Etiqueta “Cancelada” não aparece (11) | Status exibido de forma inconsistente (12) |

**Legenda da Tabela:** Classes de Equivalência da US #68.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10 | Vaga aberta; cliente confirma cancelamento | Vaga sai do mural e aparece como “Cancelada” no histórico |
| Caso 2 | 2, 4, 7, 10 | Vaga já cancelada | Sistema não repete cancelamento |
| Caso 3 | 3, 4, 7, 10 | Vaga concluída | Sistema impede cancelamento |
| Caso 4 | 1, 5, 7, 10 | Cliente fecha modal | Vaga permanece aberta |
| Caso 5 | 1, 6, 7, 10 | Botão cancela sem modal | Sistema deve exigir confirmação |
| Caso 6 | 1, 4, 8, 10 | Registro apagado do banco | Sistema viola soft delete |
| Caso 7 | 1, 4, 9, 10 | Vaga cancelada continua no mural | Sistema deve ocultar do feed |
| Caso 8 | 1, 4, 7, 11 | Histórico sem etiqueta | Sistema deve exibir “Cancelada” |
| Caso 9 | 1, 4, 7, 12 | Histórico mostra status “Aberta” | Sistema deve atualizar status |

**Legenda da Tabela:** Casos de Teste da US #68.

---

# #69 - Visualização de candidatos

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Vaga consultada | Vaga do cliente com candidaturas (1) | Vaga inexistente (2) | Vaga de outro cliente sem permissão (3) |
| Lista de candidatos | Lista com profissionais aplicados à vaga (4) | Lista vazia sem mensagem adequada (5) | Candidatos de outra vaga exibidos (6) |
| Cartão do candidato | Foto, nome, especialidade e nota exibidos (7) | Dados obrigatórios ausentes (8) | Nota inválida ou inconsistente (9) |
| Redirecionamento | Clique abre perfil público do candidato (10) | Clique não redireciona (11) | Clique abre perfil errado (12) |

**Legenda da Tabela:** Classes de Equivalência da US #69.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10 | Vaga do cliente com 3 candidatos | Lista aparece com cartões completos e redirecionamento correto |
| Caso 2 | 2, 4, 7, 10 | Vaga inexistente | Sistema exibe erro ou impede acesso |
| Caso 3 | 3, 4, 7, 10 | Cliente acessa vaga de outro usuário | Sistema bloqueia acesso |
| Caso 4 | 1, 5, 7, 10 | Vaga sem candidatos e sem mensagem | Sistema deve exibir “Nenhum profissional se candidatou ainda” |
| Caso 5 | 1, 6, 7, 10 | Lista mostra candidatos de outra vaga | Sistema deve corrigir listagem |
| Caso 6 | 1, 4, 8, 10 | Cartão sem nome ou especialidade | Sistema deve impedir cartão incompleto |
| Caso 7 | 1, 4, 9, 10 | Nota exibida incorretamente | Sistema deve corrigir dados |
| Caso 8 | 1, 4, 7, 11 | Clique no cartão não abre perfil | Sistema deve redirecionar |
| Caso 9 | 1, 4, 7, 12 | Clique abre outro profissional | Sistema deve abrir perfil correto |

**Legenda da Tabela:** Casos de Teste da US #69.

---

# #76 - Comunicação via chat interno

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Mensagem | Texto não vazio digitado pelo cliente (1) | Mensagem vazia (2) | Mensagem apenas com espaços (3) |
| Conversa | Chat válido entre cliente e profissional (4) | Chat inexistente (5) | Usuário sem permissão na conversa (6) |
| Envio | Mensagem aparece imediatamente como “Enviado” (7) | Mensagem não aparece na tela (8) | Status exibido incorretamente (9) |
| Leitura | Status muda para “Lida” após visualização do profissional (10) | Status “Lida” antes da visualização (11) | Status não muda após leitura (12) |
| Segurança | Número/link detectado dispara aviso automático (13) | Número/link não detectado (14) | Aviso aparece sem padrão suspeito (15) |

**Legenda da Tabela:** Classes de Equivalência da US #76.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10, 13 | Mensagem válida com número de celular; profissional lê depois | Mensagem aparece como enviada, depois lida, e aviso de segurança é exibido |
| Caso 2 | 2, 4, 7, 10, 13 | Mensagem vazia | Sistema impede envio |
| Caso 3 | 3, 4, 7, 10, 13 | Mensagem “   ” | Sistema impede envio |
| Caso 4 | 1, 5, 7, 10, 13 | Chat inexistente | Sistema impede envio |
| Caso 5 | 1, 6, 7, 10, 13 | Usuário tenta enviar em conversa alheia | Sistema bloqueia acesso |
| Caso 6 | 1, 4, 8, 10, 13 | Mensagem enviada não aparece | Sistema deve renderizar imediatamente |
| Caso 7 | 1, 4, 9, 10, 13 | Status aparece como “Falhou” sem erro real | Sistema deve exibir status correto |
| Caso 8 | 1, 4, 7, 11, 13 | Mensagem aparece como lida antes do profissional abrir | Sistema deve aguardar visualização |
| Caso 9 | 1, 4, 7, 12, 13 | Profissional visualiza e status não muda | Sistema deve atualizar para “Lida” |
| Caso 10 | 1, 4, 7, 10, 14 | Mensagem contém telefone e não exibe aviso | Sistema deve disparar alerta |
| Caso 11 | 1, 4, 7, 10, 15 | Mensagem comum exibe aviso de telefone/link | Sistema deve evitar falso positivo |

**Legenda da Tabela:** Casos de Teste da US #76.

---

# #82 - Histórico de contratações

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Registros exibidos | Apenas serviços concluídos do cliente (1) | Serviços pendentes exibidos (2) | Serviços cancelados exibidos como concluídos (3) |
| Dados do registro | Mês, profissional e valor pago exibidos (4) | Valor pago ausente (5) | Nome do profissional ausente (6) |
| Filtro temporal | Filtro “Ano Anterior” retorna obras concluídas no ano passado (7) | Filtro retorna ano atual (8) | Filtro retorna período incorreto/vazio indevido (9) |
| Relatório PDF | PDF gerado com a listagem ativa na tela (10) | PDF gerado vazio (11) | PDF com dados diferentes da tela (12) |
| Retenção/imutabilidade | Registro mantido por 5 anos e não editável (13) | Registro editável pelo cliente (14) | Registro removido antes de 5 anos (15) |

**Legenda da Tabela:** Classes de Equivalência da US #82.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10, 13 | Histórico com obras concluídas; filtro “Ano Anterior”; gerar PDF | Sistema lista registros corretos e gera PDF correspondente |
| Caso 2 | 2, 4, 7, 10, 13 | Serviço pendente aparece no histórico | Sistema deve ocultar registro |
| Caso 3 | 3, 4, 7, 10, 13 | Serviço cancelado aparece como concluído | Sistema deve corrigir status |
| Caso 4 | 1, 5, 7, 10, 13 | Registro sem valor pago | Sistema deve tratar dado incompleto |
| Caso 5 | 1, 6, 7, 10, 13 | Registro sem nome do profissional | Sistema deve tratar dado incompleto |
| Caso 6 | 1, 4, 8, 10, 13 | Filtro “Ano Anterior” mostra ano atual | Sistema deve corrigir filtro |
| Caso 7 | 1, 4, 9, 10, 13 | Filtro retorna período errado | Sistema deve exibir apenas ano anterior |
| Caso 8 | 1, 4, 7, 11, 13 | PDF gerado vazio | Sistema deve gerar relatório com registros |
| Caso 9 | 1, 4, 7, 12, 13 | PDF diferente da listagem ativa | Sistema deve gerar relatório equivalente à tela |
| Caso 10 | 1, 4, 7, 10, 14 | Cliente consegue editar registro histórico | Sistema deve bloquear edição |
| Caso 11 | 1, 4, 7, 10, 15 | Registro com menos de 5 anos removido | Sistema deve manter retenção mínima |

**Legenda da Tabela:** Casos de Teste da US #82.

