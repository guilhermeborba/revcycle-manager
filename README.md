# Desafio Técnico – Gestão do Ciclo de Receita Hospitalar

Este projeto é uma aplicação full-stack completa para gerenciar as etapas do Ciclo de Receita Hospitalar, desde a pré-autorização até o pagamento final.

A solução permite o cadastro e login de usuários, e o gerenciamento (CRUD - Create, Read, Update, Delete) de todos os ciclos de receita através de uma interface web segura e reativa.

## 🚀 Stack de Tecnologias

A aplicação foi construída utilizando um ecossistema moderno, robusto e escalável.

* **Backend:**
    * **Framework:** NestJS (TypeScript)
    * **Banco de Dados:** PostgreSQL
    * **ORM:** TypeORM (com sistema de Migrations)
    * **Autenticação:** JWT com Passport.js (Guards, Strategy)
    * **Validação:** `class-validator` / `class-transformer`

* **Frontend:**
    * **Biblioteca:** React (TypeScript) com Vite
    * **Roteamento:** React Router
    * **Estilização:** Styled Components
    * **Cliente HTTP:** Axios (com Interceptors para JWT)
    * **Gerenciamento de Estado:** React Context API

* **Testes:**
    * **Backend:** Jest & Supertest (Testes E2E)
    * **Frontend:** Vitest & React Testing Library (Testes Unitários de Componentes)

* **DevOps & Infraestrutura:**
    * **Containerização:** Docker & Docker Compose
    * **Servidor Web (Frontend):** NGINX
    * **CI/CD:** GitLab CI

## 📋 Pré-requisitos

Para executar este projeto, você precisará ter as seguintes ferramentas instaladas:

* [Docker](https://www.docker.com/products/docker-desktop/)
* [Docker Compose](https://docs.docker.com/compose/) (geralmente já vem com o Docker Desktop)
* [Node.js](https://nodejs.org/) (para interagir com o `npm`)
* [Git](https://git-scm.com/)

## ⚙️ Instruções de Instalação e Execução

Siga os passos abaixo para rodar a aplicação completa localmente.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/guilhermeborba/revcycle-manager.git](https://github.com/guilhermeborba/revcycle-manager.git)
    cd revcycle-manager
    ```

2.  **Configure as Variáveis de Ambiente:**
    Existem dois arquivos de exemplo `.env.example` que precisam ser configurados.

    * **Para o Docker Compose:**
        ```bash
        # Na raiz do projeto
        cp .env.example .env
        ```
    * **Para o Backend:**
        ```bash
        # Navegue para a pasta do backend
        cd backend
        cp .env.example .env
        # Preencha os segredos JWT no arquivo backend/.env
        cd ..
        ```

3.  **Suba a Aplicação com Docker Compose:**
    Este comando irá construir as imagens do frontend e backend e iniciar todos os três containers (frontend, backend, banco de dados).

    ```bash
    docker compose up --build
    ```

4.  **Acesse a Aplicação:**
    * **Frontend:** [http://localhost:5173](http://localhost:5173)
    * **Backend API:** [http://localhost:3000](http://localhost:3000)

## 🗺️ Estrutura da API (Endpoints Principais)

Todos os endpoints, exceto `/auth/register` e `/auth/login`, são protegidos e exigem um Bearer Token JWT.

| Método | Endpoint                    | Descrição                              |
| :----- | :-------------------------- | :------------------------------------- |
| `POST` | `/auth/register`            | Registra um novo usuário.              |
| `POST` | `/auth/login`               | Autentica um usuário e retorna um JWT. |
| `GET`  | `/auth/me`                  | Retorna os dados do usuário logado.    |
| `POST` | `/revenue-cycles`           | Cria um novo ciclo de receita.         |
| `GET`  | `/revenue-cycles`           | Lista todos os ciclos de receita.      |
| `GET`  | `/revenue-cycles/:id`       | Busca um ciclo de receita por ID.      |
| `PATCH`| `/revenue-cycles/:id`       | Atualiza um ciclo de receita por ID.   |
| `DELETE`| `/revenue-cycles/:id`     | Deleta um ciclo de receita por ID.     |