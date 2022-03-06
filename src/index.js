import React from "react";
import ReactDOM from "react-dom";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.platform.opentargets.org/api/v4/graphql",
  cache: new InMemoryCache(),
});




// client
//   .query({
//     query: gql`
//       query lungCarcinomaAssociatedTargets {
//         disease(efoId: "EFO_0001071") {
//           associatedTargets(page: { index: 0, size: 25 }) {
//             rows {
//               target {
//                 id
//                 approvedSymbol
//               }
//               score
//               datatypeScores {
//                 id
//                 score
//               }
//             }
//           }
//         }
//       }
//     `,
//   })
//   .then((result) => console.log(result));

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
