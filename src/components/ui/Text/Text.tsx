import cn from 'clsx';
import type {
  CSSProperties,
  FunctionComponent,
  JSXElementConstructor,
} from 'react';
import React from 'react';

import s from './Text.module.css';

interface TextProps {
  variant?: Variant;
  className?: string;
  style?: CSSProperties;
  children?: React.ReactNode | any;
  html?: string;
  onClick?: () => any;
}

type Variant =
  | 'heading'
  | 'body'
  | 'pageHeading'
  | 'sectionHeading'
  | 'title'
  | 'small'
  | 'error';

const Text: FunctionComponent<TextProps> = ({
  style,
  className = '',
  variant = 'body',
  children,
  html,
  onClick,
}) => {
  const componentsMap: {
    [P in Variant]: React.ComponentType<any> | string;
  } = {
    body: 'div',
    heading: 'h1',
    pageHeading: 'h1',
    sectionHeading: 'h2',
    title: 'h3',
    small: 'h6',
    error: 'p',
  };

  const Component:
    | JSXElementConstructor<any>
    | React.ReactElement<any>
    | React.ComponentType<any>
    | string = componentsMap![variant!];

  const htmlContentProps = html
    ? {
        dangerouslySetInnerHTML: { __html: html },
      }
    : {};

  return (
    <Component
      className={cn(
        s.root,
        {
          [s.body!]: variant === 'body',
          [s.title!]: variant === 'title',
          [s.heading!]: variant === 'heading',
          [s.pageHeading!]: variant === 'pageHeading',
          [s.sectionHeading!]: variant === 'sectionHeading',
          [s.small!]: variant === 'small',
          [s.error!]: variant === 'error',
        },
        className
      )}
      onClick={onClick}
      style={style}
      {...htmlContentProps}
    >
      {children}
    </Component>
  );
};

export default Text;
