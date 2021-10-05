import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import { useContext } from "react";
import CartContext from "../../store/Cart-context";
import CartItem from "../Cart/CartItem";
const Cart = (props) => {
  const ctx = useContext(CartContext);
  
  const CartItemRemoveHandler = id =>{
    ctx.removeItem(id);
  };
  const CartItemAddHandler = item =>{
    ctx.addItem({...item , amount:1});
  };
  const hasItems = ctx.items.length > 0;
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={CartItemRemoveHandler.bind(null, item.id)}
          onAdd={CartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onclick={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span> Total amount</span>
        <span> {totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideCart}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};
export default Cart;
