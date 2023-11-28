import axios from "axios";
import { toast } from "react-toastify";

const googleBooksApi = axios.create({
    baseURL: "https://www.googleapis.com/books/v1/volumes"
});

googleBooksApi.interceptors.response.use(
    (res) => res,
    function (error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if (!expectedErrors) {
            toast.error("Something was wrong. Try it later");
        }
        return Promise.reject(error);
    }
);
googleBooksApi.interceptors.request.use(
    (config) => config,
    function (error) {
        return Promise.reject(error);
    }
);

const googleBooksService = {
    getList: async (searchMethod, searchQuery) => {
        const { data } = await googleBooksApi.get(
            `?q=${searchMethod}${searchQuery}`,
            {
                params: {
                    maxResults: 40
                }
            }
        );
        return data;
    },
    getByCategory: async (category) => {
        const { data } = await googleBooksApi.get(`?q=subject:${category}`);
        return data;
    },
    getOne: async (bookId) => {
        const { data } = await googleBooksApi.get(`/${bookId}`);
        return data;
    }
};

export default googleBooksService;
