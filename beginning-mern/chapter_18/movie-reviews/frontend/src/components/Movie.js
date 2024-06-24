import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movies';

import { Card, Container, Image, Col, Row, Button, Media } from 'react-bootstrap';
import { Link } from 'react-router-dom'

function Movie(props) {
   const movieService = new MovieDataService();

   const [movie, setMovie] = useState({
      id: null,
      title: "",
      rated: "",
      reviews: []
   })

   const getMovie = async (id) => {
      try {
         const response = await movieService.get(id)
         setMovie(response.data)
         console.log(response.data);
      } catch (error) {
         console.error(error);
      }
   }

   useEffect(() => {
      getMovie(props.match.params.id)
   }, [props.match.params.id])

   return (
      <div>
         <Container>
            <Row>
               <Col>
                  <Image src={`${movie.poster}/100px250`} fluid />
               </Col>

               <Col>
                  <Card>
                     <Card.Header as="h5">{movie.title}</Card.Header>

                     <Card.Body>
                        <Card.Text>
                           {movie.plot}
                        </Card.Text>

                        {props.user && 
                           <Link to={"/movies/" + props.match.params.id + "/review"}>Add Review</Link> 
                        }
                     </Card.Body>
                  </Card>
                  <br />
                  <h2>Reviews</h2>
               </Col>
            </Row>
         </Container>
      </div>
   )
}

export default Movie;