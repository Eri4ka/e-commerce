import React from 'react';

import { useAppSelector } from '@myredux/hooks';
import { selectAll } from '@myredux/slices/singleProductSlice';
import { Product } from '@pages/Product/components/MainContent/MainContent';
import cl from 'classnames';

const ProductCardDescription = () => {
  const [sliced, setSliced] = React.useState<boolean>(false);
  const product = useAppSelector(selectAll) as Product[];

  // if (product[0].description && product[0].description.length > 190) {
  //   if (!sliced) {
  //     return product[0].description.slice(0, 190) + '... ';
  //   } else {
  //     return product[0].description + ' ';
  //   }
  // } else {
  //   return product[0].description;
  // }

  const sliceDescription = <T,>(
    firstValue: T,
    secondValue: T,
    thirdValue: T | null = null
  ) => {
    if (product[0].description && product[0].description.length > 190) {
      if (!sliced) {
        return firstValue;
      } else {
        return secondValue;
      }
    } else {
      return thirdValue;
    }
  };

  const text = sliceDescription(
    product[0].description.slice(0, 190) + '... ',
    product[0].description + ' ',
    product[0].description
  );

  const span = sliceDescription(
    <span style={{ color: '#518581' }}>Read More</span>,
    <span style={{ color: '#518581' }}>Close</span>
  );

  return (
    <div
      className={cl('product-card__description')}
      onClick={() => setSliced((sl) => !sl)}
    >
      {text}
      {span}
    </div>
  );
};

export default ProductCardDescription;
