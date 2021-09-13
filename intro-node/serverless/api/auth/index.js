//Middleware es una funcion en node que va a recibir res y req y next, y al llamar a next llamara al siguiente middleware

const jwt  = require('jsonwebtoken')
const Users = require('../models/Users')

const isAuthenticated =  (req, res, next) =>{
    const token= req.headers.authorization
    if(!token){
        return res.sendStatus(403)
    }
    jwt.verify(token, 'Mi secreto', (err, decoded)=>{
        const {_id}=decoded
        Users.findOne({_id}).exec()
        .then(user => {
            req.user = user
            next()
        })
    })
}
const hasRoles = roles => (req, res, next) => {
    if(roles.indexOf(req.user.role) > -1)
    {
        return next()
    }
    res.sendStatus(403)
}
module.exports = {
    isAuthenticated, 
    hasRoles, 
}