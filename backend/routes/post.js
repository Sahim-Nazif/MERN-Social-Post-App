const express = require('express')
const router=express.Router()
const {getPosts,createPost}= require('../controllers/postController')
const validator=require('../validator')
const {requireSignin}=require('../controllers/authController')
const {userById}=require('../controllers/userController')



router.get('/posts', getPosts)

router.post('/create', requireSignin, validator.createPostValidator, createPost)
router.param('userId', userById)




module.exports=router
