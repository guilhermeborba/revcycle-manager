# Desafio Técnico: Gestão do Ciclo de Receita Hospitalar

## 📖 Visão Geral

Este projeto é uma aplicação full-stack projetada para gerenciar as etapas do **Ciclo de Receita Hospitalar**. A solução permite cadastrar, visualizar e acompanhar a jornada financeira de um atendimento, desde a pré-autorização do convênio até o pagamento final.

O fluxo do ciclo de receita implementado inclui as seguintes etapas:

1.  **Pré-autorização**: Validações de elegibilidade e cobertura do convênio.
2.  **Atendimento**: Execução do procedimento médico.
3.  **Faturamento/Codificação**: Geração da conta hospitalar com os códigos (TUSS/CBHPM) e anexos.
4.  **Glosa/Adjudicação**: Análise da conta pelo pagador, com possíveis ajustes e recursos.
5.  **Pagamento**: Liquidação financeira e baixa da conta.

-----

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando um stack moderno, escalável e robusto.

  - **Backend**: **FastAPI** (Python) ou NesJS (Typescript)
      - **ORM**: SQLAlchemy com Alembic para migrações.
      - **Validação**: Pydantic.
      - **Autenticação**: JWT (JSON Web Tokens).
  - **Frontend**: **React**
      - **Gerenciamento de Estado**: Context API.
      - **Estilização**: Styled-Components.
      - **Roteamento**: React Router.
  - **Banco de Dados**: **PostgreSQL**.
  - **Infraestrutura & DevOps**:
      - **Containerização**: Docker & Docker Compose.
      - **CI/CD**: GitLab CI.
      - **Cloud Provider**: AWS (ECR para registro de imagens e ECS para deploy).

-----

## ✨ Funcionalidades

  - ✅ **Autenticação de Usuários**: Sistema seguro de registro e login com JWT.
  - ✅ **CRUD Completo**: Crie, leia, atualize e remova registros do ciclo de receita.
  - ✅ **Rotas Protegidas**: Acesso apenas para usuários autenticados nas rotas principais.
  - ✅ **Interface Intuitiva**: Formulários claros para login, registro e gerenciamento dos ciclos.
  - ✅ **Documentação de API**: Geração automática de documentação interativa com Swagger (OpenAPI).
  - ✅ **Ambiente Containerizado**: Facilidade para rodar o ambiente de desenvolvimento com um único comando.

-----

## 🏗️ Estrutura do projeto desejável

```
/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   └── models/
│   ├── migrations/
│   ├── Dockerfile
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   └── services/
│   ├── Dockerfile
│   └── package.json
│
├── .gitlab-ci.yml
├── docker-compose.yml
└── README.md
```

-----

## 🗄️ Modelo da Entidade `RevenueCycle`

| Campo         | Tipo de Dado                                          | Descrição                                 |
| :------------ | :---------------------------------------------------- | :---------------------------------------- |
| `id`          | `Integer` (PK)                                        | Identificador único.                      |
| `patientId`   | `String`                                              | ID do paciente.                           |
| `payer`       | `String`                                              | Nome do convênio/pagador.                 |
| `procedureCode` | `String`                                            | Código do procedimento (TUSS/CBHPM).      |
| `amount`      | `Numeric`                                             | Valor do procedimento.                    |
| `stage`       | `Enum(PRE_AUTH, ATTENDANCE, BILLING, ADJUDICATION, PAYMENT)` | Etapa atual do ciclo.                     |
| `claimStatus` | `Enum(OPEN, DENIED, APPROVED, PAID, CANCELLED)`       | Status da conta/fatura.                   |
| `dueDate`     | `Date`                                                | Data de vencimento do pagamento.          |
| `paidDate`    | `Date` (Nullable)                                     | Data em que o pagamento foi efetuado.     |
| `notes`       | `Text` (Nullable)                                     | Observações adicionais.                   |
| `createdAt`   | `DateTime`                                            | Data de criação do registro.              |
| `updatedAt`   | `DateTime`                                            | Data da última atualização.               |

-----

## 📦 Entrega do Projeto

Para finalizar o desafio, siga as instruções abaixo.

### Opções de Envio

Escolha **uma** das seguintes formas para enviar seu projeto:

1.  **Repositório Git (Recomendado):**

      - Faça o upload do seu código para um repositório no GitHub ou GitLab.
      - Se o repositório for privado, por favor, adicione o usuário `joao.marcus@a3data.com.br` como colaborador.
      - Envie o link do repositório por e-mail.

2.  **Arquivo Compactado (.zip):**

      - Compacte a pasta raiz do projeto em um único arquivo `.zip`.
      - **Importante:** Certifique-se de excluir a pasta `node_modules` e outros artefatos de build para manter o arquivo leve.
      - Anexe o arquivo `.zip` no e-mail.

### Checklist Final

Antes de enviar, por favor, verifique se o seu projeto atende aos seguintes critérios:

  - [ ] O código-fonte completo (backend, frontend, Docker, etc.) está incluído.
  - [ ] O arquivo `README.md` está preenchido e claro.
  - [ ] Os arquivos `.env.example` estão presentes e corretos.
  - [ ] O projeto inicia sem erros com o comando `docker-compose up --build`.
  - [ ] O fluxo de ponta a ponta (registro de usuário, login e operações CRUD do ciclo de receita) está funcionando através da interface do frontend.
  - [ ] O arquivo de pipeline `.gitlab-ci.yml` está presente na raiz do projeto.

-----

Boa sorte\!
