# Server AI

Um ambiente completo de desenvolvimento de IA local usando Docker containers com Ollama para executar modelos LLM e uma API Node.js personalizada para interação com os modelos.

## 🚀 Características

- **API Node.js/Express**: Servidor customizado para interação com modelos AI
- **Ollama Server**: Container para execução de modelos LLM localmente
- **Docker Compose**: Orquestração completa dos serviços
- **Modelo Gemma2:2b**: Modelo pré-configurado para chat
- **CORS habilitado**: Permite requisições de diferentes origens
- **Aguarda conexão**: Sistema inteligente de espera pela disponibilidade do Ollama

## 📦 Estrutura do Projeto

```
server-ai/
├── src/
│   └── index.js           # API Express principal
├── docker-compose.yml     # Orquestração dos containers
├── Dockerfile            # Imagem do servidor Node.js
├── package.json          # Dependências e scripts
├── .env                  # Variáveis de ambiente
├── .gitignore           # Arquivos ignorados pelo Git
└── README.md            # Este arquivo
```

## 🛠️ Tecnologias

- **Node.js** com Express
- **Ollama** para modelos LLM
- **Docker & Docker Compose**
- **CORS** para requisições cross-origin
- **dotenv** para variáveis de ambiente

## ⚡ Início Rápido

### Pré-requisitos
- Docker e Docker Compose instalados
- Git (para clonar o repositório)

### 1. Clonar e configurar

```bash
git clone <url-do-repositório>
cd server-ai
```

### 2. Criar arquivo de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
MODEL=gemma2:2b
OLLAMA_HOST=http://ollama:11434
```

### 3. Iniciar os serviços

```bash
docker-compose up -d
```

### 4. Aguardar inicialização

O sistema aguardará automaticamente o Ollama estar disponível e baixará o modelo se necessário.

### 5. Testar a API

```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Olá, como você está?"}'
```

## 🔌 API Endpoints

### POST /chat

Envia uma mensagem para o modelo AI e retorna a resposta.

**Request:**
```json
{
  "message": "Sua pergunta aqui"
}
```

**Response:**
```json
{
  "response": "Resposta do modelo AI"
}
```

**Exemplo com curl:**
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Explique o que é inteligência artificial"}'
```

**Exemplo com JavaScript:**
```javascript
const response = await fetch('http://localhost:3000/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'Como funciona o machine learning?'
  })
});

const data = await response.json();
console.log(data.response);
```

## 🐳 Serviços Docker

### Ollama Server
- **Porta**: 11434
- **Container**: `ollama-server`
- **Volume**: `ollama_data` para persistência dos modelos
- **Modelo padrão**: gemma2:2b

### Server AI (Node.js)
- **Porta**: 3000
- **Container**: `server-ai`
- **Build**: Dockerfile personalizado
- **Depende**: ollama service

## 🔧 Comandos Úteis

### Gerenciar containers
```bash
# Ver status dos containers
docker-compose ps

# Ver logs
docker-compose logs

# Ver logs em tempo real
docker-compose logs -f

# Parar serviços
docker-compose down

# Reiniciar serviços
docker-compose restart
```

### Gerenciar modelos Ollama
```bash
# Listar modelos instalados
docker exec ollama-server ollama list

# Baixar novo modelo
docker exec ollama-server ollama pull <nome-do-modelo>

# Testar modelo diretamente
docker exec -it ollama-server ollama run gemma2:2b "Sua pergunta"

# Remover modelo
docker exec ollama-server ollama rm <nome-do-modelo>
```

### Desenvolvimento local
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Executar em produção
npm start
```

## 🌐 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|---------|
| `PORT` | Porta do servidor Express | `3000` |
| `MODEL` | Modelo Ollama a usar | `gemma2:2b` |
| `OLLAMA_HOST` | URL do servidor Ollama | `http://ollama:11434` |

## 📊 Monitoramento

### Health Checks
```bash
# Status da API
curl http://localhost:3000/health

# Status do Ollama
curl http://localhost:11434/api/tags
```

### Logs e Debug
```bash
# Logs do servidor Node.js
docker-compose logs server-ai

# Logs do Ollama
docker-compose logs ollama

# Entrar no container para debug
docker exec -it server-ai /bin/bash
```

## 🔄 Modelos Disponíveis

Alguns modelos populares que você pode usar:

- `gemma2:2b` - Modelo leve e rápido (padrão)
- `llama3.1:8b` - Modelo mais poderoso
- `codellama:7b` - Especializado em código
- `mistral:7b` - Boa performance geral

Para trocar de modelo, atualize a variável `MODEL` no `.env` e reinicie os containers.

## 🚨 Solução de Problemas

### Container não inicia
```bash
# Verificar logs
docker-compose logs

# Reconstruir imagens
docker-compose build --no-cache
```

### Modelo não responde
```bash
# Verificar se o modelo está baixado
docker exec ollama-server ollama list

# Baixar modelo manualmente
docker exec ollama-server ollama pull gemma2:2b
```

### Erro de conexão
- Verifique se o Ollama está rodando: `docker-compose ps`
- Verifique a variável `OLLAMA_HOST` no `.env`
- Aguarde alguns segundos para inicialização completa

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🎯 Próximos Passos

- [ ] Adicionar autenticação JWT
- [ ] Implementar rate limiting
- [ ] Adicionar suporte a múltiplos modelos
- [ ] Interface web para chat
- [ ] Métricas e monitoring
- [ ] Testes automatizados
- [ ] Deploy para produção

---

**Desenvolvido com ❤️ usando Node.js, Express e Ollama**