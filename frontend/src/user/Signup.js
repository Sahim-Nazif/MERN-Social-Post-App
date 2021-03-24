import React, { useState } from 'react'
import { signup } from '../auth/index'
import { Link } from 'react-router-dom'



const Signup = () => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })


    const { name, email, password, error, success } = values
    const handleChange = name => event => {

        setValues({ ...values, error: false, [name]: event.target.value })
    }


    const clickSubmit = (event) => {
        event.preventDefault()

        setValues({ ...values, error: false })
        signup({ name, email, password })
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error, success: false })
                }
                else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        error: '',
                        success: true
                    })
                }

            })

    }


    const SignupForm = () => (
        <div className='container  col-md-5'>

            <h2 className='mt-5 mb-5'>Signup</h2>
            <form >
                <div className='form-group'>
                    <label className='text-muted'>Name</label>
                    <input onChange={handleChange('name')} type='text' className='form-control' value={name} />

                </div>
                <div className='form-group'>
                    <label className='text-muted'>Email</label>
                    <input onChange={handleChange('email')} type='text' className='form-control' value={email} />

                </div>
                <div className='form-group'>
                    <label className='text-muted'>Password</label>
                    <input onChange={handleChange('password')} type='password' className='form-control' value={password} />

                </div>
                <button onClick={clickSubmit} className='btn btn-raised btn-primary'>Sign up</button>
            </form>
        </div>
    );

    const showError = () => (
        <div className='container col-md-4'>
            <div className='alert alert-danger alert-dismissible ' style={{ display: error ? '' : 'none' }}>
                {error}

            </div>
        </div>

    )
    const showSuccess = () => (
        <div className='container col-md-4'>
        <div className='alert alert-info alert-dismissible ' style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to='/signin'>Signin</Link>
        </div>
        </div>
    )

    return (
        <div>
            { SignupForm()}
            {showError()}
            {showSuccess()}
        </div>


    )

}

export default Signup;