import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';


const CaptainLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [CaptainData, setCaptainData] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();
        // Here you would typically send the email and password to your backend for authentication
        setCaptainData({
            email: email,
            password: password
        });
        console.log('User Data:', CaptainData);
        setEmail('');
        setPassword('');
    }


    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img
                    className='w-30 mb-10'
                    src="https://i.pinimg.com/736x/f5/31/9e/f5319e97db5ee8f4a50a9a4dc072ae69.jpg"
                    alt=""
                />

                <form onSubmit={(e) => {
                    submitHandler(e);
                }} >
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                        type="email"
                        placeholder='email@example.com'
                    />

                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                    <input
                        className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        type="password"
                        placeholder='password'
                    />

                    <button
                        className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
                    >Login</button>
                </form>
                <p className='text-center'>
                    Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as Captain</Link>
                </p>
            </div>
            <div>
                <Link
                    to='/login'
                    className='bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
                >Sign in as User</Link>
            </div>
        </div>
    )
}

export default CaptainLogin