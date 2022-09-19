import React from "react";
import ReactDOM from "react-dom";
import "../App.css";
import iDebugManager from "../iUtilityManager/iDebugManager";
import { Link } from "react-router-dom";
import BookBox from "./BookBox";

const SearchBook = ({
	iBookSearchQuery,
	iOnBookSearchQuery,
	iBooksSearchList,
	iOnBookShelfUpdate,
	iShowSearchList,
  iOnClick_HomePage}) => {

  
  function XXXset_iBookSearchQuery(event) {
		try {
			//alert("xxxevent.target.value");
			//OnBookSearchQuery(event);
			//alert(iOnBookSearchQuery);
		} catch (error) {
			iDebugManager.iDebug_Message(error);
		}
	}

	function set_iBookSearchQuery(event) {
		//  this.setState({ value: event.target.value });
		//alert(event.target.value);
		//OnBookSearchQuery( {event});
	}

	//console.log(iContacts);
	//onClick={() => setShowSearchpage(!showSearchPage)}
	//return <h1>Hello, Shaymaa</h1>;

	//      onClick={() => setShowSearchpage(!showSearchPage)}
	return (
	<div className="search-books">
					<div className="search-books-bar">
						<Link
							to="/"

          onClick={iOnClick_HomePage}
          className="close-search">
							Close
						</Link>
						<div className="search-books-input-wrapper">
							<input
								type="text"
								placeholder="Search by title, author, or ISBN"
								onChange={iOnBookSearchQuery}
							/>
						</div>
					</div>
					<div className="search-books-results">
						{iShowSearchList ? (
							<ol className="books-grid">
								{iBooksSearchList.map((iBookView) => (
									<BookBox
										key={iBookView.id}
										iBookView={iBookView}
										iBookShelfUpdate={iOnBookShelfUpdate}
                    blnBookShelfLine={true}/>
								))}
							</ol>
						) : (
							<div>No Books found</div>
						)}
					</div>
			
		</div>
	);
};

/* iBook_Search.propTypes = {
    //iContacts: PropTypes.array.isRequired,
    //: PropTypes.func.isRequired,
}; */

export default SearchBook;
