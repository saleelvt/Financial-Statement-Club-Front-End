// src/App.tsx
import React, { Fragment, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Loading } from './components/pages/Loading';

// Lazy-load each page component
const UserHomePage = lazy(() => import('./components/pages/user/userHome'));
import { AdminLogin } from './components/forms/admin/login';
import AdminHomePage from './components/pages/admin/adminDashBoard';
import { AddDocument } from './components/pages/admin/addDocument';
// const AdminLogin = lazy(() => import('./components/forms/admin/login'));
// const AdminHomePage = lazy(() => import('./components/pages/admin/adminDashBoard'));
// const AddDocument = lazy(() => import('./components/pages/admin/addDocument'));

export const App: React.FC = React.memo(() => {
  return (
    <Fragment>
      <Toaster position="top-center" />
      {/* Wrap Routes in Suspense for lazy-loaded components */}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<UserHomePage />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminHomepage" element={<AdminHomePage />} />
          <Route path="/adminAddDocument" element={<AddDocument />} />
        </Routes>
      </Suspense>
    </Fragment>
  );
});
