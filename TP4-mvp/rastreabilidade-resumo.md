# Rastreabilidade de Telas

Este documento mapeia, por persona, cada História de Usuário (US) o e as telas do front-end que a implementam de maneira resumida. O escopo abrange apenas as personas **Cliente** e **Profissional**.

Primeiro temos as telas compartilhadas, que servem tanto para a persona de cliente quanto da de profissional. Depois, temos um resumo das duas personas por meio de tabelas. Temos cada tela da persona, juntamente com a US relacionada.

Para uma descrição um pouco mais detalhada das telas e suas US relacionadas, tanto para a persona cliente quanto profissional, favor verificar ```rastreabilida-cliente``` e ```rastreabilida-profissional```, respectivamente.

---

## Telas compartilhadas (Cliente e Profissional)

Estas telas servem ambas as personas e compõem o fluxo de entrada na plataforma. Temos o arquivo relacionado, o nome do componente no código (como cada tela é chamada no código) e a sua função no sistema como um todo.

| Arquivo                     | Nome do Componente        | Função                                                              |
| --------------------------- | ------------------------- | ------------------------------------------------------------------- |
| `pages/login.tsx`           | `LoginScreen`             | Tela de login com e-mail e senha                                    |
| `pages/login-gmail.tsx`     | `GoogleSignInScreen`      | Autenticação via conta Google                                       |
| `pages/login-telefone.tsx`  | `PhoneVerificationScreen` | Validação de acesso por código SMS/celular                          |
| `pages/cadastro.tsx`        | `SignupScreen`            | Cadastro de nova conta (suporta perfil `cliente` ou `profissional`) |
| `pages/escolher-perfil.tsx` | `ProfileChoiceScreen`     | Seleção do tipo de perfil ao entrar na plataforma                   |
| `pages/perfil.tsx`          | `AccountProfileScreen`    | Edição dos dados de identificação da conta                          |

---

## US relacionadas e telas correspondentes
### Resumo das telas - Persona Cliente
Todas as telas que envolvem o cliente + suas US relacionadas. Todas essas telas estão em [/front-end/src/pages/cliente](https://github.com/jhonatan-gonzaga/projeto-pratico-es/tree/main/TP4-mvp/front-end/src/pages/cliente). 

| Tela (arquivo)                            | US cobertas                       |
| ----------------------------------------- | --------------------------------- |
| `pages/perfil.tsx`                        | #84                               |
| `pages/cadastro.tsx`                      | #70                               |
| `pages/cliente/home.tsx`                  | #73                               |
| `pages/cliente/search.tsx`                | #73, #74, #78                     |
| `pages/cliente/profile.tsx`               | #72, #75, #78, #79                |
| `pages/cliente/ads.tsx`                   | #65, #66, #67, #68, #69, #70, #75 |
| `pages/cliente/mensagem-profissional.tsx` | #71, #76                          |
| `pages/cliente/minha-obra.tsx`            | #77, #82                          |
| `pages/cliente/configuracao.tsx`          | #83                               |

### Resumo das telas - Persona Profissional
Todas as telas que envolvem o cliente + suas US relacionadas. Todas essas telas estão em [/front-end/src/pages/profissional](https://github.com/jhonatan-gonzaga/projeto-pratico-es/tree/main/TP4-mvp/front-end/src/pages/profissional). 

| Tela (arquivo)                                       | US cobertas             |
| ---------------------------------------------------- | ----------------------- |
| `pages/login-telefone.tsx`                           | #27                     |
| `pages/cadastro.tsx`                                 | #27, #28                |
| `pages/profissional/cadastrar-profissional.tsx`      | #28                     |
| `pages/profissional/area-profissional.tsx`           | #29, #38                |
| `pages/profissional/oportunidades-novos-pedidos.tsx` | #29                     |
| `pages/profissional/detalhes-pedido.tsx`             | #30, #35, #36, #37, #40 |
| `pages/profissional/oportunidade-meus-servicos.tsx`  | #38                     |
| `pages/profissional/notificacoes.tsx`                | #39, #141               |
| `pages/profissional/mensagem-servico.tsx`            | #41                     |
| `pages/profissional/detalhes-servico.tsx`            | #31                     |
| `pages/profissional/meus-projetos.tsx`               | #28 (portfólio)         |
| `pages/profissional/adicionar-projeto.tsx`           | #28 (portfólio)         |
| `pages/profissional/editar-projeto.tsx`              | #28 (portfólio)         |
| `pages/profissional/resultado-projeto.tsx`           | #28 (portfólio)         |
| `pages/profissional/detalhes-foto.tsx`               | #28 (portfólio)         |
