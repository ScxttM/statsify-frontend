import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'jquery/dist/jquery.min.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
// import format from 'date-fns/format';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import TopTracks from './pages/TopTracks';
import TopArtists from './pages/TopArtists';
import History from './pages/History';
import Profile from './pages/Profile';
import Track from './pages/Track';
import Home from './pages/Home';

async function getCurrentUserProfile(token) {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const url = 'https://api.spotify.com/v1/me';
  await axios.get(url, config).then(response => {
    sessionStorage.setItem('userProfile', JSON.stringify(response.data));
    profileSync(response.data);
    // console.log(response.data);
    return response.data;
  }).catch(error => {
    console.log(error);
  });
}

async function profileSync(user) {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  const data = user;
  const url = process.env.REACT_APP_API_URL + '/api/users';
  await axios.put(url, data, config).catch(error => {
    console.log(error);
  });
}

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


function refreshToken() {
  const refreshToken = sessionStorage.getItem('refreshToken');
  const url = process.env.REACT_APP_API_URL + '/refresh_token';
  const data = {
    refresh_token: refreshToken,
  };
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  axios.get(url, data, config).then(response => {
    if (response.data.access_token) {
      console.log('Token refreshed');
      sessionStorage.setItem('token', JSON.stringify(response.data.access_token));
    }
  });
}

function App() {
  const [token, setToken] = useState(undefined);
  const [userProfile, setUserProfile] = useState(JSON.parse(sessionStorage.getItem('userProfile')));
  // const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (token !== undefined) {
      getCurrentUserProfile(token).then(() => {
        setUserProfile(JSON.parse(sessionStorage.getItem('userProfile')));
        // setAuthorized(true);
      });
    }
  }, [token]);

  function handleAuth() {
    setToken(getToken());
    // setAuthorized(true);
  }

  if (!token) {
    return (
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login/callback/*" element={<Login handleAuth={handleAuth} saveToken={saveToken} auth={true} />} />
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
            <Route path="topTracks" element={<TopTracks token={token} refreshToken={refreshToken} />} />
            <Route path="topArtists" element={<TopArtists token={token} refreshToken={refreshToken} />} />
            <Route path="history" element={<History token={token} refreshToken={refreshToken} userProfile={userProfile} />} />
            <Route path="profile/me" element={<Profile refreshToken={refreshToken} userProfile={userProfile} />} />
            <Route path="track/:id" element={<Track token={token} refreshToken={refreshToken} />} />
            <Route path="artist/:id" element={<Track token={token} refreshToken={refreshToken} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
