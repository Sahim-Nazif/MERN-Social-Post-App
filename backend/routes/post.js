const express = require('express')
const router=express.Router()
const {getPosts,createPost, posts_by_user, posts_by_id,isPoster, deletePost}= require('../controllers/postController')
const validator=require('../validator')
const {requireSignin}=require('../controllers/authController')
const {userById}=require('../controllers/userController')





router.post('/create/:userId', requireSignin, createPost, validator.createPostValidator)
router.get('/posts', getPosts)
router.get('/byuser/:userId', posts_by_user)
router.delete('/delete/:postId', requireSignin, isPoster, deletePost )

router.param('userId', userById)
router.param('postId', posts_by_id)



module.exports=router
