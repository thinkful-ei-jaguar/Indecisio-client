import React from 'react'
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
	return (
		<section className="NavBar">
			<h2>IDK</h2>
			<ul id='navlist'>
				<li><Link to='/dashboard'>Home</Link></li>
				<li><Link to='/add-activity '>Add</Link></li>
			</ul>
		
		</section>
	)
}

export default NavBar;