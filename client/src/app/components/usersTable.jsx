import React from "react";
import PropTypes from "prop-types";
import Table from "../components/table";
import RemoveIcon from "../static/svg/removeIcon";

const UserTable = ({ users, onSort, selectedSort, onDelete }) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя"
        },
        email: {
            path: "email",
            name: "Электронная почта"
        },
        roles: {
            path: "roles",
            name: "Статус пользователя"
        },
        delete: {
            component: (user) => (
                <RemoveIcon
                    onClick={() => onDelete(user._id)}
                    role={user.roles[0]}
                />
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onDelete: PropTypes.func
};

export default UserTable;
