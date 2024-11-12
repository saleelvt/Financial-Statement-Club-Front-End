
import React,{Fragment} from "react"
import { AdminLogin } from "./components/forms/admin/login"
// import { AdminNavbar } from "./components/Navbar/adminNavbar"
import { SignUp } from "./components/pages/welcome";
import { Routes, Route, } from "react-router-dom";

import { Toaster } from "react-hot-toast"

export const App:React.FC = React.memo(()=>{


  return ( 
    <Fragment>
        <Toaster position="top-center" />
        <Routes>



        <Route path="/" element={<SignUp/>} /> 
        <Route path="/adminLogin" element={<AdminLogin/>} /> 
        <Route path="/adminHomePage" element={<AdminLogin/>} /> 
          
   
      </Routes>
    </Fragment>
  )

})