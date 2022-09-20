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

	// #region "API"

	useEffect(() => {
		try {
			iDebugManager.iDebug_Message("useEffect");
			iDebugManager.iDebug_Message("window.localStorage.getItem('iBooksList')");
			iDebugManager.iDebug_Message(
				window.localStorage.getItem("iBooksList").length
			);

			/*	const data = window.localStorage.getItem("iBooksList");
			 */
			/* if (data == null) { */

			get_AllBooks();
			/* } else {
				setIBooksList(data);
			} */

			/* 		
			setIBookSearchQuery("");
			setIBooksList([]);
			setIBooksSearchList([]);
			setIShowSearchList(false);
		
		 */

			/* async function get_AllBooks() {
				const iBooks = await iBookManager.getAll();
				window.localStorage.setItem("iBooksList", iBooks);

				setIBooksList(iBooks);
			}

			get_AllBooks(); */

			/* if (window.localStorage.getItem("iBooksList") == null) {
				iDebugManager.iDebug_Message("sessionStorage-NO");

				async function get_AllBooks() {
					const iBooks = await iBookManager.getAll();
					window.localStorage.setItem("iBooksList", iBooks);

					setIBooksList(iBooks);
				}

				get_AllBooks();
			} else {
				iDebugManager.iDebug_Message("sessionStorage-YES");
				setIBooksList(window.localStorage.getItem("iBooksList"));
			} */
			// const iBooks = await iBookManager.getAll();
			// setIBooksList(iBooks);
			// // await	iBookManager.getAll().then((iBooks) => {
			// // 		setIBooksList(iBooks);
			// // 		//iDebugManager.iDebug_Message(iBooks);

			//// });
		} catch (error) {
			iDebugManager.iDebug_Message(error);
		}
	}, []);

	// #endregion

	// #region "CRUD"

	/* get_AllBooks */
	async function get_AllBooks() {
		
		try {
		
			const iBooks = await iBookManager.getAll();
			setIBooksList(iBooks);
			window.localStorage.setItem("iBooksList", iBooks);
	
		} catch (error) {
			iDebugManager.iDebug_Message(error);
		}
	}

	/* iBookUpdate */
	const iBookUpdate = async (iBook, iShelf) => {
	
		try {
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

	/* set_BookSearchQuery */
	function set_BookSearchQuery(event) {
		try {
			setTimeout(() => {
			
				const iSearchValue = event.target.value;
				iDebugManager.iDebug_Message(
					"iSearchValue.trim().length == " + iSearchValue.trim().length
				);

			
				if (iSearchValue.trim() === "") {
					setIBookSearchQuery("");
					setIBooksSearchList([]);
					setIShowSearchList(false);
				} else {
					iBookSearch(iSearchValue);
				}
			}, 1000);

			
		} catch (error) {
			iDebugManager.iDebug_Message(error);
		}
	}

	/* iBookSearch */
	const iBookSearch = async (iSearchValue) => {
	
		try {
			const iBooks_SearchList = await iBookManager.search(iSearchValue, 3);

			if (iBooks_SearchList.length > 0) {
				/* iDebugManager.iDebug_Message("iBooks_SearchList");
				iDebugManager.iDebug_Message(iBooks_SearchList);
 */
				let iBooks_SearchShelfList = iBookSearch_SetShelf(iBooks_SearchList);

				/* iDebugManager.iDebug_Message("iBooks_SearchShelfList");
				iDebugManager.iDebug_Message(iBooks_SearchShelfList);
 */
				setIBookSearchQuery(iSearchValue);

				setIBooksSearchList(iBooks_SearchShelfList);
				setIShowSearchList(true);
			} else {
				setIBookSearchQuery(iSearchValue);
				setIBooksSearchList([]);
				setIShowSearchList(false);
			}
		} catch (error) {
			setIBookSearchQuery(iSearchValue);
			setIBooksSearchList([]);
			setIShowSearchList(false);

			iDebugManager.iDebug_Message(error);
		}
	};

	/* iBookSearch_SetShelf */
	function iBookSearch_SetShelf(iBooks_SearchList) {
		try {
			let arrBooks_SearchShelfList = [];

			/* 		iDebugManager.iDebug_Message("iBooks_SearchList");
		iDebugManager.iDebug_Message(iBooks_SearchList);
	
	
		iDebugManager.iDebug_Message("iBooksList");
		
		iDebugManager.iDebug_Message(iBooksList.length);
		iDebugManager.iDebug_Message(iBooksList); */

			for (let i = 0; i < iBooks_SearchList.length; i++) {
				iBooksList.forEach((iBookView) => {
					//iBookView.shelf = "SHAYMAA";
					//iDebugManager.iDebug_Message(iBookView);

					if (iBookView.id === iBooks_SearchList[i].id) {
						iDebugManager.iDebug_Message("iBookView-found");
						iDebugManager.iDebug_Message(iBookView);

						iBooks_SearchList[i].shelf = iBookView.shelf;
					} else {
						iBooks_SearchList[i].shelf = "none";
					}
				});

				iDebugManager.iDebug_Message("iBooks_SearchList[i]-found");
				iDebugManager.iDebug_Message(iBooks_SearchList[i]);

				/* iDebugManager.iDebug_Message("iBooks_SearchList[i]");
			iDebugManager.iDebug_Message(iBooks_SearchList[i]); */
				arrBooks_SearchShelfList.push(iBooks_SearchList[i]);
			}

			return arrBooks_SearchShelfList;
		} catch (error) {
			iDebugManager.iDebug_Message(error);
		}
	}

	// #endregion

	// #region "Routes"

	/* click_HomePage */
	const click_HomePage = (event) => {
		try {
			iDebugManager.iDebug_Message("Link click_HomePage");
			iDebugManager.iDebug_Message(event.currentTarget);
			setIBookSearchQuery("");
			setIBooksSearchList([]);
			setIShowSearchList(false);
		} catch (error) {
			iDebugManager.iDebug_Message(error);
		}
	};

	/* click_SearchPage */
	const click_SearchPage = (event) => {
		try {
			iDebugManager.iDebug_Message("Link click_SearchPage");

			iDebugManager.iDebug_Message(event.currentTarget);
			setIBookSearchQuery("");
			setIBooksSearchList([]);
			setIShowSearchList(true);
		} catch (error) {
			iDebugManager.iDebug_Message(error);
		}
	};

	// #endregion

	// #region "Render"

	try {
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
									iBooksSearchList={iBooksSearchList}
									iOnBookSearchQuery={set_BookSearchQuery}
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
		);
	} catch (error) {
		iDebugManager.iDebug_Message(error);
	}

	// #endregion
};

export default App;
