import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/Cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnishiglited, setbtnishighlited] = useState(false);
  const ctx = useContext(CartContext);
  const numberofcartitems = ctx.items.reduce((curnumber, item) => {
    return curnumber + item.amount;
  }, 0);
  const btnclasses = `${classes.button} ${btnishiglited ? classes.bump : ""}`;
  const { items } = ctx;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setbtnishighlited(true);
    const timer = setTimeout(() => {
      setbtnishighlited(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnclasses} onClick={props.onclick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span> Yourcart</span>
      <span className={classes.badge}> {numberofcartitems}</span>
    </button>
  );
};
export default HeaderCartButton;
