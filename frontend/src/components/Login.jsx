import React, { useState } from 'react';  
import axios from 'axios';  
import { Link, useNavigate } from 'react-router-dom';  
import { useAuth } from '../App'; // Import useAuth hook  
  
const Login = () => {  
    const [formData, setFormData] = useState({  
        username: '',  
        password: ''  
    });  
    const [error, setError] = useState(null);  
    const navigate = useNavigate();  
    const { loginUser } = useAuth(); // Get loginUser function from context  

    const { username, password } = formData;  
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });  

    const onSubmit = async e => {  
        e.preventDefault();  
        try {  
            const res = await axios.post('http://localhost:9591/api/auth/login', {  
                username,  
                password  
            });  
            console.log('Login successful:', res.data);  
            const success = await loginUser(res.data.token);  
            if (success) {  
                navigate('/'); // Redirect to home page  
            } else {  
                setError('Login successful but failed to fetch user data.');  
            }  
        } catch (err) {  
            console.error('Login error:', err.response ? err.response.data : err.message);  
            setError(err.response ? err.response.data.msg || 'Login failed' : 'Login failed');  
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
                    <h3 className="font-semibold text-xl text-gray-800 mb-4">Sign In</h3>

                    {error && (
                        <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4 rounded">
                            <p className="text-red-700 text-sm font-medium">{error}</p>
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
                                name="username"
                                autoComplete="off"  
                                value={username} 
                                onChange={onChange} 
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"  
                            />  
                        </div>  

                        <div>  
                            <div className="flex justify-between items-center mb-1">
                                <label className="text-sm font-semibold text-gray-700" htmlFor="password">
                                    Password
                                </label>
                                <Link className="text-xs text-emerald-600 hover:underline font-medium" to="/forget-password">
                                    Forgot Password?
                                </Link>
                            </div>  
                            <input  
                                type="password"  
                                placeholder="Enter your password"  
                                name="password"  
                                value={password} 
                                autoComplete="off" 
                                onChange={onChange}  
                                minLength="6"  
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
                            />  
                        </div>  

                        <button 
                            type="submit" 
                            className="w-full mt-2 bg-emerald-600 text-white font-bold p-3 rounded-lg hover:bg-emerald-700 transition duration-200 shadow-md hover:shadow-lg cursor-pointer"
                        >
                            Login
                        </button> 

                        <div className="w-full text-center text-sm text-gray-600 mt-4 pt-2 border-t border-gray-100"> 
                            Don't have an account?{' '}
                            <Link className="text-emerald-600 hover:underline font-semibold" to="/register">
                                Register here
                            </Link> 
                        </div>  
                    </form>  
                </div> 
            </div>
        </div>
    );
};  
  
export default Login;