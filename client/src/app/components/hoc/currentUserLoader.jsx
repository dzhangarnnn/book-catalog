import { React, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    getCurentUserLoadingStatus,
    getIsLoggedIn,
    loadCurrentUser
} from "../../store/users";
import LoadSpinner from "../loadSpinner";

const CurrentUserLoader = ({ children }) => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    const dispatch = useDispatch();
    const currentUserStatusLoading = useSelector(getCurentUserLoadingStatus());

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(loadCurrentUser());
        }
    }, [isLoggedIn]);

    if (currentUserStatusLoading) {
        return (
            <>
                <LoadSpinner />
            </>
        );
    }
    return children;
};

CurrentUserLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default CurrentUserLoader;
