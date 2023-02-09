import { Fragment } from 'react';
import MainImage from '../../assests/header-main-image.jpg';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) =>{
    return(
        <Fragment>
            <header className={classes.header}>
                <h1>|| YummyFood ||</h1>
                <HeaderCartButton onShowCart={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={MainImage} alt="Table full of delicious food"/>
            </div>
        </Fragment>
    )
}

export default Header;