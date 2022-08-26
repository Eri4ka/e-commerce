import React from 'react';

import './SingleProductRelated.scss';
import { Card } from '@components/Card/Card';
import { Loader, LoaderSize } from '@components/Loader/Loader';
import { useHttp } from '@hooks/http.hook';
import cl from 'classnames';
import { Product } from 'src/App/pages/Product/components/MainContent/MainContent';

type SingleProductRelatedProps = {
  readonly product: { id: number; category: string };
};

const SingleProductRelated: React.FC<SingleProductRelatedProps> = ({
  product,
}) => {
  const [productsRelated, setProductsRelated] = React.useState<Product[]>([]);
  const { loading, request } = useHttp();

  React.useEffect(() => {
    request(
      `https://fakestoreapi.com/products/category/${product.category}`
    ).then(setProductsRelated);
  }, []);
  return (
    <div className={cl('related')}>
      <div className={cl('related__title')}>Related Items</div>
      {!loading ? (
        <div className={cl('main-goods')}>
          <div className={cl('main-goods__grid')}>
            {productsRelated.map((item) => {
              if (item.id !== product.id) {
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
              } else {
                return null;
              }
            })}
          </div>
        </div>
      ) : (
        <Loader size={LoaderSize.l} className={'loader'} />
      )}
    </div>
  );
};

export default SingleProductRelated;
