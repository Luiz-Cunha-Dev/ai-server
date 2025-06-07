import express from 'express'
import { Ollama } from 'ollama'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// Configurar Ollama com host customizável
const ollama = new Ollama({ 
  host: process.env.OLLAMA_HOST || 'http://localhost:11434' 
})

// Função para aguardar Ollama estar disponível
async function waitForOllama() {
  let attempts = 0
  const maxAttempts = 30
  
  while (attempts < maxAttempts) {
    try {
      await ollama.list()
      console.log('✅ Ollama está disponível')
      return true
    } catch (error) {
      attempts++
      console.log(`⏳ Aguardando Ollama... (tentativa ${attempts}/${maxAttempts})`)
      await new Promise(resolve => setTimeout(resolve, 2000))
    }
  }
  
  throw new Error('Ollama não ficou disponível no tempo esperado')
}

app.use(cors())
app.use(express.json())

app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body
    
    const response = await ollama.chat({
      model: process.env.MODEL || 'gemma3:1b',
      messages: [{ role: 'user', content: message }],
    })
    
    res.json({ response: response.message.content })
  } catch (error) {
    console.error('Erro ao chamar o Ollama:', error)
    res.status(500).json({ error: 'Erro ao gerar resposta com o modelo' })
  }
})

// Nova rota para chat com streaming
app.post('/chat/stream', async (req, res) => {
  try {
    const { message } = req.body
    
    // Configurar headers para SSE (Server-Sent Events)
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control'
    })
    
    // Função para enviar dados via SSE
    const sendEvent = (data) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`)
    }
    
    // Iniciar streaming com Ollama
    const stream = await ollama.chat({
      model: process.env.MODEL || 'gemma3:1b',
      messages: [{ role: 'user', content: message }],
      stream: true,
    })
    
    // Processar cada chunk do stream
    for await (const chunk of stream) {
      if (chunk.message?.content) {
        sendEvent({
          type: 'chunk',
          content: chunk.message.content
        })
      }
      
      // Se for o último chunk
      if (chunk.done) {
        sendEvent({
          type: 'done',
          content: ''
        })
        break
      }
    }
    
    res.end()
    
  } catch (error) {
    console.error('Erro ao chamar o Ollama stream:', error)
    res.write(`data: ${JSON.stringify({
      type: 'error',
      error: 'Erro ao gerar resposta com o modelo'
    })}\n\n`)
    res.end()
  }
})

// Aguarda Ollama estar disponível antes de iniciar o servidor
waitForOllama()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Servidor rodando em http://localhost:${port}`)
    })
  })
  .catch(error => {
    console.error('❌ Erro ao inicializar:', error)
    process.exit(1)
  })