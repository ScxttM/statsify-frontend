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
    const response = await axios.get(url, config).catch(error => {
        return getMusicHistoryFromDB();
    });
    // console.log(response.data);
    return response.data.items;
}

async function getMusicHistoryFromDB() {
    const url = 'http://localhost:3000/api/history';
    const response = await axios.get(url).catch(error => {
        console.log(error);
    });
    console.log(response.data);
    return response.data;
}

async function syncDB(tracks, id_user) {
    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };
    const data = {
        id_user: id_user,
        tracks: tracks
    };
    const url = process.env.REACT_APP_API_URL + '/api/history';
    await axios.put(url, data, config).catch(error => {
        console.log(error);
    });
}

function History(props) {
    const token = props.token;
    const [musicHistory, setMusicHistory] = useState([]);
    const navigate = useNavigate();
    const [userProfile] = useState(props.userProfile);
    const [id_user, setId_user] = useState(userProfile.id);

    useEffect(() => {
        setId_user(userProfile.id);
    }, [userProfile]);

    useEffect(() => {
        getMusicHistory(token).then(data => {
            setMusicHistory(data);
            if (data.length > 0) {
                syncDB(data, id_user);
            }
        })
    }, [token, id_user]);


    function handleClick(id) {
        navigate(`/track/${id}`);
    }

    const TableItem = (item, index) => (
        < tr key={item.played_at} onClick={() => handleClick(item.track.id)}>
            <td>{index + 1}</td>
            <td>{item.track.name}</td>
            <td>{item.track.artists[0].name}</td>
            <td>{item.track.album.name}</td>
            <td>{format(new Date(item.played_at), "d MMM yyyy, hh:mma")}</td>
        </tr>
    );

    const RecentlyPlayed = () => (
        <div className="recently-played">
            <h1>Recent Tracks</h1>
            <table className="table table-light table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Song title</th>
                        <th>Artists</th>
                        <th>Album</th>
                        <th>Played at</th>
                    </tr>
                </thead>
                <tbody>{musicHistory.map((e, index) => TableItem(e, index))}</tbody>
            </table>
        </div>
    );

    return (
        <div className="App">
            <header className="header">
                {musicHistory.length !== 0 ? <RecentlyPlayed /> : null}
            </header>
        </div>
    );
}
export default History;