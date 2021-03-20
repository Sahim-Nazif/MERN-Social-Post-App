import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Signup from './user/Signup'

const MainRouter = () => {
    return (  
        <div>
            <Switch>
            <Route path="/signup" exact component={Signup}/>
                <Route path="/" exact component={Home}/>
               
            </Switch>

        </div>
    );
}
 
export default MainRouter;