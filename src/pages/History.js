import format from "date-fns/format";
import { useEffect, useState } from "react";
import axios from "axios";
import "./History.css";
import { useNavigate } from 'react-router-dom';

// const apiUrl = process.env.REACT_APP_API_URL;

async function getMusicHistory(token) {
    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const url = 'https://api.spotify.com/v1/me/player/recently-played?limit=25';
    const response = await axios.get(url, config);
    // console.log(response.data);
    return response.data.items;
}

function History(props) {
    const token = props.token;
    const [musicHistory, setMusicHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getMusicHistory(token).then(data => {
            setMusicHistory(data);
        });
    }, [token]);

    function handleClick(id) {
        navigate(`/track/${id}`);
    }

    const TableItem = (item, index) => (
        < tr key={item.played_at} onClick={() => handleClick(item.track.id)}>
            <td>{index + 1}</td>
            <td>{item.track.name}</td>
            <td>{format(new Date(item.played_at), "d MMM yyyy, hh:mma")}</td>
        </tr>
    );

    const RecentlyPlayed = () => (
        <div className="recently-played">
            <h2>Recent Tracks</h2>
            <table className="table table-dark table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Song title</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>{musicHistory.map((e, index) => TableItem(e, index))}</tbody>
            </table>
        </div>
    );

    return (
        <div className="App">
            <header className="header">
                <h1>Spotify Listening History</h1>
                <p>View your music history in realtime with Spotify</p>

                {musicHistory.length !== 0 ? <RecentlyPlayed /> : null}
            </header>
        </div>
    );
}
export default History;