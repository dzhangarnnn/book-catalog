import React, { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { loadBooksList } from "../store/books";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchField = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchMethod, setSearchMethod] = useState("intitle:");
    const debouncedSearchQuery = useDebounce(searchQuery.trim(), 500);
    const navigate = useNavigate();

    const selectOptions = [
        { name: "По названию", value: "intitle:" },
        { name: "По автору", value: "inauthor:" },
        { name: "Расширенный", value: "" }
    ];

    useEffect(() => {
        if (debouncedSearchQuery) {
            dispatch(loadBooksList(searchMethod, debouncedSearchQuery));
        }
    }, [debouncedSearchQuery, searchMethod]);

    const onInputChange = ({ target }) => {
        setSearchQuery(target.value);
        navigate("/");
    };

    const handleSelectChange = ({ target }) => {
        setSearchMethod(target.value);
    };

    return (
        <div className="d-flex  col-sm-6 justify-content-center flex-column">
            <input
                className="form-control"
                name="searchInput"
                placeholder="Search"
                value={searchQuery}
                onChange={onInputChange}
            />
            <select
                className="form-select form-select-sm mt-2"
                id="searchMethod"
                name="searchMethod"
                value={searchMethod}
                onChange={handleSelectChange}
            >
                {selectOptions.map(({ name, value }) => (
                    <option key={name} value={value}>
                        {name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SearchField;
