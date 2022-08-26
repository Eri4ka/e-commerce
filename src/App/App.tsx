import './App.scss';
import { Header } from '@components/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Product from './pages/Product';
import SingleProduct from './pages/SingleProduct';

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <div className="main">
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/product/:id" element={<SingleProduct />} />
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
