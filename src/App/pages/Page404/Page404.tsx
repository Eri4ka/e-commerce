import { Button } from '@components/Button/Button';
import cl from 'classnames';
import { useNavigate } from 'react-router-dom';
import './Page404.scss';

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div className={cl('not-found')}>
      <p className={cl('not-found__title')}>Page doesn't exists</p>
      <Button onClick={() => navigate('/product')}>Back to main</Button>
    </div>
  );
};

export default Page404;
