import React, { useContext } from 'react';

import ThemeContext  from '../contexts/ThemeContext';

export default function ThemeSwitch(props) {
	const { theme, toggle } = useContext(ThemeContext);
	

	
	return (
		<button
			onClick={() => toggle()}
			className='theme-switch'
		>
		Theme
		</button>
		)
}