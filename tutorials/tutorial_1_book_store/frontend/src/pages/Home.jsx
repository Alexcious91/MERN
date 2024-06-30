import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import BooksTable from "../home/BooksTable.jsx";
import BookCard from "../home/BooksCard.jsx";

const Home = () => {
	const [books, setBooks] = useState([]);
	const [loading, setIsLoading] = useState(false);
	const [showType, setShowType] = useState("table");

	useEffect(() => {
		setIsLoading(true);
		axios
			.get("http://localhost:5000/books")
			.then((response) => {
				setBooks(response.data.books);
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className="p-4">
			<div className="flex justify-center gap-x-4">
				<button
					className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
					onClick={() => setShowType("table")}
				>
					Table
				</button>

				<button
					className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
					onClick={() => setShowType("card")}
				>
					Card
				</button>
			</div>

			<div className="flex justify-between items-center">
				<div className="text-3xl my-8">Books List</div>

				<Link to="/books/create">
					<MdOutlineAddBox className="text-sky-800 text-4xl" />
				</Link>
			</div>

			{loading ? (
				<Spinner />
			) : showType === "table" ? (
				<BooksTable books={books} />
			) : (
				<BookCard books={books} />
			)}
		</div>
	);
};

export default Home;
