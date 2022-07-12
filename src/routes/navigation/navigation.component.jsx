import { Outlet, Link } from 'react-router-dom';
import { UserContext } from '../../context/user.context';
import { Fragment, useContext } from 'react';
import { ReactComponent as CrownLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../utils/firebase/firebase.utils'
import './navigation.styles.scss';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);


    return (
      <Fragment>
        <div className="navigation">
            <Link to='/' className='logo-container'>
                <CrownLogo className='logo' />
            </Link>
            <div className="nav-links-container">
                {/* <Link className='nav-link' to='/shop'>
                    SHOP
                </Link> */}
                {currentUser ? (
                  <span onClick={signOutUser} className='nav-link'>SIGN OUT</span>
                ): (
                  <Link className='nav-link' to='/auth'>
                      SIGN IN
                  </Link>
                )}
            </div>
        </div>
        <Outlet />
      </Fragment>
    )
  }

export default Navigation;