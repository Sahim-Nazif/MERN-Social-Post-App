
export const  create=(userId, token, post)=>{

    return fetch (`http://localhost:8000/post/create${userId}`, {

        method:'POST',
        headers: {
              Accept: 'application/json',
             'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body:post

    })  
    .then(response=>{
        return response.json();
    })
    .catch(err =>console.log(err))
}
