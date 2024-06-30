import React, { useEffect, useState } from "react";
import axios from "axios";
import BackButton from "../components/BackButton.jsx";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";

const ShowBook = () => {
	const [book, setBook] = useState({});
	const [loading, setIsLoading] = useState(false);
	const { id } = useParams();

	useEffect(() => {
		setIsLoading(true);
		axios
			.get(`http://localhost:5000/books/${id}`)
			.then((response) => {
				setBook(response.data.books);
				console.log(response.data);
				setIsLoading(false);
			})
			.catch((error) => {
				console.error(error);
				setIsLoading(false);
			});
	}, []);

	return (
		<div className="p-4">
			<BackButton />
			<h1 className="text-3xl my-4">Show Book</h1>

			{loading ? (
				<Spinner />
			) : (
				<>
					<div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
						<div className="my-4 flex items-center">
							<div className="text-xl mr-4 text-gray-500">Id: </div>
							<span>{book._id}</span>
						</div>

						<div className="my-4 flex items-center">
							<div className="text-xl mr-4 text-gray-500">Title: </div>
							<span>{book.title}</span>
						</div>

						<div className="my-4 flex items-center">
							<div className="text-xl mr-4 text-gray-500">Author: </div>
							<span>{book.author}</span>
						</div>

						<div className="my-4 flex items-center">
							<div className="text-xl mr-4 text-gray-500">Publish Year: </div>
							<span>{book.publishYear}</span>
						</div>

						<div className="my-4 flex items-center">
							<div className="text-xl mr-4 text-gray-500">Created At: </div>
							<span>{new Date(book.createdAt).toString()}</span>
						</div>

						<div className="my-4 flex items-center">
							<div className="text-xl mr-4 text-gray-500">Updated At: </div>
							<span>{new Date(book.updatedAt).toString()}</span>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ShowBook;
