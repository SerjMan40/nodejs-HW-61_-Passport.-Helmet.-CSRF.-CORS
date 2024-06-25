import bcrypt from 'bcrypt';
import { addUser, readUsersFromFile } from '../data/usersData.mjs';

export const getRegisterHendler = (req, res) => {
  res.render('register.ejs');
};

export const postRegisterHandler = async (req, res) => {
  const { userName, userEmail, password } = req.body;
  try {
    const users = await readUsersFromFile();
    const existingUser = users.find((u) => u.userEmail === userEmail);
    if (existingUser) {
      return res.status(400).render('isRegister.ejs', { message: 'Email already exists', user: req.user });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      userName,
      userEmail,
      password: hashedPassword
    };
     addUser(newUser);
    req.login(newUser, (err) => {
      if (err) {
        return res.status(500).send('Internal Server Error');
      }
      return res.render('isRegister', {message:'User registered successfully'});
    });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).send('Internal Server Error');
  }
};