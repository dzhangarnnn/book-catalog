import React, { useEffect, useState } from "react";
import _ from "lodash";
import { paginate } from "../utils/paginate";
import Pagination from "../components/pagination";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList, removeUser } from "../store/users";
import UserTable from "../components/usersTable";

const UsersList = () => {
    const users = useSelector(getUsersList());
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const pageSize = 2;

    const handleSort = (item) => {
        setSortBy(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleDelete = (userId) => {
        dispatch(removeUser(userId));
    };

    const count = users?.length;
    const sortedUsers = _.orderBy(users, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    useEffect(() => {
        if (count % pageSize === 0) {
            setCurrentPage(count / pageSize) || setCurrentPage(1);
        }
    }, [count]);

    return (
        <>
            {count > 0 && (
                <div className="d-flex flex-column">
                    <UserTable
                        users={usersCrop}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        onDelete={handleDelete}
                    />
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default UsersList;
