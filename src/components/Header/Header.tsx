import { useMobile } from '@hooks/useMobile';

import { HeaderDesktop } from './HeaderDesktop/HeaderDesktop';
import { HeaderMobile } from './HeaderMobile/HeaderMobile';

export const Header = () => {
  const { isMobile } = useMobile(window.innerWidth < 991 ? true : false);

  return isMobile ? <HeaderMobile /> : <HeaderDesktop />;
};
