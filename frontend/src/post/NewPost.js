import React, {useState,useEffect} from 'react'
import {create } from './apiPost'
import {isAuthenticated} from '../auth/index'
import {Redirect} from 'react-router-dom'


const NewPost = () => {


    const [values, setValues] = useState({

        title: '',
        body: '',
        photo: '',
        user: {},
        loading: false,
        error: '',
        success: '',
        formData: ''

    });

    
   
    const {
        title,
        body,
        photo,
    
        loading,
        error,
        success,
        formData
    } = values;
    
    //load categories and set form data
    const init=()=>{
       
                setValues({...values,  formData:new FormData()})
            }
        
    
    useEffect(() => {

        init()

    }, [])

  
    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        const userId=isAuthenticated().user._id
        const token=isAuthenticated().token
        create(userId,token,formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    title: '',
                    body: '',
                    photo: '',
                    success: true,
                    loading: false,
                    
                });
            }
        });
    };

    const redirectUser=(success)=>{
        if (success) {
           return  <Redirect to='/'/>
        }

    }
    const newPostForm = (title, body) => (

        
        <div className='container  col-md-7'>

            <h2 className='mt-5 mb-5'>Create New Post </h2>
            <form >
            
                <div className='form-group'>
                    <label className='text-muted'>Title</label>
                    <input onChange={handleChange('title')} type='text' className='form-control' value={title} />

                </div>
                <div className='form-group'>
                    <label className='text-muted'>Body</label>
                    <textarea onChange={handleChange('body')} type='textarea' className='form-control' value={body} />

                </div>
       
                <button onClick={clickSubmit} className='btn btn-raised btn-primary'>Create Post</button>
            </form>
        </div>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

 

    const showLoading = () => (
       
        loading && (<div className='alert alert-success'><h3>Loading...</h3></div>)
    );
    return (

        

            <div className='row'>

                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                   
                    {showError()}
                    {newPostForm(title, body)}
                    {redirectUser(success)}
                </div>
            </div>


    )

}

export default NewPost