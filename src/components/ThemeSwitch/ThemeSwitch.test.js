import * as React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import ThemeSwitch from "./ThemeSwitch";

it("renders without crashing", () => {
	const div = document.createElement("div");
	
	ReactDOM.render(
		<BrowserRouter>
			<ThemeSwitch/>
		</BrowserRouter>
		, div);
});