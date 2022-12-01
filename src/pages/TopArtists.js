import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./TopArtists.css";

async function getTopArtists(token) {
    const config = {
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
    const url = 'https://api.spotify.com/v1/me/top/artists?limit=12&time_range=long_term';
    const response = await axios.get(url, config).catch(error => {
        console.log(error);
    });
    // syncDB(data.data.items);
    return response.data.items;
}

function TopArtists(props) {
    const token = props.token;
    const navigate = useNavigate();
    const [topArtists, setTopArtists] = useState([]);

    useEffect(() => {
        getTopArtists(token).then(data => {
            setTopArtists(data);
        });
    }, [token]);

    function handleClick(id) {
        navigate(`/artist/${id}`);
    }

    const Card = (item, index) => (
        <div className="card m-3" key={item.id} onClick={() => handleClick(item.id)}>
            <img src={item.images[0].url} className="card-img-top" alt={item.images[1].url} />
            <div className="card-body">
                <h5 className="card-title">{index + 1 + '. ' + item.name}</h5>
                <p className="card-text" >{item.genres.map(genre => genre).join(', ')}</p>
                {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
            </div >
        </div >
    );

    return (
        <>
            <h1>Top Artists</h1>
            <div className="container d-flex text-center flex-wrap">
                {topArtists.map((e, index) => Card(e, index))}
            </div >

        </>
    )
}
export default TopArtists;