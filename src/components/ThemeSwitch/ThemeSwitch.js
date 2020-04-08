import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

import ThemeContext  from '../contexts/ThemeContext';

export default function ThemeSwitch(props) {
	const { dark, toggle } = useContext(ThemeContext);
	

	
	return (
		<button
			id='theme-switch'
			aria-label='theme-switch'
			onClick={() => toggle()}
			className='theme-switch'
		>
			<FontAwesomeIcon icon={dark ? faSun : faMoon} />
		</button>
		)
}