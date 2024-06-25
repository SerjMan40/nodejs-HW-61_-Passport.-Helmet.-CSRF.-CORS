import express from 'express'
import {
  deleteUserOnIdHandler,
  getUserOnIdHandler,
  getUsersHandler,
  putUserOnIdHandler
} from '../controllers/users.mjs'
import { ensureAuthenticated } from '../middlewares/authenticate.mjs'

const usersRouter = express.Router()

usersRouter.get('/', ensureAuthenticated, getUsersHandler)

usersRouter.get('/:userId', ensureAuthenticated, getUserOnIdHandler)
usersRouter.put('/:userId', ensureAuthenticated, putUserOnIdHandler)
usersRouter.delete('/:userId', ensureAuthenticated, deleteUserOnIdHandler)

export default usersRouter
