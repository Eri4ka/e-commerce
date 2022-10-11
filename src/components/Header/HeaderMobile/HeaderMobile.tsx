import logoText from '@images/svg/Lalasia.svg';
import logo from '@images/svg/Logo.svg';
import mobileMenu from '@images/svg/MobileMenu.svg';
import './HeaderMobile.scss';
import cl from 'classnames';

export const HeaderMobile = () => {
  return (
    <header className={cl('header-mobile')}>
      <div className={cl('header-mobile__logo')}>
        <img className={cl('header-mobile__img')} src={logo} alt='logo' />
        <img className={cl('header-mobile__text')} src={logoText} alt='logo-text' />
      </div>
      <div className={cl('menu')}>
        <img src={mobileMenu} alt='bag' />
      </div>
    </header>
  );
};
