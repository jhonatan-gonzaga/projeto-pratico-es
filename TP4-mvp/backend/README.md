# Backend Conecta Obras

API REST com NestJS, Prisma e MySQL.

## Como rodar

1. Instale as dependencias:

```bash
npm install
```

2. Copie o arquivo de ambiente:

```bash
cp .env.example .env
```

3. Edite `DATABASE_URL` e `JWT_SECRET` no `.env`.

4. Gere o client Prisma e rode a migracao:

```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Inicie a API:

```bash
npm run start:dev
```

## Endpoints

Base URL local: `http://localhost:3000/api`

- `POST /auth/register`: cria usuario e retorna token.
- `POST /auth/login`: autentica usuario e retorna token.
- `GET /auth/me`: retorna o usuario autenticado. Envie `Authorization: Bearer <token>`.

## Exemplo de cadastro

```json
{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "phone": "92999999999",
  "password": "123456",
  "role": "PROFISSIONAL"
}
```
