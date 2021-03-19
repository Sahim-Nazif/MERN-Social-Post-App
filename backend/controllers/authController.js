const User=require('../models/user')


const signup=async(req, res)=>{

    const userExists= await User.findOne({email:req.body.email})

    if (userExists) {
        return res.status(403).json({error:'This email already exists'})
    }
    const user= await new User(req.body)
    await user.save()
    res.status(200).json({message:'Sign up was successful ! You can login now'})
}


module.exports={
    signup
}