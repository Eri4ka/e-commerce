import { memo } from 'react';

import './MainGoods.scss';

import { Card } from '@components/Card';
import { LoaderSize, Loader } from '@components/Loader';
import { useAppSelector } from '@myredux/hooks';
import { productsSelector } from '@myredux/slices/productsSlice';
import cl from 'classnames';

const MainGoods: React.FC = memo(() => {
  const products = useAppSelector(productsSelector);
  const productsLoadingStatue = useAppSelector(
    (state) => state.products.productsLoadingStatue
  );

  return (
    <div className={cl('main-goods')}>
      {productsLoadingStatue === 'loading' ? (
        <Loader size={LoaderSize.l} />
      ) : (
        <div className={cl('main-goods__grid')}>
          {products.map((item: any) => {
            return (
              <Card
                id={item.id}
                key={item.id}
                category={item.category}
                image={item.image}
                title={item.title}
                subtitle={item.description}
                content={'$' + item.price}
              />
            );
          })}
        </div>
      )}
    </div>
  );
});

export default MainGoods;
