import { memo } from 'react';

import { IActiveField } from '../AccountProfile';

import './AccountProfileField.scss';

type AccountProfileFieldType = {
  id: string;
  title: string;
  text: string | number | undefined;
  onActiveField: (props: IActiveField) => void;
  exists?: boolean;
};

const AccountProfileField: React.FC<AccountProfileFieldType> = memo(({ id, title, text, onActiveField, exists = true }) => {
  return (
    <div className='account-content__field'>
      <div className='account-content__label'>{title}</div>
      <div className='account-content__item'>
        {exists ? <div className='account-content__text'>{text}</div> : null}
        <div className='account-content__change' onClick={() => onActiveField({ id, title })}>
          {exists ? 'Change' : 'Add'}
        </div>
      </div>
    </div>
  );
});

export default AccountProfileField;
