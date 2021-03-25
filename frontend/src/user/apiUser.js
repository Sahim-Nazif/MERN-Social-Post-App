export const read=(userId,token)=>{
    
    return fetch (`http://localhost:8000/user/${userId}`, {

        method:'GET',
        headers: {
              Accept: 'application/json',
             'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
           },

    })  
    .then(response=>{
        return response.json();
    })
    .catch(err =>console.log(err))

}

export const list=()=>{

    return fetch (`http://localhost:8000/user/users`, {

        method:'GET',
  

    })  
    .then(response=>{
        return response.json();
    })
    .catch(err =>console.log(err))
}


export const remove=(userId,token)=>{
    
    return fetch (`http://localhost:8000/user/delete/${userId}`, {

        method:'DELETE',
        headers: {
              Accept: 'application/json',
             'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
           },

    })  
    .then(response=>{
        return response.json();
    })
    .catch(err =>console.log(err))

}


export const  update=(userId, token, user)=>{

    return fetch (`http://localhost:8000/user/update/${userId}`, {

        method:'PUT',
        headers: {
              Accept: 'application/json',
             'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body:JSON.stringify(user)

    })  
    .then(response=>{
        return response.json();
    })
    .catch(err =>console.log(err))
}





export const updateUser=(user, next)=>{

    if (typeof window !=='undefined') {
        if (localStorage.getItem('jwt')) {
            let auth=JSON.parse(localStorage.getItem('jwt'))
            auth.user=user
            localStorage.setItem('jwt', JSON.stringify(auth))
            next()
        }
    }
}


export const  follow=(userId, token, followId)=>{

    return fetch (`http://localhost:8000/user/follow/${userId}`, {

        method:'PUT',
        headers: {
              Accept: 'application/json',
             'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body:JSON.stringify({userId, followId})

    })  
    .then(response=>{
        return response.json();
    })
    .catch(err =>console.log(err))
}



export const  unfollow=(userId, token, unfollowId)=>{

    return fetch (`http://localhost:8000/user/unfollow/${userId}`, {

        method:'PUT',
        headers: {
              Accept: 'application/json',
             'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body:JSON.stringify({userId, unfollowId})

    })  
    .then(response=>{
        return response.json();
    })
    .catch(err =>console.log(err))
}


export const findPeople=(userId, token)=>{

    return fetch (`http://localhost:8000/user/findpeople/${userId}`, {

        method:'GET',
        headers: {
              Accept: 'application/json',
             'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            

    })  
    .then(response=>{
        return response.json();
    })
    .catch(err =>console.log(err))
}