import type { HTMLAttributes } from 'react';

type LayoutContainerWidth = 'default' | 'screen';

interface LayoutContainerProps extends HTMLAttributes<HTMLDivElement> {
  width?: LayoutContainerWidth;
}

const LayoutContainer = ({ children, className = '', width = 'default', ...rest }: LayoutContainerProps) => {
  const widthClass = width === 'screen' ? 'max-w-screen-xl' : 'max-w-7xl';
  const classes = ['site-container', widthClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};

export default LayoutContainer;
