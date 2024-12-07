import { useState } from "react"
import loginServerCall from '../services/loginServerCall'
import { NavLink } from "react-router"

const Login = () => {

    const [loginFormData, setLoginFormData] = useState({
        email: "",
        password: ""
    })

    const changeHandler = (event) => {
        const { name, value } = event.target
        setLoginFormData(prevData => {
            return ({
                ...prevData,
                [name]: value
            })
        })
    }

    const submitHandler = (event) => {
        event.preventDefault()
        const response = loginServerCall(loginFormData)
        response.then(data => alert(`Status:${data.status}: Login successfully`)).catch((err) => console.log(err))

    }

    return (
        <div>

            <div>
                <h1>Already have an account?</h1>
                <p>Your personal job finder is here</p>
            </div>

            <form onSubmit={submitHandler} className="login-form">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={loginFormData.email}
                    onChange={changeHandler}
                />
                <br /><br />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginFormData.password}
                    onChange={changeHandler}
                />
                <br /><br />

                <button type="submit">Sign in</button>

            </form>

            <div>
                Don’t have an account? <NavLink to="/register">Sign Up</NavLink>
            </div>
        </div>
    )
}

export default Login