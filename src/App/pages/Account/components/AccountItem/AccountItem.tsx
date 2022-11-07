import './AccountItem.scss';
import cl from 'classnames';

type AccountItemType = {
  title: string;
  id: string;
  activeTab: string;
  setActiveTab: (id: string) => void;
};

const AccountItem: React.FC<AccountItemType> = ({ title, id, activeTab, setActiveTab }) => {
  const onHandleClick = () => {
    setActiveTab(id);
  };

  return (
    <li className={cl('account-nav__item', activeTab === id && 'account-nav__item-active')} onClick={onHandleClick}>
      {title}
    </li>
  );
};

export default AccountItem;
