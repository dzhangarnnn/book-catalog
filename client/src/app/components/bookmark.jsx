import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, ...rest }) => {
    return (
        <i
            className={"bi bi-bookmark" + (status ? "-heart-fill" : "")}
            {...rest}
            role="button"
        ></i>
    );
};

BookMark.propTypes = {
    status: PropTypes.bool
};

export default BookMark;
