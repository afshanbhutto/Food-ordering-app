import { useContext,useEffect,useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) =>{
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

    const cartCtx = useContext(CartContext);

    const {items} = cartCtx;
    const numeberOfCartItems = items.reduce((curNumber , item) =>{
        return curNumber+item.amount;
    }, 0);

    
    const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

    useEffect(()=>{
        if(items.length === 0){
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(()=>{
            setBtnIsHighlighted(false)
        }, 300);

        //cleanup func
        return () => {
            clearTimeout(timer);
        };
    }, [items]);
    return(
        <button className={btnClasses} onClick={props.onShowCart}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>
                Your Cart
            </span>
            <span className={classes.badge}>
                {numeberOfCartItems}
            </span>
        </button>
    );
}

export default HeaderCartButton;