const express = require('express')
const router=express.Router()
const {getPosts,createPost}= require('../controllers/postController')


router.get('/posts', getPosts)

router.post('/create', createPost)

module.exports=router
