import React, { useContext } from 'react';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import UserContext from '../contexts/UserContext';

export default function AppHeader(props) {
	const user = useContext(UserContext);
	
	return (
		<div id="app-header" className='header'>
			<h1 id='brand'>Indecisio</h1>
			
			{user.name && <span id='greeting'>Hello, {user.name}!</span>}
			<ThemeSwitch />
		</div>
	)
}