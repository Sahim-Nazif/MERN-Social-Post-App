import React, { useState, useEffect } from 'react'
import { singlePost } from './apiPost'
import {Link} from 'react-router-dom'


const SinglePost = ({ match }) => {

    const [values, setValues] = useState({
        post: ''
    })

    useEffect(() => {

        const postId = match.params.postId
        singlePost(postId).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {

                setValues({ post: data })
            }
        })


    }, [])

    const displayPost = () => {
       
        const { post } = values
        const posterId = post.postedBy ? `/user/${post.postedBy._id}` : ""
        const posterName = post.postedBy ? post.postedBy.name : " Unknown"
        return (

            <div className="card col-md-3 mr-6 mt-2" >

                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text"> {post.body}</p>

                    <br />
                    <p className='font-italic mark'>
                        posted by <Link to={`${posterId}`}>{posterName}</Link> {" "}
                on {new Date(post.created).toDateString()}
                    </p>

                    <Link to={`/`} className="btn btn-raised btn-info btn-sm">Back to posts</Link>
                </div>
            </div>
        )

    }
    return (



        <div>
            {displayPost()}


        </div>
    );
}

export default SinglePost;