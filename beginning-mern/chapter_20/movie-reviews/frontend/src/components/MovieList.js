import React, { useEffect, useState } from 'react';
import MovieDataService from '../services/movies';

import { Form, Button, Col, Row, Container, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';

function MoviesList(props) {
   const [movies, setMovies] = useState([])
   const [searchTitle, setSearchTitle] = useState("")
   const [searchRating, setSearchRating] = useState("")
   const [ratings, setRatings] = useState([])
   const movieService = new MovieDataService();

   useEffect(() => {
      retrieveMovies()
      retrieveRatings() // eslint-disable-next-line
   }, [searchTitle, searchRating])

   const retrieveMovies = async () => {
      try {
         const response = await movieService.getAll();
         // console.log(response)
         setMovies(response.data.movies)
      } catch (error) {
         console.error(error);
      }
   }

   const retrieveRatings = async () => {
      await movieService.getRatings()
         .then(response => {
            console.log(response)
            setRatings(["All ratings"].concat(response.data))
         })
         .catch(error => {
            console.error(error)
         })
   }

   const onChangeSearchTitle = (event) => {
      setSearchTitle(event.target.value)
   }
   const onChangeSearchRating = (event) => {
      setSearchRating(event.target.value)
   }

   const find = async (query, by) => {
      try {
         const response = await movieService.find(query, by)
         console.log(response);
         setMovies(response.data.movies);
      } catch (error) {
         console.log(error);
      }
   }

   const findByTitle = () => {
      find(searchTitle, "title")
   }

   const findByRating = () => {
      if (searchRating === "All rating") {
         retrieveMovies()
      } else {
         find(searchRating, "rated")
      }
   }
   return (
      <div className="App">
         <Container>
            <Form>
               <Row>
                  <Col>
                     <Form.Group>
                        <Form.Control type="text" placeholder="Search by title" value={searchTitle} onChange={onChangeSearchTitle} />
                     </Form.Group>
                     <Button variant="primary" type="button" onClick={findByTitle} >
                        Search
                     </Button>
                  </Col>
                  <Col>
                     <Form.Group>
                        <Form.Control as="select" onChange={onChangeSearchRating}>
                           {ratings.map((rating, index) => {
                              return (
                                 <option key={index} value={rating}>{rating}</option>
                              )
                           })}
                        </Form.Control>
                     </Form.Group>
                     <Button variant="primary" type="button" onClick={findByRating}>Search</Button>
                  </Col>
               </Row>
            </Form>

            <Row>
               {movies.map((movie, index) => {
                  return (
                     <Col key={index}>
                        <Card style={{ width: "18rem" }}>
                           <Card.Img src={`${movies.poster}/100px180`} />

                           <Card.Body>
                              <Card.Title>{movie.title}</Card.Title>

                              <Card.Text>
                                 Rating: {movie.rated}
                              </Card.Text>
                              <Card.Text>{movie.plot}</Card.Text>
                              <Link to={"/movies/id/" + movie._id}>View Reviews</Link>
                           </Card.Body>
                        </Card>
                     </Col>
                  )
               })}
            </Row>
         </Container>
      </div>
   )

}

export default MoviesList;