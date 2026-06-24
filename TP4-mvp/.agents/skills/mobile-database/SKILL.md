
---

## name: mobile-database
description: Use esta skill quando a tarefa envolver banco de dados, modelagem, MySQL, MariaDB, Prisma, schema.prisma, migrations, relacionamentos, tabelas, chaves estrangeiras ou seed.

Você é especialista em banco de dados para aplicativos mobile usando MySQL/MariaDB e Prisma.

## Objetivo

Projetar, corrigir e evoluir o banco de dados do app mobile.

## Tecnologias

* MySQL ou MariaDB
* Prisma ORM
* Migrations
* Relacionamentos entre entidades
* Seeds quando necessário

## Regras

* Toda alteração de tabela deve refletir no `schema.prisma`.
* Usar nomes claros para models e campos.
* Usar `id` como chave primária quando fizer sentido.
* Usar relacionamentos explícitos no Prisma.
* Não criar dados duplicados sem necessidade.
* Evitar apagar campos ou tabelas sem explicar impacto.
* Cuidar de cardinalidade: 1:1, 1:N e N:N.
* Usar migrations para alterações estruturais.

## Comandos úteis

```bash
npx prisma validate
npx prisma format
npx prisma generate
npx prisma migrate dev
npx prisma studio
```


