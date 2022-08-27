import React from 'react';

import './MainContent.scss';
import { MultiDropdown } from '@components/MultiDropdown/MultiDropdown';
import Pagination from '@components/Pagination';
import { useHttp } from '@hooks/http.hook';
import { useMobile } from '@hooks/useMobile';
import { usePagination } from '@hooks/usePagination';

import MainGoods from '../MainGoods/MainGoods';
import MainSeacrh from '../MainSeacrh';
import MainTotal from '../MainTotal/MainTotal';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { count: number; rate: number };
}

const MainContent = () => {
  const [products, setProducts] = React.useState([]);
  const [initialProducts, setinitialProducts] = React.useState<Product[]>([]);
  const [categories, setCategories] = React.useState([]);
  const [value, setValue] = React.useState<[key: string, value: string] | any>(
    []
  );
  const [isSearch, setIsSearch] = React.useState(false);
  const { isMobile } = useMobile(window.innerWidth < 991 ? true : false);
  const { loading, request } = useHttp();
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    setPage,
    totalPages,
  } = usePagination(
    6,
    !isSearch
      ? value.length !== 0
        ? value[0].key === 0
          ? 6
          : value[0].key === 1
          ? 4
          : value[0].key === 2
          ? 4
          : value[0].key === 3
          ? 6
          : 20
        : 20
      : initialProducts.length
  );

  React.useEffect(() => {
    request('https://fakestoreapi.com/products/categories').then((res) =>
      setCategories(
        res.map((value: string, key: number) => {
          return { key, value };
        })
      )
    );
  }, []);

  React.useEffect(() => {
    setinitialProducts([...products]);
  }, [products]);

  //Реализация поиска при статичных данных
  // const search = (value: string) => {
  //   setinitialProducts(
  //     products.filter((item: any) => {
  //       return item.title.toLowerCase().includes(value);
  //     })
  //   );
  // };

  //Реализация поиска с учетом фильтрации при текущем api
  const search = (term: string) => {
    setIsSearch(true);
    if (value.length !== 0) {
      if (term.length !== 0) {
        request(`https://fakestoreapi.com/products/category/${value[0].value}`)
          .then((res) => {
            return res.filter((item: any) => {
              return item.title.toLowerCase().includes(term);
            });
          })
          .then(setinitialProducts);
      } else {
        request(
          `https://fakestoreapi.com/products/category/${value[0].value}?limit=${
            6 * page
          }`
        ).then(setinitialProducts);
      }
    } else {
      if (term.length !== 0) {
        request('https://fakestoreapi.com/products')
          .then((res) => {
            return res.filter((item: any) => {
              return item.title.toLowerCase().includes(term);
            });
          })
          .then(setinitialProducts);
      } else {
        request(`https://fakestoreapi.com/products?limit=${6 * page}`).then(
          setProducts
        );
        setIsSearch(false);
      }
    }
  };

  const onValue = (item: any) => {
    setValue([...item]);
  };

  const defaultPluralizeOptions = (elements: any[]) =>
    elements.map((el: any) => el.value).join();

  //Грузим данные на страницу при активном фильтре и без
  React.useEffect(() => {
    setIsSearch(false);
    if (value.length !== 0) {
      request(
        `https://fakestoreapi.com/products/category/${value[0].value}?limit=${
          6 * page
        }`
      ).then(setinitialProducts);
      setPage(page);
    } else {
      request(`https://fakestoreapi.com/products?limit=${6 * page}`).then(
        setProducts
      );
    }
  }, [value, page]);

  return (
    <div className="main-content">
      <div className="main-filters">
        <MainSeacrh search={search} />
        {!isMobile ? (
          <MultiDropdown
            options={categories}
            value={value}
            onChange={onValue}
            pluralizeOptions={defaultPluralizeOptions}
            disabled={false}
          />
        ) : null}
      </div>
      <MainTotal total={initialProducts.length} />
      <MainGoods
        products={initialProducts}
        loading={loading}
        firstContentIndex={firstContentIndex}
        lastContentIndex={lastContentIndex}
      />
      {!loading && initialProducts.length !== 0 ? (
        <Pagination
          page={page}
          totalPages={totalPages}
          prevPage={prevPage}
          nextPage={nextPage}
          setPage={setPage}
        />
      ) : null}
    </div>
  );
};

export default MainContent;