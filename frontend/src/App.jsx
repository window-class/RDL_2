import React, { createContext, useContext, useState, useEffect } from "react"; 
import axios from "axios"; 
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom"; 

import Register from './components/Register'; 
import Login from './components/Login';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';

import Homepage from "./Homepage";
import AddCandidate from "./Add/AddCandidate";
import AddGrade from "./Add/AddGrade";
import AddSupervisor from "./Add/AddSupervisor";
import GetCandidate from "./Get/GetCandidate";
import UpdateCandidate from "./Update/UpdateCandidate";
import UpdateGrade from "./Update/UpdateGrade";
import GetGrade from "./Get/GetGrade";
import GetSupervisor from "./Get/GetSupervisor";
import UpdateSupervisor from "./Update/UpdateSupervisor";
import Report from "./Report";

const AuthContext = createContext({}); 
export const useAuth = () => useContext(AuthContext); 
//  Protect with Outlet for hihg scalable pages... 
const Protected = () => { 
  const { isAuthenticated, loading } = useAuth(); 
  if (loading) return <div>Loading...</div>; 
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />; 
};

function App(){
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
 
  const setAuthToken = (token) => { 
    if (token) { 
      axios.defaults.headers.common["x-auth-token"] = token; 
      localStorage.setItem("token", token); 
    } else { 
      delete axios.defaults.headers.common["x-auth-token"]; 
      localStorage.removeItem("token"); 
    } 
  }; 
 
  useEffect(() => { 
    const checkAuth = async () => { 
      const token = localStorage.getItem("token"); 
      if (token) { 
        setAuthToken(token); 
        try { 
          const res = await axios.get("http://localhost:9591/api/auth/user"); 
          setUser(res.data); 
          setIsAuthenticated(true); 
        } catch { 
          setAuthToken(null); 
        } 
      } 
setLoading(false); 
}; 
checkAuth(); 
}, []); 
// use loginUser function 
const loginUser = async (token) => { 
setAuthToken(token); 
try { 
const res = await axios.get("http://localhost:9591/api/auth/user"); 
setUser(res.data); 
setIsAuthenticated(true); 
return true; 
} catch { 
setAuthToken(null); 
return false; 
} 
}; 
const logoutUser = () => { 
setAuthToken(null); 
setIsAuthenticated(false); 
setUser(null); 
}; 
const authContextValue = { 
isAuthenticated, 
    user, 
    loading, 
    loginUser,   // again use loginUser and logoutUser functions 
    logoutUser, 
  };

  return(
    <AuthContext.Provider value={authContextValue}>
     <BrowserRouter>
     <Routes>
    <Route path="/register" element={<Register />} /> 
    <Route path="/login" element={<Login />} />
    <Route path="/forget-password" element={<ForgetPassword />} />
    <Route path="/reset-password/:token" element={<ResetPassword />} />
    <Route element={<Protected />}>

      <Route path="/" element={<Homepage />}/>
      <Route path="/AddCandidate" element={<AddCandidate/>}/>
      <Route path="/AddGrade" element={<AddGrade/>}/>
      <Route path="/AddSupervisor" element={<AddSupervisor/>}/>
      <Route path="/GetCandidate" element={<GetCandidate/>}/>
      <Route path="/UpdateCandidate/:id" element={<UpdateCandidate/>}/>
      <Route path="/UpdateGrade/:id" element={<UpdateGrade/>}/>
      <Route path="/GetGrade" element={<GetGrade/>}/>
      <Route path="/GetSupervisor" element={<GetSupervisor/>}/>
      <Route path="/UpdateSupervisor/:id" element={<UpdateSupervisor/>}/>
      <Route path="/report" element={<Report/>}/>
    </Route>
     </Routes>
     </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;