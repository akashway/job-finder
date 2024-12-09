import Login from "./components/Login"
import Register from "./components/Register"
import Header from "./components/Header"
import {Routes, Route } from 'react-router'
import './app.css'
import Home from "./components/Home"

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default App
