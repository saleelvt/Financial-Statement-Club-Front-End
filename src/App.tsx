// src/App.tsx
import React, { Fragment, lazy, Suspense } from 'react';
import { Routes, Route,Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Loading } from './components/pages/Loading';


// Lazy-load each page component
// import { UserHomePage } from './components/pages/user/userHome';
const UserHomePage = lazy(() => import('./components/pages/user/userHome'));
import { DocumentList } from './components/pages/admin/documentList';
import { AdminLogin } from './components/forms/admin/login';
import AdminHomePage from './components/pages/admin/adminDashBoard';
import { AddDocument } from './components/pages/admin/addDocumentEn';
import { useSelector } from 'react-redux';
import { RootState } from './reduxKit/store';

export const App: React.FC = React.memo(() => {

  const {isLogged,role,}=useSelector((state:RootState)=>state.auth)
  console.log("my role and my isLogged", isLogged,role);

  return (
    <Fragment>
      <Toaster position="top-center" />
      {/* Wrap Routes in Suspense for lazy-loaded components */}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={ <UserHomePage/>} />
          <Route path="/adminLogin" element={isLogged && role === 'admin' ? <Navigate to="/adminHomepage" /> : <AdminLogin />} />
          <Route path="/adminHomepage" element={isLogged && role === 'admin' ? <AdminHomePage /> : <AdminLogin />} />
          <Route path="/adminAddDocument" element={isLogged &&  role === 'admin' ? <AddDocument /> : <AdminLogin />}/>
          <Route path="/adminDocumentList" element={isLogged &&  role === 'admin' ? <DocumentList /> : <AdminLogin />} />
        </Routes>
      </Suspense>
    </Fragment>
  );
});
