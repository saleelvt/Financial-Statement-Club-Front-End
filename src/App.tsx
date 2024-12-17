// src/App.tsx
import React, { Fragment, lazy, Suspense } from 'react';
import { Routes, Route,Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Loading } from './components/pages/Loading';
import { CheckDocumentDetails } from './components/pages/admin/checkDocumentDetails';
import { UserCompanyDetails } from './components/pages/user/userCheckDetails';
import { UpdateDocumentAr } from './components/pages/admin/updateDocumentAr';
const UserHomePage = lazy(() => import('./components/pages/user/userHome'));
import { DocumentList } from './components/pages/admin/documentList';
import { AdminLogin } from './components/forms/admin/login';
import AdminHomePage from './components/pages/admin/adminDashBoard';

import { AddDocumentArabic } from './components/pages/admin/addDocumentAr';
import {UpdateDocument} from './components/pages/admin/updateDocument';
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
          <Route path="/login" element={isLogged && role === 'admin' ? <Navigate to="/home" /> : <AdminLogin />} />
          <Route path="/home" element={isLogged && role === 'admin' ? <AdminHomePage /> : <AdminLogin />} />
          <Route path="/addDocument" element={isLogged &&  role === 'admin' ? <AddDocumentArabic /> : <AdminLogin />}/>
          <Route path="/documentList" element={isLogged &&  role === 'admin' ? <DocumentList /> : <AdminLogin />} />
          <Route path="/updateDocument" element={isLogged &&  role === 'admin' ? <UpdateDocument /> : <AdminLogin />} />
          <Route path="/updateDocumentAr" element={isLogged &&  role === 'admin' ? <UpdateDocumentAr /> : <AdminLogin />} />
          <Route path="/documentDetails" element={<CheckDocumentDetails /> } />
          <Route path="/companyDetails" element={ <UserCompanyDetails /> } />
        </Routes>
      </Suspense>
    </Fragment>
  );
});
