import React from 'react';

import cl from 'classnames';

import { Loader, LoaderSize } from '../Loader/Loader';
import './Button.scss';

export enum ButtonColor {
  primary = 'primary',
  secondary = 'secondary',
  none = 'none',
}

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  color?: ButtonColor;
  className?: string;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  loading,
  color = ButtonColor.primary,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={cl(
        'button',
        `button_color-${color}`,
        loading || props.disabled ? 'button_disabled' : null,
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading && (
        <Loader
          loading={loading}
          size={LoaderSize.s}
          className={cl('test-class')}
          disabled={loading}
        />
      )}
      {children}
    </button>
  );
};
