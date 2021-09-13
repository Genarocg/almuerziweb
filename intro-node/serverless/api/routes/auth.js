const express= require('express')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const Users = require('../models/Users')
const {isAuthenticated} = require('../auth')
const router = express.Router()

const signToken = (_id)=>{
    return jwt.sign({_id}, 'Mi secreto', {expiresIn: 60 * 60 * 24 * 365})
}
router.post ('/register',(req, res)=>{
    const {email, password } = req.body
    crypto.randomBytes(16, (err, salt) =>{
        const newSalt = salt.toString('base64')
        crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key)=>{
            const encriptedPassword=key.toString('base64')
            Users.findOne({email}).exec()
            .then(user =>{
                if(user){
                return res.send('Usuario ya existente')
            }
            Users.create({
                email, 
                password: encriptedPassword,
                salt: newSalt
            }).then(()=>{
                res.send('usuario creado con exito')
            })
            })
        })
    })
})


router.post ('/login',(req, res)=>{
    const {email, password } = req.body
    Users.findOne({email}).exec()
    .then( user =>{
        if (!user){
            return res.send('Usuario y/o contraseña incorrecta')
        }
        crypto.pbkdf2(password, user.salt, 10000, 64, 'sha1', (err, key)=>{
        const encriptedPassword = key.toString('base64')
        if(user.password === encriptedPassword)
        {
            const token = signToken(user._id)
            return res.send({token})
        }
        return res.send('Usuario y/o contraseña incorrecto')
    })
        
    })
})
router.get('/me', isAuthenticated, (req, res) =>
{
    // const { _id, email } = req.user
    // res.send({ _id, email })
    res.send(req.user)
})
 module.exports = router
 
