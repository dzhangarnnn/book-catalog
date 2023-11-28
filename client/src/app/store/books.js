import { createSlice } from "@reduxjs/toolkit";
import googleBooksService from "../services/googleBooksApiService";

const initialState = {
    booksList: null,
    bookmarksList: null,
    error: null,
    isBooksListLoading: false,
    isBookmarksListLoading: false
};

const booksSlice = createSlice({
    name: "books",
    initialState,
    reducers: {
        booksListRequested: (state) => {
            state.isBooksListLoading = true;
        },
        booksListReceived: (state, action) => {
            state.booksList = action.payload;
            state.isBooksListLoading = false;
        },
        booksListRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isBooksListLoading = false;
        },
        booksByCategoryRequested: (state) => {
            state.isBooksListLoading = true;
        },
        booksByCategoryReceived: (state, action) => {
            state.booksList = action.payload;
            state.isBooksListLoading = false;
        },
        booksByCategoryFailed: (state, action) => {
            state.error = action.payload;
            state.isBooksListLoading = false;
        },
        bookmarksListRequested: (state) => {
            state.isBookmarksListLoading = true;
        },
        bookmarksListReceived: (state, action) => {
            state.bookmarksList = action.payload;
            state.isBookmarksListLoading = false;
        },
        bookmarksListFailed: (state, action) => {
            state.error = action.payload;
            state.isBookmarksListLoading = false;
        }
    }
});

const { reducer: booksReducer, actions } = booksSlice;
const {
    booksListRequested,
    booksListReceived,
    booksListRequestFailed,
    booksByCategoryRequested,
    booksByCategoryReceived,
    booksByCategoryFailed,
    bookmarksListRequested,
    bookmarksListReceived,
    bookmarksListFailed
} = actions;

export const loadBooksList =
    (searchMethod, searchQuery) => async (dispatch) => {
        dispatch(booksListRequested());
        try {
            const data = await googleBooksService.getList(
                searchMethod,
                searchQuery
            );
            const booksArr = getArrayFromResponse(data);
            dispatch(booksListReceived(booksArr));
        } catch (error) {
            dispatch(booksListRequestFailed(error.message));
        }
    };

export const loadBooksByCategory = (category) => async (dispatch) => {
    dispatch(booksByCategoryRequested());
    try {
        const data = await googleBooksService.getByCategory(category);
        const booksArr = getArrayFromResponse(data);
        dispatch(booksByCategoryReceived(booksArr));
    } catch (error) {
        dispatch(booksByCategoryFailed(error.message));
    }
};

function getArrayFromResponse(data) {
    const booksArr = [];
    if (data.totalItems > 0) {
        data.items.forEach((item) => {
            booksArr.push({
                _id: item.id,
                title: item.volumeInfo.title,
                subtitle: item.volumeInfo?.subtitle,
                authors: item.volumeInfo?.authors,
                description: item.volumeInfo?.description,
                imageLinks: item.volumeInfo?.imageLinks,
                publishedDate: item.volumeInfo?.publishedDate,
                publisher: item.volumeInfo?.publisher,
                categories: item.volumeInfo?.categories
            });
        });
    }
    return booksArr;
}

export const loadBooksByBookmarksArr = (bkArr) => (dispatch) => {
    dispatch(bookmarksListRequested());
    try {
        const promArr = bkArr.map((bk) => googleBooksService.getOne(bk));
        Promise.allSettled(promArr).then((data) =>
            dispatch(
                bookmarksListReceived(
                    data
                        .filter((d) => d.status === "fulfilled")
                        .map((d) => ({
                            _id: d.value.id,
                            title: d.value.volumeInfo.title,
                            subtitle: d.value.volumeInfo?.subtitle,
                            authors: d.value.volumeInfo?.authors,
                            description: d.value.volumeInfo?.description,
                            imageLinks: d.value.volumeInfo?.imageLinks,
                            publishedDate: d.value.volumeInfo?.publishedDate,
                            publisher: d.value.volumeInfo?.publisher,
                            categories: d.value.volumeInfo?.categories
                        }))
                )
            )
        );
    } catch (error) {
        dispatch(bookmarksListFailed(error.message));
    }
};

export const getBookmarksList = () => (state) => state.books.bookmarksList;
export const getBooksList = () => (state) => state.books.booksList;
export const isBooksListLoading = () => (state) =>
    state.books.isBooksListLoading;
export const isBookmarksListLoading = () => (state) =>
    state.books.isBookmarksListLoading;

export default booksReducer;
