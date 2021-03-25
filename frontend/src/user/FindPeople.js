import React, { useState, useEffect } from 'react'
import { findPeople,follow } from '../user/apiUser'
import { Link } from 'react-router-dom'
import DefaultProfile from '../images/Avatar.png'
import { isAuthenticated } from '../auth/index'

const FindPeople = () => {

    const [values, setValues] = useState({
        users: [],
        error:'',
        open:false
    })


    const { users } = values
 
    
    const init = () => {
        const userId=isAuthenticated().user._id
        const token=isAuthenticated().token
        findPeople(userId, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setValues({ users: data })
                console.log(data)
            }
        })
    }

    const clickFollow=(user, index)=>{

          const userId=isAuthenticated().user._id
          const token=isAuthenticated().token

          follow(userId, token,user._id)
            .then(data=>{
                if (data.error) {
                    setValues({error:data.error})
                }
                else{
                    let toFollow=values.users

                    toFollow.splice(index,1)
                    setValues({users:toFollow, open:true, followMessage:`Following ${user.name}`})
                }
            })
          
        }



    useEffect(() => {
        init();
    }, [])

    const {open, followMessage}= values
    const displayUsers = () => (

        <div className='row'>
            {
                users.map((user, index) => (
                    <div className="card col-md-3 mr-6 mt-2" key={index}>
                        <img src={DefaultProfile} className="card-img-top"
                            style={{ width: '100%', height: '15vw', objectFit: 'cover' }} />
                        <div className="card-body">
                            <h5 className="card-title">{user.name}</h5>
                            <p className="card-text"> {user.email}</p>


                            {isAuthenticated() && (
                                <Link to={`/user/${user._id}`} className="btn btn-raised btn-info btn-sm">View Profile</Link>

                            )}
                             
                            <button onClick={()=>clickFollow(user, index)} className='btn btn-raised btn-success float-right btn-sm'>
                                Follow
                            </button>
                        </div>
                    </div>

                ))}

        </div>

    )
    return (
    
        <div className='container'>
            <h2 className='mt-5 mb-5'>Find People</h2>
            <p>Here is a list of people suggested to follow</p>

          
              {open && (

                <div className='alert alert-success'>{open && <p>{followMessage}</p>}</div> 
              )}
       
            {displayUsers()}
        </div>
    );
}

export default FindPeople;