import express from 'express'
import 'dotenv/config'
import classesRouter from './routes/classes.routes';

const app = express()
const PORT = process.env.PORT || 3333

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'API do Jiu-Jitsu App está no ar!' })
})

app.use('/api/v1', classesRouter);

app.listen(PORT, () => {
  console.log(`🚀 Backend server rodando na porta http://localhost:${PORT}`)
})