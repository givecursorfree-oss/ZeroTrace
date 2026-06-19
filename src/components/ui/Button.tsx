import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'ghost';

interface BaseProps {
  variant?: ButtonVariant;
  children: ReactNode;
  className?: string;
  ghostTone?: 'dark' | 'light';
}

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonProps = ButtonAsLink | ButtonAsButton;

export function Button({
  variant = 'primary',
  children,
  className,
  ghostTone = 'dark',
  ...props
}: ButtonProps) {
  const classes = [
    styles.button,
    styles[variant],
    variant === 'ghost' && ghostTone === 'light' ? styles.ghostOnLight : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if ('href' in props && props.href) {
    const { href, ...rest } = props;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
