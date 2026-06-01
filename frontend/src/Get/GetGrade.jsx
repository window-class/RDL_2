import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

function GetGrade() {
    const [grades, setGrades] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const res = await axios.get("http://localhost:9591/api/GetAllGrades");
                setGrades(res.data);
                console.log("Grades found:", res.data);
            } catch (error) {
                console.log("Error getting grades:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchGrades();
    }, []);

    const deleteOne = async (id, candidateId) => {
        if (window.confirm(`Are you sure you want to delete the grade for Candidate ID: ${candidateId}?`)) {
            try {
                const res = await axios.delete(`http://localhost:9591/api/deleteGrade/${id}`);
                setGrades((prevList) => prevList.filter((grade) => grade._id !== id));
                console.log("Deleted:", res);
            } catch (error) {
                console.log("Error deleting grade:", error);
                alert("Failed to delete grade");
            }
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-8">
            <div className="w-full max-w-6xl bg-white p-6 shadow-2xl rounded-xl">
                <div className="mb-6 border-b-4 border-indigo-600 pb-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Grades For All Candidates</h1>
                        <p className="text-gray-600 mt-2">Total: {grades.length} record(s)</p>
                    </div>
                    <Link to="/AddGrade" className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-lg">
                        + Add New
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600 text-lg">Loading grades...</p>
                    </div>
                ) : grades.length === 0 ? (
                    <div className="text-center py-8 bg-blue-50 rounded-lg">
                        <p className="text-gray-600 text-lg">No grades found. <Link to="/AddGrade" className="text-indigo-600 font-bold hover:underline">Create one now!</Link></p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-indigo-600 text-white">
                                <tr>
                                    <th className="p-3 text-left">No</th>
                                    <th className="p-3 text-left">C.N.Id</th>
                                    <th className="p-3 text-left">L.E.C</th>
                                    <th className="p-3 text-left">Marks</th>
                                    <th className="p-3 text-left">Decision</th>
                                    <th className="p-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {grades.map((grade, idx) => (
                                    <tr key={grade._id} className="border-b-2 border-gray-200 hover:bg-indigo-50 transition duration-200">
                                        <td className="p-3 font-semibold text-gray-700">{idx + 1}</td>
                                        <td className="p-3 text-gray-700 font-medium">{grade.CNI?.CNI || "N/A"}</td>
                                        <td className="p-3 text-gray-700">Category: {grade.LEC}</td>
                                        <td className="p-3 text-gray-800 font-semibold">{grade.Marks} / 20</td>
                                        <td className={`p-3 font-bold ${grade.Marks >= 12 ? "text-green-600" :"text-red-600"}`}>
                                            {grade.Marks >= 12 ? "Passes" : "Failed"}
                                        </td>
                                        <td className="p-3 text-center">
                                            <div className="flex justify-center gap-2">
                                                <Link 
                                                    className="px-3 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
                                                    to={`/UpdateGrade/${grade._id}`}
                                                >
                                                    Edit
                                                </Link>
                                                <button 
                                                    onClick={() => deleteOne(grade._id, grade.CNI?.CNI || "")} 
                                                    className="px-3 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-200"
                                                >
                                                    Delete
                                                </button>
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
                    <Link to="/AddGrade" className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-lg">
                        Add Grade
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default GetGrade;