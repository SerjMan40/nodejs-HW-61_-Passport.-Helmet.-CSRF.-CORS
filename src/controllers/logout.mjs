 const logoutHandler = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send('Internal Server Error');
    }
    res.redirect('/');
  });
};

export default logoutHandler