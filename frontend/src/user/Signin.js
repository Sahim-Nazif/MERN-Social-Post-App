import React, {useState} from 'react'
import {signin, authenticate } from "../auth";
import { Redirect } from "react-router-dom";


const Signin = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    });
    

    const { email, password, loading, error, redirectToReferrer } = values;

    const handleChange = name=>event=>{

        setValues({ ...values, error: false, [name]: event.target.value });
    }


 const clickSubmit=event=>{
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password }).then(data => {
        if (data.error) {
            setValues({ ...values, error: data.error, loading: false });
        } else {
            authenticate(data, () => {
                setValues({
                    ...values,
                    redirectToReferrer: true
                });
            });
        }
    });

 }

    const SigninForm = () => (
        <div className='container  col-md-5'>

            <h2 className='mt-5 mb-5'>Sign in </h2>
            <form >
            
                <div className='form-group'>
                    <label className='text-muted'>Email</label>
                    <input onChange={handleChange('email')} type='text' className='form-control' value={email} />

                </div>
                <div className='form-group'>
                    <label className='text-muted'>Password</label>
                    <input onChange={handleChange('password')} type='password' className='form-control' value={password} />

                </div>
                <button onClick={clickSubmit} className='btn btn-raised btn-primary'>Sign in</button>
            </form>
        </div>
    );

    const showError = () => (
        <div className='container col-md-4'>
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
        </div>
    );

    const showLoading = () =>
    
        loading && (
            <div className='container col-md-4'>
            <div className="alert alert-info">
                <h3>Loading...</h3>
            </div>
            </div>
        );

  const returnRedirect=()=>{
      if (redirectToReferrer) {
          return <Redirect to='/'/>
      } else{
          return <Redirect to='/signin'/>
      }
  }

    return ( 
        <div>

            {SigninForm()}
            {showError()}
            {showLoading()}
            { returnRedirect()}
        </div>
     );
}
 
export default Signin;
