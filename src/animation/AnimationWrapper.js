import React, { useState } from "react";
import "./styles.css";
import Form from './Form';
import SlideFrame from "./SlideFrame";

const AnimateWrap = () => {
	const [show, setShow] = useState(false);
	return (
		<div>
			<button onClick={() => setShow(show => !show)}>
				{show ? "enter" : "exit"}
			</button>
			<SlideFrame show={show}>
				<Form />
			</SlideFrame>
		</div>
	);
};

export default AnimateWrap;
