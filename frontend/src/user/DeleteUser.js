import React, {useState} from 'react'
import { Redirect } from "react-router-dom";
import {isAuthenticated, signout} from '../auth/index'
import {remove} from './apiUser'





const DeleteUser = (props) => {

const[state, setState]=useState({
    redirect:false
})
    
const {redirect}= state

 const deleteAccount=()=>{
        const token = isAuthenticated().token;
        const userId=props.userId;
        remove(userId, token)
            .then(data=>{
                if (data.error){
                    console.log(data.error)
                }else {
                    //signout and redirect
                    signout(()=>console.log('user is deleted'))
                    setState({redirect:true})
                 

                }
            })
    }
const renderRedirect=(redirect)=>{

    if (redirect) {
       return <Redirect to='/' />
    }
    
}



    const deleteConfirm=()=>{

        let answer=window.confirm('Are you sure you want to delete your account?')
        if (answer) {
            deleteAccount()
        

        }
    }
    return ( 

            <>
 
            <button onClick={deleteConfirm} className='btn btn-raised btn-danger'>Delete Profile</button>
         
            <div>
            {renderRedirect(redirect)}
            </div>
           </>
  
     );
}
 
export default DeleteUser;