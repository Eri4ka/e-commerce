import { useMobile } from '@hooks/useMobile';
import { MOBILE_VIEW } from '@lib/constants';

import { HeaderDesktop } from './HeaderDesktop';
import { HeaderMobile } from './HeaderMobile';

export const Header = () => {
  const { isMobile } = useMobile(
    window.innerWidth < MOBILE_VIEW ? true : false
  );

  return isMobile ? <HeaderMobile /> : <HeaderDesktop />;
};
