import React, { useState } from "react";
import PropTypes from "prop-types";
import EyeSlash from "../../static/svg/eye-slash";
import Eye from "../../static/svg/eye";

const TextField = ({
    label,
    type,
    name,
    value,
    onChange,
    error,
    blurHandler,
    dirty
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const handleChange = (e) => {
        onChange({ name: e.target.name, value: e.target.value });
    };

    const getInputClasses = () => {
        return "form-control" + (error && dirty ? " is-invalid" : "");
    };
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    return (
        <div className="mb-4">
            <label htmlFor={name}> {label}</label>
            <div className="input-group has-validation">
                <input
                    type={showPassword ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    onBlur={blurHandler}
                    className={getInputClasses()}
                />

                {type === "password" && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? <Eye /> : <EyeSlash />}
                    </button>
                )}
                {error && dirty && (
                    <div className="invalid-feedback ">{error}</div>
                )}
            </div>
        </div>
    );
};
TextField.defaultProps = {
    type: "text"
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    blurHandler: PropTypes.func,
    dirty: PropTypes.bool,
    error: PropTypes.string
};

export default TextField;
