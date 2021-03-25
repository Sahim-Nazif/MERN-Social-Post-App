import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated,signout } from '../auth/index'

const isActive = (history, path) => {

    if (history.location.pathname === path) {
        return { color: '#ff9900' }
    }
    else {
        return { color: "#ffffff" }
    }
}



const Menu = ({ history }) => {
    return (

        <div>
            <ul className="nav nav-tabs navbar-dark bg-dark">
                <li className='nav-item'>
                    <Link className='nav-link' style={isActive(history, '/')} to="/">Home</Link>
                </li>
                <li className='nav-item'>
                    <Link className='nav-link' style={isActive(history, '/users')} to="/users">Users</Link>
                </li>

                {!isAuthenticated() && (
                    <>
                        <li className='nav-item'>
                            <Link className='nav-link' style={isActive(history, '/signin')} to="/signin">Sign in</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' style={isActive(history, '/signup')} to="/signup">Sign up</Link>
                        </li>
                    </>
                )}
                {isAuthenticated() && (
                    <>
                    
                    <li className='nav-item'  >

                    <a className='nav-link'  >
                            <Link to={`/findpeople` }
                             style={isActive(history, `/findpeople`)}>
                                 Find People
                            </Link>
                            </a>
                            </li>
                            <li className='nav-item'  >
                        <a className='nav-link'  >
                            <Link to={`/user/${isAuthenticated().user._id}` }
                             style={isActive(history, `/user/${isAuthenticated().user._id}`)}>
                            {`${isAuthenticated().user.name}'s profile`}
                            </Link>
                            </a>
                    
                    </li>
                    <li className='nav-item'>
                        <span className='nav-link'
                            style={isActive(history, '/signout'), { cursor: 'pointer', color: '#fff' }}
                            onClick={() => signout(() => history.push('/'))}>Sign out</span>
                    </li>
                    </>
                )}

            </ul>
        </div>
    );
}

export default withRouter(Menu);
