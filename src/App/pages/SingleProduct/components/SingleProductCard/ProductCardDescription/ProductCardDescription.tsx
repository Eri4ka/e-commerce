import React from 'react';

import { useAppSelector } from '@myredux/hooks';
import cl from 'classnames';

const ProductCardDescription = () => {
  const [sliced, setSliced] = React.useState<boolean>(false);
  const product = useAppSelector((state) => state.product.product);

  const sliceDescription = <T,>(firstValue: T, secondValue: T, thirdValue: T | null = null) => {
    if (product.description && product.description.length > 190) {
      if (!sliced) {
        return firstValue;
      } else {
        return secondValue;
      }
    } else {
      return thirdValue;
    }
  };

  const text = sliceDescription(product.description.slice(0, 190) + '... ', product.description + ' ', product.description);

  const span = sliceDescription(<span style={{ color: '#518581' }}>Read More</span>, <span style={{ color: '#518581' }}>Close</span>);

  return (
    <div className={cl('product-card__description')} onClick={() => setSliced((sl) => !sl)}>
      {text}
      {span}
    </div>
  );
};

export default ProductCardDescription;
