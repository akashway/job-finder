import { NavLink, useNavigate } from "react-router"

const Header = () => {
    let navigate=useNavigate()
    return (
        <div className="header">
            <p>Jobfinder</p>
            {/* <nav>
                <NavLink to="/login">
                    Login
                </NavLink>

                <NavLink to="/register">
                    Register
                </NavLink>
            </nav> */}

            <nav>
                <button onClick={()=>navigate("login")} className="login-button">Login</button>
                <button onClick={()=>navigate("register")} className="register-button">Register</button>
            </nav>
        </div>
    )
}

export default Header