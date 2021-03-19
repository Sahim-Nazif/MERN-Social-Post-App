const express=require('express')
const router=express.Router()
const {signup}=require('../controllers/authController')
const userSignupValidator=require('../validator')



router.post('/signup', userSignupValidator.userSignupValidator, signup)


module.exports=router;
