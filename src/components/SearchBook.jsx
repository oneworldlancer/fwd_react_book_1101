import React from "react";
import ReactDOM from "react-dom";
import "../App.css";
import { Link } from "react-router-dom";

const SearchBook = () => {
  //console.log(iContacts);
  //onClick={() => setShowSearchpage(!showSearchPage)}
  //return <h1>Hello, Shaymaa</h1>;

  //      onClick={() => setShowSearchpage(!showSearchPage)}
  return (
    <div className="search-books">
      <div className="search-books-bar">
        {/* <a
              className="close-search"
        
            >
              Close
            </a> */}
        <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid"></ol>
      </div>
    </div>
  );


}

/* iBook_Search.propTypes = {
    //iContacts: PropTypes.array.isRequired,
    //: PropTypes.func.isRequired,
}; */

export default SearchBook;