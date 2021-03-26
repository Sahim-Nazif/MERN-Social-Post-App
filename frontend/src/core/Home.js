import React from 'react'
import Posts from '../post/Posts'

const Home = () => {
    return ( 
        <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4">Home</h1>
          <p className="lead">Welcome to Social Networking Application</p>
        </div>
        <div className="container">
          <Posts />
          </div>
      </div>
     );
}
 
export default Home;