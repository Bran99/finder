import React, { Component } from 'react';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import axios from 'axios';
import './App.css';

class App extends Component {
	state = {
		users: [],
		loading: false,
		alert: null
	};

	// Search Github users
	searchUsers = async query => {
		this.setState({ loading: true });

		const res = await axios.get(
			`https://api.github.com/search/users?q=${query}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
		);

		this.setState({ users: res.data.items, loading: false });
	};

	// Clear searched users from state
	clearUsers = () => {
		this.setState({ users: [], loading: false });
	};

	// Set alert on invalid input
	setAlert = (msg, type) => {
		this.setState({ alert: { msg, type } });

		// Hide alert after 5 seconds
		setTimeout(() => this.setState({ alert: null }), 5000);
	};

	render() {
		const { users, loading } = this.state;

		return (
			<div className='App'>
				<Navbar />
				<div className='container'>
					<Alert alert={this.state.alert} />
					<Search
						searchUsers={this.searchUsers}
						clearUsers={this.clearUsers}
						showClear={users.length > 0}
						setAlert={this.setAlert}
					/>
					<Users users={users} loading={loading} />
				</div>
			</div>
		);
	}
}

export default App;
