import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router";

function GetCandidate(){
    const [candidates, setCandidates]=useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchCands=async () => {
            try {
                const res = await axios.get("http://localhost:9591/api/getAllCandidates");
                setCandidates(res.data);
                console.log("Data found:", res);
            } catch (error) {
                console.log("Error getting data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCands();
    }, []);

    const deleteOne=async (id, name) => {
        if (window.confirm(`Ready to delete ${name}?`)) {
            try {
                const res = await axios.delete(`http://localhost:9591/api/deleteCandidate/${id}`);
                setCandidates((prevCand)=>prevCand.filter((cand)=>cand._id !==id));
                console.log("Deleted:", res);
            } catch (error) {
                console.log("Error deleting candidate:", error);
                alert("Failed to delete candidate");
            }
        }
    }

    return(
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-8">
            <div className="w-full max-w-6xl bg-white p-6 shadow-2xl rounded-xl">
                <div className="mb-6 border-b-4 border-indigo-600 pb-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Candidates Management</h1>
                        <p className="text-gray-600 mt-2">Total: {candidates.length} candidate(s)</p>
                    </div>
                    <Link to="/AddCandidate" className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-lg">
                        + Add New
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600 text-lg">Loading candidates...</p>
                    </div>
                ) : candidates.length === 0 ? (
                    <div className="text-center py-8 bg-blue-50 rounded-lg">
                        <p className="text-gray-600 text-lg">No candidates found. <Link to="/AddCandidate" className="text-indigo-600 font-bold hover:underline">Create one now!</Link></p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-indigo-600 text-white">
                                <tr>
                                    <th className="p-3 text-left">#</th>
                                    <th className="p-3 text-left">National ID</th>
                                    <th className="p-3 text-left">First Name</th>
                                    <th className="p-3 text-left">Last Name</th>
                                    <th className="p-3 text-left">Gender</th>
                                    <th className="p-3 text-left">DOB</th>
                                    <th className="p-3 text-left">Exam Date</th>
                                    <th className="p-3 text-left">Phone</th>
                                    <th className="p-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {candidates.map((cand, idx)=>(
                                    <tr key={cand._id} className="border-b-2 border-gray-200 hover:bg-indigo-50 transition duration-200">
                                        <td className="p-3 font-semibold text-gray-700">{idx +1}</td>
                                        <td className="p-3 font-medium text-gray-800">{cand.CNI}</td>
                                        <td className="p-3 text-gray-700">{cand.Fname}</td>
                                        <td className="p-3 text-gray-700">{cand.Lname}</td>
                                        <td className="p-3 text-gray-700">{cand.Gender}</td>
                                        <td className="p-3 text-gray-700 text-sm">{new Date(cand.DOB).toLocaleDateString()}</td>
                                        <td className="p-3 text-gray-700 text-sm">{new Date(cand.ExamDate).toLocaleDateString()}</td>
                                        <td className="p-3 text-gray-700">{cand.Pnumber}</td>
                                        <td className="p-3 text-center">
                                            <div className="flex justify-center gap-2">
                                                <Link className="px-3 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
                                                    to={`/UpdateCandidate/`+cand._id}>Edit</Link>
                                                <button onClick={()=>deleteOne(cand._id, cand.Lname)} className="px-3 py-2 bg-red-500 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-200">Delete</button>
                                            </div>
                                        </td>
                                    </tr>    
                                ))}
                            </tbody> 
                        </table>
                    </div>
                )}

                <div className="mt-6 flex gap-3">
                    <Link to="/" className="px-6 py-3 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition-all duration-200 shadow-lg">
                        Home
                    </Link>
                    <Link to="/AddCandidate" className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-lg">
                        Add Candidate
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default GetCandidate;