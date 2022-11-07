import styles from './AboutPlayer.module.scss';

const AboutPlayer = () => {
  return (
    <div className={styles['about-player']}>
      <iframe
        width='100%'
        height='100%'
        src='https://www.youtube.com/embed/dQw4w9WgXcQ'
        title='Gachi Rick'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default AboutPlayer;
