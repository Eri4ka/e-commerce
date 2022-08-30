import React from 'react';

import { MOBILE_VIEW } from '@lib/constants';

interface UseMobileResult {
  isMobile: boolean;
}

export const useMobile = (initial: boolean): UseMobileResult => {
  const [isMobile, setMobile] = React.useState(initial);

  React.useEffect(() => {
    const handleResize = () => {
      window.innerWidth < MOBILE_VIEW ? setMobile(true) : setMobile(false);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile };
};
