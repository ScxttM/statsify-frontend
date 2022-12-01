import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

async function getTrack(token, id) {
    const config = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, config);
    console.log(response.data);
    return response.data;
}

function Track(props) {
    const [track, setTrack] = useState([]);
    const token = props.token;
    const params = useParams();

    console.log(token);
    console.log(params);

    useEffect(() => {
        getTrack(token, params.id).then(data => {
            setTrack(data);
        });
    }, [params.id, token]);

    return (
        <div className="container d-flex">
            <h1>{track.name}</h1>
        </div>
    );
}
export default Track;