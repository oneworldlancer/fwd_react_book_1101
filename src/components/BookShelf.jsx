import React from "react";
import "../App.css";
import BookBox from "./BookBox";

const BookShelf = ({
    iTitle,
    iShelfCategory,
    iBooksList,
    iBookShelfUpdate }) => {

    const iBookByShelfCategory = iBooksList.filter(iBook => iBook.shelf === iShelfCategory);

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{iTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">

                    {iBookByShelfCategory.map((iBookView) => 
                        <BookBox
                            iBookView={iBookView}
                            iBookShelfUpdate={iBookShelfUpdate} />
                    )}

                </ol>
            </div>
        </div>
    );
};

export default BookShelf;