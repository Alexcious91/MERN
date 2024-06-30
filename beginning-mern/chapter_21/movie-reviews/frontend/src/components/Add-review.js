import React, { useState } from 'react';
import MovieDataService from "../services/movies.js";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function AddReview(props) {
	const movieService = new MovieDataService();

	let editing = false;
	let initialReviewState = "";

	if (props.location.state && props.location.state.currentReview) {
		editing = true
		initialReviewState = props.location.state.currentReview.review 
	};

	const [review, setReview] = useState(initialReviewState);
	const [submitted, setSubmitted] = useState(false);

	const onChangeReview = event => {
		const review = event.target.value;
		setReview(review);
	};

	const saveReview = () => {
		let data = {
			review: review,
			name: localStorage.getItem("name"),
			user_id: localStorage.getItem("id"),
			movie_id: props.match.params.id
		};
		console.log(data)

		if (editing) {
			data.review_id = props.location.state.currentReview._id
			movieService.updateReview(data)
				.then(response => {
					setSubmitted(true);
					console.log(response.data);
				})
				.catch(e => {
					console.log(e);
				})
		} else {
			movieService.createReview(data)
				.then(response => {
					setSubmitted(true);
				})
				.catch(e => {
					console.log(e);
				})
		};
	};


	return (
		<div>
			{submitted ? (
				<div>
					<h4>Review submitted successfully</h4>
					<Link to={"/movies/" + props.match.params.id}>
						Back to Movie
					</Link>
				</div>
			) : (
				<Form>
					<Form.Group>
						<Form.Label>{editing ? "Edit" : "Create"} Review</Form.Label>
						<Form.Control
							type="text"
							required
							value={review}
							onChange={onChangeReview}
						/>
					</Form.Group>
					<Button variant="primary" onClick={saveReview}>
						Submit
					</Button>
				</Form>
			)}
		</div>
	)
}

export default AddReview; 