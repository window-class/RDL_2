import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { Link } from "react-router";
import { useReactToPrint } from 'react-to-print';

function Report(){
    const [reportData, setReportData] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [filterStatus, setFilterStatus] = useState('all');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const res = await axios.get("http://localhost:9591/api/report");
                setReportData(res.data.data || res.data);
                setStatistics(res.data.statistics || {});
                console.log("Report found:", res.data);
            } catch (error) {
                console.log("Error getting final report:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReport();
    }, []);

    const contentRef = useRef(null);
    const print = useReactToPrint({
        contentRef,
    });

    const filteredData = filterStatus === 'all' 
        ? reportData 
        : reportData.filter(item => item.Status.toLowerCase() === filterStatus);

    const getStatusColor = (status) => {
        return status === 'Passed' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="bg-white shadow-2xl rounded-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-6">
                        <h1 className="text-4xl font-bold mb-2">Driving License Exam Report</h1>
                        <p className="text-indigo-100">Comprehensive examination results and statistics</p>
                    </div>

                    {/* Filter & Print Section */}
                    <div className="p-6 bg-white border-b-2 border-gray-200 flex justify-between items-center flex-wrap gap-4">
                        <div className="flex items-center gap-3">
                            <label className="font-semibold text-gray-700">Filter by Status:</label>
                            <select 
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            >
                                <option value="all">All Results</option>
                                <option value="passed">Passed Only</option>
                                <option value="failed">Failed Only</option>
                            </select>
                        </div>
                    </div>

                    {/* Table Container */}
                    {loading ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600 text-lg">Loading report data...</p>
                        </div>
                    ) : filteredData.length === 0 ? (
                        <div className="text-center py-12 bg-blue-50">
                            <p className="text-gray-600 text-lg">No results found</p>
                        </div>
                    ) : (
                        <div ref={contentRef} className="p-6">
                            <div className="mb-4 pb-4 border-b-2 border-gray-300">
                                <h2 className="text-2xl font-bold text-gray-800">Rwanda Driving Licence Exam Results</h2>
                                <p className="text-gray-600 text-sm mt-1">Generated on {new Date().toLocaleDateString()}</p>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead className="bg-indigo-600 text-white">
                                        <tr>
                                            <th className="p-3 text-left border border-indigo-500">#</th>
                                            <th className="p-3 text-left border border-indigo-500">CNI ID</th>
                                            <th className="p-3 text-left border border-indigo-500">First Name</th>
                                            <th className="p-3 text-left border border-indigo-500">Last Name</th>
                                            <th className="p-3 text-center border border-indigo-500">Gender</th>
                                            <th className="p-3 text-center border border-indigo-500">DOB</th>
                                            <th className="p-3 text-center border border-indigo-500">Exam Date</th>
                                            <th className="p-3 text-center border border-indigo-500">Phone</th>
                                            <th className="p-3 text-center border border-indigo-500">LEC</th>
                                            <th className="p-3 text-left border border-indigo-500">Supervisor</th>
                                            <th className="p-3 text-center border border-indigo-500">Marks</th>
                                            <th className="p-3 text-center border border-indigo-500">Result</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData.map((item, idx) => (
                                            <tr key={idx} className="hover:bg-indigo-50 transition duration-200 border-b border-gray-300">
                                                <td className="p-3 border border-gray-300 font-semibold text-gray-700">{idx + 1}</td>
                                                <td className="p-3 border border-gray-300 font-medium text-gray-800">{item.CNI}</td>
                                                <td className="p-3 border border-gray-300 text-gray-700">{item.Fname}</td>
                                                <td className="p-3 border border-gray-300 text-gray-700">{item.Lname}</td>
                                                <td className="p-3 border border-gray-300 text-center text-gray-700">{item.Gender}</td>
                                                <td className="p-3 border border-gray-300 text-center text-gray-700 text-sm">{new Date(item.DOB).toLocaleDateString()}</td>
                                                <td className="p-3 border border-gray-300 text-center text-gray-700 text-sm">{new Date(item.ExamDate).toLocaleDateString()}</td>
                                                <td className="p-3 border border-gray-300 text-center text-gray-700">{item.Pnumber}</td>
                                                <td className="p-3 border border-gray-300 text-center font-semibold text-gray-700">{item.LEC}</td>
                                                <td className="p-3 border border-gray-300 text-sm">
                                                    <div className="text-gray-700 font-medium">{item.SupervisorName}</div>
                                                    <div className="text-gray-600 text-xs">{item.TitleOfSupervisor}</div>
                                                </td>
                                                <td className="p-3 border border-gray-300 text-center font-bold text-indigo-600">{item.Marks}/20</td>
                                                <td className="p-3 border border-gray-300 text-center">
                                                    <span className={`px-3 py-1 rounded-full font-bold text-sm ${getStatusColor(item.Status)}`}>
                                                        {item.Status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Footer Navigation */}
                    <div className="p-6 bg-gray-50 border-t-2 border-gray-200 flex justify-between gap-3">
                        <Link to="/" className="px-6 py-3 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition-all duration-200 shadow-lg">
                            ← Home
                        </Link>
                        <button 
                            onClick={print} 
                            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-lg"
                        >
                            🖨️ Print
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Report;