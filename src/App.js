import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';

import GithubState from './context/github/GithubState';

import './App.css';

const App = () => {
	const [users, setUsers] = useState([]),
		[user, setUser] = useState({}),
		[repos, setRepos] = useState([]),
		[loading, setLoading] = useState(false),
		[alert, setAlert] = useState(null);

	// Search Github users
	const searchUsers = async query => {
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/search/users?q=${query}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		setUsers(res.data.items);
		setLoading(false);
	};

	// Get a single Github user
	const getUser = async username => {
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		setUser(res.data);
		setLoading(false);
	};

	// Get users repos
	const getUserRepos = async username => {
		setLoading(true);

		const res = await axios.get(
			`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		setRepos(res.data);
		setLoading(false);
	};

	// Clear searched users from state
	const clearUsers = () => {
		setLoading(false);
		setUsers([]);
	};

	// Set alert on invalid input
	const showAlert = (msg, type) => {
		setAlert({ msg, type });

		// Hide alert after 5 seconds
		setTimeout(() => setAlert(null), 5000);
	};

	return (
		<GithubState>
			<Router>
				<div className='App'>
					<Navbar />
					<div className='container'>
						<Alert alert={alert} />
						<Switch>
							<Route
								exact
								path='/'
								render={props => (
									<Fragment>
										<Search
											searchUsers={searchUsers}
											clearUsers={clearUsers}
											showClear={users.length > 0}
											setAlert={showAlert}
										/>
										<Users users={users} loading={loading} />
									</Fragment>
								)}
							/>
							<Route exact path='/about' component={About} />
							<Route
								exact
								path='/user/:login'
								render={props => (
									<User
										{...props}
										getUser={getUser}
										getUserRepos={getUserRepos}
										user={user}
										repos={repos}
										loading={loading}
									/>
								)}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	);
};

export default App;
