# Rastreabilidade de Telas — Persona Cliente
Este documento visa atingir a rastreabilidade das telas da persona de profissional. Neste documento, está documentado todas as US dessa persona (Profissional), bem como o as telas relacionadas em: [/front-end/src/pages/cliente](https://github.com/jhonatan-gonzaga/projeto-pratico-es/tree/main/TP4-mvp/front-end/src/pages/cliente). 

Para um resumo das telas e suas US relacionadas, favor verificar ```rastreabilida-resumo```.

---

US84 - Atualização de Dados de Identificação da persona Cliente (edição direta do próprio perfil).
Telas relacionadas:

* perfil.tsx (AccountProfileScreen) - formulário de edição de nome, e-mail e telefone da conta do Cliente.

---

US83 - Painel Central de Notificações da persona Cliente (abrangendo avisos de atualizações e status da conta).
Telas relacionadas:

* configuracao.tsx (ClientSettingsScreen) - seção de notificações dentro das configurações do Cliente, com toggles para mensagens recebidas, novos anúncios e status da conta.

---

US79 - Denúncia de Conduta Inadequada da persona Cliente reportando o perfil da persona Profissional (impactando o status e auditoria da conta reportada).
Telas relacionadas:

* profile.tsx (ClientProfilePage) - tela de visualização do perfil do Profissional pelo Cliente, onde a ação de denúncia pode ser acionada.

---

US70 - Leitura de Tela do Formulário (TTS) da persona Cliente.
Telas relacionadas:

* cadastro.tsx (SignupScreen) - formulário de cadastro da conta, com suporte a leitura em voz alta dos campos.
* ads.tsx (ClientAdsPage) - formulário de criação e edição de vagas, com suporte a leitura em voz alta dos campos.

---

US71 - Reprodução em Áudio de Mensagens (TTS) da persona Cliente lendo em voz alta as mensagens enviadas pela persona Profissional.
Telas relacionadas:

* mensagem-profissional.tsx (ClientMessageScreen) - tela de chat entre Cliente e Profissional, onde as mensagens recebidas podem ser reproduzidas em áudio.

---

US72 - Leitura em Áudio das Avaliações (TTS) da persona Cliente reproduzindo as informações e avaliações do perfil da persona Profissional.
Telas relacionadas:

* profile.tsx (ClientProfilePage) - tela de perfil do Profissional que exibe avaliações com estrelas e comentários, com suporte a leitura em voz alta.

---

US73 - Pesquisa de Profissionais por Categoria da persona Cliente buscando a persona Profissional.
Telas relacionadas:

* home.tsx (ClientHomePage) - tela inicial do Cliente com grid de categorias (Pintores, Eletricistas, Pedreiros etc.) e lista de profissionais em destaque.
* search.tsx (ClientSearchPage) - tela de busca avançada com campo de texto e filtro por categoria de serviço.

---

US74 - Filtragem de Profissionais por Nota da persona Cliente buscando a persona Profissional.
Telas relacionadas:

* search.tsx (ClientSearchPage) - tela de busca com filtros de ordenação e de nota mínima do Profissional.

---

US78 - Favoritar Profissionais da persona Cliente em relação à persona Profissional.
Telas relacionadas:

* profile.tsx (ClientProfilePage) - tela de perfil do Profissional, com botão de favoritar disponível no topo.
* search.tsx (ClientSearchPage) - tela de busca com ícone de favoritar nos cards de cada Profissional listado.

---

US75 - Contratação Direta de Profissional da persona Cliente para a persona Profissional.
Telas relacionadas:

* profile.tsx (ClientProfilePage) - tela de perfil do Profissional com botão de contratação direta.
* ads.tsx (ClientAdsPage) - tela de gestão de vagas onde, ao visualizar os candidatos, o Cliente pode contratar o Profissional desejado.

---

US77 - Avaliação de Profissional Pós-Serviço da persona Cliente para a persona Profissional.
Telas relacionadas:

* minha-obra.tsx (ClientWorkScreen) - tela de histórico de serviços onde, para serviços com status concluído, o Cliente pode registrar uma avaliação de 1 a 5 estrelas.

---

US65 - Publicação de Vaga Textual da persona Cliente visando atrair a persona Profissional.
Telas relacionadas:

* ads.tsx (ClientAdsPage) - formulário de criação de nova vaga com campos de título, descrição, categoria, orçamento, prazo e localização.

---

US66 - Anexo de Imagens na Vaga da persona Cliente para fornecer contexto visual à persona Profissional.
Telas relacionadas:

* ads.tsx (ClientAdsPage) - formulário de criação e edição de vaga com suporte ao anexo de imagens.

---

US67 - Edição de Vaga Aberta da persona Cliente.
Telas relacionadas:

* ads.tsx (ClientAdsPage) - lista de vagas com acesso ao formulário de edição para vagas com status ativo.

---

US68 - Cancelamento de Vaga da persona Cliente.
Telas relacionadas:

* ads.tsx (ClientAdsPage) - lista de vagas com ação de cancelamento que altera o status da vaga para cancelado.

---

US69 - Visualização de Candidatos da persona Cliente visualizando perfis da persona Profissional.
Telas relacionadas:

* ads.tsx (ClientAdsPage) - lista de candidatos de uma vaga com filtros (Todos, Com contraproposta, Melhor avaliados), exibindo perfil, nota e valor proposto de cada Profissional.

---

US76 - Comunicação via Chat Interno da persona Cliente com a persona Profissional para alinhamento de propostas, orçamentos e detalhes do serviço.
Telas relacionadas:

* mensagem-profissional.tsx (ClientMessageScreen) - tela de chat com histórico de mensagens, campo de envio e atalho para WhatsApp.

---

US82 - Histórico de Contratações da persona Cliente contendo registros dos serviços da persona Profissional.
Telas relacionadas:

* minha-obra.tsx (ClientWorkScreen) - tela com lista de serviços organizados por status (em andamento, aguardando aprovação, concluído), dados do Profissional contratado e acesso ao chat interno.
