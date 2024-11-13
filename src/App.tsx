
import React,{Fragment} from "react"
import { AdminLogin } from "./components/forms/admin/login"
import { AddDocument } from "./components/pages/admin/addDocument";
import { SignUp } from "./components/pages/welcome";
import { Routes, Route, } from "react-router-dom";
import AdminHomePage from "./components/pages/admin/adminDashBoard"
import { Toaster } from "react-hot-toast"

export const App:React.FC = React.memo(()=>{


  return ( 
   
    <Fragment>
        <Toaster position="top-center" />
        <Routes>
        <Route path="/" element={<SignUp/>} /> 
        <Route path="/adminLogin" element={<AdminLogin/>} /> 
        <Route path="/adminHomepage" element={<AdminHomePage/>} /> 
        <Route path="/adminAddDocument" element={<AddDocument/>} /> 
          
      </Routes>
    </Fragment>
  )

})