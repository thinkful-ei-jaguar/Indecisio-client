import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

import ThemeContext  from '../contexts/ThemeContext';

export default function ThemeSwitch(props) {
	const { theme, toggle } = useContext(ThemeContext);
	

	
	return (
		<button
			onClick={() => toggle()}
			className='theme-switch'
		>
			<FontAwesomeIcon icon={theme ? faSun : faMoon} />
		</button>
		)
}