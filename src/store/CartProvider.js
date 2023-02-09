import { useReducer } from 'react';
import CartContext from './cart-context';


// second argument to useReduder hook
const cartDefaultState = {
    items: [],
    totalAmount:0
}

// first argument to useReduder hook
const cartReducer = (state,action) =>{

    if(action.type === "ADD_ITEM"){
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingCartItemIndex = state.items.findIndex(item => 
            item.id === action.item.id
        )

        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems; 

        // if item is already present then simply updated the amount
        if(existingCartItem){
            const updatedItem = {
                ...existingCartItem,
                //updatingg amount
                amount: existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }else{
            updatedItems = state.items.concat(action.item);
        }
        return{
            items: updatedItems, 
            totalAmount: updatedTotalAmount
        }
    }
    //Removing Item
    if(action.type === "REMOVE_ITEM"){
        const existingCartItemIndex = state.items.findIndex(item => 
            item.id === action.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems; 
        //If only one item per food is present then simply remove it off from tr cart.
        if(existingCartItem.amount === 1){
            updatedItems = state.items.filter(item => item.id !== action.id);
        }
        else{
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount -1}
            updatedItems =[...state.items]
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return{
            items:updatedItems,
            totalAmount: updatedTotalAmount
        }        

    }

    if(action.type === 'CLEAR'){
        return cartDefaultState
    }

    return cartDefaultState;
}


const CartProvider = (props) =>{

    const [cartState, dispatchCartAction] = useReducer(cartReducer,cartDefaultState);
     
    const addItemCartHandler = (item) => {
        dispatchCartAction({type:"ADD_ITEM" , item:item})
    }
    const removeItemCartHandler = (id) => {
        dispatchCartAction({type:"REMOVE_ITEM", id:id})
    }
    const clearCartHandler = () =>{
        dispatchCartAction({type:"CLEAR"});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemCartHandler,
        removeItem: removeItemCartHandler,
        clearCart: clearCartHandler
    }
    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;