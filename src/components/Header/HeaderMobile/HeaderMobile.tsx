import { useEffect } from 'react';

import Slider from '@components/Slider';
import { useToggle } from '@hooks/useToggle';
import logoText from '@images/svg/Lalasia.svg';
import logo from '@images/svg/Logo.svg';
import mobileMenu from '@images/svg/MobileMenu.svg';
import './HeaderMobile.scss';
import cl from 'classnames';

export const HeaderMobile = () => {
  const { toggle, onHandleToggle } = useToggle();

  useEffect(() => {
    if (toggle) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [toggle]);

  return (
    <header className={cl('header-mobile')}>
      <div className={cl('header-mobile__logo')}>
        <img className={cl('header-mobile__img')} src={logo} alt='logo' />
        <img className={cl('header-mobile__text')} src={logoText} alt='logo-text' />
      </div>
      <div className={cl('menu')} onClick={onHandleToggle}>
        <img src={mobileMenu} alt='bag' />
      </div>
      <Slider onHandleToggle={onHandleToggle} className={toggle ? 'slider_show' : ''} />
    </header>
  );
};
