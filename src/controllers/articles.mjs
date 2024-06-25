import { readArticlesFromFile, addArticle, updateArticle, deleteArticle } from '../data/articlesData.mjs'

const articles = readArticlesFromFile()

export const getArticlesHandler = (req, res) => {
  res.render('articles/articles.ejs', { articles })
}

export const getArticleDetailHandler = (req, res) => {
  const articleId = parseInt(req.params.articleId)
  const article = articles.find(a => a.id === articleId)
  if (article) {
    res.render('articles/articleDetail.ejs', { article })
  } else {
    res.status(404).send('Article not found')
  }
}

export const postArticleHandler = (req, res) => {
  const { title, content } = req.body
  const articles = readArticlesFromFile()
  const newArticle = {
    id: articles.length + 1,
    title,
    content
  }
  addArticle(newArticle)
  res.status(201).send('Article created successfully')
}

export const putArticleHandler = (req, res) => {
  const articleId = parseInt(req.params.id, 10)
  const { title, content } = req.body
  const updatedArticle = { title, content }
  const isUpdated = updateArticle(articleId, updatedArticle)
  if (isUpdated) {
    res.send(`Article with ID: ${articleId} is updated!`)
  } else {
    res.status(404).send(`Article with ID ${articleId} not found`)
  }
}

export const deleteArticleHandler = (req, res) => {
  const articleId = parseInt(req.params.id, 10)
  const deletedArticle = deleteArticle(articleId)
  if (deletedArticle) {
    res.send(`Article with ID: ${articleId} was deleted!`)
  } else {
    res.status(404).send(`Article with ID ${articleId} not found`)
  }
}