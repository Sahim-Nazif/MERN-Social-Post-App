import React, { useState, useEffect } from 'react'
import { list } from '../post/apiPost'
import { Link } from 'react-router-dom'
//import DefaultProfile from '../images/Avatar.png'
import { isAuthenticated } from '../auth/index'

const Posts = () => {

    const [values, setValues] = useState({
        posts: []
    })


    const { posts } = values
    const { user } = isAuthenticated()
    const init = () => {
        list().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setValues({ posts: data })
                console.log(data)
            }
        })
    }


    useEffect(() => {
        init();
    }, [])

    const displayPosts = () => {
        return (

            <div className='row'>
                {
                 
                    posts.map((post, index) => {
                    
                            const posterId=post.postedBy ? post.postedBy._id : ""
                            const posterName=post.postedBy ? post.postedBy.name : " Unknown"
                    return (
                            <div className="card col-md-3 mr-6 mt-2" key={index}>
                             
                                <div className="card-body">
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text"> {post.body}</p>

                                <br/>
                                <p className='font-italic mark'>
                                    posted by <Link to={`/user/${posterId}`}>{posterName}</Link>
                                    on {new Date(post.created).toDateString()}
                                </p>

                                    <Link to={`/posts/${post._id}`} className="btn btn-raised btn-info btn-sm">Read more</Link>
                        </div>
                        </div>
                        )
                    })}

            </div>
        )
    }

    return (

        <div className='container'>
            <h2 className='mt-5 mb-5'>Recent Posts</h2>
          

            {displayPosts()}
        </div>
    );
}

export default Posts;