import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({ searchUsers, showClear, clearUsers, setAlert }) => {
	const [query, setQuery] = useState('');

	const onChange = e => setQuery(e.target.value);

	const onSubmit = e => {
		e.preventDefault();

		// Validate search
		if (query === '') {
			return setAlert('Please enter something', 'light');
		}

		searchUsers(query);

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
			{showClear && (
				<button className='btn btn-light btn-block' onClick={clearUsers}>
					Clear
				</button>
			)}
		</div>
	);
};

Search.propTypes = {
	searchUsers: PropTypes.func.isRequired,
	clearUsers: PropTypes.func.isRequired,
	showClear: PropTypes.bool.isRequired,
	setAlert: PropTypes.func.isRequired
};

export default Search;
