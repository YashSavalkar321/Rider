import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/UserLogin'
import Register from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainRegister from './pages/CaptainSignup'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route path="/captain-signup" element={<CaptainRegister />} />
        {/* <Route path="/captain-profile" element={<CaptainProfile />} /> */}
      </Routes>

    </div>
  )
}

export default App