import express from 'express'
import dotenv from 'dotenv'
import { connect } from 'mongoose'
import BodyParser from 'body-parser'
import { join, resolve } from 'path'
const app = express();


(async (): Promise<void>  => {
  try {
    dotenv.config()
    const PORT = process.env.PORT 
    const DB: string = (process.env.DB as string)
    await connect(DB, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
    app.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`))
  } catch (error) {
    console.log(`server error: `, error.message)
    process.exit(1);
  }
})()
app.use(express.json())
app.use(BodyParser.urlencoded({ extended: false }))

import { router as Auth } from './routes/auth.routes'
app.use('/api/auth', Auth);

import { router as Link } from './routes/link.routes'
app.use('/api/link', Link)

import { router as Redirect } from './routes/redirect.routes'
app.use('/t', Redirect)


if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(join(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(resolve(__dirname, 'client', 'build', 'index.html'))
  })
}