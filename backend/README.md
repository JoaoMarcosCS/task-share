# Backend

## Modelagem

foto da modelagem

## Arquitetura

Desenvolvi uma arquitetura que se aproxima do DDD. Utilizei a inversão de dependencia para a camada de repositório para desacoplamento e injeção de dependencia para service e controller. Segue a explicação da arquitetura:

```
backend
├─ public # svg da modelagem do banco e as collections dos requests
│  ├─ auth.postman_collection.json
│  ├─ Task Share Modelagem.svg
│  ├─ task-list.postman_collection.json
│  ├─ task.postman_collection.json
│  └─ user.postman_collection.json
├─ src
│  ├─ @types # adição da tipagem para acessar o user no contexto do request
│  │  └─ express
│  │     └─ index.d.ts
│  ├─ infra
│  │  ├─ container # configuração das injeções e inversões de dependência
│  │  │  └─ index.ts
│  │  ├─ database # configurações do banco
│  │  └─ http # configurações do servidor HTTP da api
│  │     ├─ app.ts
│  │     ├─ middleware
│  │     ├─ routes
│  │     ├─ security
│  │     │  ├─ cors-config.ts
│  │     │  └─ white-list.ts
│  │     └─ server.ts
│  ├─ modules # configurações das features da api
│  │  ├─ auth # o auth não possui persistência no banco, é gerenciado pelo front e validado por um middleware
│  │  │  ├─ controller # camada que recebe o request e passa para a camada de regras de negócios
│  │  │  └─ services # camada que contém as regras de negócios
│  │  ├─ comments
│  │  │  ├─ dto
│  │  │  ├─ entities
│  │  │  └─ repository # pasta que contém a abstração e a implementação
│  │  │     ├─ comment.repository.ts
│  │  │     └─ ICommentRepository.ts
│  │  ├─ tasks
│  │  │  ├─ controller
│  │  │  ├─ dto
│  │  │  ├─ entities
│  │  │  ├─ repository
│  │  │  │  ├─ ITaskRepository.ts
│  │  │  │  └─ task.repository.ts
│  │  │  └─ services
│  │  ├─ tasks-lists
│  │  └─ users
│  └─ shared
│     ├─ environment
│     │  └─ env.ts # utilitária para validar se todas as variáveis de ambiente estão no .env
│     ├─ errors
│     │  ├─ errors.ts
│     │  └─ message-error.enum.ts
│     └─ utils
│        ├─ generateHash.ts
│        └─ validate-with-zod.ts

```

## Como rodar?

Primeiro crie um .env na raiz do monorepo `task-share/.env`. Feito isso, basta rodar `docker-compose up --build`
