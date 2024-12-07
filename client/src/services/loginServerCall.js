const loginServerCall=async (loginData)=>{
    const response= await fetch("http://localhost:4000/api/user/login",{
        method:"post",
        headers:{
            'Content-Type':'application/json'
        },
        body : JSON.stringify(loginData)
    })

    return response
}

export default loginServerCall