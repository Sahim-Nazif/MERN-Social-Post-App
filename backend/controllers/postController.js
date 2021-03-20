const Post = require("../models/post")
const formidable=require('formidable')
const fs=require('fs')




const createPost = (req, res) => {

    const post = new Post(req.body)

    post.save()
        .then(result => {
            res.status(200).json({ post: result });
        })


}



const getPosts = async (req, res,next) => {

    const form=new formidable.IncomingForm()

    form.keepExtensions=true
    form.parse(req, (err, fields,files)=>{

        if (err){

            return res.status(400).json({error:'Image could not be uploaded'})
        }
        const post= new Post(fields)
        post.postedBy=req.profile
        if (files.photo){

            post.photo.data=fs.readFileSync(files.photo.path)
            post.photo.contentType=file.photo.type
        }
        post.save((err, result)=>{
            if (err){
                return res.status(400).json({error:err})
            }
            res.json(result)
        })
    })

   
}

module.exports = {

    getPosts,
    createPost
}