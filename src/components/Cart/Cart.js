import React, { useContext } from 'react';

import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const groupedItems = {};
  cartCtx.items.forEach((item) => {
    if (!groupedItems[item.name]) {
      groupedItems[item.name] = { ...item, totalQuantity: 0 };
    }
    groupedItems[item.name].totalQuantity += Number(item.quantity);
    return item; // Return the item in the map function
  });

  const increaseItemQt = (item) => {
    cartCtx.addItem({ ...item, quantity: 1 }); // Add one more of the item
  };

  const decreaseItemQt = (item) => {
    const existingItem = cartCtx.items.find((cartItem) => cartItem.id === item.id);

    if (existingItem.quantity === 1) {
      cartCtx.removeItem(item.id); // Remove the item from the cart
    } else {
      cartCtx.addItem({ ...item, quantity: -1 }); // Decrease the quantity by one
    }
  };


  const cartItems = (
    <ul className={classes['cart-items']}>
      {Object.values(groupedItems).map((item) => (
        <div key={item.name}>
          <li>
            <h2 className={classes.name}>{item.name}</h2>
            Quantity: {item.totalQuantity}, Price: {item.price}
            <button onClick={() => increaseItemQt(item)}>+</button>
            <button onClick={() => decreaseItemQt(item)}>-</button>
          </li>
        </div>
      ))}
    </ul>
  );

  let totalAmount = 0;
  cartCtx.items.map((item) => {
    totalAmount = item.quantity * item.price;
    return item; // Return the item in the map function
  });



    return (
        <Modal onClose={props.onClose} >
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose} >Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    );
};

export default Cart;