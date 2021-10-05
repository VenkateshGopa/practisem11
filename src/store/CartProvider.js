import CartContext from "./Cart-context";
import { useReducer } from "react";

const defaultCartstate = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    let UpdatedItems;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const newTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    if (existingCartItem) {
      const UpdatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      UpdatedItems = [...state.items];
      UpdatedItems[existingCartItemIndex] = UpdatedItem;
    } else {
      UpdatedItems = state.items.concat(action.item);
    }
    return {
      items: UpdatedItems,
      totalAmount: newTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingitem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingitem.price; 
    let UpdatedItems;

    if( existingitem.amount === 1 ){
      UpdatedItems = state.items.filter(item => item.id !== action.id);
    }
    else{
      const UpdatedItem = { ...existingitem , amount:existingitem.amount -1};
      UpdatedItems=[...state.items];
      UpdatedItems[existingCartItemIndex]= UpdatedItem;
    }
    return{
      items: UpdatedItems,
      totalAmount: updatedTotalAmount
    }
  }
  return defaultCartstate;
};
const CartProvider = (props) => {
  const [cartstate, dispactchCartAction] = useReducer(
    cartReducer,
    defaultCartstate
  );
  const addItemToCartHandler = (item) => {
    dispactchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispactchCartAction({ type: "REMOVE", id: id });
  };

  const cartContaxt = {
    items: cartstate.items,
    totalAmount: cartstate.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContaxt}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
