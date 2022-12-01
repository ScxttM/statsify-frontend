import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

async function getTrack(token, id) {
    const config = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(`https://api.spotify.com/v1/tracks/${id}`, config).catch((error) => {
        return getTrackFromDB(id);
    });
    console.log(response.data);
    syncTrack(response.data);
    return response.data;
}

async function syncTrack(track) {
    const config = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };
    const data = track;
    const url = process.env.REACT_APP_API_URL + "/api/tracks";
    await axios.put(url, data, config).catch((error) => {
        console.log(error);
    });
}

async function getTrackFromDB(id) {
    const config = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/tracks/${id}`, config).catch((error) => {
        console.log(error);
    });
    console.log(response.data);
    return response.data;
}

async function updateRating(rating, id, track) {
    const config = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };
    const data = {
        id_track: id,
        name: track.name,
        artists: track.artists,
        album: track.album.name,
        rating: rating,
    };
    const url = process.env.REACT_APP_API_URL + `/api/tracks/${id}`;
    await axios.put(url, data, config).catch((error) => {
        console.log(error);
    });
}

function Track(props) {
    const [track, setTrack] = useState(undefined);
    const token = props.token;
    const params = useParams();

    console.log(token);
    console.log(params);

    useEffect(() => {
        getTrack(token, params.id).then(data => {
            setTrack(data);
        });
    }, [params.id, token]);

    const ratingChanged = (newRating) => {
        console.log(newRating);
        updateRating(newRating, params.id, track);
    };

    // const Comments = () => (
    //     <div className="comments">
    //         <h1>Comments</h1>
    //         <div className="comment">
    //             <div className="comment-header">
    //                 <div className="comment-user">
    //                     <img src="https://i.pravatar.cc/50" alt="user" />
    //                     <div className="comment-user-info">
    //                         <h3>John Doe</h3>
    //                         <p>2021-01-01</p>
    //                     </div>
    //                 </div>
    //                 <div className="comment-rating">
    //                     <ReactStars
    //                         count={5}
    //                         onChange={ratingChanged}
    //                         size={24}
    //                         activeColor="#ffd700"
    //                     />
    //                 </div>
    //             </div>
    //             <div className="comment-body">
    //                 <p>
    //                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
    //                     aliquet, nisl eget aliquam tincidunt, nunc nisl aliquam massa,
    //                     eget aliquam nisl nunc eget dolor. Sed aliquet, nisl eget
    //                     aliquam tincidunt, nunc nisl aliquam massa, eget aliquam nisl
    //                     nunc eget dolor.
    //                 </p>
    //             </div>
    //         </div>
    //     </div>
    // );

    if (track !== undefined) {
        return (
            <div className="container m-3">
                <img src={track.album.images[0].url} alt={track.name} />
                <h1>{track.name}</h1>
                <h3>{track.artists[0].name}</h3>
                <div className="d-flex justify-content-center">
                    <ReactStars size={75}
                        activeColor="#14853c"
                        onChange={ratingChanged} />
                </div>
            </div>
        );
    } else {
        return (
            <div className="container m-3">
                <h1>The track you're looking for, doesn't exist.</h1 >
            </div>
        );
    }
}
export default Track;