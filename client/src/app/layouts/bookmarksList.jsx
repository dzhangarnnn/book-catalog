import React, { useEffect, useState } from "react";
import GroupList from "../components/groupList";
import {
    loadBooksByBookmarksArr,
    getBookmarksList,
    isBookmarksListLoading
} from "../store/books";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import CardsGrid from "../components/cardsGrid";
import Pagination from "../components/pagination";
import { paginate } from "../utils/paginate";
import { bookmarksGroupList } from "../constans/categories";
import LoadSpinner from "../components/loadSpinner";

const BookmarksList = ({ user }) => {
    const books = useSelector(getBookmarksList());
    const isLoading = useSelector(isBookmarksListLoading());
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState("select");
    const dispatch = useDispatch();
    const pageSize = 3;
    const bookIdArr = user?.bookmarks.map((bk) => bk.bookId);
    useEffect(() => {
        if (bookIdArr?.[0]) {
            dispatch(loadBooksByBookmarksArr(bookIdArr));
        }
    }, []);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedItem]);

    const bookmarksList =
        user && books
            ? selectedItem === bookmarksGroupList[0].value
                ? books.filter((b) =>
                      user.bookmarks.some(
                          (bk) => bk.bookId === b._id && bk.read === false
                      )
                  )
                : books.filter((b) =>
                      user.bookmarks.some(
                          (bk) => bk.bookId === b._id && bk.read === true
                      )
                  )
            : [];

    const count = bookmarksList?.length;

    useEffect(() => {
        if (count % pageSize === 0) {
            setCurrentPage(count / pageSize) || setCurrentPage(1);
        }
    }, [count]);

    const booksCrop = paginate(bookmarksList, currentPage, pageSize);

    const handleItemSelect = (item) => {
        setSelectedItem(item);
    };

    return (
        <div className="container ">
            <div className="row justify-content-center">
                <div className="col-md-auto  pb-3">
                    <GroupList
                        items={bookmarksGroupList}
                        selectedItem={selectedItem}
                        onItemSelect={handleItemSelect}
                        horizontal={true}
                    />
                </div>
                {!books && isLoading && <LoadSpinner />}
                {booksCrop[0] && (
                    <div className="d-flex flex-column ">
                        <CardsGrid books={booksCrop} isBookmarks={true} />
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
                {books && !bookmarksList[0] && (
                    <div className="d-flex justify-content-center">
                        Книги не добавлены
                    </div>
                )}
            </div>
        </div>
    );
};

BookmarksList.propTypes = {
    user: PropTypes.object
};

export default BookmarksList;
