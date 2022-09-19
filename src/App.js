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
	const [iBookSearchQuery, setIBookSearchQuery] = useState("");
	const [iBooksSearchList, setIBooksSearchList] = useState([]);
	const [iShowSearchList, setIShowSearchList] = useState(true);

	// #endregion

	// #region ""

	try {
	} catch (error) {}

	// #endregion

	// #region "API"

	useEffect(() => {
		try {
			/* 		
			setIBookSearchQuery("");
			setIBooksList([]);
			setIBooksSearchList([]);
			setIShowSearchList(false);
		
		 */ async function get_AllBooks() {
				const iBooks = await iBookManager.getAll();
				window.localStorage.setItem("iBooksList", iBooks);

				setIBooksList(iBooks);
			}

			get_AllBooks();

			/* if (window.localStorage.getItem("iBooksList") == null) {
				console.log("sessionStorage-NO");

				async function get_AllBooks() {
					const iBooks = await iBookManager.getAll();
					window.localStorage.setItem("iBooksList", iBooks);

					setIBooksList(iBooks);
				}

				get_AllBooks();
			} else {
				console.log("sessionStorage-YES");
				setIBooksList(window.localStorage.getItem("iBooksList"));
			} */
			// const iBooks = await iBookManager.getAll();
			// setIBooksList(iBooks);
			// // await	iBookManager.getAll().then((iBooks) => {
			// // 		setIBooksList(iBooks);
			// // 		//console.log(iBooks);

			//// });
		} catch (error) {
			iDebugManager.iDebug_Message(error);
			/* console.log("sessionStorage-YES");
			setIBooksList(window.localStorage.getItem("iBooksList")); */
		}
	});

	// #endregion

	// #region "CRUD"

	const iBookUpdate = async (iBook, iShelf) => {
		//.title = `You clicked ${count} times`;

		try {
			/* 			if (iBooksList.length > 0) {
				for (let i = 0; i < iBooksList.length; i++) {
					if (iBooksList[i].id === iBook.id) {
						iBooksList[i].shelf = iShelf;
						break;
					}

					setIBooksList(iBooksSearchList);
				}
			} */

			if (iBooksSearchList.length > 0) {
				for (let i = 0; i < iBooksSearchList.length; i++) {
					if (iBooksSearchList[i].id === iBook.id) {
						iBooksSearchList[i].shelf = iShelf;
						break;
					}

					setIBooksSearchList(iBooksSearchList);
				}
			}
			await iBookManager.update(iBook, iShelf);

			const iBooks_GetList = await iBookManager.getAll();
			setIBooksList(iBooks_GetList);
		} catch (error) {
			iDebugManager.iDebug_Message(error);
		}
	};

	function set_BookSearchQuery(event) {
		try {
			setTimeout(() => {
				//alert("app.target.value");
				const iSearchValue = event.target.value;
				console.log(
					"iSearchValue.trim().length == " + iSearchValue.trim().length
				);

				//setIBookSearchQuery(iSearchValue);

				if (iSearchValue.trim() === "") {
					setIBookSearchQuery("");
					setIBooksSearchList([]);
					setIShowSearchList(false);
				} else {
					iBookSearch(iSearchValue);
				}
			}, 1000);

			//iBookSearch(iSearchValue);
		} catch (error) {
			iDebugManager.iDebug_Message(error);
		}
	}

	const iBookSearch = async (iSearchValue) => {
		//.title = `You clicked ${count} times`;

		try {
			const iBooks_SearchList = await iBookManager.search(iSearchValue, 3);

			if (iBooks_SearchList.length > 0) {
				/* console.log("iBooks_SearchList");
				console.log(iBooks_SearchList);
 */
				let iBooks_SearchShelfList = iBookSearch_SetShelf(iBooks_SearchList);

				/* console.log("iBooks_SearchShelfList");
				console.log(iBooks_SearchShelfList);
 */
				setIBookSearchQuery(iSearchValue);

				setIBooksSearchList(iBooks_SearchShelfList);
				setIShowSearchList(true);
			} else {
				setIBookSearchQuery(iSearchValue);
				setIBooksSearchList([]);
				setIShowSearchList(false);
			}

			/* else {
						setIBookSearchQuery("");
			setIBooksSearchList([]);
					return "";
				} */

			//alert("event.target.value");

			//console.log(iBooks);
		} catch (error) {
			setIBookSearchQuery(iSearchValue);
			setIBooksSearchList([]);
			setIShowSearchList(false);

			iDebugManager.iDebug_Message(error);
		}
	};

	function iBookSearch_SetShelf(iBooks_SearchList) {
		let arrBooks_SearchShelfList = [];

		/* 		console.log("iBooks_SearchList");
		console.log(iBooks_SearchList);
	
	
		console.log("iBooksList");
		
		console.log(iBooksList.length);
		console.log(iBooksList); */

		for (let i = 0; i < iBooks_SearchList.length; i++) {
			iBooksList.forEach((iBookView) => {
				//iBookView.shelf = "SHAYMAA";
				//console.log(iBookView);

				if (iBookView.id === iBooks_SearchList[i].id) {
					console.log("iBookView-found");
					console.log(iBookView);

					iBooks_SearchList[i].shelf = iBookView.shelf;
				} else {
					iBooks_SearchList[i].shelf = "none";
				}
			});

			console.log("iBooks_SearchList[i]-found");
			console.log(iBooks_SearchList[i]);

			/* console.log("iBooks_SearchList[i]");
			console.log(iBooks_SearchList[i]); */
			arrBooks_SearchShelfList.push(iBooks_SearchList[i]);
		}

		return arrBooks_SearchShelfList;
	}

	// #endregion

	// #region "Routes"

	const click_HomePage = (event) => {
		console.log("Link click_HomePage");
		console.log(event.currentTarget);
		setIBookSearchQuery("");
		setIBooksSearchList([]);
		setIShowSearchList(false);

		// 👇️ refers to the link element
	};

	const click_SearchPage = (event) => {
		console.log("Link click_SearchPage");

		// 👇️ refers to the link element
		console.log(event.currentTarget);
		setIBookSearchQuery("");
		setIBooksSearchList([]);
		setIShowSearchList(true);
	};

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
						element={
							<SearchBook
								iBookSearchQuery={iBookSearchQuery}
								iOnBookSearchQuery={set_BookSearchQuery}
								iBooksSearchList={iBooksSearchList}
								iOnBookShelfUpdate={iBookUpdate}
								iShowSearchList={iShowSearchList}
								iOnClick_HomePage={click_HomePage}
							/>
						}
					/>

					<Route
						exact
						path="/"
						element={
							<ShelfList
								iBooksList={iBooksList}
								iOnBookShelfUpdate={iBookUpdate}
								iOnClick_SearchPage={click_SearchPage}
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
