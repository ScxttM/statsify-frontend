import React from 'react';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import './App.css';
// import format from 'date-fns/format';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Home from './pages/Home';
import History from './pages/History';

function setToken(userToken) {
  window.history.replaceState({}, document.title, "/");
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken ? userToken : undefined;
}

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  const [isUserAuthorized, setIsAuthorized] = useState(urlParams.has("authorized") ? true : false);
  if (isUserAuthorized) {
    setToken(urlParams.get("access_token"));
  }
  // const token = getToken();
  const token = getToken();

  if (!token) {
    return (
      <div className='App'>
        <Login setToken={setToken} />
      </div>
    );
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="history" element={<History />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
