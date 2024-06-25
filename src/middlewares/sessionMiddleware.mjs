import session from 'express-session';

const sessionMiddleware = session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
});

export default sessionMiddleware