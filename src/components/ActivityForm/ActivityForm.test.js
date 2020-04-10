import * as React from "react";
import * as ReactDOM from "react-dom";
import ActivityForm from "./ActivityForm";

it("renders without crashing", () => {
	const div = document.createElement("div");
	ReactDOM.render(<ActivityForm/>, div);
});