import cl from 'classnames';
import './Loader.scss';

export enum LoaderSize {
  s = 's',
  m = 'm',
  l = 'l',
}

type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
  disabled?: boolean;
};

export const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size,
  className,
  ...props
}): any => {
  return (
    loading && (
      <div className={cl('loader')}>
        <div
          className={cl(
            className,
            size ? `loader_size-${size}` : `loader_size-${LoaderSize.m}`
          )}
        >
          <svg
            viewBox="0 0 61 61"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill={props.disabled ? '#FFFFFF' : '#518581'}
              d="M40.9268 52.5369C33.4134 56.0319 24.2926 55.5363 17.0165 50.4415C6.15875 42.8388 3.52 27.8737 11.1227 17.016C18.7253 6.1583 33.6904 3.51955 44.5481 11.1222C51.8243 16.217 55.4095 24.6182 54.695 32.8739L60.6731 33.397C61.5663 23.0773 57.0848 12.5758 47.9896 6.20729C34.4174 -3.29603 15.7111 0.00240606 6.20775 13.5746C-3.29558 27.1467 0.0028581 45.8531 13.575 55.3564C22.6702 61.725 34.0711 62.3444 43.463 57.9756L40.9268 52.5369Z"
            />
          </svg>
        </div>
      </div>
    )
  );
};
