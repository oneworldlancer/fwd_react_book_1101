import "./App.css";
import { useEffect, useState } from "react";
import SearchBook from "./components/SearchBook.jsx";
import ShelfList from "./components/ShelfList.jsx";
import NoPage from "./components/NoPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import iDebugManager from "./iUtilityManager/iDebugManager";

import * as iBookManager from "./BooksAPI";
const App = () => {
	// #region "States-List"

	const [showSearchPage, setShowSearchpage] = useState(false);

	const [iBooksList, setIBooksList] = useState([]);

	// #endregion

	// #region ""

	try {
	} catch (error) {}

	// #endregion

	// #region "API"

	useEffect(() => {
		try {
			async function get_AllBooks() {
				const iBooks = await iBookManager.getAll();
				setIBooksList(iBooks);
			}

			get_AllBooks();
			// const iBooks = await iBookManager.getAll();
			// setIBooksList(iBooks);
			// // await	iBookManager.getAll().then((iBooks) => {
			// // 		setIBooksList(iBooks);
			// // 		//console.log(iBooks);

			//// });
		} catch (error) {
			iDebugManager.iDebug_Message(error);
		}
	});

	// #endregion

	// #region "CRUD"

	const iBookUpdate = async (iBook, iShelf) => {
		//.title = `You clicked ${count} times`;

		try {
			//alert("event.target.value");
			await iBookManager.update(iBook, iShelf);
			await iBookManager.getAll().then((iBooks) => {
				setIBooksList(iBooks);
				//console.log(iBooks);
			});
		} catch (error) {
			iDebugManager.iDebug_Message(error);
		}
	};

	// #endregion

	// #region "Search"

	// #endregion

	return (
		<div className="app">
			<BrowserRouter>
				<Routes>
					<Route
						path="*"
						element={<NoPage />}
					/>

					<Route
						path="/search"
						element={<SearchBook />}
					/>

					<Route
						exact
						path="/"
						element={
							<ShelfList
								iBooksList={iBooksList}
								iOnBookShelfUpdate={iBookUpdate}
							/>
						}></Route>
				</Routes>
			</BrowserRouter>
		</div>
		/* 		<div className="app">
			{showSearchPage ? (
				<SearchBook />
			) : (
			
				<div className="list-books">
					<div className="list-books-title">
						<h1>MyReads</h1>
					</div>
					<div className="list-books-content">
            <BookList/>
				
					</div>
					<div className="open-search">
						<a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
					</div>
				</div>
			)}
		</div> */
	);
};

export default App;
