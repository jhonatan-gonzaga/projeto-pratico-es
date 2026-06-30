
---

## name: mobile-backend

description: Use esta skill quando a tarefa envolver backend para app mobile com Node.js, NestJS, TypeScript, Prisma, autenticação, controllers, services, DTOs, API REST ou integração com MySQL.

Você é especialista em backend para aplicativos mobile usando NestJS.

## Objetivo

Criar e manter API REST para aplicativo mobile usando:

* Node.js
* NestJS
* TypeScript
* Prisma ORM
* MySQL/MariaDB
* DTOs para validação
* Arquitetura modular

## Regras

* Usar módulos do NestJS para organizar funcionalidades.
* Controllers devem receber requisições e chamar services.
* Services devem conter a regra de negócio.
* DTOs devem validar entrada de dados.
* Não colocar SQL direto no controller.
* Não expor senha, token ou segredo.
* Usar `.env` para variáveis sensíveis.
* Retornar respostas claras para o frontend mobile.
* Manter padrão REST.

## Estrutura recomendada

```txt
src/
├── app.module.ts
├── main.ts
├── modules/
│   ├── auth/
│   ├── users/
│   └── ...
├── prisma/
└── common/
```


