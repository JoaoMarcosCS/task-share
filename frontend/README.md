# Frontend

## Arquitetura

Desenvolvi uma arquitetura que encapsula a lógica de cada página de acordo seu feature. Para requests foi utilizado React Query e Axios. Para o controle de estado foi utilizado Zustand. Por fim, para validação de formulário foi utilizado React Hook Form e Zod. Utilizei o Shadcn para estilização de componentes junto com Tailwind.

```
frontend
├─ src
│  ├─ App.css
│  ├─ App.tsx
│  ├─ assets
│  │  └─ react.svg
│  ├─ components
│  │  ├─ common # componentes utilitários e que são usados em várias pastas
│  │  │  ├─ ActiveLink.tsx
│  │  │  ├─ LogoutDialog.tsx
│  │  │  ├─ RenderIf.tsx
│  │  │  └─ RenderItems.tsx
│  │  ├─ ErrorBoundary.tsx # componente de fallback de erro
│  │  ├─ layout # componentes que fazem parte do layout 
│  │  │  ├─ Footer.tsx
│  │  │  ├─ Header.tsx
│  │  │  ├─ LayoutPrivate.tsx
│  │  │  └─ SideBar.tsx
│  │  └─ ui # componentes do Shadcn
│  ├─ contexts # não é utilizada, mas criei para poder usar para garantir a autenticação
│  │  └─ route-guard.tsx
│  ├─ cookies # configuração dos cookies
│  │  └─ cookie-storage.ts
│  ├─ hooks # hookies que são usado em diversas páginas, assim os componentes do layout
│  │  └─ useLogoutMutation.ts
│  ├─ index.css
│  ├─ main.tsx
│  ├─ pages
│  │  ├─ create-share
│  │  │  ├─ components # componentes exclusivos da página
│  │  │  │  └─ FindUserByEmailCard.tsx
│  │  │  ├─ hooks # hooks exclusivo da feature
│  │  │  │  ├─ useCreateShareFormHandler.ts
│  │  │  │  ├─ useCreateShareMutation.ts
│  │  │  │  └─ useFindUserByEmailQuery.ts
│  │  │  ├─ interface
│  │  │  │  └─ user.interface.ts
│  │  │  ├─ schema # schema de validação com react hook form e zod
│  │  │  │  └─ create-share.schema.ts
│  │  │  └─ service # request utilizados pelos hooks
│  │  │     ├─ create-share.requet.ts
│  │  │     └─ find-user-by-email.request.ts
│  ├─ providers
│  │  ├─ ReactQuery.tsx
│  │  └─ ThemeProvider.tsx
│  ├─ routes # mapeamento das páginas
│  │  └─ index.tsx
│  ├─ service # configuração da conexão com a api
│  │  └─ api.ts
│  ├─ store # configuração da store do usuário
│  │  └─ user.store.ts
│  ├─ utils # funções utilitárias
│  │  ├─ add-token-to-header.ts
│  │  ├─ get-api-error-message.ts
│  │  ├─ remove-token-from-header.ts
│  │  └─ take-initial-letters.ts

```

