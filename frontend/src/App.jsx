import React, { useEffect } from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store';
import { checkAuthStatus } from "./store/slices/authSlice";
import AppRouter from './AppRouter';
import Navbar from './components/Navbar/Navbar';

import "./App.css";

function AuthCheck({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  return children;
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthCheck>
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <div className="center-content">
                <AppRouter />
              </div>
            </main>
          </div>
        </AuthCheck>
      </Router>
    </Provider>
  );
}

export default App;