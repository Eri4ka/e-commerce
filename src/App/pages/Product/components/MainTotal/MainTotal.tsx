import { memo } from 'react';

import './MainTotal.scss';
import cl from 'classnames';

type MainTotalProps = {
  total?: number;
};

const MainTotal: React.FC<MainTotalProps> = memo(({ total }) => {
  return (
    <div className={cl('main-total')}>
      <h2 className={cl('main-total__title')}>Total product</h2>
      <div className={cl('main-total__wrapper')}>
        <div className={cl('main-total__wrapper-count')}>
          {total ? total : 0}
        </div>
      </div>
    </div>
  );
});

export default MainTotal;
