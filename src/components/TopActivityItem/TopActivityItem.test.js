import * as React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import TopActivities from "../TopActivities/TopActivities";
import TopActivityItem from "./TopActivityItem";

it("renders without crashing", () => {
	const div = document.createElement("div");
	
	ReactDOM.render(
		<BrowserRouter>
			<TopActivities>
				<TopActivityItem/>
			</TopActivities>
		</BrowserRouter>
		, div);
});