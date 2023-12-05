"use client";
// Import react | react-dom -> external lib -> component -> local (alphabet sort) -> @types
import React, { useEffect } from 'react';

// +++ library modules +++
import classNames from 'classnames';

// +++ project modules +++

// +++ local modules +++
import './_Icon.scss'

// +++ type modules +++

export interface BaseIconProps {
  className?: string;
  icon: string;
  size?: '' | 'large' | 'small';
}

const BaseIcon = React.forwardRef<HTMLSpanElement, BaseIconProps>((props, ref) => {
  // Props
  const { icon, size } = props;

  // Refs
  const internalRef = React.createRef<HTMLSpanElement>();

  const iconRef = ref || internalRef;

  // States

  const bindPropsClassName = classNames(size ? `hi-icon--${size}` : '');

  // Effects
  useEffect(() => {
    return () => {};
  }, []);

  // Handlers

  // Renders

  return (
    <span ref={iconRef} className={`hi-icon ${props.className ?? ''}`}>
      <i className={`${icon} ${bindPropsClassName}`} aria-hidden="true"></i>
    </span>
  );
});

// Defaults
BaseIcon.displayName = 'BaseIcon';

export default BaseIcon;
