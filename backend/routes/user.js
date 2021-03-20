const express=require('express')
const router=express.Router()

const {userById,all_users}=require('../controllers/userController')



router.get('/users', all_users)


router.param('userId', userById)
module.exports=router;
