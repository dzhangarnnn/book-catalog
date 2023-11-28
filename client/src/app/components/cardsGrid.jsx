import React from "react";
import PropTypes from "prop-types";
import BookCard from "./bookCard";
import { useSelector } from "react-redux";
import { getCurrentUserData, updateUser } from "../store/users";

const CardsGrid = ({ books, isBookmarks }) => {
    const user = useSelector(getCurrentUserData());

    const rowClassName =
        "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4" +
        (!isBookmarks ? " row-cols-xl-4" : "");

    if (!books[0]) return "Книги не добавлены";

    return (
        <div className="container mb-5">
            <div className={rowClassName}>
                {books?.length > 0 &&
                    books.map((book, i) => (
                        <div className="col" key={book._id + i}>
                            <BookCard
                                book={book}
                                user={user}
                                updateUser={updateUser}
                                isBookmarks={isBookmarks}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
};

CardsGrid.defaultProps = {
    isBookmarks: false
};

CardsGrid.propTypes = {
    books: PropTypes.array,
    isBookmarks: PropTypes.bool
};

export default CardsGrid;
