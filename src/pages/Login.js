import './Login.css';

function Login() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.has("failed")) {
        return (
            <div className="header">
                <h1>Welcome to Statsify!</h1>
                <p>View your statistics from Spotify</p>
                <a href={apiUrl + "/login"}>
                    Connect your Spotify account
                </a>
                <span className='failed'>Authentication failed, try again.</span>
            </div >
        );
    }
    return (
        <div className="header">
            <h1>Welcome to Statsify!</h1>
            <p>View your statistics from Spotify</p>
            <a href={apiUrl + "/login"}>
                Connect your Spotify account
            </a>
        </div>
    );
}

export default Login;