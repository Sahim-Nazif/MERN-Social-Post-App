
export const  create=(userId, token, post)=>{

    return fetch (`http://localhost:8000/post/create/${userId}`, {

        method:'POST',
        headers: {
              Accept: 'application/json',
              //'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body:post

    })  
    .then(response=>{
        return response.json();
    })
    .catch(err =>console.log(err))
}

export const list=()=>{

    return fetch (`http://localhost:8000/post/posts`, {

        method:'GET',
  

    })  
    .then(response=>{
        return response.json();
    })
    .catch(err =>console.log(err))
}


export const singlePost=(postId)=>{

    return fetch (`http://localhost:8000/post/singlepost/${postId}`, {

        method:'GET',
  

    })  
    .then(response=>{
        return response.json();
    })
    .catch(err =>console.log(err))
}
