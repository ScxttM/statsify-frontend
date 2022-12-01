import { Link } from 'react-router-dom'
function Home() {
    return (
        <div className="container">
            <h1>Welcome to Statsify</h1>
            <h3>View your statistics from Spotify</h3>
            <div className="buttons m-3">
                <Link to="/profile/me">
                    <button className="btn btn-primary m-3">Profile</button>
                </Link>
                <Link to="/topArtists">
                    <button className="btn btn-primary m-3">Top Artists</button>
                </Link>
                <Link to="/topTracks">
                    <button className="btn btn-primary m-3">Top Tracks</button>
                </Link>
                <Link to="/history">
                    <button className="btn btn-primary m-3">Recently Played</button>
                </Link>
            </div>
        </div>
    )

}
export default Home;