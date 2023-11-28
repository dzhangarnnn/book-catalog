import { orderBy } from "lodash";
import React, { useEffect } from "react";
import CommentsList, { AddCommentForm } from "./comments/index.js";
import {
    createComment,
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList,
    removeComment
} from "../store/comments";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import LoadSpinner from "./loadSpinner.jsx";

const Comments = () => {
    const { bookId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadCommentsList(bookId));
    }, [bookId]);

    const isLoading = useSelector(getCommentsLoadingStatus());

    const comments = useSelector(getComments());
    const handleSubmit = (data) => {
        dispatch(createComment({ ...data, bookPageId: bookId }));
    };
    const handleRemoveComment = (id) => {
        dispatch(removeComment(id));
    };
    const sortedComments = orderBy(comments, ["created_at"], ["desc"]);
    return (
        <>
            <div className="card mb-2">
                <div className="card-body ">
                    <AddCommentForm onSubmit={handleSubmit} />
                </div>
            </div>
            {sortedComments.length > 0 && (
                <div className="card mb-3">
                    <div className="card-body ">
                        <h4>Отзывы</h4>
                        <hr />
                        {!isLoading ? (
                            <CommentsList
                                comments={sortedComments}
                                onRemove={handleRemoveComment}
                            />
                        ) : (
                            <LoadSpinner />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Comments;
