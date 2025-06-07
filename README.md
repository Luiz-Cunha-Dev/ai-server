# 🤖 Server AI

API simples usando Node.js, Express e Ollama para chat com modelos de IA localmente.

## ✨ Características

- **🚀 API Express**: Endpoints para chat normal e streaming
- **🧠 Ollama**: Execução local de modelos LLM
- **🐳 Docker Compose**: Setup completo com containers
- **🌐 CORS**: Requisições cross-origin habilitadas
- **⏳ Auto-wait**: Aguarda Ollama estar disponível antes de iniciar

## 📦 Estrutura

```
server-ai/
├── src/
│   └── index.js           # API Express
├── docker-compose.yml     # Containers
├── Dockerfile            # Imagem Node.js
├── package.json          # Dependências
└── README.md            # Este arquivo
```

## 🛠️ Tecnologias

- **Node.js 18+** + **Express** + **Ollama**
- **Docker & Docker Compose**
- **CORS** + **dotenv**

## ⚡ Como usar

### 1. Criar arquivo de ambiente

Crie `.env` na raiz:

```env
PORT=3000
MODEL=gemma2:2b
OLLAMA_HOST=http://ollama:11434
```

### 2. Iniciar

```powershell
docker-compose up -d
```

### 3. Testar

```powershell
# Chat normal
$body = @{ message = "Olá!" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/chat" -Method POST -Body $body -ContentType "application/json"

# Chat streaming
Invoke-RestMethod -Uri "http://localhost:3000/chat/stream" -Method POST -Body $body -ContentType "application/json"
```

## 🔌 API

### POST /chat
Chat normal - retorna resposta completa

### POST /chat/stream  
Chat streaming - retorna resposta em tempo real via Server-Sent Events

**Request:**
```json
{
  "message": "Sua pergunta"
}
```

## 🔧 Comandos úteis

```powershell
# Ver status
docker-compose ps

# Ver logs
docker-compose logs -f

# Modelos instalados
docker exec ollama-server ollama list

# Baixar modelo
docker exec ollama-server ollama pull gemma2:2b
```

## 🚨 Problemas comuns

### Container não inicia
```powershell
docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up -d
```

### Modelo não responde
```powershell
# Verificar se modelo está baixado
docker exec ollama-server ollama list

# Baixar manualmente
docker exec ollama-server ollama pull gemma2:2b
```

## 📝 Licença

MIT License