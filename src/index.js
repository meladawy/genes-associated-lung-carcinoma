import React from "react";
import ReactDOM from "react-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.platform.opentargets.org/api/v4/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
reportWebVitals();
