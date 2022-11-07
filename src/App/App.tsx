import { useEffect } from 'react';

import './App.scss';
import { Header } from '@components/Header';
import { useLazyGetUserQuery } from '@myredux/api';
import AboutUs from '@pages/AboutUs';
import Account from '@pages/Account';
import Cart from '@pages/Cart';
import CheckOut from '@pages/CheckOut';
import SignIn from '@pages/SignIn/SignIn';
import SignUp from '@pages/SignUp';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NotFoundPage from './pages/NotFoundPage';
import Product from './pages/Product';
import SingleProduct from './pages/SingleProduct';

const App = () => {
  const userId = localStorage.getItem('userId');
  const [trigger] = useLazyGetUserQuery();

  useEffect(() => {
    if (userId) {
      trigger(userId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Header />
      <main className='main'>
        <Routes>
          {['/', '/product'].map((path, index) => {
            return <Route path={path} element={<Product />} key={index} />;
          })}
          <Route path='/product/:id' element={<SingleProduct />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/account' element={<Account />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<CheckOut />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
