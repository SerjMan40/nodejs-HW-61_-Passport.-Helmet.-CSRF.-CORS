import express from 'express'
import {
  getArticlesHandler,
  postArticleHandler,
  putArticleHandler,
  deleteArticleHandler,
  getArticleDetailHandler
} from '../controllers/articles.mjs'
import { ensureAuthenticated } from '../middlewares/authenticate.mjs'

const articlesRouter = express.Router()

articlesRouter.get('/', ensureAuthenticated,  getArticlesHandler)
articlesRouter.post('/', ensureAuthenticated,  postArticleHandler)

articlesRouter.get('/:articleId', ensureAuthenticated, getArticleDetailHandler)
articlesRouter.put('/:articleId', ensureAuthenticated, putArticleHandler)
articlesRouter.delete('/:articleId', ensureAuthenticated, deleteArticleHandler)

export default articlesRouter
