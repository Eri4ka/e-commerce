import { Loader, LoaderSize } from '@components/Loader';

type TLoadedContent = {
  loading: string;
  Component: React.FC;
};

const LoadedContent: React.FC<TLoadedContent> = ({ loading, Component }) => {
  switch (loading) {
    case 'idle':
      return <Component />;
    case 'loading':
      return <Loader size={LoaderSize.l} className={'loader'} />;
    case 'error':
      return null;
    default:
      return null;
  }
};

export default LoadedContent;
