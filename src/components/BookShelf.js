import React from "react";
import "../App.css";
import BookBox from "./BookBox";
import PropTypes from "prop-types";

const BookShelf = ({
    iTitle,
    iShelfCategory,
    iBooksList,
    iOnBookShelfUpdate }) => {

    // #region "Handler"

    const iBookByShelfCategory = iBooksList.filter(iBook => iBook.shelf === iShelfCategory);



    // #endregion


    // #region "Render"



    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{iTitle}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">

                    {iBookByShelfCategory.map((iBookView) =>
                        <BookBox
                            key={iBookView.id}
                            iBookView={iBookView}
                            iOnBookShelfUpdate={iOnBookShelfUpdate}
                            blnBookShelfLine={false} />
                    )}

                </ol>
            </div>
        </div>
    );

    // #endregion
};

// #region "PropTypes"


BookShelf.propTypes = {

    iTitle: PropTypes.string.isRequired,
    iShelfCategory: PropTypes.string.isRequired,
    iBooksList: PropTypes.array.isRequired,
    iOnBookShelfUpdate: PropTypes.func.isRequired,
};

// #endregion

export default BookShelf;