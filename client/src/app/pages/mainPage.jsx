import React, { useState } from "react";
import BooksList from "../layouts/booksList";
import GroupList from "../components/groupList";
import { CATEGORIES } from "../constans/categories";
import { useDispatch } from "react-redux";
import { loadBooksByCategory } from "../store/books";

const MainPage = () => {
    const [selectedItem, setSelectedItem] = useState("");
    const dispatch = useDispatch();

    const handleItemSelect = (item) => {
        setSelectedItem(item);
        dispatch(loadBooksByCategory(item));
    };

    return (
        <div className="container">
            <div className="row ">
                <div className="col-sm-auto  flex-shrink-0 mb-3">
                    <h4 className="text-center">Категории</h4>
                    <GroupList
                        items={CATEGORIES}
                        selectedItem={selectedItem}
                        onItemSelect={handleItemSelect}
                    />
                </div>
                <div className="col-sm">
                    <BooksList />
                </div>
            </div>
        </div>
    );
};

export default MainPage;
