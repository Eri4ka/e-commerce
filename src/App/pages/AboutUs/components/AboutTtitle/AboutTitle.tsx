import styles from './AboutTitle.module.scss';

const AboutTitle = () => {
  return (
    <div className={styles['about-title']}>
      <h1 className={styles['about-title__head']}>About Us</h1>
      <h4 className={styles['about-title__subtitle']}>
        We display products based on the latest products we have, if you want to see our old products please enter the name of the item
      </h4>
    </div>
  );
};

export default AboutTitle;
