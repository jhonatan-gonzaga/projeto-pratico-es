# #43 - Cadastro de endereço completo e horários de funcionamento

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
| Caso 1 | 1, 4, 7, 10 | Endereço completo; segunda aberta 08:00 às 18:00; cliente selecionado no chat | Endereço e horário são salvos e podem ser enviados ao cliente |
| Caso 2 | 2, 4, 7, 10 | Endereço sem bairro | Sistema impede o salvamento |
| Caso 3 | 3, 4, 7, 10 | Endereço preenchido apenas com espaços | Sistema impede o salvamento |
| Caso 4 | 1, 5, 7, 10 | Horário informado como “8h às 18h” | Sistema exibe erro de formato |
| Caso 5 | 1, 6, 7, 10 | Abertura 18:00; fechamento 08:00 | Sistema exibe erro de horário |
| Caso 6 | 1, 4, 8, 10 | Dia da semana sem horário e sem marcação “Fechado” | Sistema solicita configuração do dia |
| Caso 7 | 1, 4, 9, 10 | Domingo marcado como “Fechado” e com horário 08:00 às 12:00 | Sistema impede configuração conflitante |
| Caso 8 | 1, 4, 7, 11 | Nenhum cliente/chat selecionado | Sistema não envia informações |
| Caso 9 | 1, 4, 7, 12 | Tentativa de envio sem endereço ou horário cadastrado | Sistema bloqueia o envio |

**Legenda da Tabela:** Casos de Teste da US #43.

---

# #142 - Visualização de categorias, profissionais parceiros, lojas populares e buscas

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Termo de busca | Busca por material, loja, marca ou profissional cadastrado (1) | Termo de busca vazio (2) | Termo inexistente no sistema (3) |
| Resultado da busca | Apenas lojas, produtos e profissionais cadastrados aparecem (4) | Item não cadastrado aparece na busca (5) | Resultado incompatível com o termo pesquisado (6) |
| Histórico de buscas | Buscas recentes exibidas corretamente (7) | Histórico não é exibido (8) | Histórico não é limpo ao solicitar limpeza (9) |
| Seleção de categoria/área | Categoria ou área profissional selecionada exibe produtos/profissionais relacionados (10) | Seleção não redireciona para detalhes (11) | Categoria/área exibe itens sem relação (12) |
| Destaques da tela inicial | Lojas e profissionais populares cadastrados são destacados (13) | Destaque exibe loja/profissional não cadastrado (14) | Destaque exibe perfil ou loja indisponível (15) |

**Legenda da Tabela:** Classes de Equivalência da US #142.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10, 13 | Busca por “cimento”; categorias disponíveis; área “Pedreiro”; lojas populares cadastradas | Sistema exibe resultados cadastrados, histórico, categorias e destaques corretamente |
| Caso 2 | 2, 4, 7, 10, 13 | Busca com campo vazio | Sistema não executa busca inválida |
| Caso 3 | 3, 4, 7, 10, 13 | Busca por item inexistente | Sistema informa ausência de resultados |
| Caso 4 | 1, 5, 7, 10, 13 | Produto não cadastrado aparece nos resultados | Sistema deve ocultar item não cadastrado |
| Caso 5 | 1, 6, 7, 10, 13 | Busca por “tinta” retorna profissionais de elétrica | Sistema deve filtrar resultados compatíveis |
| Caso 6 | 1, 4, 8, 10, 13 | Busca realizada, mas histórico não aparece | Sistema deve exibir histórico recente |
| Caso 7 | 1, 4, 9, 10, 13 | Usuário clica em limpar histórico, mas buscas permanecem | Sistema deve limpar histórico |
| Caso 8 | 1, 4, 7, 11, 13 | Categoria selecionada não abre página de detalhes | Sistema deve redirecionar corretamente |
| Caso 9 | 1, 4, 7, 12, 13 | Categoria “Hidráulica” exibe produtos elétricos | Sistema deve exibir apenas itens relacionados |
| Caso 10 | 1, 4, 7, 10, 14 | Loja não cadastrada aparece como popular | Sistema deve remover destaque inválido |
| Caso 11 | 1, 4, 7, 10, 15 | Loja indisponível aparece em destaque | Sistema deve ocultar loja indisponível |

**Legenda da Tabela:** Casos de Teste da US #142.

---

# #24 - Cadastro de produtos com foto, preço, descrição e estoque

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Campos obrigatórios | Nome, preço, estoque e categoria preenchidos (1) | Campo obrigatório ausente (2) | Campo obrigatório preenchido apenas com espaços (3) |
| Foto do produto | Foto JPG ou PNG com até 5MB (4) | Formato diferente de JPG/PNG (5) | Foto maior que 5MB (6) |
| Descrição | Descrição com no máximo 6 linhas (7) | Descrição com mais de 6 linhas (8) | Descrição com conteúdo ilegível/inválido (9) |
| Estoque | Estoque maior ou igual a 0 (10) | Estoque negativo (11) | Estoque não numérico (12) |
| Visibilidade | Produto com estoque maior que 0 e “Disponível para venda” ativado (13) | Produto com estoque 0 e visibilidade ativa (14) | Produto com visibilidade desativada aparecendo para o cliente (15) |
| Ação no produto | Produto salvo/editado/excluído corretamente (16) | Edição/exclusão de produto inexistente (17) | Produto salvo sem mensagem de sucesso (18) |

**Legenda da Tabela:** Classes de Equivalência da US #24.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10, 13, 16 | Produto com nome, preço, estoque 10, categoria, foto JPG 3MB, descrição de 3 linhas e disponível para venda | Produto salvo com sucesso e exibido no catálogo |
| Caso 2 | 2, 4, 7, 10, 13, 16 | Produto sem preço | Sistema sinaliza campo obrigatório |
| Caso 3 | 3, 4, 7, 10, 13, 16 | Nome do produto preenchido com espaços | Sistema impede o salvamento |
| Caso 4 | 1, 5, 7, 10, 13, 16 | Foto em PDF | Sistema rejeita formato da foto |
| Caso 5 | 1, 6, 7, 10, 13, 16 | Foto PNG com 8MB | Sistema rejeita foto por tamanho |
| Caso 6 | 1, 4, 8, 10, 13, 16 | Descrição com 8 linhas | Sistema impede descrição acima do limite |
| Caso 7 | 1, 4, 9, 10, 13, 16 | Descrição com conteúdo corrompido/ilegível | Sistema rejeita descrição inválida |
| Caso 8 | 1, 4, 7, 11, 13, 16 | Estoque -5 | Sistema impede estoque negativo |
| Caso 9 | 1, 4, 7, 12, 13, 16 | Estoque “dez” | Sistema impede estoque não numérico |
| Caso 10 | 1, 4, 7, 10, 14, 16 | Estoque 0 com “Disponível para venda” ativado | Sistema desativa automaticamente a visibilidade |
| Caso 11 | 1, 4, 7, 10, 15, 16 | Produto com visibilidade off aparece para cliente | Sistema deve ocultar produto |
| Caso 12 | 1, 4, 7, 10, 13, 17 | Tentativa de editar produto inexistente | Sistema impede edição/exclusão |
| Caso 13 | 1, 4, 7, 10, 13, 18 | Produto salvo sem mensagem de sucesso | Sistema deve exibir confirmação |

**Legenda da Tabela:** Casos de Teste da US #24.

---

# #25 - Atualização rápida de preços de produtos

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Produto selecionado | Produto existente da loja (1) | Produto inexistente (2) | Produto de outra loja/sem permissão (3) |
| Novo preço | Preço numérico e não negativo (4) | Preço negativo (5) | Preço não numérico (6) |
| Campo editado | Apenas o preço é alterado (7) | Outro campo é alterado indevidamente (8) | Atualização não é salva imediatamente (9) |
| Catálogo | Novo preço aparece no catálogo (10) | Catálogo mantém preço antigo (11) | Última atualização não é registrada (12) |
| Indicação de erro | Campo inválido recebe sublinhado vermelho (13) | Erro não é indicado ao usuário (14) | Campo errado recebe sublinhado vermelho (15) |

**Legenda da Tabela:** Classes de Equivalência da US #25.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10, 13 | Produto “Cimento”; novo preço 42.50; apenas preço alterado | Preço salvo imediatamente, atualizado no catálogo e registro de atualização gerado |
| Caso 2 | 2, 4, 7, 10, 13 | Produto inexistente selecionado | Sistema impede atualização |
| Caso 3 | 3, 4, 7, 10, 13 | Lojista tenta alterar produto de outra loja | Sistema bloqueia por permissão |
| Caso 4 | 1, 5, 7, 10, 13 | Novo preço -10 | Sistema impede atualização e sublinha o campo |
| Caso 5 | 1, 6, 7, 10, 13 | Novo preço “quarenta” | Sistema impede atualização e sublinha o campo |
| Caso 6 | 1, 4, 8, 10, 13 | Alteração rápida modifica nome e preço | Sistema deve permitir edição apenas do preço |
| Caso 7 | 1, 4, 9, 10, 13 | Preço válido informado, mas não salvo imediatamente | Sistema deve salvar a atualização na hora |
| Caso 8 | 1, 4, 7, 11, 13 | Catálogo continua exibindo preço antigo | Sistema deve exibir novo preço |
| Caso 9 | 1, 4, 7, 12, 13 | Preço muda, mas data da última atualização não é registrada | Sistema deve registrar atualização |
| Caso 10 | 1, 5, 7, 10, 14 | Preço negativo sem indicação visual de erro | Sistema deve indicar erro ao usuário |
| Caso 11 | 1, 5, 7, 10, 15 | Preço negativo, mas sublinhado aparece em outro campo | Sistema deve destacar o campo de preço |

**Legenda da Tabela:** Casos de Teste da US #25.

---

# #42 - Marcação de produtos em promoção com destaque visual

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Produto selecionado | Produto com estoque e visibilidade ativa (1) | Produto sem estoque (2) | Produto com visibilidade desativada (3) |
| Preço promocional | Preço promocional menor que o original (4) | Preço promocional igual ou maior que o original (5) | Preço promocional negativo ou não numérico (6) |
| Desconto e valor final | Valor final calculado após desconto (7) | Valor final calculado incorretamente (8) | Desconto informado sem preço promocional (9) |
| Datas da promoção | Data de início e término válidas (10) | Datas obrigatórias ausentes (11) | Data de término anterior à data de início (12) |
| Vínculo da promoção | Promoção vinculada a um único produto (13) | Promoção vinculada a mais de um produto (14) | Promoção continua ativa após a data de término (15) |
| Destaque visual | Produto em promoção aparece com destaque visual (16) | Produto em promoção aparece sem destaque (17) | Destaque permanece após desativação da promoção (18) |

**Legenda da Tabela:** Classes de Equivalência da US #42.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10, 13, 16 | Produto ativo com estoque; preço original 100; promocional 80; datas válidas | Promoção salva, produto destacado e valor final exibido |
| Caso 2 | 2, 4, 7, 10, 13, 16 | Produto com estoque 0 | Sistema impede ativar promoção |
| Caso 3 | 3, 4, 7, 10, 13, 16 | Produto com visibilidade desativada | Sistema impede ativar promoção |
| Caso 4 | 1, 5, 7, 10, 13, 16 | Preço original 100; promocional 100 | Sistema impede promoção |
| Caso 5 | 1, 6, 7, 10, 13, 16 | Preço promocional -20 ou “oitenta” | Sistema rejeita preço promocional |
| Caso 6 | 1, 4, 8, 10, 13, 16 | Desconto de 20%, mas valor final exibido incorreto | Sistema deve recalcular valor final |
| Caso 7 | 1, 4, 9, 10, 13, 16 | Desconto informado sem preço promocional | Sistema impede salvamento |
| Caso 8 | 1, 4, 7, 11, 13, 16 | Promoção sem data de início ou término | Sistema exige datas obrigatórias |
| Caso 9 | 1, 4, 7, 12, 13, 16 | Término antes do início | Sistema impede promoção |
| Caso 10 | 1, 4, 7, 10, 14, 16 | Mesma promoção vinculada a dois produtos | Sistema impede vínculo múltiplo |
| Caso 11 | 1, 4, 7, 10, 15, 16 | Promoção vencida continua ativa | Sistema deve desativar automaticamente |
| Caso 12 | 1, 4, 7, 10, 13, 17 | Produto promocional sem destaque | Sistema deve aplicar destaque visual |
| Caso 13 | 1, 4, 7, 10, 13, 18 | Promoção desativada, mas destaque permanece | Sistema deve remover destaque |

**Legenda da Tabela:** Casos de Teste da US #42.

---

# #87 - Rastreamento das entregas de pedidos

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Usuário | Dono da loja autorizado (1) | Usuário não autorizado (2) | Dono de outra loja tentando acessar (3) |
| Pedido | Pedido existente da loja (4) | Pedido inexistente (5) | Pedido pertencente a outra loja (6) |
| Informações da entrega | Número do pedido, status e previsão exibidos (7) | Status ou previsão ausente (8) | Dados da entrega inconsistentes (9) |
| Atualização do status | Status atualizado automaticamente em tempo real (10) | Status desatualizado (11) | Atualização automática não ocorre (12) |
| Atraso | Entrega atrasada é sinalizada (13) | Entrega atrasada sem aviso (14) | Entrega no prazo marcada como atrasada (15) |

**Legenda da Tabela:** Classes de Equivalência da US #87.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10, 13 | Lojista autorizado acessa pedido próprio atrasado com dados completos | Sistema exibe rastreamento atualizado e sinaliza atraso |
| Caso 2 | 2, 4, 7, 10, 13 | Usuário não autorizado tenta acessar rastreamento | Sistema bloqueia acesso |
| Caso 3 | 3, 4, 7, 10, 13 | Lojista acessa pedido de outra loja | Sistema bloqueia acesso |
| Caso 4 | 1, 5, 7, 10, 13 | Pedido inexistente | Sistema informa pedido não encontrado |
| Caso 5 | 1, 6, 7, 10, 13 | Pedido pertence a outra loja | Sistema impede visualização |
| Caso 6 | 1, 4, 8, 10, 13 | Pedido sem previsão de entrega | Sistema deve indicar dado ausente |
| Caso 7 | 1, 4, 9, 10, 13 | Status “Entregue” com previsão futura inconsistente | Sistema deve tratar inconsistência |
| Caso 8 | 1, 4, 7, 11, 13 | Status permanece antigo após atualização externa | Sistema deve atualizar status |
| Caso 9 | 1, 4, 7, 12, 13 | Atualização automática não roda | Sistema deve atualizar automaticamente |
| Caso 10 | 1, 4, 7, 10, 14 | Entrega atrasada sem sinalização | Sistema deve informar atraso |
| Caso 11 | 1, 4, 7, 10, 15 | Entrega dentro do prazo marcada como atrasada | Sistema deve remover sinalização indevida |

**Legenda da Tabela:** Casos de Teste da US #87.

---

# #85 - Visualização de mensagens de clientes interessados em produtos

## Tabela de Classes de Equivalência

| Condição de Entrada | Classes Válidas | Classes Inválidas | Classes Inválidas |
| ------------------- | --------------- | ----------------- | ----------------- |
| Usuário | Dono da loja autorizado (1) | Usuário não autorizado (2) | Dono de outra loja tentando acessar mensagens (3) |
| Mensagens | Mensagens de clientes relacionadas à loja/pedido (4) | Mensagens de clientes sem relação com a loja (5) | Mensagem corrompida ou sem conteúdo legível (6) |
| Organização | Mensagens organizadas por cliente ou pedido (7) | Mensagens sem organização (8) | Mensagens agrupadas no cliente/pedido errado (9) |
| Data e horário | Data e horário de envio exibidos (10) | Data/hora ausentes (11) | Data/hora inválidas ou inconsistentes (12) |
| Mensagens não lidas | Mensagens novas indicadas como não lidas (13) | Mensagens novas sem indicação (14) | Mensagens lidas marcadas como não lidas (15) |
| Histórico | Histórico de conversas acessível (16) | Histórico inacessível (17) | Histórico incompleto (18) |

**Legenda da Tabela:** Classes de Equivalência da US #85.

## Tabela de Casos de Teste

| Casos de Teste | Classes de Equivalência | Entradas | Resultado Esperado |
| -------------- | ----------------------- | -------- | ------------------ |
| Caso 1 | 1, 4, 7, 10, 13, 16 | Dono da loja acessa mensagens de cliente sobre pedido; há mensagem nova | Sistema exibe conversa organizada, data/hora, indicador de não lida e histórico |
| Caso 2 | 2, 4, 7, 10, 13, 16 | Usuário não autorizado tenta acessar mensagens | Sistema bloqueia acesso |
| Caso 3 | 3, 4, 7, 10, 13, 16 | Dono de outra loja tenta acessar conversa | Sistema bloqueia acesso |
| Caso 4 | 1, 5, 7, 10, 13, 16 | Mensagens de cliente sem relação com a loja aparecem | Sistema deve ocultar mensagens indevidas |
| Caso 5 | 1, 6, 7, 10, 13, 16 | Mensagem corrompida aparece na conversa | Sistema deve tratar mensagem inválida |
| Caso 6 | 1, 4, 8, 10, 13, 16 | Mensagens aparecem misturadas sem agrupamento | Sistema deve organizar por cliente ou pedido |
| Caso 7 | 1, 4, 9, 10, 13, 16 | Mensagem de um cliente aparece no pedido errado | Sistema deve corrigir agrupamento |
| Caso 8 | 1, 4, 7, 11, 13, 16 | Mensagem sem data/hora | Sistema deve exibir data e horário |
| Caso 9 | 1, 4, 7, 12, 13, 16 | Mensagem com data impossível/inconsistente | Sistema deve tratar data inválida |
| Caso 10 | 1, 4, 7, 10, 14, 16 | Mensagem nova sem indicador de não lida | Sistema deve indicar mensagem não lida |
| Caso 11 | 1, 4, 7, 10, 15, 16 | Mensagem já lida continua como não lida | Sistema deve atualizar indicador |
| Caso 12 | 1, 4, 7, 10, 13, 17 | Histórico não abre | Sistema deve permitir acesso ao histórico |
| Caso 13 | 1, 4, 7, 10, 13, 18 | Histórico aparece faltando mensagens antigas | Sistema deve exibir histórico completo |

**Legenda da Tabela:** Casos de Teste da US #85.


