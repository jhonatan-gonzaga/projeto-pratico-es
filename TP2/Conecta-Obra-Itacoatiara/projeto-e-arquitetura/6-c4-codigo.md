# 6. Diagramas de Classe C4 - Nível de Código

Este documento detalha a estrutura de código do sistema Conecta Obra Itacoatiara através de diagramas de classe C4, focando nas principais entidades, seus atributos, métodos e relacionamentos. Este nível de detalhamento é fundamental para a implementação técnica, pois traduz os requisitos de negócio e os padrões arquiteturais em estruturas de dados e comportamentos concretos que os desenvolvedores utilizarão para construir o software.

## Importância do Diagrama de Código C4

O nível de Código (nível 4 do modelo C4) é a camada mais granular da documentação arquitetural. Sua importância reside em:
- **Redução de Ambiguidade:** Define explicitamente os tipos de dados, visibilidade de atributos e assinaturas de métodos, evitando interpretações equivocadas durante o desenvolvimento.
- **Padronização:** Garante que todos os desenvolvedores sigam a mesma estrutura de classes e padrões de nomenclatura, facilitando a manutenção e a integração do código.
- **Base para Testes:** Fornece um roteiro claro para a criação de testes unitários, permitindo validar cada classe e método de forma isolada.
- **Rastreabilidade Técnica:** Conecta diretamente as funcionalidades descritas no backlog e nos diagramas de níveis superiores com as implementações de código reais.

---

## 6.1 Diagrama de Classe - Visão Geral

O diagrama de classe de visão geral apresenta as principais entidades e seus relacionamentos fundamentais de forma ampla. Ele serve como o mapa mestre que consolida todos os outros diagramas específicos, ilustrando como os diferentes módulos do sistema (Clientes, Profissionais, Lojistas e Suporte) se interconectam através de serviços centrais, chats e avaliações.

<img width="5255" height="3993" alt="diagrama de class-geral" src="https://github.com/user-attachments/assets/d561c829-4bf5-4ac7-96ce-8504a7ff7ab6" />

---

## 6.2 Diagrama de Classe - Gestão de Acessos e Perfis

Este diagrama detalha as classes envolvidas na segurança e identificação dos usuários. Ele está diretamente relacionado ao tópico **1. Gestão de Acessos e Perfis** do arquivo de [Rastreabilidade (7-rastreabilidade.md)](7-rastreabilidade.md), cobrindo as estruturas necessárias para o cadastro, edição de perfis e validação de acesso via código para todos os atores do sistema.

<img width="1542" height="1180" alt="diagrama de class login" src="https://github.com/user-attachments/assets/c10b0f05-6088-44b8-862c-9562fceeb5ec" />

---

## 6.3 Diagrama de Classe - Cliente

Focado na experiência e necessidades do consumidor, este diagrama está relacionado aos tópicos **2.1 Busca de Profissionais**, **2.2 Contratação Direta** e **2.3 Avaliação de Serviços** do arquivo de [Rastreabilidade (7-rastreabilidade.md)](7-rastreabilidade.md). Ele define as classes que sustentam a pesquisa por categoria/nota, o fluxo de favoritar profissionais e o sistema de ranqueamento pós-serviço.

<img width="1936" height="1180" alt="diagrama de class cliente" src="https://github.com/user-attachments/assets/56624904-c056-42b7-a5c4-3dd85ab13e34" />

---

## 6.4 Diagrama de Classe - Lojista

Este diagrama detalha a estrutura de dados necessária para o ecossistema de vendas e está relacionado ao tópico **3. Painel do Lojista & Guia "Onde Comprar"** do arquivo de [Rastreabilidade (7-rastreabilidade.md)](7-rastreabilidade.md). Ele abrange as classes de gerenciamento de catálogo (produtos, preços e estoque), gestão de promoções visuais e o suporte direto ao comprador interessado.

<img width="1595" height="1355" alt="diagrama de class - lojista" src="https://github.com/user-attachments/assets/65d1c1d1-5223-49f2-862c-9562fceeb5ec" />

---

## 6.5 Diagrama de Classe - Profissional

O diagrama do profissional foca na gestão da carreira e serviços do trabalhador autônomo, estando relacionado ao tópico **4. Painel do Profissional** do arquivo de [Rastreabilidade (7-rastreabilidade.md)](7-rastreabilidade.md). Ele define as estruturas para o recebimento de notificações de vagas, envio de contrapropostas, gestão de portfólio digital e o fluxo de conclusão de serviços.

<img width="1946" height="1239" alt="diagrama de class2" src="https://github.com/user-attachments/assets/7e0c4c12-f4d2-4db6-89d1-cded8e806154" />

---

## 6.6 Diagrama de Classe - Suporte

Este diagrama detalha as ferramentas administrativas do sistema e está relacionado ao tópico **5. Painel de Suporte (Administrativo)** do arquivo de [Rastreabilidade (7-rastreabilidade.md)](7-rastreabilidade.md). Ele descreve as classes responsáveis pelo chat multicanal (texto/áudio), suporte via WhatsApp, ajuda visual por imagens e o sistema de registro de auditoria (logs) de todos os atendimentos.

<img width="1418" height="1113" alt="diagrama de class suporte" src="https://github.com/user-attachments/assets/77ee4090-1a5e-4e94-ae99-f92f44d0b926" />
