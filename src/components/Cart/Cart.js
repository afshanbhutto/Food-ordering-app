import { Fragment, useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartItem from "./CartItem";
import CartContext from '../../store/cart-context';
import classes from './Cart.module.css';
import Checkout from './Checkout';

const Cart = (props) => {

  const [isCheckout, setIsCheckout] = useState(false);
  //managing submitting state
  const [isSubmitting, setIsSubmitting] = useState(false);
  //managing success messgae after successful data send
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (id) =>{
    cartCtx.removeItem(id)
  };
  const cartItemAddHandler = (item) =>{
    cartCtx.addItem({...item, amount:1})
  }

  const orderHandler = () =>{
    setIsCheckout(true);
  }

  const orderSubmitHandler = async (userData) =>{
    setIsSubmitting(true);
    await fetch('https://food-order-app-fc617-default-rtdb.firebaseio.com/orders.json',{
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderItems: cartCtx.items
      })
    });

    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  }

  const cartHasIems = cartCtx.items.length > 0;
    const cartItems = (
      <ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => (
          <CartItem 
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
          />
        ))}
      </ul>
    );
  
    const modalActions = (
      <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>
          {cartHasIems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    );

    const cartModalContent = <Fragment>
      {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout onConfirm={orderSubmitHandler} onCancel={props.onCloseCart}/>}
        {!isCheckout && modalActions}
    </Fragment>

    const isSubmittingModalContent = <p>Sending order data...</p>
    const didSubmitModalContent = 
      <Fragment>
        <p>Successfully submitted data.</p>
        <div className={classes.actions}>
          <button className={classes.button} onClick={props.onCloseCart}>Close</button>
        </div>
      </Fragment>

    return (
      <Modal onCloseCart={props.onCloseCart}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
      </Modal>
    );
  };

export default Cart;