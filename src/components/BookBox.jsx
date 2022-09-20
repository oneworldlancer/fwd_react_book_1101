import React from "react";
import iDebugManager from "../iUtilityManager/iDebugManager";
import PropTypes from "prop-types";

const BookBox = ({ 
    iBookView, 
    iOnBookShelfUpdate, 
    blnBookShelfLine }) => {

    // #region "Handler"

    /* iBookViewUpdate */
    function iBookViewUpdate(event) {
        //  this.setState({ value: event.target.value });
        //alert(event.target.value);
        iOnBookShelfUpdate(iBookView, event.target.value);
    }

    /* get_BookAuthor */
    const get_BookAuthor = (iBookView) => {
        try {
            //iDebugManager.iDebug_Message(authors);
            if (iBookView.authors && iBookView.authors.length > 0) {
                return iBookView.authors;
            } else {
                return "No Author";
            }
        } catch (error) {
            iDebugManager.iDebug_Message(error);
        }
    };

    /*get_Tumbnail  */
    const get_Tumbnail = (iBookView) => {
        try {
            //iDebugManager.iDebug_Message(authors);
            if (iBookView.imageLinks) {
                return `url(${iBookView.imageLinks.thumbnail})`; // iBookView.imageLinks.thumbnail;
            } else {
                return 'url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVkQ5VyBkNsyq4YRRopIfps1oFdZY2EwESPg&usqp=CAU")';
            }
        } catch (error) {
            iDebugManager.iDebug_Message(error);
        }
    };

    /* get_BookShelf */
    const get_BookShelf = (iBookView) => {
        try {
            //iDebugManager.iDebug_Message(authors);
            if (iBookView.shelf === "currentlyReading") {
                return "Currently Reading";
            } else if (iBookView.shelf === "wantToRead") {
                return "Want to Read";
            } else if (iBookView.shelf === "read") {
                return "Read";
            } else if (iBookView.shelf === "none") {
                return "None";
            } else {
                return "None";
            }
        } catch (error) {
            iDebugManager.iDebug_Message(error);
            return "None";
        }
    };

    // #endregion

    // #region "Render"

    return (
        <li key={iBookView.id}>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            //backgroundImage: `url(${iBookView.imageLinks.thumbnail})`,
                            backgroundImage: get_Tumbnail(iBookView),
                        }}></div>
                    <div className="book-shelf-changer">
                        <select
                            onChange={iBookViewUpdate}
                            value={iBookView.shelf}>
                            <option
                                value="none"
                                disabled>
                                Move to...
                            </option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{iBookView.title}</div>
                <div className="book-authors">{get_BookAuthor(iBookView)} </div>
                {blnBookShelfLine === true ? (
                    <div className="book-shelf-line">
                        <strong> {get_BookShelf(iBookView)} </strong>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </li>
    );

    // #endregion
};

// #region "PropTypes"

BookBox.propTypes = {
    iBookView: PropTypes.string.isRequired,
    blnBookShelfLine: PropTypes.bool.isRequired,
    iOnBookShelfUpdate: PropTypes.func.isRequired,
};

// #endregion

export default BookBox;
