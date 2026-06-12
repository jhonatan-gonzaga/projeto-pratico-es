# Diagrama de Containers (Nível 2) - Conecta Obra Itacoatiara

O **Diagrama de Containers** detalha a arquitetura interna do sistema central, revelando como as responsabilidades são distribuídas entre as grandes unidades técnicas (containers) e como elas se comunicam com os atores e sistemas externos.

<img width="14020" height="9420" alt="Diagrama de Containers drawio" src="https://github.com/user-attachments/assets/45b8d291-34b3-4b70-b160-a02f630b6751" />
<p align="center">Figura 1: Diagrama de Containers detalhando a interação entre o App Mobile, Banco de Dados Cloud e APIs Externas.</p>

## 1. Descrição dos Containers

Neste nível, o sistema central é decomposto em duas unidades principais:

*   **Aplicativo Móvel [React Native / Expo]:** É o ponto de interação principal. Desenvolvido com TypeScript e Redux Toolkit, ele gerencia a lógica de apresentação e as integrações em tempo real. É responsável por consumir as APIs nativas e externas, garantindo uma experiência fluida para todos os perfis de usuários.
*   **Banco de Dados Cloud [Firebase Firestore]:** Atua como a camada de persistência distribuída. Utiliza um modelo NoSQL para armazenar perfis, catálogos e anúncios, permitindo a sincronização offline e atualizações em tempo real (Realtime) essenciais para a dinâmica de contratação de serviços.

## 2. Interações e Protocolos Técnicos

As conexões no diagrama refletem as escolhas tecnológicas do projeto:

*   **Persistência de Dados:** O App Mobile realiza operações de leitura e escrita (CRUD) diretamente no Firestore via **Firebase SDK**, garantindo que os dados estejam disponíveis mesmo em condições de baixa conectividade;
*   **Segurança e Acesso:** A autenticação é delegada ao **Firebase Auth**, que processa o login via código SMS (OTP), garantindo um acesso seguro e simplificado para os profissionais no canteiro de obras.
*   **Acessibilidade e Inclusão:** O App consome a **API de Text-to-Speech (Expo Speech)** para converter informações textuais em áudio, permitindo que o sistema seja utilizado por profissionais com diferentes níveis de literacia digital;
*   **Geolocalização:** A integração com a **Google Maps API** provê os serviços de geocodificação necessários para que clientes encontrem profissionais e lojas de materiais de construção por proximidade geográfica em Itacoatiara;
*   **Comunicação Externa:** O transbordo para o **WhatsApp** é iniciado via integração de API, permitindo que negociações complexas e suporte técnico ocorram em um canal familiar ao usuário.

---
*Este diagrama aprofunda a visão técnica do sistema, preparando o terreno para o detalhamento de componentes e padrões de código.*
