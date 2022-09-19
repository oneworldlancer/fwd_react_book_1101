import React from "react";
import "../App.css";
import BookBox from "./BookBox";

const BookShelf = ({
    iTitle,
    iShelfCategory,
    iBooksList,
    iBookShelfUpdate }) => {



    // #region "Handler"

    const iBookByShelfCategory =  iBooksList .filter(iBook => iBook.shelf === iShelfCategory);



    // #endregion
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{iTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">

                    {iBookByShelfCategory.map((iBookView) =>
                        <BookBox
                            key={iBookView.id}
                            iBookView={iBookView}
                            iBookShelfUpdate={iBookShelfUpdate}
                            blnBookShelfLine={false} />
                    )}

                </ol>
            </div>
        </div>
    );
};

export default BookShelf;