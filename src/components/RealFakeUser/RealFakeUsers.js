import React from 'react';
import RealFakeUser from './RealFakeUser';


function RealFakeUsers() {
	const users = [
		{
			name: 'Nicholas Mage',
			
			testimonial: 'I was stuck in a total rut, and I felt like my powers were fading away. Then indecisio suggested I fight' +
				'the Balrog known as Durin\'s Bane, and boy did that ever breathe new life into me. '
		},
		{
			name: 'Normy Norm McNormal IV',

			testimonial: 'I said 15% or more by switching my car...oh wait wrong spiel. Umm, oh oh okay got it. I was paying too much much for car insurance until indecisio told me to sell my car. Yup thats it. Improv.  '
		},
		{
			name: 'Tentin Quarantino',
	
			testimonial: 'Indecisio suggested I check out another app called Canonize to help me write and keep track of characters for my movies. Other than ' +
				'Nicholas Mage actually coming to life it was a great suggestion!'
		}
	];
	
	function renderFakeUsers() {
		return users.map(user => (
			<RealFakeUser
				name={user.name}
				key={user.name}
				text={user.testimonial}
			/>
		))
	}
	
	return (
		<section id='fakeusers-container'>
			{renderFakeUsers()}
		</section>
	)
}

export default RealFakeUsers;