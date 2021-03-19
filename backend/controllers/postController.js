const Post = require("../models/post")


const getPosts = async (req, res) => {

    const posts = await Post.find().select('_id title body')
        .then(posts => {
            res.json({posts})
        })
        .catch(err=>{
            res.status(400).json({error:err})
        })
}


const createPost = (req, res) => {

    const post = new Post(req.body)

    post.save()
        .then(result => {
            res.status(200).json({ post: result });
        })


}

module.exports = {

    getPosts,
    createPost
}