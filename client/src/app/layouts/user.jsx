import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { getCurrentUserData, getCurrentUserId } from "../store/users";
import UserPage from "../pages/userPage";

const User = () => {
    const { userId } = useParams();
    const currentUserId = useSelector(getCurrentUserId());
    const user = useSelector(getCurrentUserData());

    return (
        <div>
            {userId === currentUserId ? (
                <UserPage user={user} />
            ) : (
                <Navigate to={`/users/${currentUserId}`} />
            )}
        </div>
    );
};

export default User;
