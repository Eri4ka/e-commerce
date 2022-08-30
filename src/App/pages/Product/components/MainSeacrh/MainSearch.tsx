import React from 'react';

import './MainSearch.scss';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import cl from 'classnames';

type MainSearchProps = {
  search: (term: string) => void;
};

const MainSearch: React.FC<MainSearchProps> = ({ search }) => {
  const [value, setValue] = React.useState<string>('');

  return (
    <div className={cl('main-search')}>
      <Input
        value={value}
        placeholder={'Search property'}
        onChange={(value: string) => setValue(value)}
        className={cl('main-search__input')}
        onKeyDown={(e) => (e.key === 'Enter' ? search(value) : null)}
      />
      <Button
        onClick={() => search(value)}
        className={cl('main-search__submit')}
      >
        Find Now
      </Button>
    </div>
  );
};

export default MainSearch;
