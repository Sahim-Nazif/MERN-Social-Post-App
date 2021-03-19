const express = require('express')
const router=express.Router()
const {getPosts,createPost}= require('../controllers/postController')
const validator=require('../validator')


router.get('/posts', getPosts)

router.post('/create', validator.createPostValidator, createPost)

module.exports=router
