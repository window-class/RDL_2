import React, { useState } from 'react';  
import axios from 'axios';  
import { Link } from 'react-router-dom';  
  
const ForgetPassword = () => {  
    const [username, setUsername] = useState('');  
    const [message, setMessage] = useState('');  
    const [error, setError] = useState('');  
    const [token, setToken] = useState('');  
  
    const onSubmit = async (e) => {  
        e.preventDefault();  
        try {  
            const res = await axios.post('http://localhost:9591/api/auth/forgot-password', { username });  
            setToken(res.data.token);  
            setMessage(res.data.msg);  
            setError('');  
        } catch (err) {  
            setError(err.response ? err.response.data.msg : 'Error sending reset email');  
            setMessage('');  
            setToken('');  
        }  
    };  
  
    return (  
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-teal-50 to-emerald-100 p-4">  
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden border border-emerald-100">  
                {/* Header Banner */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white text-center">
                    <h2 className="font-bold text-3xl tracking-wide">RDLMS</h2>  
                    <p className="text-emerald-100 text-sm mt-1">Rwanda Driving License Management System</p>
                </div>

                <div className="p-6 sm:p-8">
                    <h3 className="font-semibold text-xl text-gray-800 mb-2">Reset Password</h3>
                    <p className="text-gray-500 text-sm mb-4">Enter your registered details to recover your account access.</p>
  
                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4 rounded">
                            <p className="text-red-700 text-sm font-medium">{error}</p>
                        </div>
                    )}  

                    {message && (
                        <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 mb-4 rounded">
                            <p className="text-emerald-700 text-sm font-medium">{message}</p>
                        </div>
                    )}  

                    {token && (  
                        <div className="bg-blue-50 border border-blue-200 p-4 mb-4 rounded-xl text-center shadow-inner">  
                            <p className="text-blue-800 text-xs font-mono mb-2 truncate">Token: {token}</p>  
                            <Link 
                                to={`/reset-password/${token}`} 
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2 rounded-lg transition duration-150"
                            >
                                Secure Reset Password Link
                            </Link>  
                        </div>  
                    )}  

                    <form onSubmit={onSubmit} className="space-y-4">  
                        <div>  
                            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="username">
                                Admin name
                            </label>  
                            <input  
                                type="text"  
                                placeholder="Enter your admin name" 
                                autoComplete="off" 
                                name="username"  
                                value={username}  
                                onChange={(e) => setUsername(e.target.value)}  
                                required  
                                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"  
                            />  
                        </div>  

                        <button 
                            type="submit" 
                            className="w-full mt-2 bg-emerald-600 text-white font-bold p-3 rounded-lg hover:bg-emerald-700 transition duration-200 shadow-md hover:shadow-lg cursor-pointer"
                        >
                            Send Reset Email
                        </button>  

                        <div className="w-full text-center text-sm text-gray-600 mt-4 pt-2 border-t border-gray-100">  
                            Remember your password?{' '}
                            <Link className="text-emerald-600 hover:underline font-semibold" to="/login">
                                Login here
                            </Link>  
                        </div>  
                    </form>  
                </div>  
            </div>  
        </div>  
    );  
};  
  
export default ForgetPassword;