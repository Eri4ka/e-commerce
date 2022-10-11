import React, { useCallback } from 'react';

interface UsePaginationReturn {
  page: number;
  totalPages: number;
  firstContentIndex: number;
  lastContentIndex: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
}
type UsePagination = (contentPerPage: number, count: number) => UsePaginationReturn;

export const usePagination: UsePagination = (contentPerPage, count) => {
  const [page, setPage] = React.useState(1);
  const pageCount = Math.ceil(count / contentPerPage);
  const lastContentIndex = page * contentPerPage;
  const firstContentIndex = lastContentIndex - contentPerPage;
  const changePage = useCallback((direction: boolean) => {
    setPage((state) => {
      if (direction) {
        if (state === pageCount) {
          return state;
        }
        return state + 1;
      } else {
        if (state === 1) {
          return state;
        }
        return state - 1;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const setPageSAFE = useCallback(
    (num: number) => {
      if (num > pageCount) {
        setPage(pageCount);
      } else if (num < 1) {
        setPage(1);
      } else {
        setPage(num);
      }
    },
    [pageCount],
  );
  return {
    totalPages: pageCount,
    nextPage: () => changePage(true),
    prevPage: () => changePage(false),
    setPage: setPageSAFE,
    firstContentIndex,
    lastContentIndex,
    page,
  };
};
