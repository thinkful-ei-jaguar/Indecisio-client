import React, { useContext } from 'react';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import UserContext from '../contexts/UserContext';

export default function AppHeader(props) {
	const user = useContext(UserContext);
	
	return (
		<div className="header">
			<h1 id='brand'>indecisio           '</h1>
			
			{user.name && <span id='greeting'>Hello, {user.name}!</span>}
			<ThemeSwitch />
		</div>
	)
}