import React, { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [publishYear, setPublishYear] = useState("");
	const [loading, setIsLoading] = useState(false);
	const navigate = useNavigate();
   const { id } = useParams();

   useEffect(() => {
      setIsLoading(true)
      axios.get(`http://localhost:5000/books/${id}`)
         .then(response => {
            setIsLoading(false)
            console.log(response.data)
            setTitle(response.data.books.title)
            setAuthor(response.data.books.author)
            setPublishYear(response.data.books.publishYear)
         })
         .catch(error => {
            console.log(error)
         })
   }, [id])

	const handleEditBook = () => {
		const data = {
			title: title,
			author: author,
			publishYear: parseInt(publishYear),
		};
		setIsLoading(true);

		axios
			.put(`http://localhost:5000/books/edit/${id}`, data)
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

			<div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
				<div className="my-4">
					<label className="text-xl mr-4 text-gray-500">Title</label>
					<input
						type="text"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						className="border-2 border-gray-500 px-4 py-2 w-full"
					/>
				</div>

				<div className="my-4">
					<label className="text-xl mr-4 text-gray-500">Author</label>
					<input
						type="text"
						value={author}
						onChange={(event) => setAuthor(event.target.value)}
						className="border-2 border-gray-500 px-4 py-2 w-full"
					/>
				</div>

            <div className="my-4">
					<label className="text-xl mr-4 text-gray-500">Publish Year</label>
					<input
						type="number"
						value={publishYear}
						onChange={(event) => setPublishYear(event.target.value)}
                  className="border-2 border-gray-500 px-4 py-2 w-full"
					/>
				</div>

            {/* Save button */}
            <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>Edit</button>
			</div>
		</div>
	);
};

export default EditBook;
