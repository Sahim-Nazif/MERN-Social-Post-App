import React, {useState, useEffect} from 'react'
import { Redirect, Link } from 'react-router-dom'
import {isAuthenticated} from '../auth/index'
import {read} from '../user/apiUser'
import DefaultProfile from '../images/Avatar.png'
import DeleteUser from '../user/DeleteUser'
import FollowProfileButton from './FollowProfileButton'
import ProfileTabs from './ProfileTabs'

const Profile = ({match}) => {

    const [values, setValues]=useState({

        user:{following:[], followers:[]},
        following:false,
        redirectToSignin:false,
        error:''


    })

 const checkFollow=user=>{
     const jwt=isAuthenticated()
     const match=user.followers.find(follower =>{

        return follower._id===jwt.user._id
     })

     return match
 }

 const clickFollowButton=callApi=>{
    const userId=isAuthenticated().user._id
    const token=isAuthenticated().token

    callApi(userId,token, values.user._id)
        .then(data=>{
            if (data.error) {
                setValues({error:data.error})
            } else{
                setValues({user:data, following: !values.following})
            }
        })
 }

    const {token}=isAuthenticated()
    const init=userId=>{
        
        read(userId,token).then(data=>{

            if (data.error) {
                setValues({redirectToSignin:true})
            } else{
                let following=checkFollow(data)
                setValues({user:data, following})
                         
            }
        })

    }



    useEffect(() => {

        init(match.params.userId);
        returnRedirect()
    },[])

    const {redirectToSignin,user}=values
 
    const returnRedirect=()=>{
      
        if (redirectToSignin) {
            return <Redirect to='/signin'/>
      
    }
}
    return ( 

       
        <div className='container'>
             <h2 className='mt-5 mb-5'>Profile</h2>
            <div className='row'>
            <div className='col-md-6'>
           
            <img src={DefaultProfile} className="card-img-top" 
            style={{width:'100%', height:'15vw', objectFit:'cover'}}/>
       
          
            </div>
            <div className='col-md-6 mt-2'>
            <div className="lead ">
           <p>Hi {user.name}</p>
            <p>Email: {user.email}</p>
            <p>{`Joined ${new Date(user.created).toDateString()}`}</p>
           </div>
                {isAuthenticated().user && isAuthenticated().user._id===user._id ?(
                    <div className='d-inline-block '>
                        <Link className='btn btn-raised btn-success mr-5' to={`/user/update/${user._id}`}>
                            Update Profile
                        </Link>
                        <DeleteUser userId={user._id}/>
                        </div>
                ):(<FollowProfileButton following={values.following}
                                        onButtonClick={clickFollowButton}/>)}

            </div>
            </div>

            <div className='row'>
                <div className='col md-12 mt-5 mb-5'>
                <p className='lead'>{user.about}</p>
                
                <hr/>
                                        <ProfileTabs
                                         followers={user.followers}
                                          following={user.following}/>
                </div>
            </div>
        </div>
     );
}
 
export default Profile;