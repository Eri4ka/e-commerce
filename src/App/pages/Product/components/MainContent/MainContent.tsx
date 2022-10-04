import React from 'react';

import './MainContent.scss';
import { MultiDropdown } from '@components/MultiDropdown';
import Pagination from '@components/Pagination';
import { useMobile } from '@hooks/useMobile';
import { usePagination } from '@hooks/usePagination';
import { MOBILE_VIEW, ITEMS_PER_PAGE } from '@lib/constants';
import { useAppDispatch, useAppSelector } from '@myredux/hooks';
import {
  fetchProducts,
  fetchCategoryProducts,
  totalPagesSelector,
} from '@myredux/slices/productsSlice';

import MainGoods from '../MainGoods';
import MainSeacrh from '../MainSeacrh';
import MainTotal from '../MainTotal';

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: { count: number; rate: number };
};

const MainContent: React.FC = () => {
  const currentPages = useAppSelector(totalPagesSelector);
  const value = useAppSelector((state) => state.category.activeFilter);
  const searchValue = useAppSelector((state) => state.products.searchValue);
  const dispatch = useAppDispatch();

  const { isMobile } = useMobile(
    window.innerWidth < MOBILE_VIEW ? true : false
  );
  const { nextPage, prevPage, page, setPage, totalPages } = usePagination(
    searchValue.length > 0 ? 20 : ITEMS_PER_PAGE,
    currentPages
  );

  React.useEffect(() => {
    if (value === '') {
      dispatch(fetchProducts(page));
    } else {
      dispatch(fetchCategoryProducts({ value, page }));
    }
    setPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, value, searchValue]);

  return (
    <div className="main-content">
      <div className="main-filters">
        <MainSeacrh />
        {!isMobile ? <MultiDropdown /> : null}
      </div>
      <MainTotal />
      <MainGoods />
      <Pagination
        page={page}
        totalPages={totalPages}
        prevPage={prevPage}
        nextPage={nextPage}
        setPage={setPage}
      />
    </div>
  );
};

export default MainContent;
