import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items, selectedItem, onItemSelect, horizontal }) => {
    const groupListClass = horizontal
        ? "list-group list-group-horizontal-md"
        : "list-group ";

    return (
        <ul className={groupListClass}>
            {items.map((item, i) => (
                <li
                    key={item.value + i}
                    className={
                        "list-group-item" +
                        (item.value === selectedItem
                            ? " list-group-item-dark"
                            : "")
                    }
                    onClick={() => onItemSelect(item.value)}
                    role="button"
                >
                    {item.name}
                </li>
            ))}
        </ul>
    );
};

GroupList.defaultProps = {
    horizontal: false
};

GroupList.propTypes = {
    items: PropTypes.array.isRequired,
    selectedItem: PropTypes.string,
    onItemSelect: PropTypes.func,
    horizontal: PropTypes.bool
};

export default GroupList;
