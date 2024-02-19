import { Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home.jsx"
import Login from "./pages/login/Login.jsx"
import Tasks from "./pages/tasks/Tasks.jsx";
import  ProtectedRoute from "./utils/ProtectedRoute"

export default function App(){
  return (
        <Routes> 

            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={<ProtectedRoute/>} >
                <Route path="/" element={<Home/>} />
            </Route >
            
            <Route path="/tasks/" element={<ProtectedRoute/>} >
                <Route path="/tasks/" element={<Tasks />} />
            </Route >

        </Routes>
  )
}