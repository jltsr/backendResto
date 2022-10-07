const jwt = require('jsonwebtoken')
const passport = require('passport')
const Strategy = require('passport-local').Strategy

import bcrypt from 'bcrypt';

const jwtSecret = process.env.JWT_SECRET || 'myjwt'
const adminPassword = process.env.ADMIN_PASSWORD || 'secret'
const jwtOpts = { algorithm: 'HS256', expiresIn: '30d' }
import models from '../models/init-models'

//passport.use(adminStrategy())

passport.use(new Strategy(
    async function (user_name, password, cb) {
        try {
            const result = await models.users.findOne({
                include:[
                    {model:models.roles, as:'role_id_roles'}
                ],  
                 where: {
                     username: user_name,
                 }
            });
            if(result == null) return cb(null, { message: 'Incorrect username or email.' }); 
            const { username, user_id, pass,role_id_roles:[{role_name}]} = result.dataValues;
            
            const compare = await bcrypt.compare(password, pass);
            if(!compare) return cb(null, { message: 'Incorrect password.' }); 
            if (compare) return cb(null, { user_name: username, userId: user_id, userRoles: role_name, message: 'Login success' }); 
        } catch (error) {
            return cb(null, {message:error.message})
        }

        cb(null, false)
    }
))

const authenticate = passport.authenticate('local', { session: false })

module.exports = {
    authenticate,
    login: login,
    ensureAdmin: ensureAdmin,
    ensureCustomer: ensureCustomer,
    refreshToken : refreshToken,
    logout: logout,
    verify: verifyToken
}

async function logout(req, res) {
    res.clearCookie('jwt')
    return res.status(200).json({ message: "Logout success" });
}

async function verifyToken(req, res,next) {
    const token = req.cookies.jwt
    if(!token) return res.status(404).json({ message: "No token provided" });
    try {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if(err) return res.status(404).json({ message: "Invalid token" });
            req.user = decoded.user_name
            next()
        })
    } catch (error) {
        return res.status(404).json({ message: "Token is not valid" });
    }
}


async function login(req, res, next) {
    if(req.user.user_name == null){ 
        res.status(404).json({ success: false, token: null, message: req.user.message });
    } else{ 
        const token = await sign({ user_name: req.user.user_name, roleType: req.user.userRoles });
        const { userId, user_name,  userRoles} = req.user;

        res.cookie('jwt', token, { httpOnly: true })
        res.status(200).json({ profile: { userId, user_name, userRoles }, success: true, token: token })
    }
}


async function sign(payload) {
    const token = await jwt.sign(payload, jwtSecret, jwtOpts)
    return token
}

async function ensureCustomer(req, res, next) {
    const jwtString = req.headers.authorization || req.cookies.jwt
    const payload = await verify(jwtString)
    if (payload.user_name) {
        req.user = payload;
        if (req.user.userRoles === 'customer') req.isCusctomer = true;
        return next();
    }

    const err = new Error('Unauthorized');
    err.statusCode = 404;
    next(err);
}

async function ensureAdmin(req, res, next) {
    const jwtString = req.headers.authorization || req.cookies.jwt
    const payload = await verify(jwtString)
    if (payload.user_name) {
        req.user = payload;
        if (req.user.userRoles === 'admin') req.isAdmin = true;
        return next();
    }
    const err = new Error('Unauthorized')
    err.statusCode = 404
    next(err)
}

async function verify(jwtString = '') {
    jwtString = jwtString.replace(/^Bearer /i, '')
    try {
        const payload = await jwt.verify(jwtString, jwtSecret)
        return payload
    } catch (err) {
        err.statusCode = 404
        throw err
    }
}

async function refreshToken(req, res) {
    try{
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) return res.status(404).json({ message: "Refresh Token is required!" });
    }catch(err){
        console.log(log)
    }
}
