import * as React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import NavBar from "./NavBar";

it("renders without crashing", () => {
	const div = document.createElement("div");
	
	ReactDOM.render(
		<BrowserRouter>
			<NavBar/>
		</BrowserRouter>
		, div);
});