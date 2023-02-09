import './App.css';
import { useState} from 'react';
import Cart from '../src/components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

function App() {
  const [isCartShown,setIsCartShown] = useState(false);

  const showCartHandler = () =>{
    setIsCartShown(true)
  }

  const hideCartHandler = () =>{
    setIsCartShown(false)
  }

  return (
    <CartProvider>
      {isCartShown && <Cart onCloseCart={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals /> 
      </main>
    </CartProvider>
  );
}

export default App;
