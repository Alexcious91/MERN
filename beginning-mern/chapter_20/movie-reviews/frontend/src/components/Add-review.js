import React, { useState } from 'react';
import MovieDataService from "../services/movies"
import { Link } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function AddReview(props) {
   let movieService = new MovieDataService();

   let editMode = false;
   let initialReviewState = "";

   const [review, setReview] = useState(initialReviewState);
   const [submitted, setSubmitted] = useState(false)

   const onChangeReview = (event) => {
      const review = event.target.value;
      setReview(review)
   }

   const saveReview = () => {
      let data = {
         review: review,
         name: props.user.name,
         user_id: props.user.id,
         movie_url: props.match.params.id
      }

      movieService.createReview(data)
         .then(response => {
            setSubmitted(true)
         })
         .catch(error => {
            console.error(error)
         })
   }

   return (
      <>
         {submitted ? (
            <div>
               <h4>Review Submitted Successfully</h4>
               <Link to={`/movies/id/${props.match.params.id}`}></Link>
            </div>
         ) : (
            <Form>
               <Form.Group>
                  <Form.Label>{editMode ? "Edit" : "Create"} Review</Form.Label>
                  <Form.Control 
                     type='text'
                     required
                     value={review}
                     onChange={onChangeReview}
                  />
               </Form.Group>

               <Button variant='primary' onClick={saveReview}>Submit</Button>
            </Form>
         )}
      </>
   )
}

export default AddReview;