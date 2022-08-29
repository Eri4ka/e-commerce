import React, { useState, memo } from 'react';

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

export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, массив может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option[]) => string;
};

export const MultiDropdown: React.FC<MultiDropdownProps> = memo(
  ({ options, value, onChange, disabled, pluralizeOptions }) => {
    const [dropDownMenu, setdropDownMenu] = useState(false);

    const toggleDropDownMenu = () => {
      setdropDownMenu((menu) => !menu);
    };

    const onHandleOption = (opt: any) => {
      // value.length === 0 ? onChange([opt]) : onChange(value.filter(val => val.key !== opt.key))
      value.some((val) => val.key === opt.key) ? onChange([]) : onChange([opt]);
    };

    return (
      <div className={cl('dropdown')}>
        <button
          className={cl('dropdown-toggle')}
          onClick={toggleDropDownMenu}
          disabled={disabled}
        >
          {value.length !== 0 ? (
            pluralizeOptions(value)
          ) : (
            <div className={cl('dropdown-toggle__text')}>Filter</div>
          )}
        </button>
        {!disabled && dropDownMenu ? (
          <div className={cl('dropdown-menu')}>
            {options.map((item) => (
              <button
                className={cl('dropdown-item')}
                key={item.key}
                onClick={() => onHandleOption(item)}
              >
                {item.value}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);
