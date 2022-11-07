import { IProductCart } from '@myredux/slices/cartSlice';

type ItemProps = {
  children?: React.ReactNode;
} & IProductCart;

const CartItem: React.FC<ItemProps> = ({ id, image, title, price, children }) => {
  return (
    <li className='cart-content__item'>
      <img className='cart-content__image' src={image} alt={title} />
      <div className='cart-content__meta'>
        <div className='cart-content__about'>
          <span className='cart-content__title'>{title}</span>
          <p className='cart-content__nameprice'>
            Price: {''}
            <span className='cart-content__price'>{'$' + price}</span>
          </p>
        </div>
        {children}
      </div>
    </li>
  );
};

export default CartItem;
