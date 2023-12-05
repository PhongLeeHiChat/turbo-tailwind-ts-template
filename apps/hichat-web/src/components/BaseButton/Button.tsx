'use client'

import React, { useEffect, useMemo } from 'react'
import classNames from 'classnames'

import BaseIcon from '@components/BaseIcon'
import Ripple from '@components/Ripple'

import { isFunction, isNull, tuple } from '@shared/utils'
import mergeRefs from '@shared/utils/dom'

import './_Button.scss'

const ButtonHTMLTypes = tuple('submit', 'button', 'reset')
export type ButtonHTMLType = (typeof ButtonHTMLTypes)[number]
export interface BaseButtonProps {
  autofocus?: boolean
  className?: string
  disabled?: boolean
  icon?: string
  iconPosition?: 'left' | 'right'
  loading?: boolean
  nativeType?: ButtonHTMLType
  outlined?: boolean
  plain?: boolean
  round?: boolean
  size?: '' | 'large' | 'small'
  style?: React.CSSProperties
  text?: boolean
  type?: 'success' | 'warning' | 'danger' | 'info' | 'primary' | 'secondary' | ''
  onClick?: React.MouseEventHandler<HTMLElement>
  children?: React.ReactNode
}

const BaseButton = React.forwardRef<HTMLButtonElement, BaseButtonProps>((props, ref) => {
  // Props
  const {
    autofocus,
    disabled,
    iconPosition,
    loading,
    nativeType = 'button' as BaseButtonProps['nativeType'],
    outlined,
    plain,
    round,
    style,
    text,
  } = props

  // Refs
  const internalRef = React.createRef<HTMLButtonElement>()

  const buttonRef = mergeRefs(ref, internalRef)

  // States
  const buttonSize = useMemo(() => props.size, [props.size])
  const buttonType = useMemo(() => props.type, [props.type])

  const className = classNames(
    'hi-button',
    buttonType ? `hi-button--${buttonType}` : '',
    buttonSize ? `hi-button--${buttonSize}` : '',
    {
      'is-disabled': disabled,
      'is-loading': loading,
      'is-outlined': outlined,
      'is-plain': plain,
      'is-round': round,
      'is-text': text,
    },
    props.className
  )

  // Effects
  useEffect(() => {
    return () => {}
  }, [])

  // Handlers

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>
  ) => {
    if (isFunction(props?.onClick)) {
      props.onClick(event)
    }
  }

  // Renders

  const kids: JSX.Element | null = props.children ? (
    <span className='hi-button__label'>{props.children}</span>
  ) : null

  const iconNode: JSX.Element | null =
    props.icon && !loading ? (
      <BaseIcon
        icon={props.icon}
        className={isNull(kids) ? 'leading-8' : `hi-icon--${iconPosition}`}
        size={buttonSize}
      />
    ) : loading ? (
      <BaseIcon
        icon='pi pi-spin pi-spinner'
        className={isNull(kids) ? 'leading-8' : `hi-icon--${iconPosition}`}
        size={buttonSize}
      />
    ) : null

  return (
    <button
      ref={buttonRef}
      autoFocus={autofocus}
      className={`${className} ${isNull(kids) ? 'hi-button--icon-only' : ''}`}
      disabled={disabled || loading}
      aria-disabled={disabled}
      style={style}
      type={nativeType}
      onClick={handleClick}
    >
      {iconPosition === 'left' && iconNode}
      {kids}
      {iconPosition === 'right' && iconNode}

      <Ripple />
    </button>
  )
})

// Defaults
BaseButton.displayName = 'BaseButton'
BaseButton.defaultProps = {
  iconPosition: 'left',
  nativeType: 'button',
}

export default BaseButton
