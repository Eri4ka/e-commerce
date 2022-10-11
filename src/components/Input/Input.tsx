import cl from 'classnames';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

export const Input: React.FC<InputProps> = ({ value, onChange, className, ...props }) => {
  return (
    <input
      type='text'
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      {...props}
      className={cl(className, props.disabled && 'input_disabled')}
    />
  );
};
