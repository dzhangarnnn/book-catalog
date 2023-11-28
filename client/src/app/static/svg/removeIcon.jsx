import React from "react";
import PropTypes from "prop-types";

const RemoveIcon = ({ role, ...rest }) => {
    const isActive = role !== "ADMIN";

    return (
        <button
            disabled={!isActive}
            className="btn btn-outline-danger btn-sm"
            {...rest}
        >
            <span aria-hidden="true">X</span>
        </button>
    );
};

RemoveIcon.propTypes = {
    role: PropTypes.string.isRequired
};

export default RemoveIcon;
