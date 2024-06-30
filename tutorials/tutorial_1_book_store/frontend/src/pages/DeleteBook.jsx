import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
	const [loading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const { id } = useParams();

	const handleDeleteBook = () => {
      setIsLoading(true)
		axios
			.delete(`http://localhost:5000/books/delete/${id}`)
			.then(() => {
				setIsLoading(false);
				navigate("/");
			})
			.catch((error) => {
				console.error(error);
				setIsLoading(false);
				alert("An error happened. Please check console CTRL + SHIFT + J");
			});
	};

	return (
		<div className="p-4">
			<BackButton />
			<h1 className="text-3xl my-4">Edit Book</h1>

			{loading ? <Spinner /> : ""}

         <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
            <h3 className="text-2xl">Are you sure you want to delete this book?</h3>

            <button className="p-4 bg-red-600 text-white m-8 w-full" onClick={handleDeleteBook}>Confirm</button>
         </div>
		</div>
	);
};

export default DeleteBook;
