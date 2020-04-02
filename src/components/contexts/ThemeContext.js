import React, { useState, useLayoutEffect } from 'react';

const ThemeContext = React.createContext({
	dark: false,
	toggle: () => {},
});

export default ThemeContext;

export function ThemeProvider (props) {
	// keeps state of the current theme
	const [dark, setDark] = useState(false);
	
	// paints the app before it renders elements
	useLayoutEffect(() => {
		const lastTheme = window.localStorage.getItem('darkTheme');
		
		if (lastTheme === 'true') {
			setDark(true);
			applyTheme(darkTheme);
		} else {
			setDark(false);
			applyTheme(lightTheme);
		}
		// if state changes, repaints the app
	}, [dark]);
	
	// rewrites set of css variables/colors
	const applyTheme = theme => {
		const root = document.getElementsByTagName('html')[0];
		root.style.cssText = theme.join(';');
	};
	
	const toggle = () => {
		const body = document.getElementsByTagName('body')[0];
		body.style.cssText = 'transition: background 4s ease';
		
		setDark(!dark);
		window.localStorage.setItem('darkTheme', !dark);
	};
	
	return (
		<ThemeContext.Provider value={{
			dark,
			toggle,
		}}>
			{props.children}
		</ThemeContext.Provider>
	)
}

const darkTheme = [
	'--main-bg: hsl(212, 54%, 33%)', //dark blue
	'--main-fg: hsl(197, 49%, 50%', //indecision blue
//   '--accent-one: hsl(200, 58%, 43%)',// dark purple
//	'--accent-three: hsl(180, 72%, 61%)', //light blue
//	'--accent-two: hsl(220, 72%, 87%)' //mid bluish
];

const lightTheme = [
	'--main-bg: #e7e7e7 ',
	'--main-fg: #275283 ',
	'--accent-one: #6e97e7',
	'--accent-two: #233A85 ',
	'--accent-three: #56e3e3 ',
];

