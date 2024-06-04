import { createContext, useReducer } from "react";

export const UserContext = createContext({
  user: [],
  addUser: ({ id, userName, email, phoneNumber }) => {},
  //   setTransactions: (transactions) => {},
});

function userReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.paylod, ...state];
    // case "SET":
    //   const inverted = action.paylod.reverse();
    //   return inverted;
    default:
      return state;
  }
}

function UserContextProvider({ children }) {
  const [userState, dispatch] = useReducer(userReducer, []);

  function addUser(userData) {
    dispatch({ type: "ADD", paylod: userData });
  }

  //   function setTransactions(transactions) {
  //     dispatch({ type: "SET", paylod: transactions });
  //   }

  const value = {
    user: userState,
    addUser: addUser,
    // setTransactions: setTransactions,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContextProvider;
