import passport from 'passport';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/env.js';

export const loginCheck = (req, reply, done) => {
    passport.authenticate('local', (err, user, info) => {
        if (!user) req.error = info?.error || err?.error || 'Authentication failed';
        else req.user = user;
        done();
    })(req, reply, done);
};

// export const authenticateAuthToken = passport.authenticate('jwt', {
//     session: false
// });
export const authenticateAuthToken = (req, res, done) => {
    passport.authenticate('jwt', {
        session: false
    }, (err, user, info) => {
        // console.log({ err, info })
        if (!user) req.error = info?.error || info?.message || err?.error || 'Authentication failed';
        else req.user = user;
        done();
    })(req, res, done);
}

export const LocalLoginStrategy = new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email });
    if (!user) return done(null, false, {
        error: 'Invalid username or password'
    });

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) return done(null, false, {
        error: 'Invalid username or password'
    });

    return done(null, user);
})

export const generateToken = ({ _id, name, email }) => {
    return {
        userId: _id,
        token: jwt.sign({ _id, name, email }, JWT_SECRET, {
            expiresIn: '1d'
        })
    };
}

export const JWTAuthStrategy = new JWTStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
}, async ({ _id }, done) => {
    try {
        const user = await User.findById(_id);
        if (!user) return done(null, false);

        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
});