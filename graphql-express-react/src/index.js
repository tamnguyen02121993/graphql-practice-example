import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { ApolloProvider } from "react-apollo";
import { BrowserRouter, Route } from "react-router-dom";
import { Security, LoginCallback } from "@okta/okta-react";
import client from "./apollo";

import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <BrowserRouter>
    <Security
      issuer={`${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`}
      redirect_uri={`${window.location.origin}/implicit/callback`}
      client_id={process.env.REACT_APP_OKTA_CLIENT_ID}
    >
      <ApolloProvider client={client}>
        <Route path="/implicit/callback" component={LoginCallback}></Route>
        <Route path="/" component={App}></Route>
      </ApolloProvider>
    </Security>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
if (module.hot) module.hot.accept();
