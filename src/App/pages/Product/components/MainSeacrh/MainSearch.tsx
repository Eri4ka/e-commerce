import React from 'react';

import './MainSearch.scss';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useAppDispatch, useAppSelector } from '@myredux/hooks';
import { getSearchValue } from '@myredux/slices/productsSlice';
import cl from 'classnames';

const MainSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector((state) => state.products.searchValue);
  const [value, setValue] = React.useState<string>(searchValue);

  return (
    <div className={cl('main-search')}>
      <Input
        value={value}
        placeholder={'Search property'}
        onChange={(value: string) => setValue(value)}
        className={cl('main-search__input')}
        onKeyDown={(e) =>
          e.key === 'Enter' ? dispatch(getSearchValue(value)) : null
        }
      />
      <Button
        onClick={() => dispatch(getSearchValue(value))}
        className={cl('main-search__submit')}
      >
        Find Now
      </Button>
    </div>
  );
};

export default MainSearch;
