FROM node:18

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de configuração e dependências
COPY package*.json ./

# Copia o arquivo .env se existir (opcional)
COPY .env* ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY src/ ./src

# Expõe a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "src/index.js"]