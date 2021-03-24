import React, { useState, useEffect } from 'react'
import { findPeople } from '../user/apiUser'
import { Link } from 'react-router-dom'
import DefaultProfile from '../images/Avatar.png'
import { isAuthenticated } from '../auth/index'

const FindPeople = () => {

    const [values, setValues] = useState({
        users: []
    })


    const { users } = values
    const userId=isAuthenticated().user._id
    const token=isAuthenticated().user.token
    c
    const init = (userId, token) => {
        findPeople().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setValues({ users: data })
                console.log(data)
            }
        })
    }


    useEffect(() => {
        init();
    }, [])

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
                             

                        </div>
                    </div>

                ))}

        </div>

    )
    return (

        <div className='container'>
            <h2 className='mt-5 mb-5'>Users</h2>
            <p>Login to view details about the users</p>

            {displayUsers()}
        </div>
    );
}

export default FindPeople;