import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBooksList, isBooksListLoading } from "../store/books";
import CardsGrid from "../components/cardsGrid";
import { paginate } from "../utils/paginate";
import Pagination from "../components/pagination";
import LoadSpinner from "../components/loadSpinner";

const BooksList = () => {
    const books = useSelector(getBooksList());
    const isLoading = useSelector(isBooksListLoading());
    const [currentPage, setCurrentPage] = useState(1);
    const count = books?.length;
    const pageSize = 8;
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const booksCrop = paginate(books, currentPage, pageSize);

    useEffect(() => {
        setCurrentPage(1);
    }, [books]);

    if (isLoading) {
        return <LoadSpinner />;
    }
    return (
        <div>
            {count > 0 && (
                <div className="d-flex flex-column">
                    <CardsGrid books={booksCrop} />
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
            {books && count === 0 && (
                <p className="text-center">
                    Книги по данному запросу не найдены
                </p>
            )}
        </div>
    );
};

export default BooksList;
