import { Outlet, Link } from "react-router-dom"

const Navigation = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">Statsify</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/topTracks"> Top Tracks </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/topArtist"> Top Artist </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/history"> History </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile/me"> Profile </Link>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Navigation;
