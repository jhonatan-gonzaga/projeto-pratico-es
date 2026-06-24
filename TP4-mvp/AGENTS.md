# [AGENTS.md](http://AGENTS.md)

## Projeto

Este projeto é um aplicativo mobile com:

* Frontend: React Native com Expo, TypeScript, NativeWind, Redux Toolkit e React Navigation.
* Backend: Node.js com NestJS, TypeScript, Prisma e API REST.
* Banco de dados: MySQL/MariaDB com Prisma ORM.

## Regras gerais

* Sempre analisar a estrutura atual antes de modificar arquivos.
* Não remover código existente sem explicar o motivo.
* Manter separação clara entre frontend, backend e banco.
* Nunca colocar senhas, tokens ou chaves diretamente no código.
* Usar variáveis de ambiente para URLs, banco de dados e segredos.
* Quando alterar algo, explicar quais arquivos foram modificados e por quê.

## Verificação

Antes de finalizar uma alteração, tentar executar:

### Frontend

```bash
npm run lint
npm run typecheck
```


