import { useState, useEffect, memo } from 'react';

import { useAppDispatch, useAppSelector } from '@myredux/hooks';
import { filtersChanged, categorySelector, fetchCategories } from '@myredux/slices/categorySlice';
import cl from 'classnames';
// import '@components/MultiDropdown/MultiDropdown.css'
import './MultiDropdown.scss';
// import '@components/Button/Button.css';
import '../Button/Button.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

export const MultiDropdown: React.FC = memo(() => {
  const category = useAppSelector(categorySelector);
  const value = useAppSelector((state) => state.category.activeFilter);
  const categoryLoadingStatus = useAppSelector((state) => state.category.categoryLoadingStatus);
  const dispatch = useAppDispatch();
  const [dropDownMenu, setdropDownMenu] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDropDownMenu = () => {
    setdropDownMenu((menu) => !menu);
  };

  const disabled = categoryLoadingStatus === 'loading';

  return (
    <div className={cl('dropdown')}>
      <button className={cl('dropdown-toggle', 'button')} onClick={toggleDropDownMenu} disabled={disabled}>
        {value === '' ? <div className={cl('dropdown-toggle__text')}>Filter</div> : value}
      </button>
      {!disabled && dropDownMenu ? (
        <div className={cl('dropdown-menu')}>
          {category.map((item: Option) => (
            <button className={cl('dropdown-item', 'button')} key={item.key} onClick={() => dispatch(filtersChanged(item))}>
              {item.value}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
});
