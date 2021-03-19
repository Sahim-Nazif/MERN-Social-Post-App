const Post=require("../models/post")


const getPosts=(req, res)=>{

    res.send('Hello from controller')
}


const createPost=(req, res)=>{

    const post=new Post(req.body)

    post.save((err, result)=>{

        if (err){
            res.status(400).json({error:'Could not create post'})
        }
        res.status(200).json({post:result});
    })

   
}

module.exports={

    getPosts,
    createPost
}