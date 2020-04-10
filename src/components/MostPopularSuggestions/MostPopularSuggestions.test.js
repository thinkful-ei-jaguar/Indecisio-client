import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import MostPopularSuggestions from "./MostPopularSuggestions";

it("renders without crashing", () => {
	const div = document.createElement("div");
	
	ReactDOM.render(
		<BrowserRouter>
			<MostPopularSuggestions/>
		</BrowserRouter>
		, div);
});