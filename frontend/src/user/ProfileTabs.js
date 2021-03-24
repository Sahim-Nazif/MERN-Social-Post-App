import React from 'react'
import {Link} from 'react-router-dom'


const ProfileTabs = (props) =>  (

        <>
        <div className='row'>
            <div className='col-md-4'>
                <h5 className='text-primary'>Followers</h5>
                <hr/>
                {props.followers.map((person, index)=>{
                    return (
                    <div key={index}>
                        <div className='row'>
                            <div>
                              <h5>{person.name}</h5>
                            </div>
                           <p>{person.about}</p>
                         </div>   
                     </div>  
                     ) 
                })}
            </div>

            <div className='col-md-4'>
                <h5 className='text-primary'>Following</h5>
                <hr/>
                {props.following.map((person, index)=>{
                    return (
                    <div key={index}>
                        <div className='row'>
                            <div>
                              <h5>{person.name}</h5>
                            </div>
                           <p>{person.about}</p>
                         </div>   
                     </div>  
                     ) 
                })}
            </div>
            <div className='col-md-4'>
                <h5 className='text-primary'>Posts</h5>
                <hr/>
            </div>
            
        </div>
        </>
      );

 
export default ProfileTabs;