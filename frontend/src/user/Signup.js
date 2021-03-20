import React,{useState} from 'react'



const Signup = () => {

    const [name, setname]=useState('')
    const [email, setEmail]=useState('')
    const [password, ]=useState('')
    const [error, setError]=useState(false)



    
    return (
        <div className='container'>

            <h2 className='mt-5 mb-5'>Signup</h2>
            <form >
                <div className='form-group'>
                    <label className='text-muted'>Name</label>
                    <input type='text' className='form-control' />

                </div> 
                <div className='form-group'>
                    <label className='text-muted'>Email</label>
                    <input type='text' className='form-control' />
                    
                </div>
                <div className='form-group'>
                    <label className='text-muted'>Password</label>
                    <input type='password' className='form-control' />
                    
                </div>
                <button className='btn btn-raised btn-dark'>Signup</button>
            </form>
        </div>
      );
}
 
export default Signup;