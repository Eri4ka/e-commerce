import React from 'react';

interface UseMobileResult {
  isMobile: boolean;
}

export const useMobile = (initial: boolean): UseMobileResult => {
  const [isMobile, setMobile] = React.useState(initial);

  const handleResize = () => {
    window.innerWidth < 991 ? setMobile(true) : setMobile(false);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { isMobile };
};
