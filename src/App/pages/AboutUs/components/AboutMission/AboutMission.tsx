import { memo } from 'react';

import call from '@images/svg/call.svg';
import guard from '@images/svg/guard.svg';
import msg from '@images/svg/msg.svg';

import styles from './AboutMission.module.scss';

const AboutAchievement = ({ title, text }: { title: string; text: string }) => {
  return (
    <div className={styles['mission-achievement']}>
      <p className={styles['mission-achievement__head']}>{title}</p>
      <p className={styles['mission-achievement__text']}>{text}</p>
    </div>
  );
};

const AboutBlock = ({ src, head, text }: { src: string; head: string; text: string }) => {
  return (
    <div className={styles['mission-block']}>
      <img className={styles['mission-block__image']} src={src} alt={src} />
      <div className={styles['mission-block__content']}>
        <div className={styles['mission-block__head']}>{head}</div>
        <p className={styles['mission-block__text']}>{text}</p>
      </div>
    </div>
  );
};

const AboutMission = memo(() => {
  return (
    <div className={styles.mission}>
      <p className={styles.mission__badge}>Our Mission</p>
      <div className={styles.mission__wrapper}>
        <div className={styles.mission__content}>
          <div className={styles.mission__head}>Our team dedicated to help find smart home product</div>
          <div className={styles.mission__block}>
            <AboutAchievement title='20+' text='Year Experience' />
            <AboutAchievement title='483' text='Happy Client' />
            <AboutAchievement title='150+' text='Project Finished' />
          </div>
        </div>
        <div className={styles.mission__info}>
          <AboutBlock
            src={call}
            head='24/7 Supports'
            text='24/7 support means a support service that is provided 24 hours a day and 7 days a week.'
          />
          <AboutBlock
            src={msg}
            head='Free Consultation'
            text='A free consultation is a one-on-one interaction or conversation given freely to share one"s thoughts and discuss possible'
          />
          <AboutBlock
            src={guard}
            head='Overall Guarantee'
            text='The comprehensive guarantee is required for import, warehousing, transit, processing and specific use.{" "}'
          />
        </div>
      </div>
    </div>
  );
});

export default AboutMission;
