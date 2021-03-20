const User=require('../models/user')
const _ = require('lodash')

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
    }).select('name email created')
}


//get signle user
const get_user=(req, res)=>{

    req.profile.hashed_password=undefined
    req.profile.salt=undefined
    return res.json(req.profile)
}

//update user
const update_user=(req, res, next)=>{

    let user=req.profile
    user=_.extend(user, req.body)

    user.updated=Date.now()
    user.save((err)=>{
        if (err) {
            return res.status(400).json({error:'You are not authorized to perform this action'})
        }

        req.hashed_password=undefined
        req.salt=undefined
        res.json({user})
    })

}

//delete user

const delete_user=(req, res)=>{

    const user=req.profile
    user.remove((err, user)=>{
        if (err) {
            return res.status(400).json({error:err})
        }

        return res.status(200).json({error:'User deleted successfully'})
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
    all_users,
    get_user,
    update_user,
    delete_user
}