"use client";
// Import react | react-dom -> external lib -> component -> local (alphabet sort) -> @types
import React, { useRef, useEffect } from 'react';

// +++ library modules +++
// +++ project modules +++
import { isEmpty, isNull, isString } from '@shared/utils';
import { useMountEffect, useUnmountEffect, useUpdateEffect } from '@hooks/index';

// +++ local modules +++
import './_Ripple.scss'

// +++ type modules +++
export interface RippleProps {
  className?: string;
}

const Ripple = React.forwardRef<unknown, RippleProps>((props, ref) => {
  // Refs
  const inkRef = useRef<HTMLSpanElement>(null);
  const targetRef = useRef<HTMLElement | null>(null);

  // State

  // Effects
  useEffect(() => {
    return () => {};
  }, []);

  // Handlers

  const getTarget = () => {
    return inkRef.current && inkRef.current.parentElement;
  };

  const getOffset = (element: HTMLElement | null) => {
    if (isNull(element)) {
      return {
        top: 'auto',
        left: 'auto',
      };
    }

    const rect = element.getBoundingClientRect();

    return {
      top:
        rect.top +
        (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
      left:
        rect.left +
        (window.pageXOffset ||
          document.documentElement.scrollLeft ||
          document.body.scrollLeft ||
          0),
    };
  };

  const getWidth = (element: HTMLElement | null) => {
    if (isNull(element)) {
      return 0;
    }

    let width = element.offsetWidth;
    const style = getComputedStyle(element);

    width -=
      parseFloat(style.paddingLeft) +
      parseFloat(style.paddingRight) +
      parseFloat(style.borderLeftWidth) +
      parseFloat(style.borderRightWidth);

    return width;
  };

  const getHeight = (element: HTMLElement | null) => {
    if (isNull(element)) {
      return 0;
    }

    let height = element.offsetHeight;
    const style = getComputedStyle(element);

    height -=
      parseFloat(style.paddingTop) +
      parseFloat(style.paddingBottom) +
      parseFloat(style.borderTopWidth) +
      parseFloat(style.borderBottomWidth);

    return height;
  };

  const getOuterWidth = (element: HTMLElement | null, margin?: number) => {
    if (isNull(element)) {
      return 0;
    }

    let width = element.getBoundingClientRect().width || element.offsetWidth;

    if (margin) {
      const style = getComputedStyle(element);

      width += parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    }

    return width;
  };

  const getOuterHeight = (element: HTMLElement | null, margin?: number) => {
    if (isNull(element)) {
      return 0;
    }

    let height = element.getBoundingClientRect().height || element.offsetHeight;

    if (margin) {
      const style = getComputedStyle(element);

      height += parseFloat(style.marginTop) + parseFloat(style.marginBottom);
    }

    return height;
  };

  const addClass = (element: HTMLElement | null, className: string) => {
    if (isNull(element) || isEmpty(className)) {
      return;
    }
    if (element.classList) {
      element.classList.add(className);

      return;
    }

    element.className += ' ' + className;
  };

  const removeClass = (element: HTMLElement | null, className: string) => {
    if (isNull(element) || isEmpty(className)) {
      return;
    }

    if (element.classList) {
      element.classList.remove(className);
      return;
    }

    element.className = element.className.replace(
      new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
      ' ',
    );
  };

  const bindEvents = () => {
    if (targetRef.current) {
      targetRef.current.addEventListener('pointerdown', onPointerDown);
    }
  };

  const unbindEvents = () => {
    if (targetRef.current) {
      targetRef.current.removeEventListener('pointerdown', onPointerDown);
    }
  };

  const onPointerDown = (event: MouseEvent) => {
    const offset = getOffset(targetRef.current);

    const offsetX =
      event.pageX -
      (isString(offset.left) ? 0 : offset.left) +
      document.body.scrollTop -
      getWidth(inkRef.current) / 2;
    const offsetY =
      event.pageY -
      (isString(offset.top) ? 0 : offset.top) +
      document.body.scrollLeft -
      getHeight(inkRef.current) / 2;

    activateRipple(offsetX, offsetY);
  };

  const activateRipple = (offsetX: number, offsetY: number) => {
    if (!inkRef.current || getComputedStyle(inkRef.current, null).display === 'none') {
      return;
    }

    removeClass(inkRef.current, 'is-active');

    setDimensions();

    inkRef.current.style.top = `${offsetY}px`;
    inkRef.current.style.left = `${offsetX}px`;
    addClass(inkRef.current, 'is-active');
  };

  const onAnimationEnd = (event: React.AnimationEvent) => {
    removeClass(event.currentTarget as HTMLElement, 'is-active');
  };

  const setDimensions = () => {
    if (inkRef.current && !getHeight(inkRef.current) && !getWidth(inkRef.current)) {
      const d = Math.max(getOuterWidth(targetRef.current), getOuterHeight(targetRef.current));

      inkRef.current.style.height = `${d}px`;
      inkRef.current.style.width = `${d}px`;
    }
  };

  React.useImperativeHandle(ref, () => ({
    props,
    getInk: () => inkRef.current,
    getTarget: () => targetRef.current,
  }));

  useMountEffect(() => {
    if (inkRef.current) {
      targetRef.current = getTarget();
      setDimensions();
      bindEvents();
    }
  });

  useUpdateEffect(() => {
    if (inkRef.current && !targetRef.current) {
      targetRef.current = getTarget();
      setDimensions();
      bindEvents();
    }
  });

  useUnmountEffect(() => {
    if (inkRef.current) {
      targetRef.current = null;
      unbindEvents();
    }
  });

  // Render
  return (
    <span
      ref={inkRef}
      aria-hidden="true"
      role="presentation"
      className={`hi-ink ${props.className || ''}`}
      onAnimationEnd={onAnimationEnd}
    ></span>
  );
});

Ripple.displayName = 'Ripple';

export default Ripple;
