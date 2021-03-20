const express=require('express')
const router=express.Router()
const {signup, signin, sign_out}=require('../controllers/authController')
const userSignupValidator=require('../validator')
const {userById}=require('../controllers/userController')



router.post('/signup', userSignupValidator.userSignupValidator, signup)
router.post('/signin', signin)
router.get('/signout', sign_out)

router.param('userId', userById)
module.exports=router;
