import React from 'react';

import { isEmpty, isFunction, isNull } from './is';

type CallbackRef<T> = (ref: T | null) => void;
type Ref<T> = React.MutableRefObject<T> | CallbackRef<T>;

const toFnRef = <T>(ref?: Ref<T | null> | null) =>
  !ref || isFunction(ref)
    ? ref
    : (value: T | null) => {
        ref.current = value;
      };

export default function mergeRefs<T>(
  refA?: Ref<T | null> | null,
  refB?: Ref<T | null> | null
): React.RefCallback<T> {
  const a = toFnRef(refA);
  const b = toFnRef(refB);
  return (value: T | null) => {
    if (isFunction(a)) a(value);
    if (isFunction(b)) b(value);
  };
}

export const getOffset = (element: HTMLElement | null) => {
  if (isNull(element)) {
    return {
      top: 'auto',
      left: 'auto',
    }
  }

  const rect = element.getBoundingClientRect()

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
  }
}

export const getWidth = (element: HTMLElement | null) => {
  if (isNull(element)) {
    return 0
  }

  let width = element.offsetWidth
  const style = getComputedStyle(element)

  width -=
    parseFloat(style.paddingLeft) +
    parseFloat(style.paddingRight) +
    parseFloat(style.borderLeftWidth) +
    parseFloat(style.borderRightWidth)

  return width
}

export const getHeight = (element: HTMLElement | null) => {
  if (isNull(element)) {
    return 0
  }

  let height = element.offsetHeight
  const style = getComputedStyle(element)

  height -=
    parseFloat(style.paddingTop) +
    parseFloat(style.paddingBottom) +
    parseFloat(style.borderTopWidth) +
    parseFloat(style.borderBottomWidth)

  return height
}

export const getOuterWidth = (element: HTMLElement | null, margin?: number) => {
  if (isNull(element)) {
    return 0
  }

  let width = element.getBoundingClientRect().width || element.offsetWidth

  if (margin) {
    const style = getComputedStyle(element)

    width += parseFloat(style.marginLeft) + parseFloat(style.marginRight)
  }

  return width
}

export const getOuterHeight = (element: HTMLElement | null, margin?: number) => {
  if (isNull(element)) {
    return 0
  }

  let height = element.getBoundingClientRect().height || element.offsetHeight

  if (margin) {
    const style = getComputedStyle(element)

    height += parseFloat(style.marginTop) + parseFloat(style.marginBottom)
  }

  return height
}

export const addClass = (element: HTMLElement | null, className: string) => {
  if (isNull(element) || isEmpty(className)) {
    return
  }
  if (element.classList) {
    element.classList.add(className)

    return
  }

  element.className += ' ' + className
}

export const removeClass = (element: HTMLElement | null, className: string) => {
  if (isNull(element) || isEmpty(className)) {
    return
  }

  if (element.classList) {
    element.classList.remove(className)
    return
  }

  element.className = element.className.replace(
    new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
    ' '
  )
}
