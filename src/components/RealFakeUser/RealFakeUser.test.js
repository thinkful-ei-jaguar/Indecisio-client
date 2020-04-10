import * as React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import RealFakeUser from "./RealFakeUser";

it("renders without crashing", () => {
	const div = document.createElement("div");
	
	ReactDOM.render(
		<BrowserRouter>
			<RealFakeUser/>
		</BrowserRouter>
		, div);
});