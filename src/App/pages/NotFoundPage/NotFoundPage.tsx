import { Button } from '@components/Button';
import cl from 'classnames';
import { useNavigate } from 'react-router-dom';
import './NotFoundPage.scss';

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div className={cl('not-found')}>
      <p className={cl('not-found__title')}>Page doesn't exists</p>
      <Button onClick={() => navigate('/')}>Back to main</Button>
    </div>
  );
};

export default Page404;
