import React, { useState, useEffect } from "react";
import axios from 'axios'
import {Link, useNavigate, useParams} from 'react-router-dom'


function UpdateGrade(){
    const navigate = useNavigate();
    const [msg, setMsg] = useState("");
    const [msgType, setMsgType] = useState("");
const grades = { CNI:'',LEC:'', Marks:'' };
const [grade, setGrade]=useState(grades);
const {CNI, LEC, Marks}=grade;
const inputHandle = async(e)=>{
    const {name, value} = e.target;
    setGrade({...grade, [name]: value});
}

    const [candidates, setCandidates]=useState([]);
    useEffect(()=>{
        const fetchCands=async () => {
        axios.get("http://localhost:9591/api/getAllCandidates", candidates)
        .then((res)=>{
            setCandidates(res.data);
            console.log("Data found:", res);
        })
        .catch((error)=>{
            console.log("Error getting data:", error);
        })
        }
        fetchCands();
    }, []);

const {id}=useParams();
useEffect(()=>{
    axios.get(`http://localhost:9591/api/getGradeById/${id}`)
    .then((res)=>{
        setGrade(res.data);
    })
},[id]);    
const submitForm = async(e)=>{
    e.preventDefault();
   try {
    const res = await axios.put(`http://localhost:9591/api/updateGrade/${id}`, grade);
    console.log("grade updated well:", res);
    setMsg(`Successfully updated, redirecting...`);
    setMsgType("well");
    setTimeout(()=>{navigate("/GetGrade");}, 4500);
   } catch (error) {
    console.log("Failed to alt grade:", error);
    setMsg(`update failed with error: ${error}, refreshing...`);
    setMsgType("not");
    setTimeout(()=>{window.location.reload();}, 5500);
   } 
}
    return(
        <div className="min-h-screen flex justify-center items-center bg-gray-300">
         <div className="w-xl bg-gray-50 p-4 shadow-lg rounded-lg">
            <h1 className="text-xl font-bold p-2">Edit grades</h1>
            {msg &&(<p className={`text-center ${msgType=='well'?'text-green-500 bg-green-200 p-2 rounded border-1 border-green-500':'text-red-500 bg-red-200 p-2 rounded border-1 border-red-500'}`}>{msg}</p>)}
            <form onSubmit={submitForm}>
                <div>
                    <label className="block font-medium mt-2">Candidate National Id</label>
                    <select type="number" name="CNI" value={CNI}
                           autoComplete="off" onChange={inputHandle}
                           className="w-full outline-1 outline-blue-400 p-2 focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
                           required>
                    <option value="">Select C.N Id</option>
                    {candidates.map((cand, idx)=>(
                    <option value={cand._id} key={cand._id}>{idx +1}. {cand.CNI}</option>    
                    ))}        
                    </select>        
                </div>
                <div>
                <label className="block font-medium mt-2">Licence Exam Category</label>
                <select type="text" name="LEC" placeholder="enter first nam..."
                       autoComplete="off" onChange={inputHandle} value={LEC}
                       className="w-full outline-1 outline-blue-400 p-2 focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
                       required>
                <option value="">select exam category...</option>
                <option value="A">Category A</option>
                <option value="B">Category B</option>
                <option value="C">Category C</option>
                <option value="D">Category D</option>
                <option value="E">Category E</option>
                <option value="F">Category F</option>
                </select>        
            </div>
                <div>
                <label className="block font-medium mt-2">Marks</label>
                <input type="number" name="Marks" placeholder="Enter marks/20"
                       autoComplete="off" onChange={inputHandle} value={Marks}
                       className="w-full outline-1 outline-blue-400 p-2 focus:outline-none focus:ring-2 focus:ring-green-400 rounded"
                       required/>
            </div>  
            <button type="submit" className="mt-2 p-2 bg-purple-600 font-medium text-white cursor-pointer hover:bg-purple-700 hover:scale-98 transition rounded">Update grade</button>
            &nbsp;&nbsp; 
            <Link to="/GetGrade"><span className="w-full p-2 bg-green-500 rounded text-white font-medium">View List</span></Link>                                     
            </form>
         </div>
         </div>
    )
}

export default UpdateGrade;