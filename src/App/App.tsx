import './App.scss';
import { Header } from '@components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import NotFoundPage from './pages/NotFoundPage';
import Product from './pages/Product';
import SingleProduct from './pages/SingleProduct';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="main">
        <Routes>
          {['/', '/product'].map((path, index) => {
            return <Route path={path} element={<Product />} key={index} />;
          })}
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
