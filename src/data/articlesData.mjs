import fs from 'fs'
import path from 'path'

const articlesFilePath = path.resolve('src/data/articles.json')

const readArticlesFromFile = () => {
  const data = fs.readFileSync(articlesFilePath, 'utf-8')
  return JSON.parse(data)
}

const writeArticlesToFile = (articles) => {
  fs.writeFileSync(articlesFilePath, JSON.stringify(articles, null, 2))
}

const addArticle = (article) => {
  const articles = readArticlesFromFile()
  articles.push(article)
  writeArticlesToFile(articles)
}

const updateArticle = (articleId, updatedArticle) => {
  const articles = readArticlesFromFile()
  const index = articles.findIndex((article) => article.id === articleId)
  if (index !== -1) {
    articles[index] = { ...articles[index], ...updatedArticle }
    writeArticlesToFile(articles)
    return true
  }
  return false
}

const deleteArticle = (articleId) => {
  const articles = readArticlesFromFile()
  const index = articles.findIndex((article) => article.id === articleId)
  if (index !== -1) {
    const deletedArticle = articles.splice(index, 1)[0]
    writeArticlesToFile(articles)
    return deletedArticle
  }
  return null
}

export { readArticlesFromFile, addArticle, updateArticle, deleteArticle }
