import './MainTitle.scss';
import cl from 'classnames';

const MainTitle = () => {
  return (
    <div className={cl('main-title')}>
      <h1 className={cl('main-title__heading')}>Products</h1>
      <h4 className={cl('main-title__subtitle')}>
        We display products based on the latest products we have, if you want to see our old products please enter the name of the item
      </h4>
    </div>
  );
};

export default MainTitle;
