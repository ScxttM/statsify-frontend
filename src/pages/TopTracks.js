import { useEffect, useState } from "react";
import axios from "axios";
import "./History.css";
import { useNavigate } from 'react-router-dom';

async function getTopTracks(token) {
    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const url = 'https://api.spotify.com/v1/me/top/tracks?limit=25&time_range=long_term';
    const response = await axios.get(url, config).catch(error => {
        // return getTopTracksFromDB();
    });
    // console.log(response.data);
    return response.data.items;
}

function TopTracks(props) {
    const token = props.token;
    const [topTracks, setTopTracks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getTopTracks(token).then(data => {
            setTopTracks(data);
            console.log(data);
        });
    }, [token]);

    function handleClick(id) {
        navigate(`/track/${id}`);
    }

    const TableItem = (item, index) => (
        < tr key={item.id} onClick={() => handleClick(item.id)}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.artists[0].name}</td>
            <td>{item.album.name}</td>
        </tr>
    );

    const Top = () => (
        <div className="top-tracks">
            <h1>Top Tracks</h1>
            <table className="table table-light table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Song title</th>
                        <th>Artists</th>
                        <th>Album</th>
                    </tr>
                </thead>
                <tbody>{topTracks.map((e, index) => TableItem(e, index))}</tbody>
            </table>
        </div>
    );

    return (
        <div className="App">
            <header className="header">
                {topTracks.length !== 0 ? <Top /> : null}
            </header>
        </div>
    )
}
export default TopTracks;