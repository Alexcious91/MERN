import React, { useState } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link, Route, Switch } from 'react-router-dom'

import MoviesList from './components/MovieList';
import AddReview from './components/Add-review';
import Movie from './components/Movie';
import Login from './components/Login';

function App() {
	const [user, setUser] = useState(null); // different to handbook
 
	async function login(user = null) {
	  setUser(user);
	};
	async function logout() {
	  setUser(null);
	};
 
	return (
	  <div className="App">
		 <Navbar bg="light" expand="lg">
			<Navbar.Brand>Movie Reviews</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
			  <Nav className="mr-auto">
				 <Nav.Link>
					<Link to={"/movies"}>Movies</Link>
				 </Nav.Link>
				 <Nav.Link>
					{user ? (
					  <a href='/' onClick={logout}>Logout</a>
					) : (
					  <Link to={"/login"}>Login</Link>
					)}
				 </Nav.Link>
			  </Nav>
			</Navbar.Collapse>
		 </Navbar>
 
		 <Switch>
			<Route exact path={["/", "/movies"]} component={MoviesList}>
			</Route>
			<Route path="/movies/:id/review" render={(props) =>
			  <AddReview {...props} user={user} />
			}>
			</Route>
			<Route path="/movies/:id/" render={(props) =>
			  <Movie {...props} user={user} />
			}>
			</Route>
			<Route path="/login" render={(props) =>
			  <Login {...props} login={login} />
			}>
			</Route>
		 </Switch>
	  </div>
	);
 }
 
export default App;
