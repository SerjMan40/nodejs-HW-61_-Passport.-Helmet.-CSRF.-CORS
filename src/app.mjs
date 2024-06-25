import express from 'express'
import router from './routes/index.mjs'
import path from 'path'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
import ejs from 'ejs'
import sessionMiddleware from './middlewares/sessionMiddleware.mjs'
import passport from './config/passport.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.engine('ejs', ejs.renderFile)

app.use(sessionMiddleware)

app.use(passport.initialize())
app.use(passport.session())

const PORT = 3000

app.use(router)

app.listen(PORT, () => console.log('Server was started on port:', PORT))
