const express = require('express')
const router=express.Router()
const {
        getPosts,
        createPost,
        posts_by_user,
         post_by_id,
         isPoster, 
         deletePost,
        update_post,
        single_post}= require('../controllers/postController')
const validator=require('../validator')
const {requireSignin}=require('../controllers/authController')
const {userById}=require('../controllers/userController')





router.post('/create/:userId', requireSignin, createPost, validator.createPostValidator)
router.get('/posts', getPosts)
router.get('/singlepost/:postId', single_post)
router.get('/byuser/:userId', posts_by_user)
router.put('/update/:postId', requireSignin, isPoster,update_post)
router.delete('/delete/:postId', requireSignin, isPoster,  deletePost )



router.param('userId', userById)
router.param('postId', post_by_id)



module.exports=router
