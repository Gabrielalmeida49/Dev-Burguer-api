# 🍔 Dev Burguer - Back End

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" alt="Sequelize" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Neon-00E699?style=for-the-badge&logo=neon&logoColor=black" alt="Neon" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
  <img src="https://img.shields.io/badge/Bcrypt-00599C?style=for-the-badge&logoColor=white" alt="Bcrypt" />
  <img src="https://img.shields.io/badge/Multer-FF6F00?style=for-the-badge&logoColor=white" alt="Multer" />
  <img src="https://img.shields.io/badge/Yup-111827?style=for-the-badge&logoColor=white" alt="Yup" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" alt="Render" />
</p>

O **Dev Burguer API** é o backend responsável por toda a lógica de negócio da aplicação. A API fornece autenticação segura, gerenciamento de usuários, categorias, produtos e pedidos, além de realizar o upload de imagens para o Cloudinary e persistir todas as informações em um banco de dados PostgreSQL.

---

# 🌐 API em Produção

A API está publicada na nuvem e pode ser acessada através do endereço:

👉 **https://dev-burguer-api-thkn.onrender.com**

---

# 🚀 Principais Funcionalidades

- 🔐 Autenticação utilizando JWT.
- 👤 Cadastro e login de usuários.
- 👑 Controle de acesso para administradores.
- 🍔 Cadastro, edição, listagem e exclusão de produtos.
- 📂 Cadastro e gerenciamento de categorias.
- ☁️ Upload de imagens diretamente para o Cloudinary.
- 🗄️ Persistência dos dados utilizando PostgreSQL.
- ✅ Validação de dados com Yup.
- 🔒 Criptografia de senhas utilizando Bcrypt.
- 📦 API REST consumida pelo Front-end React.

---

# 🛠️ Tecnologias Utilizadas

## ⚙️ Back-end

- Node.js
- Express
- JavaScript (ES Modules)

## 🗄️ Banco de Dados

- PostgreSQL
- Sequelize ORM
- Neon Database

## 🔐 Segurança

- JSON Web Token (JWT)
- Bcrypt

## 📂 Upload de Arquivos

- Multer
- Cloudinary

## ✅ Validação

- Yup

## ☁️ Deploy

- Render

---

# 🔗 Repositório do Front-end

O front-end responsável pela interface da aplicação pode ser encontrado em:

👉 GitHub → **https://github.com/Gabrielalmeida49/Dev-Burguer-web**
👉 Render → **https://dev-burguer-web.onrender.com**

---

# 📌 Principais Endpoints

## Autenticação

- POST `/session`
- POST `/users`

## Categorias

- GET `/categories`
- POST `/categories`
- PUT `/categories/:id`

## Produtos

- GET `/products`
- POST `/products`
- PUT `/products/:id`

## Pedidos

- GET `/orders`
- PUT `/orders/:id`

---

# 💻 Como executar o projeto

Clone o repositório:

```bash
git clone https://github.com/Gabrielalmeida49/dev-burguer-api.git
```

Entre na pasta:

```bash
cd dev-burguer-api
```

Instale as dependências:

```bash
pnpm install
```

Configure o arquivo `.env`:

```env
DATABASE_URL=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Execute as migrations:

```bash
pnpm sequelize db:migrate
```

Inicie a aplicação:

```bash
pnpm dev
```

A API ficará disponível em:

```text
http://localhost:3001
```

---

# 📂 Arquitetura

O projeto segue uma arquitetura em camadas para facilitar manutenção e escalabilidade.

```
src
 ├── app
 │   ├── controllers
 │   ├── middlewares
 │   ├── models
 │   └── schemas
 ├── config
 ├── database
 │   ├── migrations
 │   └── seeders
 ├── routes
 └── server.js
```

---

# 📄 Licença

Este projeto foi desenvolvido para fins de estudo, prática e demonstração de conhecimentos em desenvolvimento Full Stack.
