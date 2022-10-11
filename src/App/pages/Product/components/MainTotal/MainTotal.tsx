import { memo } from 'react';

import { useAppSelector } from '@myredux/hooks';
import { productsSelector } from '@myredux/slices/productsSlice';
import './MainTotal.scss';
import cl from 'classnames';

const MainTotal: React.FC = memo(() => {
  const products = useAppSelector(productsSelector);

  return (
    <div className={cl('main-total')}>
      <h2 className={cl('main-total__title')}>Total product</h2>
      <div className={cl('main-total__wrapper')}>
        <div className={cl('main-total__wrapper-count')}>{products ? products.length : 0}</div>
      </div>
    </div>
  );
});

export default MainTotal;
