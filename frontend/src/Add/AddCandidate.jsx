import React, { useState } from "react";
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'


function AddCandidate(){
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState("");
    const candidates = {
        CNI:'',Fname:'',Lname:'', Gender:'', DOB:'', ExamDate:'',Pnumber:''
    };
    const [candidate, setCandidate]=useState(candidates);
    const {CNI, Fname, Lname, Gender, DOB, ExamDate, Pnumber} = candidate;
    const inputHandle = async(e)=>{
        const {name, value} = e.target;
        setCandidate({...candidate, [name]: value});
    }

    const submitForm = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9591/api/addCandidate", candidate);
            console.log("Candidate registered well:", res);
            setMsg(`Successfully registered ${Fname} ${Lname}!`);
            setMsgType("well");
            setTimeout(()=>{navigate("/GetCandidate");}, 3500);
        } catch (error) {
            console.log("Failed to register candidate:", error);
            setMsg(`Registration failed: ${error.response?.data?.msg || error.message}`);
            setMsgType("not");
            setTimeout(()=>{window.location.reload();}, 5000);
        } 
    }
    return(
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-8">
            <div className="w-full max-w-2xl bg-white p-6 shadow-2xl rounded-xl">
                <div className="mb-6 border-b-4 border-indigo-600 pb-4">
                    <h1 className="text-3xl font-bold text-gray-800">Register New Candidate</h1>
                    <p className="text-gray-600 mt-2">Add a new candidate to the system</p>
                </div>
                
                {msg &&(
                    <p className={`text-center mb-4 p-3 rounded-lg font-semibold ${msgType=='well'
                        ? 'text-green-700 bg-green-100 border-2 border-green-500'
                        : 'text-red-700 bg-red-100 border-2 border-red-500'}`}
                    >
                        {msg}
                    </p>
                )}

                <form onSubmit={submitForm}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="CNI" className="block font-semibold text-gray-700 mb-2">National ID</label>
                            <input type="number" name="CNI" placeholder="Enter ID..."
                                autoComplete="off" onChange={inputHandle}
                                value={CNI} minLength={16} maxLength={16}
                                className="w-full px-4 py-2 outline-none border-2 border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 rounded-lg transition duration-200"
                                required id="CNI"/>
                        </div>
                        <div>
                            <label htmlFor="Fname" className="block font-semibold text-gray-700 mb-2">First Name</label>
                            <input type="text" name="Fname" placeholder="Enter first name..."
                                autoComplete="off" onChange={inputHandle}
                                value={Fname}
                                className="w-full px-4 py-2 outline-none border-2 border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 rounded-lg transition duration-200"
                                required id="Fname"/>
                        </div>
                        <div>
                            <label htmlFor="Lname" className="block font-semibold text-gray-700 mb-2">Last Name</label>
                            <input type="text" name="Lname" placeholder="Enter last name..."
                                autoComplete="off" onChange={inputHandle}
                                value={Lname}
                                className="w-full px-4 py-2 outline-none border-2 border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 rounded-lg transition duration-200"
                                required id="Lname"/>
                        </div>
                        <div>
                            <label htmlFor="Gender" className="block font-semibold text-gray-700 mb-2">Gender</label>
                            <select name="Gender" value={Gender}
                                autoComplete="off" onChange={inputHandle}
                                className="w-full px-4 py-2 outline-none border-2 border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 rounded-lg transition duration-200"
                                required id="Gender">
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>        
                        </div>
                        <div>
                            <label htmlFor="DOB" className="block font-semibold text-gray-700 mb-2">Date of Birth</label>
                            <input type="datetime-local" name="DOB"
                                autoComplete="off" onChange={inputHandle}
                                value={DOB}
                                className="w-full px-4 py-2 outline-none border-2 border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 rounded-lg transition duration-200"
                                required id="DOB"/>
                        </div>
                        <div>
                            <label htmlFor="ExamDate" className="block font-semibold text-gray-700 mb-2">Exam Date</label>
                            <input type="datetime-local" name="ExamDate"
                                autoComplete="off" onChange={inputHandle}
                                value={ExamDate}
                                className="w-full px-4 py-2 outline-none border-2 border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 rounded-lg transition duration-200"
                                required id="ExamDate"/>
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="Pnumber" className="block font-semibold text-gray-700 mb-2">Phone Number</label>
                            <input type="number" name="Pnumber" placeholder="Enter phone..."
                                autoComplete="off" onChange={inputHandle}
                                value={Pnumber} minLength={10} maxLength={15}
                                className="w-full px-4 py-2 outline-none border-2 border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 rounded-lg transition duration-200"
                                required id="Pnumber"/>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button type="submit" className="flex-1 px-6 py-3 bg-indigo-600 font-bold text-white rounded-lg hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-lg">
                            Register Candidate
                        </button>
                        <Link to="/GetCandidate" className="flex-1">
                            <span className="block px-6 py-3 bg-gray-500 font-bold text-white text-center rounded-lg hover:bg-gray-600 transition-all duration-200 shadow-lg">
                                View List
                            </span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCandidate;