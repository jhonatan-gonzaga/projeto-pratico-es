# Correção de Defeitos - TP3

Este documento apresenta a organização e a correção dos defeitos identificados nas User Stories do projeto. As correções visam garantir a consistência, completude e clareza dos requisitos, alinhando as Regras de Negócio aos Critérios de Aceitação.

---

## 📋 Resumo dos Defeitos Corrigidos

| ID | US | Tipo de Defeito | Descrição Resumida |
| :--- | :--- | :--- | :--- |
| **1** | US 01 | Inconsistência | Falta de validação de datas de início/término nos CAs. |
| **2** | US 01 | Omissão | Contradição entre RN e CA sobre período de vigência. |
| **3** | US 02 | Ambiguidade | Canal de compartilhamento de endereço não especificado. |
| **4** | US 02 | Inconsistência | Formato de horário ambíguo e interface não detalhada. |
| **5** | US 06 | Inconsistência | Conflito entre contato externo e chat interno. |
| **6** | US 04 | Omissão | Falta de prazos para avaliação automática. |
| **7** | US 14 | Omissão | Regras de governança e acesso ao chat de suporte ausentes. |
| **8** | US 08 | Inconsistência | Quebra de auditoria ao migrar para WhatsApp. |
| **9** | US 15 | Ambiguidade | Escopo do TTS não definido para elementos de interface. |

---

## 🛠️ Detalhamento das Correções

### 🔍 Defeito 1 & 2 (US 01)
**Problema:** Inconsistência e omissão nas datas de promoção. A RN exigia datas, mas os CAs permitiam salvar sem elas.
**Solução:** Adição de critérios para validar datas obrigatórias e automação para desativação.

> **US 01 Ajustada:** Enquanto Dono de Loja de Materiais de Construção, desejo marcar produtos como promoção com destaque visual e preço promocional, com opção de adicionar desconto, para divulgar ofertas rapidamente aos meus clientes e aumentar as vendas.

| Critérios de Aceitação (CA) | Regras de Negócio (RN) |
| :--- | :--- |
| Permitir marcar produto como "em promoção". | Preço promocional deve ser menor que o original. |
| Informar preço promocional. | Apenas produtos com visibilidade ativa e em estoque. |
| Destaque visual na lista de produtos. | Promoção vinculada a um único produto por vez. |
| Aba para ativar/desativar manualmente. | Opção de ativar/desativar promoção do produto. |
| Exibir valor final após desconto. | **A promoção deve ter uma data de início e término.** |
| **[Novo] Exigir data de início e término para salvar.** | |
| **[Novo] Desativação automática ao atingir o término.** | |

---

### 🔍 Defeito 3 & 4 (US 02)
**Problema:** Ambiguidade no compartilhamento e inconsistência no formato de endereço/horário.
**Solução:** Integração do compartilhamento via WhatsApp no chat e padronização do formato 24h.

> **US 02 Ajustada:** Enquanto Dono de Loja de Materiais de Construção, desejo cadastrar o endereço completo da loja e os horários de funcionamento por dia da semana, para enviar facilmente essas informações aos clientes quando solicitarem.

| Critérios de Aceitação (CA) | Regras de Negócio (RN) |
| :--- | :--- |
| Salvar endereço com preenchimento mínimo (rua e cidade). | Endereço obrigatório para salvar (mínimo rua e cidade). |
| Cadastrar horário por dia da semana (Abertura/Fechamento). | **Horário em formato 24h (HH:MM às HH:MM).** |
| Permitir edição de endereço e horário. | Fechamento deve ser posterior à abertura. |
| Exibir informações no perfil da loja. | |
| **Opção WhatsApp no chat interno para envio rápido.** | |

---

### 🔍 Defeito 5 (US 06)
**Problema:** Conflito entre "contato externo" e a obrigatoriedade do "chat interno".
**Solução:** Unificação do fluxo dentro do aplicativo e ajuste do título da US.

> **US 06 Ajustada: Formalizar Acordo e Iniciar Serviço**
> Enquanto profissional, desejo confirmar no aplicativo que fechei um acordo com o cliente por meio do chat interno, para iniciar o serviço oficialmente com segurança e registro na plataforma.

*   **CA:** Botão "Acordo Fechado!" disponível no chat; Notificação de confirmação para o cliente; Confirmação mútua obrigatória; TTS opcional para termos.
*   **RN:** Contato inicial via chat interno; Confirmação dupla; Registro eletrônico de data/hora.

---

### 🔍 Defeito 6 (US 04)
**Problema:** Omissão de prazos para a avaliação automática.
**Solução:** Definição de prazo de 24h para lembrete e 7 dias para disponibilidade do link.

> **US 04 Ajustada:** Enquanto profissional, desejo finalizar o serviço no aplicativo e permitir a avaliação do cliente, para registrar minha entrega e melhorar minha reputação na plataforma.

*   **Novos CAs:** Lembrete via push após 24h de inatividade; Link disponível por 7 dias na área de pendências; Solicitação via chat imediatamente após conclusão.

---

### 🔍 Defeito 7 (US 14)
**Problema:** Falta de regras de governança e acesso ao suporte.
**Solução:** Definição de fila de espera, gatilhos de acesso (conta ativa/serviço recente) e horário comercial.

> **US 14 Ajustada:** Enquanto Suporte, desejo um chat de suporte exclusivo para entrar em contato com clientes que precisam de ajuda.

*   **CAs:** Fila automática por ordem de chegada; Acesso via central de ajuda/detalhes do serviço; Encerramento por inatividade (5 min).
*   **RN:** Máximo de 4 chats por atendente; Horário: 08:00 às 18:00; Mensagem automática inicial.

---

### 🔍 Defeito 8 (US 08)
**Problema:** Perda de rastreabilidade ao migrar para o WhatsApp.
**Solução:** Registro de logs, consentimento do cliente e liberação imediata do slot do atendente.

> **US 08 Ajustada:** Enquanto suporte, desejo direcionar o atendimento para o WhatsApp em casos excepcionais.

*   **CAs:** Botão de consentimento do cliente; Encerramento com status "Transferido"; Salvamento automático do histórico pré-migração; Liberação do slot.
*   **RN:** Permissão obrigatória; Avaliação assíncrona após 24h via e-mail.

---

### 🔍 Defeito 9 (US 15)
**Problema:** Ambiguidade no escopo de leitura do TTS.
**Solução:** Definição da ordem de leitura (Rótulo -> Ajuda -> Erro) e padronização visual.

> **US 15 Ajustada:** Enquanto Cliente com dificuldades de leitura, desejo acionar a funcionalidade de texto para voz nos elementos dos formulários.

*   **CAs:** Ordem de leitura definida; Ícone de alto-falante padronizado; Animação de ondas sonoras; Aviso de som silenciado.
*   **RN:** Voz humanizada PT-BR; Leitura individual de opções (checkbox/radio).

---
