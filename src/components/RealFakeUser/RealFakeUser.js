import React from 'react';
import './RealFakeUser.css';
export default function RealFakeUser(props) {

	return (
		<section className='real-fake'>
			
			<h4 id='fakeName'>{props.name}</h4>
			
			<p id='testimonial'>{props.text}</p>
		</section>
	)
}