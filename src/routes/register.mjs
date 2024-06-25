import express from 'express'

import { getRegisterHendler, postRegisterHandler } from '../controllers/register.mjs'

const registerRouter = express.Router()

registerRouter.get('/',  getRegisterHendler )
registerRouter.post('/', postRegisterHandler)

export default registerRouter
