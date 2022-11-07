import styles from './Employee.module.scss';

type EmployeeProps = {
  src: string;
  name: string;
  position: string;
};

const Employee: React.FC<EmployeeProps> = (props) => {
  const { src, name, position } = props;
  return (
    <li className={styles.employee}>
      <img className={styles.employee__image} src={src} alt='' />
      <p className={styles.employee__name}>{name}</p>
      <p className={styles.employee__position}>{position}</p>
    </li>
  );
};

export default Employee;
