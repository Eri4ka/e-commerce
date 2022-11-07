import { useEffect, memo } from 'react';

import { Button, ButtonColor } from '@components/Button';
import { Loader } from '@components/Loader';
import { useAppDispatch, useAppSelector } from '@myredux/hooks';
import { totalSelector, fetchCart, fetchDeleteCart } from '@myredux/slices/cartSlice';
import './Cart.scss';
import { useNavigate } from 'react-router';

import CartInfo from './components/CartInfo';
import CartList from './components/CartList';

const Cart = memo(() => {
  const user = useAppSelector((state) => state.user.user);
  const { deleteCartLoadingStatus, cartLoadingStatus } = useAppSelector((state) => state.cart);
  const { total, sum } = useAppSelector(totalSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCart());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className='cart'>
      <h2 className='cart__head'>Cart</h2>
      <div className='cart-content'>{cartLoadingStatus === 'loading' ? <Loader /> : <CartList />}</div>
      <div className='cart-info'>
        <CartInfo title='Total' count={total} />
        <CartInfo title='Sum' count={'$' + sum} />
      </div>
      <div className='cart-buttons'>
        <Button
          className='cart-buttons__button'
          color={ButtonColor.none}
          loading={deleteCartLoadingStatus === 'loading'}
          disabled={total === 0}
          onClick={() => dispatch(fetchDeleteCart())}
        >
          Clear All
        </Button>
        <Button className='cart-buttons__button' disabled={total === 0} onClick={() => navigate('/checkout')}>
          Submit
        </Button>
      </div>
    </div>
  );
});

export default Cart;
