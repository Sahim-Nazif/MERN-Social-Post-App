const Post = require("../models/post")
const formidable = require('formidable')
const fs = require('fs')




const getPosts = (req, res) => {

    const post = Post.find()
        .populate('postedBy', '_id name')
        .select('_id title body')
        .then(posts => {

            res.json({ posts })
        })
        .catch(err => {

            res.status(400).json({ error: 'Posts available now!' })
        })


}



const createPost = async (req, res, next) => {

    const form = new formidable.IncomingForm()

    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {

        if (err) {

            return res.status(400).json({ error: 'Image could not be uploaded' })
        }
        const post = new Post(fields)
        req.profile.hashed_password = undefined
        req.profile.salt = undefined
        post.postedBy = req.profile
        if (files.photo) {

            post.photo.data = fs.readFileSync(files.photo.path)
            post.photo.contentType = file.photo.type
        }
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({ error: err })
            }
            res.json(result)
        })
    })


}


// get user's posts

const posts_by_user=(req, res)=>{

    Post.find({postedBy:req.profile._id})
        .populate('postedBy','_id name')
        .sort('_created')
        .exec((err, posts)=>{
            if (err){
                return res.status(400).json({error:'There are no posts for this user'})
            }
            res.json(posts)
        })
}


//get post by id

const post_by_id=(req, res, next, id)=>{

    Post.findById(id)
        .populate('postedBy', '_id name')
        .exec((err, post)=>{
            if (err || !post){
                return res.status(400).json({error:err})
            }

            req.post=post
            next()
        })
}

module.exports = {

    getPosts,
    createPost,
    posts_by_user,
    post_by_id
}