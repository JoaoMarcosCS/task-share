FROM node:20-alpine

WORKDIR /app

# Primeiro copia os arquivos de definição de dependências
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Expõe a porta padrão do Vite
EXPOSE 5173

# Comando para desenvolvimento
CMD ["npm", "run", "dev"]
