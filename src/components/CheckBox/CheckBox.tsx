import cl from 'classnames';
import './CheckBox.scss';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  /** Вызывается при клике на чекбокс */
  onChange: (value: boolean) => void;
};

export const CheckBox: React.FC<CheckBoxProps> = ({ onChange, ...props }) => {
  return (
    <div>
      <input
        type='checkbox'
        className={cl('checkbox')}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.checked)}
        {...props}
      />
      <label htmlFor={props.id} />
    </div>
  );
};
