import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function useDebounce(value, delay) {
    const [valueDebounced, setValueDebounced] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setValueDebounced(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value]);

    return valueDebounced;
}

useDebounce.propTypes = {
    value: PropTypes.string,
    delay: PropTypes.number
};
