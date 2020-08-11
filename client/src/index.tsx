import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import App from "./App";

import "./index.scss";

const axiosBaseURL = process.env.AXIOS_BASE_URL || "http://localhost:8080";
axios.defaults.baseURL = axiosBaseURL;

console.log(axiosBaseURL);

ReactDOM.render(
	<React.StrictMode>
		<App />
  	</React.StrictMode>,
	document.getElementById("root")
);

serviceWorker.unregister();
