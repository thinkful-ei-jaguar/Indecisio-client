import React from 'react';
import './Landing.css';
import RealFakeUsers from '../RealFakeUser/RealFakeUsers.js'


export default function LandingPage(props) {

	
	
	return ( <section className="landing-page">
		<div className="hero">
			<div id='problems'>
				<h2>Are you...</h2>
				<h5>Tired and uninspired?</h5>
				<h5>Stuck inside and cant decide?</h5>
				<h5> Or simply vacationing from responsibility?</h5>
			</div>
			<div id='solutions'>
				<h5>Whatever the case, this is the place to...</h5><br/>
				<p id={"first"}>source <em>boredom destroying</em> activities</p>
				<p><em>Share</em> your own methods for doing such</p>
				<p>Track how your suggestions stack up against the rest</p><br />
				<p id='last'>Check out what these users have to say...</p><br />
			</div>
			
		</div>

		<div className="RealFakeUsers">
			<RealFakeUsers />
		</div>
		
	</section>
	)
}