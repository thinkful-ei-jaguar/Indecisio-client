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
	'--main-bg: #275283',
	'--main-fg: #419ABE',
	'--accent-one: #56e3e3',
	'--accent-two: #6e97e7',
	'--accent-three: #233A85'
]

const lightTheme = [
	'--main-bg: #e7e7e7 ',
	'--main-fg: #275283 ',
	'--accent-one: #6e97e7',
	'--accent-two: #233A85 ',
	'--accent-three: #56e3e3 '
]