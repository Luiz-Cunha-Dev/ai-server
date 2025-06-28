# 🤖 Server AI

Simple API using Node.js, Express, and Ollama for local AI chat models.

## ✨ Features

- **🚀 Express API**: Endpoints for normal and streaming chat
- **🧠 Ollama**: Local LLM model execution
- **🐳 Docker Compose**: Complete setup with containers
- **🌐 CORS**: Cross-origin requests enabled
- **⏳ Auto-wait**: Waits for Ollama to be available before starting

## 📦 Structure

```
server-ai/
├── src/
│   └── index.js           # Express API
├── docker-compose.yml     # Containers
├── Dockerfile             # Node.js image
├── package.json           # Dependencies
└── README.md              # This file
```

## 🛠️ Technologies

- **Node.js 18+** + **Express** + **Ollama**
- **Docker & Docker Compose**
- **CORS** + **dotenv**

## ⚡ How to use

### 1. Create environment file

Create a `.env` file in the root:

```env
PORT=3000
MODEL=gemma2:2b
OLLAMA_HOST=http://ollama:11434
```

### 2. Start

```bash
docker-compose up -d
```

### 3. Test

```bash
# Normal chat
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'

# Streaming chat
curl -X POST http://localhost:3000/chat/stream \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'
```

## 🔌 API

### POST /chat
Normal chat - returns the full response

### POST /chat/stream  
Streaming chat - returns real-time response via Server-Sent Events

**Request:**
```json
{
  "message": "Your question"
}
```

## 🔧 Useful commands

```bash
# Check status
docker-compose ps

# View logs
docker-compose logs -f

# List installed models
docker exec ollama-server ollama list

# Download model
docker exec ollama-server ollama pull gemma2:2b
```

## 🚨 Common issues

### Container does not start
```bash
docker-compose down --remove-orphans
docker-compose build --no-cache
docker-compose up -d
```

### Model does not respond
```bash
# Check if the model is downloaded
docker exec ollama-server ollama list

# Download manually
docker exec ollama-server ollama pull gemma2:2b
```

## 📝 License

MIT License