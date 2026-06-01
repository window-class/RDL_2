import React, { useState } from 'react';  
import axios from 'axios';  
import { useParams, useNavigate } from 'react-router-dom';  
  
const ResetPassword = () => {  
    const { token } = useParams();  
    const [password, setPassword] = useState('');  
    const [confirmPassword, setConfirmPassword] = useState('');  
    const [message, setMessage] = useState('');  
    const [error, setError] = useState('');  
    const navigate = useNavigate();  
  
    const onSubmit = async (e) => {  
        e.preventDefault();  
        if (password !== confirmPassword) {  
            setError('Passwords do not match');  
            return;  
        }  
        try {  
            const res = await axios.post('http://localhost:9591/api/auth/reset-password', { token, password });  
            setMessage(res.data.msg);  
            setError('');  
            setTimeout(() => navigate('/login'), 2000);  
        } catch (err) {  
            setError(err.response ? err.response.data.msg : 'Error resetting password');  
            setMessage('');  
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
                    <h3 className="font-semibold text-xl text-gray-800 mb-2">Create New Password</h3>
                    <p className="text-gray-500 text-sm mb-4">Please enter and confirm your secure new password credentials.</p>
  
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

                    <form onSubmit={onSubmit} className="space-y-4">  
                        <div>  
                            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="password">
                                New Password
                            </label>  
                            <input  
                                type="password"  
                                placeholder="Enter your new password"  
                                name="password"  
                                value={password}  
                                onChange={(e) => setPassword(e.target.value)}  
                                minLength="6"  
                                required  
                                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"  
                            />  
                        </div>  

                        <div>  
                            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="confirmPassword">
                                Confirm New Password
                            </label>  
                            <input  
                                type="password"  
                                placeholder="Re-enter your new password"  
                                name="confirmPassword"  
                                value={confirmPassword}  
                                onChange={(e) => setConfirmPassword(e.target.value)}  
                                minLength="6"  
                                required  
                                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"  
                            />  
                        </div>  

                        <button 
                            type="submit" 
                            className="w-full mt-2 bg-emerald-600 text-white font-bold p-3 rounded-lg hover:bg-emerald-700 transition duration-200 shadow-md hover:shadow-lg cursor-pointer"
                        >
                            Reset Password
                        </button>  
                    </form>  
                </div>  
            </div>  
        </div>  
    );  
};  
  
export default ResetPassword;