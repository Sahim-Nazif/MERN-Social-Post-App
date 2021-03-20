const User=require('../models/user')


const userById=(req, res, next, id)=>{


    User.findById(id).exec((err, user)=>{
        if (err|| !user) {
            return res.status(404).json({error:'User not found'})
        }
        req.profile=user
        next()
    })
}


const all_users=(req, res)=>{

    User.find((err, users)=>{

        if (err) {
            return res.status(400).json({error:err})
        }
        res.json({users})
    })
}

const hasAuthorization=(req,res, next)=>{
    const authorized=req.profile && req.auth && req.profile._id===req.auth._id

    if (!authorized) {
        return res.status(403).json({
            error:'User is not authorized to perform this action'
        })
    }


}




module.exports={

    userById,
    hasAuthorization,
    all_users
}