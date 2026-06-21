# TP3 - Projeto Prático de Engenharia de Software

Este diretório, **TP3**, faz parte do projeto prático de Engenharia de Software e concentra os artefatos relacionados à fase de testes e ao desenvolvimento de uma aplicação front-end. O objetivo principal é demonstrar a aplicação de técnicas de teste, como classes de equivalência e rastreabilidade, em conjunto com o desenvolvimento de uma interface de usuário responsiva.

## Estrutura do Diretório

A pasta `TP3` está organizada da seguinte forma:

```
TP3/
├── casos-de-testes/
├── front-end/
└── tests/
```

### `casos-de-testes/`

Esta subpasta contém a documentação detalhada dos casos de teste, utilizando a técnica de **classes de equivalência**. Cada arquivo Markdown corresponde a uma persona ou funcionalidade específica do sistema, descrevendo as condições de entrada válidas e inválidas, bem como os resultados esperados. Os arquivos incluem:

- `classes-equivalencias-lojista.md`: Casos de teste para a persona Lojista.
- `classes-equivalência-cliente.md`: Casos de teste para a persona Cliente.
- `classes-equivalência-suporte.md`: Casos de teste para a persona Suporte.
- `classes-equivalências-profissional.md`: Casos de teste para a persona Profissional.
- `defeito-corrigido.md`: Documentação de um defeito identificado e corrigido, provavelmente com os passos para reprodução e verificação da correção.

### `front-end/`

Este diretório abriga o código-fonte da aplicação front-end, desenvolvida com as seguintes tecnologias:

- **React Native**: Framework para construção de aplicações móveis nativas usando JavaScript e React.
- **Expo**: Conjunto de ferramentas e serviços para desenvolvimento de aplicativos React Native, facilitando a criação, construção e implantação.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática, melhorando a robustez e manutenibilidade do código.
- **NativeWind (TailwindCSS)**: Framework CSS utilitário para estilização rápida e responsiva, adaptado para React Native.

Os principais arquivos e diretórios incluem:

- `App.tsx`: Componente principal da aplicação.
- `global.css`: Estilos globais da aplicação.
- `package.json`: Contém metadados do projeto e scripts para execução e teste.
- `assets/`: Contém recursos como imagens (`logotipo.png`).

### `tests/`

Esta pasta contém os testes da aplicação e a documentação de rastreabilidade. Os arquivos notáveis são:

- `App.test.tsx`: Testes automatizados para o componente principal da aplicação.
- `rastreabilidade.md`: Um relatório detalhado que demonstra a rastreabilidade entre os requisitos, classes de equivalência, casos de teste e a execução dos testes. Inclui tabelas de classes de equivalência, casos de teste e simulações de testes manuais com evidências visuais (imagens).

## Como Executar a Aplicação Front-end

Para rodar a aplicação front-end, siga os passos abaixo:

1.  Navegue até o diretório `front-end`:
    ```bash
    cd front-end
    ```
2.  Instale as dependências do projeto:
    ```bash
    npm install
    ```
3.  Inicie a aplicação:
    ```bash
    npm start
    ```
    Isso abrirá o Expo Developer Tools no seu navegador. Você pode então escolher rodar a aplicação em um emulador Android, iOS ou no navegador web.

## Como Executar os Testes

Para executar os testes automatizados do projeto, siga os passos:

1.  Navegue até o diretório `front-end` (onde o `package.json` está localizado):
    ```bash
    cd front-end
    ```
2.  Execute os testes:
    ```bash
    npm test
    ```
    Isso executará os testes definidos em `App.test.tsx` e outros arquivos de teste configurados no `jest.config.js` (ou `package.json`).

## Conclusão

O diretório `TP3` é um exemplo abrangente da aplicação de boas práticas em Engenharia de Software, cobrindo desde a especificação de testes com classes de equivalência até o desenvolvimento de uma aplicação moderna com React Native e a documentação de rastreabilidade de testes. Ele serve como um recurso valioso para entender o ciclo de vida de desenvolvimento e teste de software.
