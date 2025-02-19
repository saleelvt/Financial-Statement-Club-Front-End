// src/App.tsx
import React, { Fragment, lazy, Suspense } from 'react';
import { Routes, Route,Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Loading } from './components/pages/Loading';
const CheckDocumentDetails = lazy(() => import('./components/pages/admin/checkDocumentDetails'));
const UserCompanyDetails = lazy(() => import('./components/pages/user/userCheckDetails'));
import { UpdateDocumentAr } from './components/pages/admin/updateDocumentAr';
const UserHomePage = lazy(() => import('./components/pages/user/userHome'));
const DocumentList = lazy(() => import('./components/pages/admin/documentList'));
import { AdminLogin } from './components/forms/admin/login';
import AdminHomePage from './components/pages/admin/adminDashBoard';
const EmailVerification = lazy(() => import('./components/forms/admin/otpVerifiy'));
import { AddTable } from './components/pages/admin/addTable';
import { AddDocumentArabic } from './components/pages/admin/addDocumentAr';
import {UpdateDocument} from './components/pages/admin/updateDocument'
import { useSelector } from 'react-redux';
import { RootState } from './reduxKit/store';

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
          <Route path="/addTable" element={isLogged &&  role === 'admin' ? <AddTable /> : <AdminLogin />}/>
          <Route path="/documentList" element={isLogged &&  role === 'admin' ? <DocumentList /> : <AdminLogin />} />
          <Route path="/updateDocument" element={isLogged &&  role === 'admin' ? <UpdateDocument /> : <AdminLogin />} />
          <Route path="/updateDocumentAr" element={isLogged &&  role === 'admin' ? <UpdateDocumentAr /> : <AdminLogin />} />
          <Route path="/documentDetails" element={isLogged &&  role === 'admin' ? <CheckDocumentDetails /> : <AdminLogin />} />
        </Routes>
      </Suspense>
    </Fragment>
  );
});
