import { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      console.log(action);
      return [...state, { ...action.foodDetail }];
    case "UPDATE":
      const itemIndex = state.findIndex((i) => i.id === action.id);
      const item = {
        ...state[itemIndex],
        price: action.price,
        qty: action.qty,
      };
      state.splice(itemIndex, 1, item);
      return [...state];
    case "REMOVE":
      state.splice(action.index, 1);
      return [...state];
    case "DONE":
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
