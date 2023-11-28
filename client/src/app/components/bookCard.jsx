import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BookMark from "./bookmark";
import noCover from "../../app/assets/no_cover_thumb.gif";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn } from "../store/users";

const BookCard = ({ book, user, updateUser, isBookmarks }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const status = user?.bookmarks.some((b) => b.bookId === book._id);
    const read = user?.bookmarks.some(
        (b) => b.bookId === book._id && b.read === true
    );
    const isLoggedIn = useSelector(getIsLoggedIn());
    const navigate = useNavigate();
    const authors = book.authors?.join(", ");
    const img = book.imageLinks?.thumbnail;
    const title = book.title;
    const firstCategory = book.categories?.[0];

    const handleToggleBookmark = (id) => {
        if (!isLoggedIn) {
            navigate("/login/login", { state: { from: location } });
        } else {
            if (status) {
                dispatch(
                    updateUser({
                        ...user,
                        bookmarks: [
                            ...user.bookmarks.filter((b) => b.bookId !== id)
                        ]
                    })
                );
            } else {
                dispatch(
                    updateUser({
                        ...user,
                        bookmarks: [
                            ...user.bookmarks,
                            { bookId: id, read: false }
                        ]
                    })
                );
            }
        }
    };

    const handleToggleRead = (id) => {
        dispatch(
            updateUser({
                ...user,
                bookmarks: [
                    ...user.bookmarks.map((b) => {
                        if (b.bookId === id) {
                            return { ...b, read: !read };
                        }
                        return b;
                    })
                ]
            })
        );
    };

    return (
        <div className="card bg-light text-center h-100">
            <div className="card-img-container d-flex justify-content-center p-4">
                <Link
                    to={`/books/${book._id}`}
                    state={{ from: location }}
                    className="text-decoration-none text-reset"
                >
                    <img
                        className="card-img-top shadow"
                        src={img || noCover}
                        alt={`${book.title}`}
                    />
                </Link>
            </div>

            <div className="card-body ">
                <h6 className="card-subtitle fw-light  my-2">
                    {firstCategory}
                </h6>
                <Link
                    to={`/books/${book._id}`}
                    state={{ from: location }}
                    className="text-decoration-none text-reset"
                >
                    <h5 className="card-title">{title}</h5>
                </Link>

                <p className="card-text fw-light">{authors}</p>
            </div>
            <div className="bookmark-card">
                <BookMark
                    status={status}
                    onClick={() => handleToggleBookmark(book._id)}
                />
            </div>
            {isBookmarks && (
                <button
                    className="btn btn-secondary"
                    onClick={() => handleToggleRead(book._id)}
                >
                    {read
                        ? "удалить из прочитанного"
                        : "добавить в прочитанное"}
                </button>
            )}
        </div>
    );
};

BookCard.propTypes = {
    book: PropTypes.object,
    user: PropTypes.object,
    updateUser: PropTypes.func,
    isBookmarks: PropTypes.bool
};

export default BookCard;
