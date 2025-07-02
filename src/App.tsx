// src/App.tsx
import React, { Fragment, lazy, Suspense } from 'react';
import { Routes, Route,Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {  RootState } from './reduxKit/store';
import { Toaster } from 'react-hot-toast';

const Loading = lazy(() => import("./components/pages/Loading"));
const CheckDocumentDetails = lazy(() => import("./components/pages/admin/Document/checkDocumentDetails"));
const UserCompanyDetails = lazy(() => import("./components/pages/user/userCheckDetails"));
const UpdateDocumentAr = lazy(() => import("./components/pages/admin/Document/updateDocumentAr"));
const UserHomePage = lazy(() => import("./components/pages/user/userHome"));
const DocumentList = lazy(() => import("./components/pages/admin/Document/documentList"));
const AdminLogin = lazy(() => import("./components/forms/admin/login"));
const AdminHomePage = lazy(() => import("./components/pages/admin/adminDashBoard"));
const EmailVerification = lazy(() => import("./components/forms/admin/otpVerifiy"));
// import { UserCompanyDetailsNew } from './components/pages/user/old';
const AddNewTable=lazy(() => import("./components/pages/admin/addTable"));
const AddDocumentArabic = lazy(() => import("./components/pages/admin/Document/addDocumentAr"));
const UpdateDocument = lazy(() => import("./components/pages/admin/Document/updateDocument"));
const AdminProfilePage = lazy(() => import("./components/pages/admin/adminProfile"));


 

export const App: React.FC = React.memo(() => {
  const {isLogged,role,}=useSelector((state:RootState)=>state.auth)
  console.log("my role and my isLogged", isLogged,role);
  
  return (
    <Fragment>
      <Toaster position="top-center" />
      <Suspense fallback={<Loading />}>
 
        <Routes>
          <Route path="/" element={ <UserHomePage/>} />
  
          <Route path="/verify" element={ <EmailVerification/>} />
       
          <Route path="/companyDetails" element={ <UserCompanyDetails /> } />
          <Route path="/login" element={isLogged && role === 'admin' ? <Navigate to="/home" /> : <AdminLogin />} />
          <Route path="/home" element={isLogged && role === 'admin' ? <AdminHomePage /> : <AdminLogin />} />
          <Route path="/addDocument" element={isLogged &&  role === 'admin' ? <AddDocumentArabic /> : <AdminLogin />}/>
          <Route path="/addNewTable" element={isLogged &&  role === 'admin' ? <AddNewTable /> : <AdminLogin />}/>
          {/* <Route path="/newOldTableshow" element={ <UserCompanyDetailsNew /> }/> */}
          <Route path="/documentList" element={isLogged &&  role === 'admin' ? <DocumentList /> : <AdminLogin />} />
          <Route path="/updateDocument" element={isLogged &&  role === 'admin' ? <UpdateDocument /> : <AdminLogin />} />
          <Route path="/updateDocumentAr" element={isLogged &&  role === 'admin' ? <UpdateDocumentAr /> : <AdminLogin />} />
          <Route path="/documentDetails" element={isLogged &&  role === 'admin' ? <CheckDocumentDetails /> : <AdminLogin />} />
          <Route path="/admin/profile" element={isLogged &&  role === 'admin' ? <AdminProfilePage /> : <AdminLogin />} />
        </Routes>

      </Suspense>
    </Fragment>
  );
});
