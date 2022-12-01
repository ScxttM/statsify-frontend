import { useEffect, useState } from 'react';
import './Login.css';
import axios from 'axios';

async function getAccessToken() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    const url = process.env.REACT_APP_API_URL + `/login/callback?code=${code}`;
    const response = await axios.get(url, { code: code }, config).catch(error => {
        console.log(error);
    });
    // console.log(response.data);
    return response.data;
}

function Login(props) {
    const apiUrl = process.env.REACT_APP_API_URL;
    const urlParams = new URLSearchParams(window.location.search);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        if (props.callback || urlParams.get('code') !== null) {
            getAccessToken().then(data => {
                console.log(data);
                props.saveToken(data.access_token, data.refresh_token);
                props.handleAuth();
                setAuthorized(true);
            });
        }
    }, [props]);

    if (authorized) {
        window.location.href = '/';
        return (
            <div className="container d-flex">
                <h1>Redirecting...</h1>
            </div>
        );
    } else {
        return (
            <div className="header">
                <h1>Welcome to Statsify!</h1>
                <p>View your statistics from Spotify</p>
                <a href={apiUrl + "/login"}>
                    Connect your Spotify account
                </a>
                {urlParams.has('failed') ? <span className='failed'>Authentication failed, try again.</span> : null}
            </div >
        );
    }
}


export default Login;