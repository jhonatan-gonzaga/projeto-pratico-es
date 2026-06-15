# #141 - Recebimento de notificações de trabalhos compatíveis

## Tabela de Classes de Equivalência

| Condição de Entrada         | Classes Válidas                                             | Classes Inválidas                                             | Classes Inválidas                                               |
| --------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------- | --------------------------------------------------------------- |
| Estado das notificações     | Notificações ativadas (1)                                   | Notificações desativadas (2)                                  | Tentativa de ativar/desativar pela segunda vez no mesmo dia (3) |
| Compatibilidade do trabalho | Trabalho compatível com a especialidade do profissional (4) | Trabalho incompatível com a especialidade do profissional (5) | Trabalho sem categoria definida (6)                             |
| Controle de envio           | Trabalho novo ainda não notificado (7)                      | Trabalho já enviado anteriormente (8)                         | Intervalo mínimo de 1 hora não concluído (9)                    |
| Conteúdo da notificação     | Notificação contendo cliente e descrição válida (10)        | Notificação sem nome do cliente (11)                          | Notificação sem descrição do trabalho (12)                      |

**Legenda da Tabela:** Classes de Equivalência da US #141.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas                                                                                                                                                           | Resultado Esperado                                                                                     |
| -------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| Caso 1         | 1, 4, 7, 10             | Notificações=Ativadas; Especialidade=Eletricista; Trabalho="Instalação de Chuveiro"; Cliente="João Silva"; Descrição="Instalar chuveiro elétrico em residência"    | Notificação enviada com sucesso                                                                        |
| Caso 2         | 2, 4, 7, 10             | Notificações=Desativadas; Especialidade=Eletricista; Trabalho="Instalação de Chuveiro"; Cliente="João Silva"; Descrição="Instalar chuveiro elétrico em residência" | Nenhuma notificação enviada                                                                            |
| Caso 3         | 1, 5, 7, 10             | Especialidade=Eletricista; Trabalho="Pintura Residencial"; Cliente="João Silva"; Descrição="Pintura interna de apartamento"                                        | Nenhuma notificação enviada                                                                            |
| Caso 4         | 1, 4, 8, 10             | Trabalho="Instalação de Chuveiro"; Cliente="João Silva"; Descrição="Instalar chuveiro elétrico em residência" (já notificado anteriormente)                        | Sistema aguarda novo trabalho                                                                          |
| Caso 5         | 1, 4, 9, 10             | Última notificação enviada há 30 minutos; Trabalho="Troca de Fiação"; Cliente="Maria Souza"; Descrição="Trocar fiação elétrica da cozinha"                         | Nenhuma notificação enviada                                                                            |
| Caso 6         | 3, 4, 7, 10             | Usuário realiza segunda tentativa de ativar/desativar notificações no mesmo dia                                                                                    | Exibir mensagem: "Você não pode ativar/desativar as notificações duas vezes ao dia! Por favor espere!" |
| Caso 7         | 1, 4, 7, 11             | Notificações=Ativadas; Especialidade=Eletricista; Trabalho="Troca de Fiação"; Cliente=NULL; Descrição="Trocar fiação elétrica da cozinha"                          | Sistema não envia notificação                                                                          |
| Caso 8         | 1, 4, 7, 12             | Notificações=Ativadas; Especialidade=Eletricista; Trabalho="Troca de Fiação"; Cliente="Maria Souza"; Descrição=NULL                                                | Sistema não envia notificação                                                                          |

**Legenda da Tabela:** Casos de Teste da US #141.

---
# #39 - Notificação da mensagem do Cliente no chat para a persona Profissional

## Tabela de Classes de Equivalência

| Condição de Entrada           | Classes Válidas                                                                 | Classes Inválidas                     | Classes Inválidas                            |
| ----------------------------- | ------------------------------------------------------------------------------- | ------------------------------------- | -------------------------------------------- |
| Nova mensagem no chat         | Cliente envia nova mensagem de texto (1)                                        | Nenhuma nova mensagem enviada (2)     | Mensagem vazia enviada pelo cliente (3)      |
| Estado da notificação do chat | Notificações do chat ativadas (4)                                               | Chat silenciado pelo profissional (5) | Configuração de notificação indisponível (6) |
| Mudança de status do serviço  | Status do serviço alterado (7)                                                  | Status do serviço sem alteração (8)   | Status antigo ou novo ausente (9)            |
| Conteúdo da notificação       | Notificação contém nome do cliente, mensagem/status e trabalho relacionado (10) | Notificação sem nome do cliente (11)  | Notificação sem trabalho relacionado (12)    |

**Legenda da Tabela:** Classes de Equivalência da US #39.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas                                                                                                                                           | Resultado Esperado                                             |
| -------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Caso 1         | 1, 4, 10                | Cliente="João Silva"; Mensagem="Boa tarde, ainda está disponível para o serviço?"; Trabalho="Instalação de Chuveiro"; NotificaçãoChat=Ativada      | Notificação push enviada ao profissional                       |
| Caso 2         | 2, 4, 10                | Cliente="João Silva"; Mensagem=NULL; Trabalho="Instalação de Chuveiro"; NotificaçãoChat=Ativada                                                    | Nenhuma notificação enviada                                    |
| Caso 3         | 3, 4, 10                | Cliente="João Silva"; Mensagem=""; Trabalho="Instalação de Chuveiro"; NotificaçãoChat=Ativada                                                      | Sistema não envia notificação de mensagem vazia                |
| Caso 4         | 1, 5, 10                | Cliente="Maria Souza"; Mensagem="Podemos combinar o horário?"; Trabalho="Pintura Residencial"; NotificaçãoChat=Silenciada                          | Nenhuma notificação push enviada                               |
| Caso 5         | 1, 6, 10                | Cliente="Maria Souza"; Mensagem="Podemos combinar o horário?"; Trabalho="Pintura Residencial"; NotificaçãoChat=NULL                                | Sistema não envia notificação e registra falha de configuração |
| Caso 6         | 7, 4, 10                | Cliente="Carlos Lima"; StatusAntigo="Aguardando aprovação"; StatusNovo="Em andamento"; Trabalho="Troca de Fiação"; NotificaçãoChat=Ativada         | Notificação de mudança de status enviada ao profissional       |
| Caso 7         | 8, 4, 10                | Cliente="Carlos Lima"; StatusAntigo="Aguardando aprovação"; StatusNovo="Aguardando aprovação"; Trabalho="Troca de Fiação"; NotificaçãoChat=Ativada | Nenhuma notificação de status enviada                          |
| Caso 8         | 7, 4, 9                 | Cliente="Carlos Lima"; StatusAntigo=NULL; StatusNovo="Em andamento"; Trabalho="Troca de Fiação"; NotificaçãoChat=Ativada                           | Sistema não envia notificação de status incompleta             |
| Caso 9         | 1, 4, 11                | Cliente=NULL; Mensagem="Pode iniciar amanhã?"; Trabalho="Troca de Fiação"; NotificaçãoChat=Ativada                                                 | Sistema não envia notificação incompleta                       |
| Caso 10        | 1, 4, 12                | Cliente="Ana Costa"; Mensagem="Qual o valor final?"; Trabalho=NULL; NotificaçãoChat=Ativada                                                        | Sistema não envia notificação incompleta                       |

**Legenda da Tabela:** Casos de Teste da US #39.

---

# #41 - Chat de conversas para a persona Profissional & Cliente

## Tabela de Classes de Equivalência

| Condição de Entrada        | Classes Válidas                                                            | Classes Inválidas                                                     | Classes Inválidas                                     |
| -------------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------- |
| Habilitação do chat        | Cliente demonstrou interesse na proposta ou profissional se candidatou (1) | Cliente não demonstrou interesse e profissional não se candidatou (2) | Serviço inexistente ou não relacionado ao usuário (3) |
| Tipo de mensagem           | Mensagem de texto (4)                                                      | Emoji ou figurinha (5)                                                | Imagem ou arquivo (6)                                 |
| Conteúdo da mensagem       | Mensagem preenchida (7)                                                    | Mensagem vazia (8)                                                    | Mensagem contendo apenas espaços em branco (9)        |
| Mensagens não lidas        | Existem mensagens não lidas (10)                                           | Não existem mensagens não lidas (11)                                  | Contador de mensagens inconsistente (12)              |
| Armazenamento do histórico | Histórico armazenado dentro do prazo de 60 dias (13)                       | Histórico não armazenado (14)                                         | Histórico removido antes de 60 dias (15)              |

**Legenda da Tabela:** Classes de Equivalência da US #41.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas                                                                                     | Resultado Esperado                                                   |
| -------------- | ----------------------- | -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Caso 1         | 1, 4, 7, 13             | InteresseCliente=Sim; Mensagem="Posso realizar o serviço amanhã às 08h."; TipoMensagem=Texto | Mensagem enviada e armazenada com sucesso                            |
| Caso 2         | 2, 4, 7, 13             | InteresseCliente=Não; Mensagem="Posso realizar o serviço amanhã às 08h."; TipoMensagem=Texto | Chat bloqueado para envio de mensagens                               |
| Caso 3         | 3, 4, 7, 13             | ServicoID=99999 (inexistente); Mensagem="Olá"; TipoMensagem=Texto                            | Sistema impede acesso ao chat                                        |
| Caso 4         | 1, 5, 7, 13             | InteresseCliente=Sim; Mensagem="😊"; TipoMensagem=Emoji                                      | Sistema bloqueia envio da mensagem                                   |
| Caso 5         | 1, 5, 7, 13             | InteresseCliente=Sim; Mensagem="👍"; TipoMensagem=Figurinha                                  | Sistema bloqueia envio da mensagem                                   |
| Caso 6         | 1, 6, 7, 13             | InteresseCliente=Sim; Arquivo="foto_servico.jpg"; TipoMensagem=Imagem                        | Sistema bloqueia envio do arquivo                                    |
| Caso 7         | 1, 4, 8, 13             | InteresseCliente=Sim; Mensagem=""; TipoMensagem=Texto                                        | Sistema impede envio da mensagem                                     |
| Caso 8         | 1, 4, 9, 13             | InteresseCliente=Sim; Mensagem="      "; TipoMensagem=Texto                                  | Sistema impede envio da mensagem                                     |
| Caso 9         | 1, 4, 7, 10             | MensagensNaoLidas=5; UltimaMensagem="Qual horário disponível?"                               | Sistema exibe "5 mensagens não lidas"                                |
| Caso 10        | 1, 4, 7, 11             | MensagensNaoLidas=0                                                                          | Sistema não exibe indicador de mensagens não lidas                   |
| Caso 11        | 1, 4, 7, 12             | MensagensNaoLidasBanco=5; MensagensNaoLidasTela=2                                            | Sistema detecta inconsistência e atualiza contador                   |
| Caso 12        | 1, 4, 7, 14             | Mensagem="Posso realizar amanhã"; HistoricoSalvo=Não                                         | Sistema registra erro de armazenamento                               |
| Caso 13        | 1, 4, 7, 15             | Mensagem enviada há 30 dias; Histórico removido do banco                                     | Sistema registra falha, pois o histórico deve permanecer por 60 dias |

**Legenda da Tabela:** Casos de Teste da US #41.

---

# #29 - Visualização de serviços disponíveis da persona de Profissional

## Tabela de Classes de Equivalência

| Condição de Entrada     | Classes Válidas                                                           | Classes Inválidas                                             | Classes Inválidas                                     |
| ----------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------- |
| Perfil do profissional  | Perfil completo (1)                                                       | Perfil incompleto (2)                                         | Perfil sem categoria/especialidade compatível (3)     |
| Oferta de serviço       | Oferta disponível e compatível com a área do profissional (4)             | Oferta indisponível (5)                                       | Oferta incompatível com a área do profissional (6)    |
| Dados exibidos na lista | Lista exibe nome do serviço, cliente, valor, data, horário e endereço (7) | Lista com dados obrigatórios ausentes (8)                     | Lista vazia mesmo havendo ofertas compatíveis (9)     |
| Status do serviço       | Status “Aguardando aprovação” (10)                                        | Status “Em andamento” (11)                                    | Status “Concluído” (12)                               |
| Candidatura             | Primeira candidatura ativa para a oferta (13)                             | Profissional já possui candidatura ativa na mesma oferta (14) | Candidatura para oferta inexistente (15)              |
| Cancelamento            | Cancelamento permitido após candidatura (16)                              | Cancelamento não permitido pelo status atual (17)             | Cancelamento gera nova candidatura indevidamente (18) |

**Legenda da Tabela:** Classes de Equivalência da US #29.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas                                                                                                                                                                                                                                               | Resultado Esperado                                                          |
| -------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| Caso 1         | 1, 4, 7, 10, 13         | Perfil=Completo; EspecialidadeProfissional="Eletricista"; Oferta="Instalação de Chuveiro"; Cliente="João Silva"; Valor=150.00; Data="20/06/2026"; Horário="09:00"; Endereço="Rua das Flores, 120"; Status="Aguardando aprovação"; CandidaturaAtiva=Não | Sistema registra candidatura e exibe “Candidatura registrada com sucesso”   |
| Caso 2         | 2, 4, 7, 10, 13         | Perfil=Incompleto; EspecialidadeProfissional="Eletricista"; Oferta="Instalação de Chuveiro"; Status="Aguardando aprovação"; CandidaturaAtiva=Não                                                                                                       | Sistema bloqueia a candidatura                                              |
| Caso 3         | 3, 4, 7, 10, 13         | Perfil=Completo; EspecialidadeProfissional=NULL; Oferta="Instalação de Chuveiro"; Status="Aguardando aprovação"; CandidaturaAtiva=Não                                                                                                                  | Sistema bloqueia a candidatura por falta de categoria/especialidade         |
| Caso 4         | 1, 5, 7, 10, 13         | Perfil=Completo; EspecialidadeProfissional="Eletricista"; Oferta="Instalação de Chuveiro"; OfertaDisponivel=Não; Status="Aguardando aprovação"                                                                                                         | Sistema impede candidatura em oferta indisponível                           |
| Caso 5         | 1, 6, 7, 10, 13         | Perfil=Completo; EspecialidadeProfissional="Eletricista"; Oferta="Pintura Residencial"; CategoriaOferta="Pintor"; Status="Aguardando aprovação"                                                                                                        | Sistema não deve permitir candidatura em oferta incompatível                |
| Caso 6         | 1, 4, 8, 10, 13         | Perfil=Completo; Oferta="Instalação de Chuveiro"; Cliente=NULL; Valor=150.00; Data="20/06/2026"; Horário="09:00"; Endereço="Rua das Flores, 120"                                                                                                       | Sistema deve impedir ou corrigir exibição de oferta incompleta              |
| Caso 7         | 1, 4, 9, 10, 13         | Perfil=Completo; EspecialidadeProfissional="Eletricista"; OfertasCompatíveis=3; ListaExibida=Vazia                                                                                                                                                     | Sistema deve atualizar e exibir as ofertas compatíveis                      |
| Caso 8         | 1, 4, 7, 10, 14         | Perfil=Completo; Oferta="Instalação de Chuveiro"; Status="Aguardando aprovação"; CandidaturaAtiva=Sim                                                                                                                                                  | Sistema impede candidatura duplicada                                        |
| Caso 9         | 1, 4, 7, 10, 15         | Perfil=Completo; OfertaID=99999; Status="Aguardando aprovação"; CandidaturaAtiva=Não                                                                                                                                                                   | Sistema impede candidatura para oferta inexistente                          |
| Caso 10        | 1, 4, 7, 10, 16         | Perfil=Completo; Oferta="Instalação de Chuveiro"; Status="Aguardando aprovação"; CandidaturaAtiva=Sim; Ação="Cancelar"                                                                                                                                 | Sistema cancela a candidatura                                               |
| Caso 11        | 1, 4, 7, 11, 17         | Perfil=Completo; Oferta="Instalação de Chuveiro"; Status="Em andamento"; CandidaturaAtiva=Sim; Ação="Cancelar"                                                                                                                                         | Sistema impede cancelamento                                                 |
| Caso 12        | 1, 4, 7, 12, 17         | Perfil=Completo; Oferta="Instalação de Chuveiro"; Status="Concluído"; CandidaturaAtiva=Sim; Ação="Cancelar"                                                                                                                                            | Sistema impede cancelamento                                                 |
| Caso 13        | 1, 4, 7, 10, 18         | Perfil=Completo; Oferta="Instalação de Chuveiro"; Status="Aguardando aprovação"; CandidaturaAtiva=Sim; Ação="Cancelar"; NovaCandidaturaCriada=Sim                                                                                                      | Sistema deve impedir criação indevida de nova candidatura                   |
| Caso 14        | 1, 4, 7, 10, 13         | Perfil=Completo; Oferta="Instalação de Chuveiro"; Status="Aguardando aprovação"; BotãoAceitar="Disponível"                                                                                                                                             | Botão “Aceitar Oferta” deve estar visível no card da oferta                 |
| Caso 15        | 1, 4, 7, 10, 13         | Perfil=Completo; Oferta="Instalação de Chuveiro"; Ação="Aceitar Oferta"                                                                                                                                                                                | Botão “Aceitar Oferta” deve ser desabilitado ou alterado após a candidatura |

**Legenda da Tabela:** Casos de Teste da US #29.

---

# #40 - Visualização de informações do cliente da persona do Profissional

## Tabela de Classes de Equivalência

| Condição de Entrada            | Classes Válidas                                          | Classes Inválidas                                            | Classes Inválidas                             |
| ------------------------------ | -------------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------------- |
| Dados básicos do cliente       | Nome, imagem de perfil e avaliação média exibidos (1)    | Nome do cliente ausente (2)                                  | Avaliação média ausente ou inválida (3)       |
| Descrição da solicitação       | Descrição detalhada da solicitação preenchida (4)        | Descrição da solicitação vazia (5)                           | Descrição da solicitação ausente (6)          |
| Fotos anexadas pelo cliente    | Solicitação com fotos anexadas visíveis (7)              | Foto anexada indisponível ou corrompida (8)                  | Solicitação sem fotos anexadas (9)            |
| Zoom nas fotos                 | Zoom habilitado ao clicar na foto (10)                   | Clique na foto não abre zoom (11)                            | Zoom abre imagem errada (12)                  |
| Localização do serviço         | Bairro do serviço exibido (13)                           | Endereço exato exibido antes do aceite (14)                  | Localização ausente (15)                      |
| Compatibilidade da solicitação | Solicitação corresponde à categoria do profissional (16) | Solicitação não corresponde à categoria do profissional (17) | Categoria do profissional não cadastrada (18) |

**Legenda da Tabela:** Classes de Equivalência da US #40.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas                                                                                                                                                                                                                                                                                    | Resultado Esperado                                                              |
| -------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Caso 1         | 1, 4, 7, 10, 13, 16     | Cliente="João Silva"; ImagemPerfil="joao.png"; AvaliacaoMedia=4.8; Descricao="Preciso instalar um chuveiro elétrico no banheiro."; FotoAnexada="chuveiro.jpg"; CliqueFoto=Sim; Bairro="Centro"; EnderecoExato=NULL; CategoriaProfissional="Eletricista"; CategoriaSolicitacao="Eletricista" | Sistema exibe informações básicas, descrição, foto com zoom e bairro do serviço |
| Caso 2         | 2, 4, 7, 10, 13, 16     | Cliente=NULL; ImagemPerfil="joao.png"; AvaliacaoMedia=4.8; Descricao="Preciso instalar um chuveiro elétrico."; FotoAnexada="chuveiro.jpg"; Bairro="Centro"; CategoriaSolicitacao="Eletricista"                                                                                              | Sistema não deve exibir solicitação com nome do cliente ausente                 |
| Caso 3         | 3, 4, 7, 10, 13, 16     | Cliente="João Silva"; ImagemPerfil="joao.png"; AvaliacaoMedia=NULL; Descricao="Preciso instalar um chuveiro elétrico."; FotoAnexada="chuveiro.jpg"; Bairro="Centro"; CategoriaSolicitacao="Eletricista"                                                                                     | Sistema exibe cliente, mas indica avaliação indisponível                        |
| Caso 4         | 1, 5, 7, 10, 13, 16     | Cliente="Maria Souza"; AvaliacaoMedia=4.5; Descricao=""; FotoAnexada="tomada.jpg"; Bairro="São Jorge"; CategoriaSolicitacao="Eletricista"                                                                                                                                                   | Sistema não deve exibir solicitação sem descrição                               |
| Caso 5         | 1, 6, 7, 10, 13, 16     | Cliente="Maria Souza"; AvaliacaoMedia=4.5; Descricao=NULL; FotoAnexada="tomada.jpg"; Bairro="São Jorge"; CategoriaSolicitacao="Eletricista"                                                                                                                                                 | Sistema não deve exibir solicitação com descrição ausente                       |
| Caso 6         | 1, 4, 8, 10, 13, 16     | Cliente="Carlos Lima"; AvaliacaoMedia=4.2; Descricao="Preciso trocar a tomada da sala."; FotoAnexada="arquivo_corrompido.jpg"; Bairro="Jauary"; CategoriaSolicitacao="Eletricista"                                                                                                          | Sistema informa erro ao carregar foto ou exibe imagem indisponível              |
| Caso 7         | 1, 4, 9, 13, 16         | Cliente="Ana Costa"; AvaliacaoMedia=5.0; Descricao="Preciso trocar a fiação da cozinha."; FotoAnexada=NULL; Bairro="Centro"; CategoriaSolicitacao="Eletricista"                                                                                                                             | Sistema exibe solicitação normalmente sem área de fotos                         |
| Caso 8         | 1, 4, 7, 11, 13, 16     | Cliente="João Silva"; FotoAnexada="chuveiro.jpg"; CliqueFoto=Sim; Zoom=Não; Bairro="Centro"; CategoriaSolicitacao="Eletricista"                                                                                                                                                             | Sistema deve permitir zoom ao clicar na foto                                    |
| Caso 9         | 1, 4, 7, 12, 13, 16     | Cliente="João Silva"; FotoAnexada="chuveiro.jpg"; CliqueFoto=Sim; ImagemZoom="outra_foto.jpg"; Bairro="Centro"; CategoriaSolicitacao="Eletricista"                                                                                                                                          | Sistema deve abrir no zoom a mesma foto selecionada                             |
| Caso 10        | 1, 4, 7, 10, 14, 16     | Cliente="João Silva"; Bairro="Centro"; EnderecoExato="Rua das Flores, 120"; CategoriaSolicitacao="Eletricista"                                                                                                                                                                              | Sistema não deve exibir endereço exato antes do aceite/fechamento do acordo     |
| Caso 11        | 1, 4, 7, 10, 15, 16     | Cliente="João Silva"; Bairro=NULL; EnderecoExato=NULL; CategoriaSolicitacao="Eletricista"                                                                                                                                                                                                   | Sistema informa localização aproximada indisponível                             |
| Caso 12        | 1, 4, 7, 10, 13, 17     | Cliente="Pedro Alves"; Descricao="Preciso pintar minha sala."; Bairro="Centro"; CategoriaProfissional="Eletricista"; CategoriaSolicitacao="Pintor"                                                                                                                                          | Sistema não deve permitir visualização da solicitação incompatível              |
| Caso 13        | 1, 4, 7, 10, 13, 18     | Cliente="Pedro Alves"; Descricao="Preciso pintar minha sala."; Bairro="Centro"; CategoriaProfissional=NULL; CategoriaSolicitacao="Pintor"                                                                                                                                                   | Sistema bloqueia visualização até o profissional cadastrar categoria            |

**Legenda da Tabela:** Casos de Teste da US #40.

---

# #35 - Envio de contraproposta da persona Profissional para Cliente

## Tabela de Classes de Equivalência

| Condição de Entrada     | Classes Válidas                                          | Classes Inválidas                                       | Classes Inválidas                                   |
| ----------------------- | -------------------------------------------------------- | ------------------------------------------------------- | --------------------------------------------------- |
| Valor da contraproposta | Valor positivo (1)                                       | Valor igual a zero (2)                                  | Valor negativo (3)                                  |
| Mensagem personalizada  | Mensagem entre 10 e 200 caracteres (4)                   | Mensagem com menos de 10 caracteres (5)                 | Mensagem com mais de 200 caracteres (6)             |
| Contraproposta ativa    | Não existe contraproposta ativa para o mesmo serviço (7) | Já existe contraproposta ativa para o mesmo serviço (8) | Contraproposta anterior sem resposta do cliente (9) |
| Cancelamento do envio   | Cancelamento antes da resposta do cliente (10)           | Cancelamento após resposta do cliente (11)              | Cancelamento de contraproposta inexistente (12)     |

**Legenda da Tabela:** Classes de Equivalência da US #35.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas                                                                                                                                                                                                                                                                                                                                                             | Resultado Esperado                                                                       |
| -------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Caso 1         | 1, 4, 7                 | Valor=180.00; Mensagem="Posso realizar o serviço amanhã pela manhã."; Servico="Instalação de Chuveiro"; ContrapropostaAtiva=Não                                                                                                                                                                                                                                      | Sistema envia contraproposta e exibe pop-up: "Contraproposta enviada ao cliente!"        |
| Caso 2         | 2, 4, 7                 | Valor=0.00; Mensagem="Posso realizar o serviço amanhã pela manhã."; Servico="Instalação de Chuveiro"; ContrapropostaAtiva=Não                                                                                                                                                                                                                                        | Sistema bloqueia envio e informa que o valor deve ser positivo                           |
| Caso 3         | 3, 4, 7                 | Valor=-50.00; Mensagem="Posso realizar o serviço amanhã pela manhã."; Servico="Instalação de Chuveiro"; ContrapropostaAtiva=Não                                                                                                                                                                                                                                      | Sistema bloqueia envio e informa que o valor deve ser positivo                           |
| Caso 4         | 1, 5, 7                 | Valor=180.00; Mensagem="Faço hoje"; Servico="Instalação de Chuveiro"; ContrapropostaAtiva=Não                                                                                                                                                                                                                                                                        | Sistema bloqueia envio e informa que a mensagem deve ter no mínimo 10 caracteres         |
| Caso 5         | 1, 6, 7                 | Valor=180.00; Mensagem="Tenho disponibilidade para realizar o serviço solicitado amanhã pela manhã, levando todos os materiais necessários, verificando a instalação elétrica, testando o funcionamento final e garantindo que tudo esteja conforme combinado com o cliente antes da entrega do serviço."; Servico="Instalação de Chuveiro"; ContrapropostaAtiva=Não | Sistema bloqueia envio e informa que a mensagem deve ter no máximo 200 caracteres        |
| Caso 6         | 1, 4, 8                 | Valor=180.00; Mensagem="Posso realizar o serviço amanhã pela manhã."; Servico="Instalação de Chuveiro"; ContrapropostaAtiva=Sim                                                                                                                                                                                                                                      | Sistema bloqueia envio de múltiplas contrapropostas ativas                               |
| Caso 7         | 1, 4, 9                 | Valor=200.00; Mensagem="Posso realizar o serviço ainda esta semana."; Servico="Instalação de Chuveiro"; RespostaCliente=Pendente                                                                                                                                                                                                                                     | Sistema bloqueia nova contraproposta até o cliente responder ou a anterior ser cancelada |
| Caso 8         | 1, 4, 7, 10             | Valor=180.00; Mensagem="Posso realizar o serviço amanhã pela manhã."; Servico="Instalação de Chuveiro"; Ação="Cancelar envio"; RespostaCliente=Pendente                                                                                                                                                                                                              | Sistema cancela o envio da contraproposta                                                |
| Caso 9         | 1, 4, 7, 11             | Valor=180.00; Mensagem="Posso realizar o serviço amanhã pela manhã."; Servico="Instalação de Chuveiro"; Ação="Cancelar envio"; RespostaCliente=Aceita                                                                                                                                                                                                                | Sistema impede cancelamento após resposta do cliente                                     |
| Caso 10        | 1, 4, 7, 12             | Servico="Instalação de Chuveiro"; Ação="Cancelar envio"; ContrapropostaAtiva=Não                                                                                                                                                                                                                                                                                     | Sistema informa que não existe contraproposta ativa para cancelar                        |
| Caso 11        | 1, 4, 7                 | Valor=180.00; Mensagem="Posso realizar o serviço amanhã pela manhã."; Cliente="João Silva"; Profissional="Carlos Lima"; Servico="Instalação de Chuveiro"                                                                                                                                                                                                             | Cliente consegue visualizar nome do profissional, novo valor e mensagem personalizada    |
| Caso 12        | 1, 4, 7                 | Valor=180.00; Mensagem="Posso realizar o serviço amanhã pela manhã."; Cliente="João Silva"; Profissional=NULL; Servico="Instalação de Chuveiro"                                                                                                                                                                                                                      | Sistema não deve exibir contraproposta sem identificação do profissional                 |

**Legenda da Tabela:** Casos de Teste da US #35.

---

# #36 - Visualização própria das mensagens de contraproposta da persona Profissional

## Tabela de Classes de Equivalência

| Condição de Entrada            | Classes Válidas                                                          | Classes Inválidas                                           | Classes Inválidas                                |
| ------------------------------ | ------------------------------------------------------------------------ | ----------------------------------------------------------- | ------------------------------------------------ |
| Existência de proposta enviada | Profissional possui proposta enviada (1)                                 | Profissional não possui proposta enviada (2)                | Proposta pertence a outro profissional (3)       |
| Prazo de visualização          | Proposta enviada há até 60 dias (4)                                      | Proposta enviada há mais de 60 dias (5)                     | Data de envio ausente ou inválida (6)            |
| Dados exibidos da proposta     | Valor, mensagem, data, status e nome do cliente exibidos (7)             | Valor da proposta ausente (8)                               | Mensagem da proposta ausente (9)                 |
| Status da proposta             | Status “Ativa” (10)                                                      | Status “Aceita” (11)                                        | Status “Recusada” (12)                           |
| Serviço finalizado             | Proposta de serviço finalizado mantida no histórico dentro do prazo (13) | Proposta de serviço finalizado removida antes do prazo (14) | Proposta finalizada sem vínculo com serviço (15) |

**Legenda da Tabela:** Classes de Equivalência da US #36.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas                                                                                                                                                                                           | Resultado Esperado                                                             |
| -------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Caso 1         | 1, 4, 7, 10             | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; Valor=180.00; Mensagem="Posso realizar amanhã pela manhã."; DataEnvio="10/06/2026"; Status="Ativa"             | Sistema lista a proposta enviada com todos os dados obrigatórios               |
| Caso 2         | 2                       | Profissional="Carlos Lima"; PropostasEnviadas=0                                                                                                                                                    | Sistema exibe lista vazia ou mensagem informando que não há propostas enviadas |
| Caso 3         | 3, 4, 7, 10             | ProfissionalLogado="Carlos Lima"; ProfissionalDaProposta="Pedro Alves"; Cliente="João Silva"; Valor=180.00; DataEnvio="10/06/2026"; Status="Ativa"                                                 | Sistema não deve exibir proposta de outro profissional                         |
| Caso 4         | 1, 5, 7, 10             | Profissional="Carlos Lima"; Cliente="João Silva"; Valor=180.00; DataEnvio="01/03/2026"; DataAtual="10/06/2026"; Status="Ativa"                                                                     | Sistema não lista proposta enviada há mais de 60 dias                          |
| Caso 5         | 1, 6, 7, 10             | Profissional="Carlos Lima"; Cliente="João Silva"; Valor=180.00; DataEnvio=NULL; Status="Ativa"                                                                                                     | Sistema não deve exibir proposta com data inválida ou ausente                  |
| Caso 6         | 1, 4, 8, 10             | Profissional="Carlos Lima"; Cliente="João Silva"; Valor=NULL; Mensagem="Posso realizar amanhã pela manhã."; DataEnvio="10/06/2026"; Status="Ativa"                                                 | Sistema não deve exibir proposta sem valor                                     |
| Caso 7         | 1, 4, 9, 10             | Profissional="Carlos Lima"; Cliente="João Silva"; Valor=180.00; Mensagem=NULL; DataEnvio="10/06/2026"; Status="Ativa"                                                                              | Sistema não deve exibir proposta sem mensagem                                  |
| Caso 8         | 1, 4, 7, 11             | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; Valor=180.00; Mensagem="Posso realizar amanhã pela manhã."; DataEnvio="10/06/2026"; Status="Aceita"            | Sistema lista a proposta com status “Aceita”                                   |
| Caso 9         | 1, 4, 7, 12             | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; Valor=180.00; Mensagem="Posso realizar amanhã pela manhã."; DataEnvio="10/06/2026"; Status="Recusada"          | Sistema lista a proposta com status “Recusada”                                 |
| Caso 10        | 1, 4, 7, 13             | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; Valor=180.00; Mensagem="Posso realizar amanhã pela manhã."; DataEnvio="10/06/2026"; StatusServico="Finalizado" | Sistema mantém a proposta no histórico dentro do prazo de 60 dias              |
| Caso 11        | 1, 4, 7, 14             | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; DataEnvio="10/06/2026"; StatusServico="Finalizado"; PropostaRemovida=Sim                                       | Sistema registra falha, pois a proposta não deve ser removida antes do prazo   |
| Caso 12        | 1, 4, 7, 15             | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço=NULL; Valor=180.00; Mensagem="Posso realizar amanhã pela manhã."; DataEnvio="10/06/2026"; Status="Ativa"                                 | Sistema não deve exibir proposta sem vínculo com serviço                       |

**Legenda da Tabela:** Casos de Teste da US #36.

---

# #37 - Cancelamento próprio da candidatura da persona Profissional para a persona Cliente

## Tabela de Classes de Equivalência

| Condição de Entrada         | Classes Válidas                                                         | Classes Inválidas                                  | Classes Inválidas                             |
| --------------------------- | ----------------------------------------------------------------------- | -------------------------------------------------- | --------------------------------------------- |
| Existência da candidatura   | Profissional possui candidatura ativa no serviço (1)                    | Profissional não possui candidatura no serviço (2) | Candidatura pertence a outro profissional (3) |
| Status do serviço           | Serviço com status “Aguardando aprovação” (4)                           | Serviço com status “Em Andamento” (5)              | Serviço com status “Finalizado” (6)           |
| Confirmação do cancelamento | Profissional confirma o cancelamento no pop-up (7)                      | Profissional nega o cancelamento no pop-up (8)     | Pop-up de confirmação não é exibido (9)       |
| Notificação ao cliente      | Cliente recebe notificação com profissional e trabalho relacionado (10) | Notificação sem nome do profissional (11)          | Notificação sem trabalho relacionado (12)     |

**Legenda da Tabela:** Classes de Equivalência da US #37.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas                                                                                                                                                                              | Resultado Esperado                                               |
| -------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Caso 1         | 1, 4, 7, 10             | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; Status="Aguardando aprovação"; Botão="Cancelar Candidatura"; PopUpResposta="Sim"                  | Candidatura cancelada e cliente notificado                       |
| Caso 2         | 1, 4, 8                 | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; Status="Aguardando aprovação"; Botão="Cancelar Candidatura"; PopUpResposta="Não"                  | Sistema retorna para o menu de candidaturas sem cancelar         |
| Caso 3         | 2, 4, 7                 | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; Status="Aguardando aprovação"; CandidaturaAtiva=Não; Botão="Cancelar Candidatura"                 | Sistema impede cancelamento por inexistência de candidatura      |
| Caso 4         | 3, 4, 7                 | ProfissionalLogado="Carlos Lima"; ProfissionalDaCandidatura="Pedro Alves"; Serviço="Instalação de Chuveiro"; Status="Aguardando aprovação"; Botão="Cancelar Candidatura"              | Sistema não permite cancelar candidatura de outro profissional   |
| Caso 5         | 1, 5, 7                 | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; Status="Em Andamento"; Botão="Cancelar Candidatura"; PopUpResposta="Sim"                          | Sistema bloqueia cancelamento porque o serviço está em andamento |
| Caso 6         | 1, 6, 7                 | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; Status="Finalizado"; Botão="Cancelar Candidatura"; PopUpResposta="Sim"                            | Sistema bloqueia cancelamento porque o serviço está finalizado   |
| Caso 7         | 1, 4, 9                 | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; Status="Aguardando aprovação"; Botão="Cancelar Candidatura"; PopUpExibido=Não                     | Sistema não deve efetivar cancelamento sem confirmação           |
| Caso 8         | 1, 4, 7, 11             | Profissional=NULL; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; Status="Aguardando aprovação"; PopUpResposta="Sim"                                                         | Sistema não deve enviar notificação incompleta ao cliente        |
| Caso 9         | 1, 4, 7, 12             | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço=NULL; Status="Aguardando aprovação"; PopUpResposta="Sim"                                                                    | Sistema não deve enviar notificação sem trabalho relacionado     |
| Caso 10        | 1, 4, 7, 10             | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; Status="Aguardando aprovação"; TextoNotificacao="Profissional cancelou a candidatura no serviço!" | Cliente recebe notificação com o texto correto                   |

**Legenda da Tabela:** Casos de Teste da US #37.

---

# #30 - Confirmação de Fechamento de acordo entre a persona de Cliente para Profissional

## Tabela de Classes de Equivalência

| Condição de Entrada    | Classes Válidas                                                        | Classes Inválidas                             | Classes Inválidas                                        |
| ---------------------- | ---------------------------------------------------------------------- | --------------------------------------------- | -------------------------------------------------------- |
| Local da confirmação   | Botão “Acordo Fechado! Iniciar Serviço” disponível no chat interno (1) | Botão não disponível no chat interno (2)      | Confirmação feita fora do chat interno (3)               |
| Ação do profissional   | Profissional clica no botão de iniciar serviço (4)                     | Profissional não clica no botão (5)           | Profissional sem vínculo com o serviço tenta iniciar (6) |
| Confirmação do cliente | Cliente confirma o início do serviço (7)                               | Cliente não confirma o início do serviço (8)  | Cliente recusa o início do serviço (9)                   |
| Notificação ao cliente | Cliente é notificado após clique do profissional (10)                  | Cliente não recebe notificação (11)           | Notificação sem identificação do serviço (12)            |
| Leitura TTS            | TTS dos termos do acordo disponível de forma opcional (13)             | TTS obrigatório para iniciar serviço (14)     | TTS indisponível quando solicitado (15)                  |
| Status do serviço      | Status muda para “Em Andamento” após confirmação dupla (16)            | Status muda sem confirmação do cliente (17)   | Status permanece incorreto após confirmação dupla (18)   |
| Registro de início     | Sistema registra data e hora de início (19)                            | Sistema não registra data/hora de início (20) | Data/hora registrada de forma inválida (21)              |

**Legenda da Tabela:** Classes de Equivalência da US #30.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas                                                                                                                                                                                                                                            | Resultado Esperado                                                                        |
| -------------- | ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Caso 1         | 1, 4, 7, 10, 13, 16, 19 | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; Tela="Chat interno"; Botão="Acordo Fechado! Iniciar Serviço"; CliqueProfissional=Sim; ConfirmacaoCliente=Sim; TTS=Desativado; DataHoraInicio="15/06/2026 09:30" | Serviço iniciado oficialmente, status alterado para “Em Andamento” e data/hora registrada |
| Caso 2         | 2, 4, 7                 | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; Tela="Chat interno"; Botão=NULL; CliqueProfissional=Sim; ConfirmacaoCliente=Sim                                                                                 | Sistema não permite iniciar serviço sem o botão disponível                                |
| Caso 3         | 3, 4, 7                 | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; Tela="Detalhes do Serviço"; Botão="Acordo Fechado! Iniciar Serviço"; CliqueProfissional=Sim; ConfirmacaoCliente=Sim                                             | Sistema impede confirmação fora do chat interno                                           |
| Caso 4         | 1, 5, 7                 | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; Tela="Chat interno"; CliqueProfissional=Não; ConfirmacaoCliente=Sim                                                                                             | Serviço não é iniciado                                                                    |
| Caso 5         | 1, 6, 7                 | ProfissionalLogado="Pedro Alves"; ProfissionalDoServico="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; CliqueProfissional=Sim; ConfirmacaoCliente=Sim                                                                       | Sistema impede início por profissional sem vínculo com o serviço                          |
| Caso 6         | 1, 4, 8, 10             | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; CliqueProfissional=Sim; ConfirmacaoCliente=Não                                                                                                                  | Serviço não é formalizado                                                                 |
| Caso 7         | 1, 4, 9, 10             | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; CliqueProfissional=Sim; ConfirmacaoCliente=Recusada                                                                                                             | Serviço não é iniciado                                                                    |
| Caso 8         | 1, 4, 7, 11             | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; CliqueProfissional=Sim; NotificacaoCliente=Não; ConfirmacaoCliente=Sim                                                                                          | Sistema registra falha, pois o cliente deve ser notificado                                |
| Caso 9         | 1, 4, 7, 12             | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço=NULL; CliqueProfissional=Sim; NotificacaoCliente=Sim; ConfirmacaoCliente=Sim                                                                                                              | Sistema não deve enviar notificação sem identificação do serviço                          |
| Caso 10        | 1, 4, 7, 14             | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; CliqueProfissional=Sim; ConfirmacaoCliente=Sim; TTS=Obrigatório                                                                                                 | Sistema deve permitir iniciar serviço sem obrigar o uso do TTS                            |
| Caso 11        | 1, 4, 7, 15             | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; CliqueProfissional=Sim; ConfirmacaoCliente=Sim; TTS=Ativado; AudioTTS=Indisponível                                                                              | Sistema informa falha no TTS, mas não deve bloquear o fluxo principal                     |
| Caso 12        | 1, 4, 8, 17             | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; CliqueProfissional=Sim; ConfirmacaoCliente=Não; Status="Em Andamento"                                                                                           | Sistema deve impedir mudança de status sem confirmação do cliente                         |
| Caso 13        | 1, 4, 7, 18             | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; CliqueProfissional=Sim; ConfirmacaoCliente=Sim; Status="Aguardando aprovação"                                                                                   | Sistema deve alterar status para “Em Andamento”                                           |
| Caso 14        | 1, 4, 7, 20             | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; CliqueProfissional=Sim; ConfirmacaoCliente=Sim; DataHoraInicio=NULL                                                                                             | Sistema deve registrar data/hora de início                                                |
| Caso 15        | 1, 4, 7, 21             | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; CliqueProfissional=Sim; ConfirmacaoCliente=Sim; DataHoraInicio="data inválida"                                                                                  | Sistema não deve aceitar data/hora inválida                                               |

**Legenda da Tabela:** Casos de Teste da US #30.

---

# #38 - Visualização dos serviços via menu dashboard da persona Profissional

## Tabela de Classes de Equivalência

| Condição de Entrada   | Classes Válidas                                                            | Classes Inválidas                                        | Classes Inválidas                                               |
| --------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------- | --------------------------------------------------------------- |
| Abas do dashboard     | Abas “Em Andamento” e “Aguardando Ação” disponíveis (1)                    | Aba “Em Andamento” ausente (2)                           | Aba “Aguardando Ação” ausente (3)                               |
| Listagem dos serviços | Serviço em andamento ou aguardando ação exibido (4)                        | Serviço finalizado exibido no dashboard principal (5)    | Serviço de outro profissional exibido (6)                       |
| Detalhes do serviço   | Botão de detalhes disponível e funcional (7)                               | Botão de detalhes ausente (8)                            | Detalhes exibidos com dados incompletos (9)                     |
| Chat relacionado      | Botão de chat ativo quando existe chat (10)                                | Botão de chat cinza quando não existe chat (11)          | Botão de chat ativo mesmo sem chat existente (12)               |
| Ordenação da lista    | Lista ordenada do mais recente para o mais antigo pela data de aceite (13) | Lista ordenada incorretamente pela data de aceite (14)   | Critério de desempate por nome do cliente não aplicado (15)     |
| Histórico             | Serviço finalizado movido automaticamente para o histórico (16)            | Serviço finalizado permanece no dashboard principal (17) | Serviço não finalizado movido para histórico indevidamente (18) |

**Legenda da Tabela:** Classes de Equivalência da US #38.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas                                                                                                                                                                                                                              | Resultado Esperado                                                                    |
| -------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Caso 1         | 1, 4, 7, 10, 13         | Profissional="Carlos Lima"; AbaEmAndamento=Disponível; AbaAguardandoAcao=Disponível; Serviço="Instalação de Chuveiro"; Status="Em Andamento"; DataAceite="15/06/2026"; Cliente="João Silva"; ChatExiste=Sim; BotaoDetalhes=Disponível | Dashboard exibe o serviço com acesso aos detalhes e chat ativo                        |
| Caso 2         | 2, 4, 7, 10             | Profissional="Carlos Lima"; AbaEmAndamento=NULL; AbaAguardandoAcao=Disponível; Serviço="Instalação de Chuveiro"; Status="Em Andamento"                                                                                                | Sistema deve exibir a aba “Em Andamento”                                              |
| Caso 3         | 3, 4, 7, 10             | Profissional="Carlos Lima"; AbaEmAndamento=Disponível; AbaAguardandoAcao=NULL; Serviço="Troca de Fiação"; Status="Aguardando Ação"                                                                                                    | Sistema deve exibir a aba “Aguardando Ação”                                           |
| Caso 4         | 5, 7, 10, 16            | Profissional="Carlos Lima"; Serviço="Instalação de Chuveiro"; Status="Finalizado"; DataAceite="15/06/2026"; ChatExiste=Sim                                                                                                            | Serviço finalizado deve ser removido do dashboard principal e movido para o histórico |
| Caso 5         | 6, 7, 10                | ProfissionalLogado="Carlos Lima"; ProfissionalDoServico="Pedro Alves"; Serviço="Pintura Residencial"; Status="Em Andamento"; Cliente="Maria Souza"                                                                                    | Sistema não deve exibir serviço de outro profissional                                 |
| Caso 6         | 4, 8, 10                | Profissional="Carlos Lima"; Serviço="Instalação de Chuveiro"; Status="Em Andamento"; BotaoDetalhes=NULL; ChatExiste=Sim                                                                                                               | Sistema deve exibir botão de acesso aos detalhes do serviço                           |
| Caso 7         | 4, 9, 10                | Profissional="Carlos Lima"; Serviço="Instalação de Chuveiro"; Cliente=NULL; Descricao=NULL; Status="Em Andamento"; BotaoDetalhes=Disponível                                                                                           | Sistema não deve exibir detalhes incompletos                                          |
| Caso 8         | 4, 7, 11                | Profissional="Carlos Lima"; Serviço="Pintura Residencial"; Status="Aguardando Ação"; ChatExiste=Não; BotaoChat=Cinza                                                                                                                  | Botão de chat deve aparecer cinza/inativo                                             |
| Caso 9         | 4, 7, 12                | Profissional="Carlos Lima"; Serviço="Pintura Residencial"; Status="Aguardando Ação"; ChatExiste=Não; BotaoChat=Ativo                                                                                                                  | Sistema deve impedir botão de chat ativo quando não existe chat                       |
| Caso 10        | 4, 7, 10, 13            | Serviços=[{Cliente="Ana Costa", DataAceite="15/06/2026"}, {Cliente="João Silva", DataAceite="14/06/2026"}]                                                                                                                            | Lista exibida do serviço mais recente para o mais antigo                              |
| Caso 11        | 4, 7, 10, 14            | Serviços=[{Cliente="João Silva", DataAceite="14/06/2026"}, {Cliente="Ana Costa", DataAceite="15/06/2026"}]                                                                                                                            | Sistema deve corrigir a ordenação pela data de aceite mais recente                    |
| Caso 12        | 4, 7, 10, 15            | Serviços=[{Cliente="Carlos Alves", DataAceite="15/06/2026"}, {Cliente="Ana Costa", DataAceite="15/06/2026"}]                                                                                                                          | Sistema deve ordenar pelo nome do cliente quando houver empate na data de aceite      |
| Caso 13        | 17                      | Serviço="Instalação de Chuveiro"; Status="Finalizado"; LocalAtual="Dashboard principal"                                                                                                                                               | Sistema deve mover serviço finalizado para o histórico                                |
| Caso 14        | 18                      | Serviço="Troca de Fiação"; Status="Em Andamento"; LocalAtual="Histórico"                                                                                                                                                              | Sistema não deve mover serviço em andamento para o histórico                          |

**Legenda da Tabela:** Casos de Teste da US #38.

---

# #28 - Criação de perfil na plataforma da persona Profissional

## Tabela de Classes de Equivalência

| Condição de Entrada  | Classes Válidas                                          | Classes Inválidas                            | Classes Inválidas                                           |
| -------------------- | -------------------------------------------------------- | -------------------------------------------- | ----------------------------------------------------------- |
| Nome do profissional | Nome com no mínimo 3 caracteres (1)                      | Nome vazio (2)                               | Nome com menos de 3 caracteres (3)                          |
| Categoria            | Categoria selecionada/preenchida (4)                     | Categoria vazia (5)                          | Categoria inválida ou inexistente (6)                       |
| Descrição do perfil  | Descrição com no mínimo 20 caracteres (7)                | Descrição vazia (8)                          | Descrição com menos de 20 caracteres (9)                    |
| Fotos do portfólio   | Pelo menos 1 foto válida e no máximo 5 fotos (10)        | Nenhuma foto adicionada (11)                 | Mais de 5 fotos adicionadas (12)                            |
| Formato da foto      | Foto no formato JPG ou PNG (13)                          | Foto em formato inválido (14)                | Foto corrompida (15)                                        |
| Tamanho da foto      | Foto com até 5MB (16)                                    | Foto com mais de 5MB (17)                    | Foto sem tamanho identificado (18)                          |
| Edição do perfil     | Perfil editado a qualquer momento com dados válidos (19) | Edição com dados obrigatórios inválidos (20) | Edição removendo dados obrigatórios do perfil completo (21) |
| TTS                  | TTS opcional ativado ou desativado pelo usuário (22)     | TTS obrigatório para salvar perfil (23)      | TTS indisponível quando ativado (24)                        |

**Legenda da Tabela:** Classes de Equivalência da US #28.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas                                                                                                                                                                            | Resultado Esperado                                                                             |
| -------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Caso 1         | 1, 4, 7, 10, 13, 16, 22 | Nome="Carlos Lima"; Categoria="Eletricista"; Descrição="Realizo instalações elétricas residenciais."; Fotos=["servico1.jpg"]; TamanhoFoto=3MB; TTS=Desativado                       | Sistema salva o perfil e exibe “Perfil salvo com sucesso”                                      |
| Caso 2         | 2, 4, 7, 10, 13, 16     | Nome=""; Categoria="Eletricista"; Descrição="Realizo instalações elétricas residenciais."; Fotos=["servico1.jpg"]; TamanhoFoto=3MB                                                  | Sistema bloqueia salvamento e informa que nome é obrigatório                                   |
| Caso 3         | 3, 4, 7, 10, 13, 16     | Nome="Ca"; Categoria="Eletricista"; Descrição="Realizo instalações elétricas residenciais."; Fotos=["servico1.jpg"]; TamanhoFoto=3MB                                                | Sistema bloqueia salvamento e informa que nome deve ter no mínimo 3 caracteres                 |
| Caso 4         | 1, 5, 7, 10, 13, 16     | Nome="Carlos Lima"; Categoria=""; Descrição="Realizo instalações elétricas residenciais."; Fotos=["servico1.jpg"]; TamanhoFoto=3MB                                                  | Sistema bloqueia salvamento e informa que categoria é obrigatória                              |
| Caso 5         | 1, 6, 7, 10, 13, 16     | Nome="Carlos Lima"; Categoria="Astronauta"; Descrição="Realizo instalações elétricas residenciais."; Fotos=["servico1.jpg"]; TamanhoFoto=3MB                                        | Sistema bloqueia salvamento e informa categoria inválida                                       |
| Caso 6         | 1, 4, 8, 10, 13, 16     | Nome="Carlos Lima"; Categoria="Eletricista"; Descrição=""; Fotos=["servico1.jpg"]; TamanhoFoto=3MB                                                                                  | Sistema bloqueia salvamento e informa que descrição é obrigatória                              |
| Caso 7         | 1, 4, 9, 10, 13, 16     | Nome="Carlos Lima"; Categoria="Eletricista"; Descrição="Faço serviços."; Fotos=["servico1.jpg"]; TamanhoFoto=3MB                                                                    | Sistema bloqueia salvamento e informa que descrição deve ter no mínimo 20 caracteres           |
| Caso 8         | 1, 4, 7, 11, 13, 16     | Nome="Carlos Lima"; Categoria="Eletricista"; Descrição="Realizo instalações elétricas residenciais."; Fotos=[]                                                                      | Sistema salva dados básicos, mas considera perfil incompleto e bloqueia recebimento de ofertas |
| Caso 9         | 1, 4, 7, 12, 13, 16     | Nome="Carlos Lima"; Categoria="Eletricista"; Descrição="Realizo instalações elétricas residenciais."; Fotos=["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg"]                       | Sistema bloqueia upload acima de 5 fotos                                                       |
| Caso 10        | 1, 4, 7, 10, 14, 16     | Nome="Carlos Lima"; Categoria="Eletricista"; Descrição="Realizo instalações elétricas residenciais."; Fotos=["servico1.pdf"]; TamanhoFoto=2MB                                       | Sistema bloqueia foto em formato inválido                                                      |
| Caso 11        | 1, 4, 7, 10, 15, 16     | Nome="Carlos Lima"; Categoria="Eletricista"; Descrição="Realizo instalações elétricas residenciais."; Fotos=["arquivo_corrompido.jpg"]; TamanhoFoto=2MB                             | Sistema informa erro ao carregar foto corrompida                                               |
| Caso 12        | 1, 4, 7, 10, 13, 17     | Nome="Carlos Lima"; Categoria="Eletricista"; Descrição="Realizo instalações elétricas residenciais."; Fotos=["servico1.png"]; TamanhoFoto=6MB                                       | Sistema bloqueia foto maior que 5MB                                                            |
| Caso 13        | 1, 4, 7, 10, 13, 18     | Nome="Carlos Lima"; Categoria="Eletricista"; Descrição="Realizo instalações elétricas residenciais."; Fotos=["servico1.png"]; TamanhoFoto=NULL                                      | Sistema bloqueia ou solicita novo envio da foto                                                |
| Caso 14        | 19                      | PerfilExistente=Sim; Nome="Carlos Lima Santos"; Categoria="Eletricista"; Descrição="Realizo instalações elétricas e manutenção residencial."; Fotos=["servico1.jpg","servico2.png"] | Sistema atualiza o perfil com sucesso                                                          |
| Caso 15        | 20                      | PerfilExistente=Sim; Nome="Ca"; Categoria="Eletricista"; Descrição="Realizo instalações elétricas e manutenção residencial."; Fotos=["servico1.jpg"]                                | Sistema bloqueia edição com dados inválidos                                                    |
| Caso 16        | 21                      | PerfilCompleto=Sim; Nome="Carlos Lima"; Categoria=""; Descrição="Realizo instalações elétricas e manutenção residencial."; Fotos=["servico1.jpg"]                                   | Sistema impede que perfil completo fique inválido após edição                                  |
| Caso 17        | 22                      | TTS=Ativado; Instrução="Preencha seu nome, categoria, descrição e fotos do portfólio."                                                                                              | Sistema realiza leitura das instruções via TTS                                                 |
| Caso 18        | 23                      | TTS=Obrigatório; Nome="Carlos Lima"; Categoria="Eletricista"; Descrição="Realizo instalações elétricas residenciais."; Fotos=["servico1.jpg"]                                       | Sistema não deve obrigar o uso do TTS para salvar perfil                                       |
| Caso 19        | 24                      | TTS=Ativado; AudioTTS=Indisponível; Nome="Carlos Lima"; Categoria="Eletricista"; Descrição="Realizo instalações elétricas residenciais."; Fotos=["servico1.jpg"]                    | Sistema informa falha no TTS, mas não deve bloquear salvamento do perfil                       |
| Caso 20        | 1, 4, 7, 10, 13, 16     | Nome="Carlos Lima"; Categoria="Eletricista"; Descrição="Realizo instalações elétricas residenciais."; Fotos=["servico1.jpg"]; TamanhoFoto=3MB; PerfilCompleto=Sim                   | Sistema considera o perfil completo e permite receber ofertas                                  |

**Legenda da Tabela:** Casos de Teste da US #28.

---

# #27 - Validação de acesso via código utilizando celular da persona Profissional

## Tabela de Classes de Equivalência

| Condição de Entrada     | Classes Válidas                             | Classes Inválidas                             | Classes Inválidas                                         |
| ----------------------- | ------------------------------------------- | --------------------------------------------- | --------------------------------------------------------- |
| Número de celular       | Número cadastrado e único na plataforma (1) | Número não cadastrado (2)                     | Número já vinculado a outra conta ou formato inválido (3) |
| Envio do código OTP     | Código enviado com sucesso (4)              | Código não enviado (5)                        | Envio bloqueado por mecanismo anti-spam (6)               |
| Código OTP              | Código numérico entre 4 e 6 dígitos (7)     | Código com menos de 4 dígitos (8)             | Código com mais de 6 dígitos (9)                          |
| Validade do código      | Código dentro do prazo de 5 minutos (10)    | Código expirado (11)                          | Código inexistente ou já utilizado (12)                   |
| Tentativas de validação | Até 5 tentativas (13)                       | Mais de 5 tentativas (14)                     | Contador de tentativas inconsistente (15)                 |
| Reenvio do código       | Reenvio permitido (16)                      | Reenvio bloqueado por anti-spam (17)          | Reenvio para número inválido (18)                         |
| TTS                     | Código pode ser ouvido via TTS (19)         | TTS indisponível quando solicitado (20)       | TTS obrigatório para autenticação (21)                    |
| Sessão autenticada      | Sessão criada após validação correta (22)   | Sessão não criada após validação correta (23) | Sessão criada sem validação do código (24)                |
| Exibição do celular     | Número mascarado corretamente (25)          | Número exibido sem máscara (26)               | Máscara incorreta (27)                                    |

**Legenda da Tabela:** Classes de Equivalência da US #27.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas                                                                            | Resultado Esperado                                                   |
| -------------- | ----------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Caso 1         | 1, 4, 7, 10, 13, 22, 25 | Celular="(92) 99999-1234"; OTP="1234"; TempoDecorrido=2min; Tentativas=1            | Código validado e sessão autenticada criada                          |
| Caso 2         | 2, 4, 7, 10, 13         | Celular="(92) 99999-0000"; OTP="1234"; TempoDecorrido=2min; Tentativas=1            | Sistema informa que o número não está cadastrado                     |
| Caso 3         | 3, 4, 7, 10, 13         | Celular="ABC123"; OTP="1234"; TempoDecorrido=2min; Tentativas=1                     | Sistema rejeita número inválido                                      |
| Caso 4         | 1, 5                    | Celular="(92) 99999-1234"; EnvioOTP=Falhou                                          | Sistema informa falha no envio do código                             |
| Caso 5         | 1, 6                    | Celular="(92) 99999-1234"; RequisicoesEnvio=20 em curto período                     | Sistema bloqueia envio por anti-spam                                 |
| Caso 6         | 1, 4, 8, 10, 13         | Celular="(92) 99999-1234"; OTP="123"; TempoDecorrido=2min; Tentativas=1             | Sistema rejeita código com menos de 4 dígitos                        |
| Caso 7         | 1, 4, 9, 10, 13         | Celular="(92) 99999-1234"; OTP="1234567"; TempoDecorrido=2min; Tentativas=1         | Sistema rejeita código com mais de 6 dígitos                         |
| Caso 8         | 1, 4, 7, 11, 13         | Celular="(92) 99999-1234"; OTP="1234"; TempoDecorrido=6min; Tentativas=1            | Sistema informa que o código expirou                                 |
| Caso 9         | 1, 4, 7, 12, 13         | Celular="(92) 99999-1234"; OTP="9999"; TempoDecorrido=2min; Tentativas=1            | Sistema informa código inválido                                      |
| Caso 10        | 1, 4, 7, 10, 14         | Celular="(92) 99999-1234"; OTP="9999"; Tentativas=6                                 | Sistema bloqueia acesso por 30 minutos                               |
| Caso 11        | 1, 4, 7, 10, 15         | Celular="(92) 99999-1234"; OTP="1234"; TentativasRegistradas=2; TentativasSistema=7 | Sistema corrige ou registra inconsistência nas tentativas            |
| Caso 12        | 1, 16                   | Celular="(92) 99999-1234"; Acao="Reenviar Código"                                   | Sistema envia novo código OTP                                        |
| Caso 13        | 1, 17                   | Celular="(92) 99999-1234"; Acao="Reenviar Código"; Reenvios=10 em curto período     | Sistema bloqueia reenvio por anti-spam                               |
| Caso 14        | 3, 18                   | Celular="123"; Acao="Reenviar Código"                                               | Sistema impede reenvio para número inválido                          |
| Caso 15        | 1, 4, 7, 10, 13, 19     | Celular="(92) 99999-1234"; OTP="123456"; TTS=Ativado                                | Sistema realiza leitura do código via TTS                            |
| Caso 16        | 1, 4, 7, 10, 13, 20     | Celular="(92) 99999-1234"; OTP="123456"; TTS=Ativado; AudioDisponivel=Não           | Sistema informa falha no TTS                                         |
| Caso 17        | 1, 4, 7, 10, 13, 21     | Celular="(92) 99999-1234"; OTP="123456"; TTS=Desativado                             | Sistema permite autenticação normalmente sem uso do TTS              |
| Caso 18        | 1, 4, 7, 10, 13, 23     | Celular="(92) 99999-1234"; OTP="1234"; TempoDecorrido=2min; SessaoCriada=Não        | Sistema registra falha, pois a sessão deveria ser criada             |
| Caso 19        | 1, 4, 7, 10, 13, 24     | Celular="(92) 99999-1234"; OTP=NULL; SessaoCriada=Sim                               | Sistema não deve criar sessão sem validação do código                |
| Caso 20        | 1, 25                   | CelularExibido="(**) *****-1234"                                                    | Número deve ser exibido mascarado                                    |
| Caso 21        | 1, 26                   | CelularExibido="(92) 99999-1234"                                                    | Sistema não deve exibir o número completo                            |
| Caso 22        | 1, 27                   | CelularExibido="(**) 99999-****"                                                    | Sistema deve aplicar a máscara corretamente conforme padrão definido |

**Legenda da Tabela:** Casos de Teste da US #27.

---

# #31 - Finalização de Serviço da persona Profissional

## Tabela de Classes de Equivalência

| Condição de Entrada                    | Classes Válidas                                                 | Classes Inválidas                                     | Classes Inválidas                                   |
| -------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------- | --------------------------------------------------- |
| Visualização do serviço                | Serviço existente com opção "Detalhe do Serviço" disponível (1) | Serviço inexistente (2)                               | Detalhes do serviço indisponíveis (3)               |
| Status do serviço antes da finalização | Serviço com status "Em Andamento" (4)                           | Serviço com status "Aguardando aprovação" (5)         | Serviço já "Concluído" (6)                          |
| Ação de finalização                    | Profissional clica em "Finalizar Serviço" (7)                   | Profissional não clica em "Finalizar Serviço" (8)     | Usuário sem permissão tenta finalizar o serviço (9) |
| Alteração de status                    | Status alterado para "Concluído" (10)                           | Status permanece "Em Andamento" após finalização (11) | Status alterado para valor inválido (12)            |
| Solicitação de avaliação               | Sistema solicita avaliação ao cliente após finalização (13)     | Sistema não solicita avaliação ao cliente (14)        | Solicitação enviada para cliente incorreto (15)     |
| Prazo de resposta do cliente           | Cliente avalia dentro de 24 horas (16)                          | Cliente não avalia em até 24 horas (17)               | Cliente tenta avaliar serviço inexistente (18)      |
| Lembrete automático                    | Lembrete enviado após 24 horas sem avaliação (19)               | Lembrete não enviado após 24 horas (20)               | Lembrete enviado antes de 24 horas (21)             |
| Link de avaliação                      | Link de avaliação disponível na tela inicial/pendências (22)    | Link não disponível após geração do lembrete (23)     | Link direciona para serviço incorreto (24)          |

**Legenda da Tabela:** Classes de Equivalência da US #31.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência     | Entradas                                                                                                                                                            | Resultado Esperado                                            |
| -------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Caso 1         | 1, 4, 7, 10, 13, 16         | Profissional="Carlos Lima"; Serviço="Instalação de Chuveiro"; StatusAtual="Em Andamento"; Botão="Finalizar Serviço"; Cliente="João Silva"; TempoRespostaCliente=12h | Serviço é concluído e cliente recebe solicitação de avaliação |
| Caso 2         | 2, 4, 7                     | Profissional="Carlos Lima"; ServiçoID=99999; StatusAtual="Em Andamento"; Botão="Finalizar Serviço"                                                                  | Sistema impede finalização de serviço inexistente             |
| Caso 3         | 3, 4, 7                     | Profissional="Carlos Lima"; Serviço="Instalação de Chuveiro"; DetalhesDisponiveis=Não; StatusAtual="Em Andamento"                                                   | Sistema informa erro ao acessar detalhes do serviço           |
| Caso 4         | 1, 5, 7                     | Profissional="Carlos Lima"; Serviço="Instalação de Chuveiro"; StatusAtual="Aguardando aprovação"; Botão="Finalizar Serviço"                                         | Sistema impede finalização do serviço                         |
| Caso 5         | 1, 6, 7                     | Profissional="Carlos Lima"; Serviço="Instalação de Chuveiro"; StatusAtual="Concluído"; Botão="Finalizar Serviço"                                                    | Sistema impede nova finalização                               |
| Caso 6         | 1, 4, 8                     | Profissional="Carlos Lima"; Serviço="Instalação de Chuveiro"; StatusAtual="Em Andamento"; Botão="Não acionado"                                                      | Serviço permanece em andamento                                |
| Caso 7         | 1, 4, 9                     | UsuarioLogado="João Silva"; ProfissionalResponsavel="Carlos Lima"; Serviço="Instalação de Chuveiro"; Botão="Finalizar Serviço"                                      | Sistema bloqueia finalização por usuário sem permissão        |
| Caso 8         | 1, 4, 7, 11                 | Profissional="Carlos Lima"; Serviço="Instalação de Chuveiro"; StatusAnterior="Em Andamento"; StatusPosterior="Em Andamento"                                         | Sistema registra falha na alteração de status                 |
| Caso 9         | 1, 4, 7, 12                 | Profissional="Carlos Lima"; Serviço="Instalação de Chuveiro"; StatusPosterior="Cancelado"                                                                           | Sistema rejeita alteração para status inválido                |
| Caso 10        | 1, 4, 7, 10, 14             | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; StatusPosterior="Concluído"; SolicitaçãoAvaliação=Não                           | Sistema registra falha, pois deve solicitar avaliação         |
| Caso 11        | 1, 4, 7, 10, 15             | Profissional="Carlos Lima"; ClienteCorreto="João Silva"; ClienteNotificado="Maria Souza"; Serviço="Instalação de Chuveiro"                                          | Sistema não deve enviar solicitação para cliente incorreto    |
| Caso 12        | 1, 4, 7, 10, 13, 17, 19     | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; TempoSemAvaliação=25h                                                           | Sistema envia lembrete automático ao cliente                  |
| Caso 13        | 1, 4, 7, 10, 13, 17, 20     | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; TempoSemAvaliação=25h; LembreteEnviado=Não                                      | Sistema registra falha no envio do lembrete                   |
| Caso 14        | 1, 4, 7, 10, 13, 17, 21     | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; TempoSemAvaliação=10h; LembreteEnviado=Sim                                      | Sistema não deve enviar lembrete antes de 24 horas            |
| Caso 15        | 1, 4, 7, 10, 13, 17, 19, 22 | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; TempoSemAvaliação=25h; LinkAvaliacaoDisponivel=Sim                              | Link de avaliação aparece na tela inicial ou pendências       |
| Caso 16        | 1, 4, 7, 10, 13, 17, 19, 23 | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; TempoSemAvaliação=25h; LinkAvaliacaoDisponivel=Não                              | Sistema registra falha na disponibilização do link            |
| Caso 17        | 1, 4, 7, 10, 13, 17, 19, 24 | Profissional="Carlos Lima"; Cliente="João Silva"; ServiçoCorreto="Instalação de Chuveiro"; LinkDirecionaPara="Troca de Fiação"                                      | Sistema deve direcionar para o serviço correto                |
| Caso 18        | 1, 4, 7, 10, 13, 16         | Profissional="Carlos Lima"; Cliente="João Silva"; Serviço="Instalação de Chuveiro"; AvaliacaoCliente=5; Comentario="Excelente serviço"                              | Avaliação é registrada com sucesso após conclusão             |

**Legenda da Tabela:** Casos de Teste da US #31.

---


