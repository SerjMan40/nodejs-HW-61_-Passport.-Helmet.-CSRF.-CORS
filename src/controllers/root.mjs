const getRootHendler = (req, res) => {
 const user = req.user || null
  res.render('root.ejs', { user })
}

export default getRootHendler
