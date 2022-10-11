import bag from '@images/svg/Bag.svg';
import logoText from '@images/svg/Lalasia.svg';
import logo from '@images/svg/Logo.svg';
import user from '@images/svg/User.svg';
import cl from 'classnames';
import { NavLink, useLocation } from 'react-router-dom';
import './HeaderDesktop.scss';

export const HeaderDesktop = () => {
  const location = useLocation();

  return (
    <header className={cl('header-desktop')}>
      <div className={cl('header-desktop__logo')}>
        <img className={cl('header-desktop__img')} src={logo} alt='logo' />
        <img className={cl('header-desktop__text')} src={logoText} alt='logo-text' />
      </div>
      <div className={cl('section')}>
        <NavLink to={location.pathname === '/' ? '/' : '/product'} className={({ isActive }) => (isActive ? 'section_active' : undefined)}>
          Product
        </NavLink>
        <NavLink end to='/services' className={({ isActive }) => (isActive ? 'section_active' : undefined)}>
          Services
        </NavLink>
        <NavLink end to='/article' className={({ isActive }) => (isActive ? 'section_active' : undefined)}>
          Article
        </NavLink>
        <NavLink end to='/about' className={({ isActive }) => (isActive ? 'section_active' : undefined)}>
          About Us
        </NavLink>
      </div>
      <div className='icons'>
        <img className={cl('icons__bag')} src={bag} alt='bag' />
        <img className={cl('icons__user')} src={user} alt='user' />
      </div>
    </header>
  );
};
