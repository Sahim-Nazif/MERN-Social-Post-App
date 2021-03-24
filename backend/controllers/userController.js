const User=require('../models/user')
const _ = require('lodash')

const userById=async (req, res, next, id)=>{


    await User.findById(id)
        .populate('following', '_id name')
        .populate('followers', '_id name')
        .exec((err, user)=>{
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
        res.json(users)
    }).select('name email created')
}


//get signle user
const get_user=async (req, res)=>{

    req.profile.hashed_password=undefined
    req.profile.salt=undefined
    return await res.json(req.profile)
}

//update user
const update_user=async(req, res, next)=>{

    let user=req.profile
    user=_.extend(user, req.body)

    user.updated=Date.now()
    await user.save((err)=>{
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

        return res.status(200).json({message:'User deleted successfully'})
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

// follow unfollow

const addFollowing=(req, res, next)=>{

    User.findByIdAndUpdate(req.body.userId, {$push:{following:req.body.followId}},(err, result)=>{
        if (err){
            return res.status(400).json({error:err})
        }
        next()
    })
}



const addFollower=(req, res)=>{

    User.findByIdAndUpdate(req.body.followId, {$push:{followers:req.body.userId}},
        {new:true}

    )
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .exec((err, result)=>{
        if (err) {
            return res.status(400).json({error:err})
        }

        result.hashed_password=undefined,
        result.salt=undefined
        res.json(result)
    })
}


//remove follow unfollow

const removeFollowing=(req, res, next)=>{

    User.findByIdAndUpdate(req.body.userId, {$pull:{following:req.body.unfollowId}},(err, result)=>{
        if (err){
            return res.status(400).json({error:err})
        }
        next()
    })
}



const removeFollower=(req, res)=>{

    User.findByIdAndUpdate(req.body.unfollowId, {$pull:{followers:req.body.userId}},
        {new:true}

    )
    .populate('following', '_id name')
    .populate('followers', '_id name')
    .exec((err, result)=>{
        if (err) {
            return res.status(400).json({error:err})
        }

        result.hashed_password=undefined,
        result.salt=undefined
        res.json(result)
    })
}


//who to follow 

const findPeople=(req, res)=>{

    let following=req.profile.following
    following.push(req.profile._id)
    User.find({_id:{$nin:following}},(err, users)=>{

        if (err){
            return res.status(400).json({error:err})
        }
        res.json(users)
    }).select('name')

}

module.exports={

    userById,
    hasAuthorization,
    all_users,
    get_user,
    update_user,
    delete_user,
    addFollowing,
    addFollower,
    removeFollowing,
    removeFollower,
    findPeople
}