import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function AddSupervisor(){
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState("");
    const [candidates, setCandidates] = useState([]);

    const supervisor = {
        SupervisorId: '', SupervisorName: '', TitleOfSupervisor: '', 
        Email: '', Adress: '', CNI: ''
    };
    const [supervisorData, setSupervisorData] = useState(supervisor);
    const { SupervisorId, SupervisorName, TitleOfSupervisor, Email, Adress, CNI } = supervisorData;

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const res = await axios.get("http://localhost:9591/api/getAllCandidates");
                setCandidates(res.data);
            } catch (error) {
                console.log("Error fetching candidates:", error);
            }
        };
        fetchCandidates();
    }, []);

    const inputHandle = (e) => {
        const { name, value } = e.target;
        setSupervisorData({ ...supervisorData, [name]: value });
    }

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9591/api/sup", supervisorData);
            console.log("Supervisor registered well:", res);
            setMsg(`Successfully registered supervisor ${SupervisorName}!`);
            setMsgType("well");
            setTimeout(() => { navigate("/GetSupervisor"); }, 3500);
        } catch (error) {
            console.log("Failed to register supervisor:", error);
            setMsg(`Registration failed: ${error.response?.data?.msg || error.message}`);
            setMsgType("not");
            setTimeout(() => { window.location.reload(); }, 5000);
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-8">
            <div className="w-full max-w-2xl bg-white p-6 shadow-2xl rounded-xl">
                <div className="mb-6 border-b-4 border-indigo-600 pb-4">
                    <h1 className="text-3xl font-bold text-gray-800">Register New Supervisor</h1>
                    <p className="text-gray-600 mt-2">Add a new supervisor to manage candidates</p>
                </div>
                
                {msg && (
                    <p className={`text-center mb-4 p-3 rounded-lg font-semibold ${msgType === 'well' 
                        ? 'text-green-700 bg-green-100 border-2 border-green-500' 
                        : 'text-red-700 bg-red-100 border-2 border-red-500'}`}
                    >
                        {msg}
                    </p>
                )}

                <form onSubmit={submitForm}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="SupervisorId" className="block font-semibold text-gray-700 mb-2">Supervisor ID</label>
                            <input 
                                type="text" 
                                name="SupervisorId" 
                                placeholder="Enter Supervisor ID..."
                                autoComplete="off" 
                                onChange={inputHandle}
                                value={SupervisorId}
                                className="w-full px-4 py-2 outline-none border-2 border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 rounded-lg transition duration-200"
                                required 
                                id="SupervisorId"
                            />
                        </div>

                        <div>
                            <label htmlFor="SupervisorName" className="block font-semibold text-gray-700 mb-2">Full Name</label>
                            <input 
                                type="text" 
                                name="SupervisorName" 
                                placeholder="Enter full name..."
                                autoComplete="off" 
                                onChange={inputHandle}
                                value={SupervisorName}
                                className="w-full px-4 py-2 outline-none border-2 border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 rounded-lg transition duration-200"
                                required 
                                id="SupervisorName"
                            />
                        </div>

                        <div>
                            <label htmlFor="TitleOfSupervisor" className="block font-semibold text-gray-700 mb-2">Title/Position</label>
                            <input 
                                type="text" 
                                name="TitleOfSupervisor" 
                                placeholder="e.g., Lead Examiner..."
                                autoComplete="off" 
                                onChange={inputHandle}
                                value={TitleOfSupervisor}
                                className="w-full px-4 py-2 outline-none border-2 border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 rounded-lg transition duration-200"
                                required 
                                id="TitleOfSupervisor"
                            />
                        </div>

                        <div>
                            <label htmlFor="Email" className="block font-semibold text-gray-700 mb-2">Email Address</label>
                            <input 
                                type="email" 
                                name="Email" 
                                placeholder="Enter email..."
                                autoComplete="off" 
                                onChange={inputHandle}
                                value={Email}
                                className="w-full px-4 py-2 outline-none border-2 border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 rounded-lg transition duration-200"
                                required 
                                id="Email"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="Adress" className="block font-semibold text-gray-700 mb-2">Address</label>
                            <input 
                                type="text" 
                                name="Adress" 
                                placeholder="Enter address..."
                                autoComplete="off" 
                                onChange={inputHandle}
                                value={Adress}
                                className="w-full px-4 py-2 outline-none border-2 border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 rounded-lg transition duration-200"
                                required 
                                id="Adress"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="CNI" className="block font-semibold text-gray-700 mb-2">Assigned Candidate</label>
                            <select 
                                name="CNI" 
                                value={CNI}
                                onChange={inputHandle}
                                className="w-full px-4 py-2 outline-none border-2 border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 rounded-lg transition duration-200"
                                required 
                                id="CNI"
                            >
                                <option value="">Select a candidate...</option>
                                {candidates.map((cand) => (
                                    <option key={cand._id} value={cand._id}>
                                        {cand.Fname} {cand.Lname} (ID: {cand.CNI})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button 
                            type="submit" 
                            className="flex-1 px-6 py-3 bg-indigo-600 font-bold text-white rounded-lg hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-lg"
                        >
                            Register Supervisor
                        </button>
                        <Link to="/GetSupervisor" className="flex-1">
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

export default AddSupervisor;
