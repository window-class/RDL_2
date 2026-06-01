import React, { useState } from 'react';  
import axios from 'axios';  
import { useNavigate, Link } from 'react-router-dom';  
import { useAuth } from '../App'; // Import useAuth hook to use setAuthToken  

const Register = () => {  
    const [formData, setFormData] = useState({  
        username: '', 
        password: '',  
        password2: ''  
    });  
    const [error, setError] = useState(null);  
    const navigate = useNavigate();  
    const { loginUser } = useAuth(); // Get loginUser function from context  

    const { username, password, password2 } = formData;  
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });  

    const onSubmit = async e => {  
        e.preventDefault();  
        if (password !== password2) {  
            setError('Passwords do not match');  
            return;  
        }  
      
        try {  
            const res = await axios.post('http://localhost:9591/api/auth/register', {  
                username,  
                password  
            });  
            console.log('Registration successful:', res.data);  
            
            // Log in the user immediately after successful registration  
            const success = await loginUser(res.data.token);  
            if (success) {  
                navigate('/login'); // Redirect to dashboard  
            } else {  
                setError('Registration successful but failed to log in automatically.');  
            }  
        } catch (err) {  
            console.error('Registration error:', err.response ? err.response.data : err.message);  
            setError(err.response ? err.response.data.msg || 'Registration failed' : 'Registration failed');  
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
                    <h3 className="font-semibold text-xl text-gray-800 mb-4">Create Applicant Account</h3>
                    
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
                                autoComplete="off"
                                name="username" 
                                value={username}  
                                onChange={onChange}
                                autoComplete="off"  
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150" 
                            />  
                        </div> 

                        <div>  
                            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="password">
                                Password
                            </label>  
                            <input  
                                type="password"  
                                placeholder="Create a strong password" 
                                autoComplete="off" 
                                name="password"  
                                value={password}  
                                onChange={onChange}  
                                minLength="6"  
                                required
                                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"  
                            />  
                        </div>  

                        <div>  
                            <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="password2">
                                Confirm Password
                            </label>  
                            <input  
                                type="password"  
                                placeholder="Re-enter your password"
                                autoComplete="off"  
                                name="password2"  
                                value={password2}  
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
                            Register Account
                        </button>  

                        <div className="w-full text-center text-sm text-gray-600 mt-4 pt-2 border-t border-gray-100"> 
                            Already have an account?{' '}
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

export default Register;