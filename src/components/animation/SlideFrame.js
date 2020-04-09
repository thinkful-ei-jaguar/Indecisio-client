import React, { useEffect, useState } from "react";

const SlideFrame = ({ show, children }) => {
	const [shouldRender, setRender] = useState(show);
	
	useEffect(() => {
		if (show) {
			setRender(true);
		}
	}, [show]);
	
	const onAnimationEnd = () => {
		if (!show) {
			setRender(false);
		}
	};
	return (
		shouldRender && (
			<div id='track'
			     style={{
				     animation: `${show ? "slide-in" : "slide-out"} .2s ease-in-out 1 0s`
			     }}
			     onAnimationEnd={onAnimationEnd}
			>
				{children}
			</div>
		)
	);
};


export default SlideFrame;
