import './Card.scss';
import cl from 'classnames';
import { useNavigate } from 'react-router-dom';

export type CardProps = {
  id?: any;
  image: string;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  content?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  category?: React.ReactNode;
};

export const Card: React.FC<CardProps> = ({ id, category, image, title, subtitle, content }) => {
  const navigate = useNavigate();

  return (
    <div className='card' onClick={() => navigate(`/product/${id}`)}>
      <img src={image} alt='' />
      <div className={cl('card__category')}>{category}</div>
      <div className={cl('card__title')}>{title}</div>
      <div className={cl('card__subtitle')}>{subtitle}</div>
      {content && <div className={cl('card__price')}>{content}</div>}
    </div>
  );
};
