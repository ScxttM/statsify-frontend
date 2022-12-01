import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'jquery/dist/jquery.min.js';
import { BrowserRouter, Routes, Route, } from 'react-router-dom';
import './App.css';
// import format from 'date-fns/format';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Home from './pages/Home';
import TopTracks from './pages/TopTracks';
import TopArtists from './pages/TopArtists';
import History from './pages/History';
import Profile from './pages/Profile';
import Track from './pages/Track';

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken ? userToken : undefined;
}

function saveToken(userToken, refreshToken) {
  window.history.replaceState({}, document.title, "/");
  sessionStorage.setItem('token', JSON.stringify(userToken));
  sessionStorage.setItem('refreshToken', JSON.stringify(refreshToken));
}

function App() {
  const [token, setToken] = useState(getToken());

  function handleAuth() {
    setToken(getToken());
  }

  if (!token) {
    return (
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="login/callback/*" element={<Login handleAuth={handleAuth} saveToken={saveToken} callback={true} />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path="topTracks" element={<TopTracks />} />
            <Route path="topArtists" element={<TopArtists />} />
            <Route path="history" element={<History token={token} />} />
            <Route path="profile/me" element={<Profile />} />
            <Route path="*" element={<Home />} />
            <Route path="track/:id" element={<Track token={token} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
