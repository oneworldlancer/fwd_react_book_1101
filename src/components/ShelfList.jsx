import React from "react";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf.jsx";
import iDebugManager from "../iUtilityManager/iDebugManager";
import PropTypes from "prop-types";

const ShelfList = ({ 
	iBooksList, 
	iOnBookShelfUpdate,
	iOnClick_SearchPage }) => {

	// #region "Render"

	return (
		<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>
			<div className="list-books-content">
				<div>
					{/* Book-Shelves */}
					{/* (1) Currently Reading */}
					<BookShelf
						key="currentlyReading"
						iTitle="Currently Reading"
						iShelfCategory="currentlyReading"
						iBooksList={iBooksList}
						iBookShelfUpdate={iOnBookShelfUpdate}
					/>

					{/* (2) Want to Read */}
					<BookShelf
						key="wantToRead"
						iTitle="Want to Read"
						iShelfCategory="wantToRead"
						iBooksList={iBooksList}
						iBookShelfUpdate={iOnBookShelfUpdate}
					/>

					{/* (3) Read */}
					<BookShelf
						key="read"
						iTitle="Read"
						iShelfCategory="read"
						iBooksList={iBooksList}
						iBookShelfUpdate={iOnBookShelfUpdate}
					/>
				</div>
			</div>
			<div className="open-search">
				<Link
					to="/search"
					onClick={iOnClick_SearchPage} >Add a book</Link>
			</div>
		</div>
	);

	// #endregion
};

// #region "PropTypes"

ShelfList.propTypes = {
	iBooksList: PropTypes.array.isRequired,
	iOnBookShelfUpdate: PropTypes.func.isRequired,
	iOnClick_SearchPage: PropTypes.func.isRequired,
};

// #endregion

export default ShelfList;
