import React, { useContext } from 'react';

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';
import CartContext from '../../../store/cart-context'


const MealItemForm = (props) => {
    const cartCtx = useContext(CartContext);
    const addItemToCart = (event) => {
        event.preventDefault();
        const quantity = document.getElementById('amount_'+props.item.id).value
        cartCtx.addItem({...props.item , quantity: quantity})
        console.log(cartCtx.items);
    };

    return (
        <form className={classes.form}>
            {console.log(cartCtx)}
            <Input label="Amount" input={{
                id: 'amount_'+props.item.id,
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1'
            }}  />
            <button onClick={addItemToCart}>+ Add</button>
        </form>
    );
};

export default MealItemForm;