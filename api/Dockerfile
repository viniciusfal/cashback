# Dockerfile para API
FROM node:alpine

# Definir o diretório de trabalho
WORKDIR /usr/app

# Copiar os arquivos package.json e package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante dos arquivos da aplicação
COPY . .

# Expor a porta em que a aplicação vai rodar
EXPOSE 3333

# Comando para rodar a aplicação
CMD ["npm", "start"]
