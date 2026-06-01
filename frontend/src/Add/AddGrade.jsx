import React, { useState, useEffect } from "react";
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'


function AddGrade(){
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState("");
    const grades = { CNI:'',LEC:'', Marks:'' };
    const [grade, setGrade]=useState(grades);
    const inputHandle = async(e)=>{
        const {name, value} = e.target;
        setGrade({...grade, [name]: value});
    }

    const [candidates, setCandidates]=useState([]);
    useEffect(()=>{
        const fetchCands=async () => {
            try {
                const res = await axios.get("http://localhost:9591/api/getAllCandidates");
                setCandidates(res.data);
                console.log("Data found:", res);
            } catch (error) {
                console.log("Error getting data:", error);
            }
        }
        fetchCands();
    }, []);

    const submitForm = async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:9591/api/addGrade", grade);
            console.log("grade recorded well:", res);
            setMsg(`Successfully recorded grade!`);
            setMsgType("well");
            setTimeout(()=>{navigate("/GetGrade");}, 3500);
        } catch (error) {
            console.log("Failed to record grade:", error);
            setMsg(`Record failed: ${error.response?.data?.msg || error.message}`);
            setMsgType("not");
            setTimeout(()=>{window.location.reload();}, 5000);
        } 
    }
    
    return(
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-8">
            <div className="w-full max-w-2xl bg-white p-6 shadow-2xl rounded-xl">
                <div className="mb-6 border-b-4 border-indigo-600 pb-4">
                    <h1 className="text-3xl font-bold text-gray-800">Record Exam Grade</h1>
                    <p className="text-gray-600 mt-2">Add a new grade/marks for a candidate</p>
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
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">Select Candidate</label>
                            <select 
                                name="CNI"
                                value={grade.CNI}
                                onChange={inputHandle}
                                className="w-full px-4 py-2 outline-none border-2 border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 rounded-lg transition duration-200"
                                required
                            >
                                <option value="">Select a candidate...</option>
                                {candidates.map((cand, idx)=>(
                                    <option value={cand._id} key={cand._id}>
                                        {cand.Fname} {cand.Lname} (ID: {cand.CNI})
                                    </option>    
                                ))}        
                            </select>        
                        </div>

                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">License Exam Category</label>
                            <select 
                                name="LEC" 
                                value={grade.LEC}
                                onChange={inputHandle}
                                className="w-full px-4 py-2 outline-none border-2 border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 rounded-lg transition duration-200"
                                required
                            >
                                <option value="">Select exam category...</option>
                                <option value="A">Category A - Motorcycles</option>
                                <option value="B">Category B - Cars</option>
                                <option value="C">Category C - Vehicles</option>
                                <option value="D">Category D - Heavy Vehicles</option>
                                <option value="E">Category E - Trailers</option>
                                <option value="F">Category F - Bicycles</option>
                            </select>        
                        </div>

                        <div>
                            <label className="block font-semibold text-gray-700 mb-2">Marks (out of 20)</label>
                            <input 
                                type="number" 
                                name="Marks" 
                                placeholder="Enter marks (0-20)"
                                value={grade.Marks}
                                onChange={inputHandle}
                                min="0" 
                                max="20"
                                className="w-full px-4 py-2 outline-none border-2 border-gray-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 rounded-lg transition duration-200"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button type="submit" className="flex-1 px-6 py-3 bg-indigo-600 font-bold text-white rounded-lg hover:bg-indigo-700 active:scale-95 transition-all duration-200 shadow-lg">
                            Record Grade
                        </button>
                        <Link to="/GetGrade" className="flex-1">
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

export default AddGrade;