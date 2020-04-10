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
	'--main-text: hsl(210, 20%, 90%)',
	'--main-bg: hsl(209, 14%, 28%)',
	'--card-bg: hsl(210,6%,32%)',
	'--header-text: hsl(210, 40%, 95%)',
	'--hovered-bg: hsl(210, 30%, 75%)',
	'--hovered-text: hsl(210, 30%, 25%)',
	'--input-bg: hsl(210, 20%, 40%)',
	'--input-text: hsl(210, 20%, 90%)',
	'--input-shadow: hsla(210,4%, 80%, 0.5)',
	'--secondary-text: hsl(210,30%, 20%)',
	'--primary: hsl(210, 100%, 85%)',
	'--primary-text: hsl(210,50%, 35%)',
	'--secondary: hsl(220, 57%, 44%)',
	'--primary-hovered: hsl(210,40%, 85%)',
	'--secondary-hovered: hsl(210, 40%, 55%)',
	'--sun: hsl(65,90%, 75%)',
	'--cancel-text: hsl(0, 0%, 85%) ',
	`--big-shadow:
		1px 1px 2px inset hsla(220,6%,20%,0.5),
	    -1px -1px 2px inset hsla(210,5%,43%,0.3),
	    -15px 15px 30px hsla(210, 6%, 20%, 0.2),
	    -15px -15px 30px hsla(220, 5%, 43%, 0.9),
		15px -15px 30px hsla(210, 6%, 20%, 0.2),
	    15px 15px 30px hsla(220, 6%, 20%, 0.9);`,
	'--small-shadow: 6px 6px 12px hsla(210, 5%, 20%, 0.7), -6px -6px 12px hsla(210, 5%, 60%, 0.4);',
	
]

const lightTheme = [
	'--main-text: hsl(210, 20%, 35%)',
	'--main-bg: hsl(210, 20%, 80%)',
	'--card-bg: hsl(210,10%,90%)',
	'--header-text: hsl(210, 90%, 35%)',
	'--hovered-bg: hsl(210, 30%, 75%)',
	'--input-bg: hsl(210, 25%, 90%)',
	'--input-text: hsl(210, 20%, 10%)',
	'--input-shadow: hsla(210,4%, 40%, 0.5)',
	'--secondary-text: hsl(210,30%, 20%)',
	'--primary: hsl(210, 100%, 35%)',
	'--primary-text: hsl(210,60%, 100%)',
	'--secondary: hsl(210, 40%, 90%)',
	'--primary-hovered: hsl(210,40%, 55%)',
	'--secondary-hovered: hsl(210, 40%, 35%)',
	'--cancel-text: hsl(0, 0%, 15%) ',
	'--primary-shadow: 3px 3px 12px inset hsla(210,4%, 40%, 0.5)',
	'--small-shadow: 6px 6px 12px hsla(210, 5%, 20%, 0.7), -6px -6px 12px hsla(210, 5%, 80%, 0.4);',
	'--sun: hsl(210,80%, 40%)',
]