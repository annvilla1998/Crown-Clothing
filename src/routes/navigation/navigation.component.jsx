import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector'

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import { CartContext } from '../../context/cart.context';

import { Fragment, useContext } from 'react';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils'
import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from './navigation.styles.js';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const { isCartOpen } = useContext(CartContext);


    return (
      <Fragment>
          <NavigationContainer>
            <LogoContainer to='/' >
                <CrownLogo className='logo' />
            </LogoContainer>
            <NavLinksContainer>
                <NavLink to='/shop'>
                    SHOP
                </NavLink>
                {currentUser ? (
                  <NavLink as='span' onClick={signOutUser} >SIGN OUT</NavLink>
                ): (
                  <NavLink to='/auth'>
                      SIGN IN
                  </NavLink>
                )}
                <CartIcon />
            </NavLinksContainer>
            {isCartOpen && <CartDropdown />}
            </ NavigationContainer>
        <Outlet />
      </Fragment>
    )
  }

export default Navigation;