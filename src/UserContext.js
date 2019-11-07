import React, { useReducer } from "react";
import { UPDATE_USER } from "./actions";

export const UserContext = React.createContext();

const initialUserState = { name: "" };

const user_reducer = (state, action) => {
  const { name } = action;
  switch (action.type) {
    case UPDATE_USER:
      return { ...state, name };
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const [userState, user_dispatch] = useReducer(user_reducer, initialUserState);

  return (
    <UserContext.Provider value={{ userState, user_dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
