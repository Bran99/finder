import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
	const githubContext = useContext(GithubContext);
	const alertContext = useContext(AlertContext);

	const [query, setQuery] = useState('');

	const onChange = e => setQuery(e.target.value);

	const onSubmit = e => {
		e.preventDefault();

		// Validate search
		if (query === '') {
			return alertContext.setAlert('Please enter something', 'light');
		}

		githubContext.searchUsers(query);

		setQuery('');
	};

	return (
		<div>
			<form onSubmit={onSubmit} className='form'>
				<input
					type='text'
					name='query'
					placeholder='Search Users…'
					value={query}
					onChange={onChange}
				/>

				<input
					type='submit'
					value='Search'
					className='btn btn-dark btn-block'
				/>
			</form>
			{githubContext.users.length > 0 && (
				<button
					className='btn btn-light btn-block'
					onClick={githubContext.clearUsers}
				>
					Clear
				</button>
			)}
		</div>
	);
};

export default Search;
