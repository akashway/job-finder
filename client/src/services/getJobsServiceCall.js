const getJobsServiceCall=async ()=>{
    return await fetch("http://localhost:4000/api/job",{
        method:'get',
        headers:{
            'Content-Type':'application/json'
        }
    })
}

export default getJobsServiceCall