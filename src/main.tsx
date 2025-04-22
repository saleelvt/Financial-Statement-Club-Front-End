// src/main.tsx
import { createRoot } from 'react-dom/client';
import { lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './reduxKit/store';
import "../src/global.css"
import { App } from './App';
import { Suspense } from 'react';

const Loading = lazy(() => import("../src/components/pages/Loading"));

createRoot(document.getElementById('root')!).render(
  <Router>
    <Provider store={store}>
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    </Provider>
  </Router>
);




