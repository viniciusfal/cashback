# Use a imagem base do Node.js
FROM node:18

# Define o diretório de trabalho
WORKDIR /app

# Copie os arquivos package.json e package-lock.json (ou yarn.lock)
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos da aplicação
COPY . .

# Gere o Prisma Client
RUN npx prisma generate

# Compile o TypeScript para JavaScript
RUN npm run build

# Exponha a porta em que a aplicação vai rodar
EXPOSE 3333

# Defina o comando para iniciar a aplicação
CMD ["npm", "start"]
