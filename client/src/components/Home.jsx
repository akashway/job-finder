import { useState, useEffect } from "react"
import getJobsServiceCall from "../services/getJobsServiceCall"

const Home = () => {
    const [jobs, setJobs] = useState([])

    useEffect(() => {
        const response = getJobsServiceCall()
        response
            .then(data => data.json())
            .then(res => setJobs(res))
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            Home page
            {jobs.map(item => {
                return (
                    <div style={{margin:"10px",border:"2px solid red"}} key={item._id}>
                        {
                            Object.keys(item).map(key => {
                                return (
                                    <div key={key}>
                                        <p>{key}:{item[key]}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            })}
        </div>
    )
}

export default Home