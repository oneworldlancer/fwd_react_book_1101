import React from "react";

const BookBox = ({ iBookView,iBookShelfUpdate }) => {
  
  
  function  iBookViewUpdate (event) {
      //  this.setState({ value: event.target.value });
      //alert(event.target.value);
      iBookShelfUpdate(iBookView,event.target.value);
    }
  
    return (

        <li key={iBookView.id}>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${iBookView.imageLinks.thumbnail})`,
                        }}
                    ></div>
                    <div className="book-shelf-changer">
                        <select onChange={iBookViewUpdate} value={iBookView.shelf}>
                            <option value="none" disabled>
                                Move to...
                            </option>
                            <option value="currentlyReading">
                                Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{iBookView.title}</div>
                <div className="book-authors">{iBookView.authors[0]}</div>
            </div>
        </li>

    );
};

export default BookBox;