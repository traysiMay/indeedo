import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import UserProvider from "./UserContext";
import BubbleProvider from "./BubbleContext";

ReactDOM.render(
  <BubbleProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </BubbleProvider>,
  document.getElementById("root")
);
