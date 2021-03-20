const jwt=require('jsonwebtoken')
const User=require('../models/user')
const expressJwt=require('express-jwt')
require('dotenv').config()

const signup=async(req, res)=>{

    const userExists= await User.findOne({email:req.body.email})

    if (userExists) {
        return res.status(403).json({error:error})
    }
    const user= await new User(req.body)
    await user.save()
    res.status(200).json({message:'Sign up was successful ! You can login now'})
}


const signin=(req, res)=>{

    const { email, password}=req.body

    User.findOne({email}, (err, user)=>{

        if (err || !user){
            return res.status(401).json({error:'User with that email does not exists'})
        }
        if (!user.authenticate(password)) {

            return res.status(401).json({error:'Email or password does not match '})
        }

        const token=jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        res.cookie('t', token, {expire:new Date() + 9999})

        const {_id, name, email}=user
        return res.json({token, user:{_id, email, name}})

    })


    
}


const sign_out=(req, res)=>{

    res.clearCookie('t')
    return res.json({message:'You are signed out'})
}

const requireSignin=expressJwt({

    secret:process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty:'auth'
})



module.exports={
    signup,
    signin, 
    sign_out,
    requireSignin
}