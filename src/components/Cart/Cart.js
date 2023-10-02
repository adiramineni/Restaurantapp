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

    const cartItems = <ul className={classes['cart-items']}>
        {Object.values(groupedItems).forEach((item) => 
                <li key={item.id}>Name: {item.name} Price: {item.price} quantity: {item.quantity} </li>
        )}
        </ul>;

    return (
        <Modal onClose={props.onClose} >
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>35.62</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose} >Close</button>
                <button className={classes.button}>Order</button>
            </div>
        </Modal>
    );
};

export default Cart;