import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { readUsersFromFile } from '../data/usersData.mjs';
import bcrypt from 'bcrypt';

passport.use(
  new LocalStrategy({ usernameField: 'userEmail' }, async (userEmail, password, done) => {
    try {
      const users = await readUsersFromFile();
      const user = users.find((u) => u.userEmail === userEmail);
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const users = await readUsersFromFile();
    const user = users.find((u) => u.id === id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;