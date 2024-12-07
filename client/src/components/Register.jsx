import { useState } from "react"
import reisterServerCall from '../services/registerServerCall'
import { NavLink } from "react-router"

const Register = () => {

    const [registerFormData, setRegisterFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: ""
    })

    const changeHandler = (event) => {
        const { name, value } = event.target
        setRegisterFormData(prevData => {
            return ({
                ...prevData,
                [name]: value
            })
        })
    }


    const submitHandler = (event) => {
        event.preventDefault()
        const response = reisterServerCall(registerFormData)
        response.then(data => alert(`Status:${data.status}: Registeration successfully`)).catch((err) => console.log(err))
    }

    return (

        <div>

            <div>
                <h1>Create an account</h1>
                <p>Your personal job finder is here</p>
            </div>

            <form onSubmit={submitHandler} className="register-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={registerFormData.name}
                    onChange={changeHandler}
                />
                <br /><br />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={registerFormData.email}
                    onChange={changeHandler}
                />
                <br /><br />

                <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile"
                    value={registerFormData.mobile}
                    onChange={changeHandler}
                />
                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={registerFormData.password}
                    onChange={changeHandler}
                />
                <br /><br />

                <label>
                    <input
                        type="checkbox"
                    />
                    By creating an account, I agree to our terms of use and privacy policy
                </label>
                <br /><br />
                <button type="submit">Create Account</button>
            </form>

            <div>
                Already have an account? <NavLink to="/login">Sign In</NavLink>
            </div>
        </div>


    )
}

export default Register