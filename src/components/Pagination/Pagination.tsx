import React from 'react';

import './Pagination.scss';
import { Button, ButtonColor } from '@components/Button/Button';
import cl from 'classnames';

type PaginationProps = {
  page: number;
  totalPages: number;
  prevPage: () => void;
  nextPage: () => void;
  setPage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, prevPage, nextPage, setPage }) => {
  const pages: number[] = [];

  for (let i: number = 0; i < totalPages; i++) {
    pages.push(i);
  }

  const renderPages = () => {
    if (totalPages > 4) {
      return (
        <>
          {pages.map((element: number, i: number) =>
            i < 3 ? (
              <Button
                onClick={() => setPage(element + 1)}
                key={element}
                color={ButtonColor.none}
                className={cl('pagination__page', page === element + 1 && 'page_active')}
              >
                {element + 1}
              </Button>
            ) : null,
          )}
          {
            <div className={cl('pagination__page', page > 3 && page !== totalPages && 'page_active')}>
              {page > 3 && page !== totalPages ? page : '...'}
            </div>
          }
          {pages.map((element: number, i: number) =>
            i + 1 === totalPages ? (
              <Button
                onClick={() => setPage(element + 1)}
                key={element}
                color={ButtonColor.none}
                className={cl('pagination__page', page === element + 1 && 'page_active')}
              >
                {element + 1}
              </Button>
            ) : null,
          )}
        </>
      );
    } else {
      return (
        <>
          {pages.map((element: number) => (
            <Button
              onClick={() => setPage(element + 1)}
              key={element}
              color={ButtonColor.none}
              className={cl('pagination__page', page === element + 1 && 'page_active')}
            >
              {element + 1}
            </Button>
          ))}
        </>
      );
    }
  };

  const pageElems = renderPages();

  return (
    <div className={cl('pagination')}>
      <Button onClick={prevPage} className={cl('pagination__prev')} disabled={page === 1 && true} />
      {pageElems}
      <Button onClick={nextPage} className={cl('pagination__next')} disabled={page === totalPages && true} />
    </div>
  );
};

export default Pagination;
