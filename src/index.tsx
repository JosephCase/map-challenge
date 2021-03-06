import {
  ApolloClient, ApolloProvider, InMemoryCache
} from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import GoogleMapsProvider from "./GoogleMapsProvider";
import "./index.css";
import reportWebVitals from "./reportWebVitals";


export const apolloClient = new ApolloClient({
  uri: "https://stuart-frontend-challenge.vercel.app/graphql",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <GoogleMapsProvider>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </GoogleMapsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
