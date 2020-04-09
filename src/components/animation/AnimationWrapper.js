import React, { useState } from "react";
import "./styles.css";
import ActivityForm from '../ActivityForm/ActivityForm';
import SlideFrame from "./SlideFrame";

const AnimateWrap = () => {
	const [show, setShow] = useState(false);
	return (
		<div>
			<button onClick={() => setShow(show => !show)}>
				{show ? "enter" : "exit"}
			</button>
			<SlideFrame show={show}>
				<ActivityForm />
			</SlideFrame>
		</div>
	);
};

export default AnimateWrap;
