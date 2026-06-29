# Rastreabilidade de Telas - Persona Profissional
Este documento visa atingir a rastreabilidade das telas da persona de profissional. Neste documento, está documentado todas as US dessa persona (Profissional), bem como o as telas relacionadas em: [/front-end/src/pages/profissional](https://github.com/jhonatan-gonzaga/projeto-pratico-es/tree/main/TP4-mvp/front-end/src/pages/profissional). 

Para um resumo das telas e suas US relacionadas, favor verificar ```rastreabilidade-resumo```.

---

### US27 - Validação de acesso via código utilizando celular da persona Profissional.

Telas relacionadas:

* login-telefone.tsx (PhoneVerificationScreen) - tela de inserção e validação do código de verificação enviado por SMS ao celular do Profissional.

---

### US28 - Criação de perfil na plataforma da persona Profissional.

Telas relacionadas:

* cadastro.tsx (SignupScreen) - tela de cadastro inicial da conta com seleção do tipo de perfil Profissional.
* cadastrar-profissional.tsx (ProfessionalSetupScreen) - tela de configuração detalhada do perfil profissional: especialidades, valor da diária, disponibilidade semanal, horários e foto.
* meus-projetos.tsx (MyProjectsScreen) - galeria de projetos do portfólio com opções de adicionar, editar e excluir entradas.
* adicionar-projeto.tsx (AddProjectScreen) - formulário para criar um novo projeto no portfólio com título, bairro, descrição, fotos e categoria.
* editar-projeto.tsx (EditProjectScreen) - formulário para editar os dados de um projeto já existente no portfólio.
* resultado-projeto.tsx (ProjectResultScreen) - tela de visualização do detalhe e resultado de um projeto do portfólio.
* detalhes-foto.tsx (PhotoDetailsScreen) - tela de visualização e gerenciamento individual de fotos de um projeto do portfólio.

---

### US29 - Visualização de serviços disponíveis da persona Profissional.

Telas relacionadas:

* area-profissional.tsx (ProfessionalHomeScreen) - dashboard principal com aba de Oportunidades que agrega os novos pedidos disponíveis.
* oportunidades-novos-pedidos.tsx (OportunidadesNovosPedidosScreen) - lista de cards de novos pedidos com ações de aceitar, rejeitar e ver detalhes de cada um.

---

### US30 - Confirmação de Fechamento de acordo entre a persona Cliente para Profissional.

Telas relacionadas:

* detalhes-pedido.tsx (RequestDetailsScreen) - tela de detalhes do pedido que exibe o status do acordo e aciona a transição para serviço ativo quando ambas as partes confirmam.

---

### US31 - Finalização de Serviço da persona Profissional.

Telas relacionadas:

* detalhes-servico.tsx (ServiceDetailsScreen) - tela de detalhes do serviço em andamento que apresenta as ações de iniciar, concluir ou reabrir o serviço conforme o status atual.

---

### US35 - Envio de contraproposta da persona Profissional para Cliente.

Telas relacionadas:

* detalhes-pedido.tsx (RequestDetailsScreen) - tela de detalhes do pedido com campo de valor em reais e ação de envio de contraproposta ao Cliente.

---

### US36 - Visualização própria das mensagens de contraproposta da persona Profissional.

Telas relacionadas:

* detalhes-pedido.tsx (RequestDetailsScreen) - tela de detalhes do pedido que exibe o histórico de negociação e o valor contraproposto pelo próprio Profissional.

---

### US37 - Cancelamento próprio da candidatura da persona Profissional para a persona Cliente.

Telas relacionadas:

* detalhes-pedido.tsx (RequestDetailsScreen) - tela de detalhes do pedido com ação de rejeitar ou cancelar a própria candidatura a uma vaga.

---

### US38 - Visualização dos serviços via menu dashboard da persona Profissional.

Telas relacionadas:

* area-profissional.tsx (ProfessionalHomeScreen) - dashboard principal com aba de Meus Serviços que lista os serviços em andamento do Profissional.
* oportunidade-meus-servicos.tsx (OportunidadeMeusServicosScreen) - lista de cards dos serviços ativos com filtros de status e ações de ver detalhes e enviar mensagem.

---

### US39 - Notificação da mensagem do Cliente no chat para a persona Profissional.

Telas relacionadas:

* notificacoes.tsx (NotificationsScreen) - central de notificações com toggle para ativar ou desativar alertas de novas mensagens recebidas de Clientes.

---

### US40 - Visualização de informações do cliente da persona do Profissional.

Telas relacionadas:

* detalhes-pedido.tsx (RequestDetailsScreen) - tela que exibe os dados do Cliente vinculado ao pedido: nome, localização, descrição do serviço, orçamento e prazo.

---

### US41 - Chat de conversas para a persona Profissional e Cliente.

Telas relacionadas:

* mensagem-servico.tsx (ServiceMessageScreen) - tela de chat sobre um serviço específico com histórico de mensagens, campo de envio e atalho para WhatsApp.

---

US141 - Recebimento de notificações de trabalhos compatíveis da persona Profissional.
Telas relacionadas:

* notificacoes.tsx (NotificationsScreen) - central de notificações com toggle para ativar ou desativar alertas de novos anúncios de trabalho compatíveis com o perfil do Profissional.
