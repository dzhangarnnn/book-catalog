import { React, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, loadUsersList } from "../../store/users.js";
import LoadSpinner from "../loadSpinner.jsx";

const UsersLoader = ({ children }) => {
    const dataStatus = useSelector(getDataStatus());
    const dispatch = useDispatch();
    useEffect(() => {
        if (!dataStatus) dispatch(loadUsersList());
    }, [dataStatus]);
    if (!dataStatus) return <LoadSpinner />;
    return children;
};

UsersLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
export default UsersLoader;
