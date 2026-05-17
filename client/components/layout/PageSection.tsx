import type { ComponentPropsWithoutRef } from 'react';
import LayoutContainer from './LayoutContainer';

type SectionSpacing = 'default' | 'compact' | 'large' | 'none';
type SectionWidth = 'default' | 'screen';

interface PageSectionProps extends ComponentPropsWithoutRef<'section'> {
  containerClassName?: string;
  containerWidth?: SectionWidth;
  spacing?: SectionSpacing;
}

const spacingClassMap: Record<SectionSpacing, string> = {
  default: 'section-padding',
  compact: 'section-padding-compact',
  large: 'section-padding-large',
  none: '',
};

const PageSection = ({
  children,
  className = '',
  containerClassName = '',
  containerWidth = 'default',
  spacing = 'default',
  ...rest
}: PageSectionProps) => {
  const sectionClassName = [spacingClassMap[spacing], className].filter(Boolean).join(' ');

  return (
    <section className={sectionClassName} {...rest}>
      <LayoutContainer width={containerWidth} className={containerClassName}>
        {children}
      </LayoutContainer>
    </section>
  );
};

export default PageSection;
