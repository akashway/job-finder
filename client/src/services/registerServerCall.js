const registerServerCall=async (registrationData)=>{
    console.log("registerServerCall called")
    const response = await fetch('http://localhost:4000/api/user/register',{
        method:"post",
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(registrationData)
    })

    return response

}

export default registerServerCall