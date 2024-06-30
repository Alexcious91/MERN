import React, { useState } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link, Route, Switch } from 'react-router-dom'

import MoviesList from './components/MovieList';
import AddReview from './components/Add-review';
import Movie from './components/Movie';
import Login from './components/Login';

function App() {
	const [user, setUser] = useState(localStorage.getItem("user")); // different to handbook

	async function login(user = null) {
		setUser(user);
	};
	async function logout() {
		localStorage.removeItem("user")
		setUser(null);
	};

	return (
		<div className="App">
			<Navbar bg="light" expand="lg">
				<Navbar.Brand>Movie Reviews</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Item>
							<Nav.Link href="/movies">Movies</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							{user ? (
								<Nav.Link href="/" onClick={logout}>Logout</Nav.Link>
							) : (
								<Nav.Link href="login">Login</Nav.Link>
							)}
						</Nav.Item>
					</Nav>
				</Navbar.Collapse>
			</Navbar>

			<Switch>
				<Route exact path={["/", "/movies"]} component={MoviesList}></Route>

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
