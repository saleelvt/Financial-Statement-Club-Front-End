


// import { useSelector } from "react-redux"
import { AdminNavbar } from "../../Navbar/adminNavbar"
// import { RootState } from "../../../reduxKit/store"
import AdminSidebar from "../../sidePanals/adminSidePanel"
// import { Button } from "@nextui-org/react"



// Inside JSX

  
function AdminHomePage() {
  return (
    <div className="flex flex-col w-full bg-gray-200">    
    <AdminNavbar/> 
    <header className="w-full bg-purple-500 bg-gray-800 text-white">
 
        < AdminSidebar/> 
      </header>
    </div> 
  ) 
  
}

export default AdminHomePage
