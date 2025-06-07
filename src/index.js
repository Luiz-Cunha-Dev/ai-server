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