# Diagrama de Contexto (Nível 1) - Conecta Obra Itacoatiara

O **Diagrama de Contexto** fornece uma visão de alto nível do sistema **Conecta Obra Itacoatiara**, detalhando como ele interage com os usuários (atores) e outros sistemas externos. Este diagrama ajuda a definir o escopo do projeto e seus limites.

<img width="13890" height="7310" alt="diagrama de contexto drawio (2)" src="https://github.com/user-attachments/assets/99e83bc3-ec60-4744-b5de-f217ac3129fc" />

## 1. Importância do Diagrama de Contexto

A elaboração deste diagrama no nível 1 do Modelo C4 desempenha papéis estratégicos cruciais para o sucesso do projeto:

*   **Definição de Fronteiras:** Delimita claramente o que faz parte do software que estamos construindo e o que é responsabilidade de serviços externos, evitando o crescimento descontrolado do escopo (*scope creep*).
*   **Alinhamento de Stakeholders:** Por utilizar uma linguagem de alto nível e elementos visuais (como as personas), ele serve como uma ferramenta de comunicação tanto para a equipe técnica quanto para os clientes e parceiros de negócio.
*   **Identificação de Dependências:** Revela precocemente quais integrações são críticas (como Firebase e Google Maps), permitindo que a equipe planeje a gestão de riscos e custos dessas APIs.
*   **Foco no Usuário:** Ao colocar as personas no centro das interações, o diagrama reforça o compromisso do projeto com as dores reais dos profissionais e clientes de Itacoatiara.

## 2. Descrição do Diagrama

O diagrama apresenta o sistema central **Conecta Obra Itacoatiara** como um hub integrador, conectando quatro grupos de usuários a uma infraestrutura de serviços modernos:

### Atores (Pessoas)
*   **Profissional (Acessibilidade):** Trabalhador autônomo que depende do sistema para visibilidade. O destaque para acessibilidade indica o uso de recursos de voz para inclusão digital.
*   **Cliente:** O motor da plataforma, que busca serviços, anuncia demandas e garante a qualidade através de avaliações.
*   **Suporte:** O mediador técnico, essencial para a confiabilidade do ecossistema, gerenciando logs e auxiliando usuários em múltiplos canais.
*   **Lojista:** Parceiro comercial que provê os insumos necessários para a realização das obras, integrando o comércio local ao fluxo digital.

### Sistemas Externos (Dependências)
*   **API/Serviço de Text-to-Speech:** Garante a acessibilidade, transformando dados do sistema em áudio para usuários com dificuldades de leitura.
*   **WhatsApp / Canal de Comunicação:** Atua como o transbordo natural para negociações e suporte direto, aproveitando uma ferramenta já familiar aos usuários.
*   **Firebase (Auth e Firestore):** A espinha dorsal técnica, responsável pela segurança (autenticação sem senha via SMS) e pela persistência de dados em tempo real.
*   **Google Maps API:** O componente espacial, permitindo que a conexão entre cliente, profissional e loja ocorra com base na proximidade geográfica em Itacoatiara.

---
*Este documento complementa a visão arquitetural do projeto Conecta Obra Itacoatiara, servindo de base para o detalhamento dos próximos níveis (Containers e Componentes).*
