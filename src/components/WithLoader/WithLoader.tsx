import cl from 'classnames';

import { Loader, LoaderSize } from '../Loader/Loader';

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
  children: React.ReactNode;
}>;

export const WithLoader: React.FC<WithLoaderProps> = ({
  loading,
  children,
}) => {
  return (
    <>
      <div>
        {children}
        {loading && (
          <Loader
            loading={loading}
            size={LoaderSize.s}
            className={cl('test-class')}
          />
        )}
      </div>
    </>
  );
};
