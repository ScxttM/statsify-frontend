import { useState } from "react";

function Profile(props) {
    const [userProfile] = useState(props.userProfile);

    return (
        <div className="container p-4">
            <div className="profile">
                <img src={userProfile.images[0].url} alt='Profile' />
            </div>
            <div className="profile-info p-4 ">
                <h1>{userProfile.display_name}</h1>
                <p>{userProfile.email}</p>
                <p>{userProfile.country}</p>
            </div>
        </div>
    )
}
export default Profile;