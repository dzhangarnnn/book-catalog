import React from "react";
import PropTypes from "prop-types";

const UserCard = ({ name, email }) => {
    return (
        <div className="card m-3 p-0">
            <div className="card-body bg-light">
                <h5 className="card-title">{name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{email}</h6>
            </div>
        </div>
    );
};

UserCard.propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
};

export default UserCard;
