import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router";

function GetSupervisor(){
    const [supervisors, setSupervisors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSupervisors = async () => {
            try {
                const res = await axios.get("http://localhost:9591/api/sup");
                setSupervisors(res.data);
                console.log("Supervisors found:", res.data);
            } catch (error) {
                console.log("Error getting supervisors:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSupervisors();
    }, []);

    const deleteOne = async (id, name) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            try {
                const res = await axios.delete(`http://localhost:9591/api/sup/${id}`);
                setSupervisors((prevList) => prevList.filter((sup) => sup._id !== id));
                console.log("Deleted:", res);
            } catch (error) {
                console.log("Error deleting supervisor:", error);
                alert("Failed to delete supervisor");
            }
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-8">
            <div className="w-full max-w-6xl bg-white p-6 shadow-2xl rounded-xl">
                <div className="mb-6 border-b-4 border-indigo-600 pb-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Supervisors Management</h1>
                        <p className="text-gray-600 mt-2">Total: {supervisors.length} supervisor(s)</p>
                    </div>
                    <Link to="/AddSupervisor" className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-lg">
                        + Add New
                    </Link>
                </div>

                {loading ? (
                    <div className="text-center py-8">
                        <p className="text-gray-600 text-lg">Loading supervisors...</p>
                    </div>
                ) : supervisors.length === 0 ? (
                    <div className="text-center py-8 bg-blue-50 rounded-lg">
                        <p className="text-gray-600 text-lg">No supervisors found. <Link to="/AddSupervisor" className="text-indigo-600 font-bold hover:underline">Create one now!</Link></p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-indigo-600 text-white">
                                <tr>
                                    <th className="p-3 text-left">#</th>
                                    <th className="p-3 text-left">Supervisor ID</th>
                                    <th className="p-3 text-left">Candidate Id</th>
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Position</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Address</th>
                                    <th className="p-3 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {supervisors.map((sup, idx) => (
                                    <tr key={sup._id} className="border-b-2 border-gray-200 hover:bg-indigo-50 transition duration-200">
                                        <td className="p-3 font-semibold text-gray-700">{idx + 1}</td>
                                        <td className="p-3 text-gray-700">{sup.SupervisorId}</td>
                                        <td className="p-3 text-gray-700">{sup.CNI.CNI}</td>
                                        <td className="p-3 font-semibold text-gray-800">{sup.SupervisorName}</td>
                                        <td className="p-3 text-gray-700">{sup.TitleOfSupervisor}</td>
                                        <td className="p-3 text-blue-600 font-medium"><a href={`mailto:${sup.Email}`} target="_blank" rel="noopener noreferrer">{sup.Email}</a></td>
                                        <td className="p-3 text-gray-700">{sup.Adress}</td>
                                        <td className="p-3 text-center">
                                            <div className="flex justify-center gap-2">
                                                <Link 
                                                    className="px-3 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
                                                    to={`/UpdateSupervisor/${sup._id}`}
                                                >
                                                    Edit
                                                </Link>
                                                <button 
                                                    onClick={() => deleteOne(sup._id, sup.SupervisorName)} 
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
                    <Link to="/AddSupervisor" className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-lg">
                        Add Supervisor
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default GetSupervisor;
