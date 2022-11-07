import Employee from '@components/Employee';
import emp1 from '@images/employees/emp1.png';
import emp2 from '@images/employees/emp2.png';
import emp3 from '@images/employees/emp3.png';
import emp4 from '@images/employees/emp4.png';
import emp5 from '@images/employees/emp5.png';
import emp6 from '@images/employees/emp6.png';

import styles from './AboutTeam.module.scss';

const AboutTeam = () => {
  return (
    <div className={styles.team}>
      <p className={styles.team__badge}>Our team</p>
      <div className={styles.team__wrapper}>
        <div className={styles.team__head}>Meet our leading and strong team</div>
        <p className={styles.team__text}>
          Pellentesque etiam blandit in tincidunt at donec. Eget ipsum dignissim placerat nisi, adipiscing mauris non purus parturient.
        </p>
      </div>
      <ul className={styles.team__list}>
        <Employee src={emp1} name='Jesse Depp' position='Founder & CEO' />
        <Employee src={emp2} name='Margareth Carter' position='COO' />
        <Employee src={emp3} name='Andrew Taggart' position='Developer' />
        <Employee src={emp4} name='Grace Marie' position='Manager' />
        <Employee src={emp5} name='Jesse Depp' position='Senior Designer' />
        <Employee src={emp6} name='Jesse Depp' position='Marketer' />
      </ul>
    </div>
  );
};

export default AboutTeam;
