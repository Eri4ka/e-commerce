import { memo } from 'react';

import { useAppSelector, useAppDispatch } from '@myredux/hooks';
import { cartSelector, fetchDeleteSingleCart, IProductCart } from '@myredux/slices/cartSlice';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import CartItem from '../CartItem';

const CartList = memo(() => {
  const cart = useAppSelector(cartSelector);
  const dispatch = useAppDispatch();

  const handleDelete = (id: number) => {
    dispatch(fetchDeleteSingleCart(id));
  };

  const renderProducts = (arr: IProductCart[]) => {
    if (arr.length === 0) {
      return null;
    }

    return arr.map(({ id, title, image, price }) => {
      return (
        <CSSTransition key={id} timeout={200} classNames='cart-content__item'>
          <CartItem id={id} title={title} image={image} price={price}>
            <button className='cart-content__button' onClick={() => handleDelete(id)}>
              &#10006;
            </button>
          </CartItem>
        </CSSTransition>
      );
    });
  };

  const elements = renderProducts(cart);

  return <TransitionGroup className='cart-content__list'>{elements}</TransitionGroup>;
});

export default CartList;
