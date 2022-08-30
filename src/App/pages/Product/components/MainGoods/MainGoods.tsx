import './MainGoods.scss';

import { Card } from '@components/Card';
import { LoaderSize, Loader } from '@components/Loader';
import cl from 'classnames';

type MainGoodsProps = {
  products: any[];
  loading?: boolean;
  firstContentIndex: number;
  lastContentIndex: number;
};

const MainGoods: React.FC<MainGoodsProps> = ({
  products,
  loading,
  //Вставить, slice перед map, если нужно разделять продукты постранично
  firstContentIndex,
  lastContentIndex,
}) => {
  return (
    <div className={cl('main-goods')}>
      {loading ? (
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
};

export default MainGoods;
