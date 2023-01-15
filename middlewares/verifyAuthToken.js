const jwt = require('jsonwebtoken')
const verifyIsLoggedIn = (req, res, next) => {
    
    try {
        const {authorization} = req.headers
        if(!authorization) {
           return res.json({error:"Ro'yhatdan o'tilmagan"}) 
        }
        try {
           const decoded = jwt.verify(authorization, process.env.JWT_SECRET_KEY)
            req.user = decoded
            next()
        } catch (err) {
          return res.json({error:"Ruxsat etilmagan"})  
        }

    } catch(err) {
        next(err)
    }
}

const verifyIsAllowed = (req, res, next) => {
    
    if(req.user && req.user.isAllowed) {
        next()
    } else {
        return res.json({error:"Ruxsat etilmagan"});
    }
}
const verifyIsAdmin = (req, res, next) => {
    
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        return res.json({error:"Ruxsat etilmagan"})  
    }
}
const verifyIsTeacher = (req, res, next) => {
    
    if(req.user && req.user.isTeacher != 'false') {
        next()
    } else {
        return res.json({error:"Ruxsat etilmagan"})  
    }
}

module.exports = { verifyIsLoggedIn, verifyIsAdmin, verifyIsAllowed, verifyIsTeacher }
