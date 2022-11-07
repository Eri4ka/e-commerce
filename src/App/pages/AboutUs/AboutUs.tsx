import styles from './AboutUs.module.scss';
import AboutMission from './components/AboutMission';
import AboutPlayer from './components/AboutPlayer';
import AboutTeam from './components/AboutTeam';
import AboutTitle from './components/AboutTtitle';

const AboutUs = () => {
  return (
    <>
      <AboutTitle />
      <AboutPlayer />
      <AboutMission />
      <AboutTeam />
    </>
  );
};

export default AboutUs;
