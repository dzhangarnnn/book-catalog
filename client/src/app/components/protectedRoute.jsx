import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { getIsLoggedIn } from "../store/users";

const ProtectedRoute = ({ children, ...rest }) => {
    const location = useLocation();
    const isLoggedIn = useSelector(getIsLoggedIn());

    if (!isLoggedIn) {
        return <Navigate to="/login/login" state={{ from: location }} />;
    }
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRoute;
