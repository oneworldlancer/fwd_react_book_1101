import React from "react";
import ReactDOM from "react-dom";
import "../App.css";
import iDebugManager from "../iUtilityManager/iDebugManager";
import { Link } from "react-router-dom";
import BookBox from "./BookBox";
import PropTypes from "prop-types";

const SearchBook = ({
	iBookSearchQuery,
	iBooksSearchList,
	iOnBookSearchQuery,
	iOnBookShelfUpdate,
	iShowSearchList,
	iOnClick_HomePage }) => {

	// #region "Render"

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
								iOnBookShelfUpdate={iOnBookShelfUpdate}
								blnBookShelfLine={true}
							/>
						))}
					</ol>
				) : (
					<div>No Books found</div>
				)}
			</div>
		</div>
	);

	// #endregion
};

// #region "PropTypes"

SearchBook.propTypes = {

	iBookSearchQuery: PropTypes.string.isRequired,
	iBooksSearchList: PropTypes.array.isRequired,
	iOnBookSearchQuery: PropTypes.func.isRequired,
	iOnBookShelfUpdate: PropTypes.func.isRequired,
	iShowSearchList: PropTypes.bool.isRequired,
	iOnClick_HomePage: PropTypes.func.isRequired,
};

// #endregion

export default SearchBook;
