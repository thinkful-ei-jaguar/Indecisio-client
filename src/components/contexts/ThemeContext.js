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
	
	// rewrites set of css variablels/colors
	const applyTheme = theme => {
		const root = document.getElementsByTagName('html')[0];
		root.style.cssText = theme.join(';');
	}
	
	const toggle = () => {
		const body = document.getElementsByTagName('body')[0];
		body.style.cssText = 'transition: background .5s ease';
		
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
	'--main-fg: hsl(199, 97%, 25%)',
	'--main-bg: hsl(210, 100%, 12%)',
	'--accent-one: hsl(193,97%,85%)',
	'--accent-two: hsl(197, 97%, 75%)',
	'--error: hsl(3, 98%, 60%)',
	'--happy: hsl(126, 87%, 66%);',
]

const lightTheme = [
	'--main-bg: hsl(193,97%,85%) ',
	'--main-fg: hsl(199, 97%, 30%) ',
	'--accent-one: hsl(225, 59%, 27%)',
	'--accent-two: #6e97e7 ',
	'--accent-three: hsl(197, 97%, 85%)'
]