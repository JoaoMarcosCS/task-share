## Visão Geral
Teste técnico resolvido e desenvolvido com Node.js + Express no backend e React + Vite no frontend. O teste consistia em criar uma aplicação para gerenciamento e compartilhamento de listas de tarefas.

## Stack Técnica

### Backend
- **Node.js** com TypeScript
- **Express.js** 
- **TypeORM** 
- **PostgreSQL** 
- **JWT** 
- **Zod** 
- **Docker**

### Frontend
- **React** com TypeScript
- **Vite** 
- **Tailwind CSS** 
- **React Hook Form + Zod** 
- **React Query** 
- **Zustand** 
- **ShadCN UI** 

## Funcionalidades Implementadas

### Autenticação
- Registro de usuário com validação
- Login com JWT
- Middleware de autenticação/autorização para manipulação das listas
- Proteção de rotas no frontend
- Logout com remoção de tokens

### Gerenciamento de Listas
- Listagem de listas próprias e compartilhadas
- CRUD completo de listas de tarefas, exceto a edição do título da lista que não foi feito por falta de tempo

### Gerenciamento de Tarefas
- Adicionar/editar/remover tarefas
- Marcar/desmarcar como concluída

### Compartilhamento
- Compartilhar listas com outros usuários (read-only)
- Visualizar/remover usuários com acesso
- Middleware de verificação de permissões

### Comentários (Diferencial)
- Adicionar comentários em tarefas
- Visualizar histórico com identificação do autor
- Validação de conteúdo

## Como rodar?

Primeiro crie um .env na raiz do monorepo `task-share/.env` com os seguintes dados
```
APP_PORT=3001

JWT_SECRET="deodmjrf3uol@@$%FASASasd"
ACCESS_TOKEN_EXPIRES=3600

DATABASE_USERNAME='admin'
DATABASE_PASSWORD='admin'
DATABASE_HOST='db'
DATABASE_NAME='task-share'
DATABASE_PORT=5432

```
Feito isso, basta rodar `docker-compose up --build`
