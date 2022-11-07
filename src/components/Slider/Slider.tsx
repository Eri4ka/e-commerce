import { useAppSelector } from '@myredux/hooks';
import { NavLink, useLocation } from 'react-router-dom';

import styles from './Slider.module.scss';

const Slider = ({ onHandleToggle, className }: { onHandleToggle: () => void; className: string }) => {
  const location = useLocation();
  const currentUser = useAppSelector((state) => state.user.user);

  return (
    <div className={`${styles.slider} ${styles[className]}`}>
      <div className={styles.slider__content}>
        <button className={styles.slider__exit} onClick={onHandleToggle}>
          &#10006;
        </button>
        <nav className={styles['slider-nav']}>
          <NavLink
            to={location.pathname === '/' ? '/' : '/product'}
            className={({ isActive }) =>
              isActive ? `link ${styles['slider-nav__link']} ${styles['slider-nav_active']}` : `link ${styles['slider-nav__link']}`
            }
            onClick={onHandleToggle}
          >
            Product
          </NavLink>
          <NavLink
            end
            to='/services'
            className={({ isActive }) =>
              isActive ? `link ${styles['slider-nav__link']} ${styles['slider-nav_active']}` : `link ${styles['slider-nav__link']}`
            }
            onClick={onHandleToggle}
          >
            Services
          </NavLink>
          <NavLink
            end
            to='/article'
            className={({ isActive }) =>
              isActive ? `link ${styles['slider-nav__link']} ${styles['slider-nav_active']}` : `link ${styles['slider-nav__link']}`
            }
            onClick={onHandleToggle}
          >
            Article
          </NavLink>
          <NavLink
            end
            to='/about'
            className={({ isActive }) =>
              isActive ? `link ${styles['slider-nav__link']} ${styles['slider-nav_active']}` : `link ${styles['slider-nav__link']}`
            }
            onClick={onHandleToggle}
          >
            About Us
          </NavLink>
          <NavLink
            end
            to='/cart'
            className={({ isActive }) =>
              isActive ? `link ${styles['slider-nav__link']} ${styles['slider-nav_active']}` : `link ${styles['slider-nav__link']}`
            }
            onClick={onHandleToggle}
          >
            Cart
          </NavLink>
          <NavLink
            end
            to={currentUser ? '/account' : '/signin'}
            className={({ isActive }) =>
              isActive ? `link ${styles['slider-nav__link']} ${styles['slider-nav_active']}` : `link ${styles['slider-nav__link']}`
            }
            onClick={onHandleToggle}
          >
            Account
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Slider;
