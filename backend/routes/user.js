const express=require('express')
const router=express.Router()
const {requireSignin}=require('../controllers/authController')
const {userById,all_users, get_user,update_user,delete_user}=require('../controllers/userController')



router.get('/users', all_users)
router.get('/:userId',requireSignin, get_user)
router.put('/update/:userId',requireSignin, update_user)
router.delete('/delete/:userId',requireSignin, delete_user)

router.param('userId', userById)
module.exports=router;
