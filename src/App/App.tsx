import './App.scss';
import { Header } from '@components/Header/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Product from './pages/Product';
import SingleProduct from './pages/SingleProduct';

const App = () => {
  // const onValue = (item: any) => {
  //   if (value.some(el => el.key===item[0].key)) {
  //       setValue(value.filter(yo => yo.key !== item[0].key))
  //       // return value

  //   } else {
  //       setValue([ ...value, ...item ])
  //   }
  // };

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
