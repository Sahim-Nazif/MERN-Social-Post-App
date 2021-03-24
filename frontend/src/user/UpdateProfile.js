import React, {useState,useEffect} from 'react'
import {read, update, updateUser } from './apiUser'
import {isAuthenticated} from '../auth/index'
import {Redirect} from 'react-router-dom'

const UpdateProfile = ({match}) => {
    const [values, setValues]=useState({

        name:'',
       email:'', 
       about:'', 
        error:'',
        success:false
    })

    const {name, email,about,  error, success}=values

    const {token}=isAuthenticated()

    const init=userId=>{
        
        read(userId,token).then(data=>{

            if (data.error) {
                setValues({...values, error:true})
            } else{
                setValues({...values,
                            name:data.name,
                      
                            email:data.email,
                            about:data.about

                            })
                         
            }
        })

    }

    useEffect(()=>{
        init(match.params.userId);
    },[])

    const handleChange=name=>e=>{

       setValues({...values,error:false,[name]:e.target.value})

    }

     const clickSubmit=event=>{

        event.preventDefault()
        update(match.params.userId,token,{name, email,about})
                .then(data=>{
                    if (data.error) {
                        console.log(error)
                    } else{
                        updateUser(data, ()=>{
                            setValues({...values, name:data.name,
                              about:data.about,
                              email:data.email,
                            success:true })
                        })
                    }
                })
     }

     const redirectUser=(success)=>{
         if (success) {
            return  <Redirect to='/users'/>
         }

     }

    const profileUpdate=(name, email,about)=>(
        
        <div className='container  col-md-7'>

            <h2 className='mt-5 mb-5'>Update Profile </h2>
            <form >
            
                <div className='form-group'>
                    <label className='text-muted'>Name</label>
                    <input onChange={handleChange('name')} type='text' className='form-control' value={name} />

                </div>
                <div className='form-group'>
                    <label className='text-muted'>Email</label>
                    <input onChange={handleChange('email')} type='email' className='form-control' value={email} />

                </div>
                <div className='form-group'>
                    <label className='text-muted'>About</label>
                    <input onChange={handleChange('about')} type='email' className='form-control' value={about} />

                </div>
                <button onClick={clickSubmit} className='btn btn-raised btn-primary'>Update</button>
            </form>
        </div>
        
        )
        return (  

         

                <div className="col-md-8 offset-md-2">
            {profileUpdate(name, email)}
            {redirectUser(success)}

            </div>
           
        )
}
 
export default UpdateProfile;