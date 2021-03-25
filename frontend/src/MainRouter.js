import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Menu from './core/Menu'
import Profile from './user/Profile'
import Users from './user/Users'
import UpdateProfile from './user/UpdateProfile'
import FindPeople from './user/FindPeople'
import PrivateRoute from './auth/privateRoutes'

const MainRouter = () => {
    return (  
        <div>
            <Menu/>
            <Switch>
            <PrivateRoute path="/user/update/:userId" exact component={UpdateProfile}/>
            <PrivateRoute path="/findpeople" exact component={FindPeople}/>
            <Route path="/users" exact component={Users}/>
            <Route path="/signup" exact component={Signup}/>
            <Route path='/signin' exact component={Signin}/>
            <PrivateRoute path='/user/:userId' exact component={Profile}/>
                <Route path="/" exact component={Home}/>
               
            </Switch>

        </div>
    );
}
 
export default MainRouter;