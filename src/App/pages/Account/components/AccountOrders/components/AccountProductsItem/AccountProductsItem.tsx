import { IProductCart } from '@myredux/slices/cartSlice';

const AccountProductsItem = ({ product }: { product: IProductCart }) => {
  const { image, title, price } = product;

  return (
    <li className='orders-products__item'>
      <img className='orders-products__image' src={image} alt={title} />
      <div className='orders-products__meta'>
        <div className='orders-products__about'>
          <span className='orders-products__title'>{title}</span>
          <p className='orders-products__nameprice'>
            Price: {''}
            <span className='orders-products__price'>{'$' + price}</span>
          </p>
        </div>
      </div>
    </li>
  );
};

export default AccountProductsItem;
