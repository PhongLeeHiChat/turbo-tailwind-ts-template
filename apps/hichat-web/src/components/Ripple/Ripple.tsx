'use client'

// Import react | react-dom -> external lib -> component -> local (alphabet sort) -> @types
import React, { useEffect, useRef } from 'react'

import { useMountEffect, useUnmountEffect, useUpdateEffect } from '@hooks/index'

import { isString } from '@shared/utils'
import {
  addClass,
  getHeight,
  getOffset,
  getOuterHeight,
  getOuterWidth,
  getWidth,
  removeClass,
} from '@shared/utils/dom'

import './_Ripple.scss'

export interface RippleProps {
  className?: string
}

const Ripple = React.forwardRef<unknown, RippleProps>((props, ref) => {
  // Refs
  const inkRef = useRef<HTMLSpanElement>(null)
  const targetRef = useRef<HTMLElement | null>(null)

  // State

  // Effects
  useEffect(() => {
    return () => {}
  }, [])

  // Handlers

  const getTarget = () => {
    return inkRef.current && inkRef.current.parentElement
  }

  const bindEvents = () => {
    if (targetRef.current) {
      targetRef.current.addEventListener('pointerdown', onPointerDown)
    }
  }

  const unbindEvents = () => {
    if (targetRef.current) {
      targetRef.current.removeEventListener('pointerdown', onPointerDown)
    }
  }

  const onPointerDown = (event: MouseEvent) => {
    const offset = getOffset(targetRef.current)
    const offsetX =
      event.pageX -
      (isString(offset.left) ? 0 : offset.left) +
      document.body.scrollTop -
      getWidth(inkRef.current) / 2
    const offsetY =
      event.pageY -
      (isString(offset.top) ? 0 : offset.top) +
      document.body.scrollLeft -
      getHeight(inkRef.current) / 2

    activateRipple(offsetX, offsetY)
  }

  const activateRipple = (offsetX: number, offsetY: number) => {
    if (!inkRef.current || getComputedStyle(inkRef.current, null).display === 'none') {
      return
    }

    removeClass(inkRef.current, 'is-active')

    setDimensions()

    inkRef.current.style.top = `${offsetY}px`
    inkRef.current.style.left = `${offsetX}px`
    addClass(inkRef.current, 'is-active')
  }

  const onAnimationEnd = (event: React.AnimationEvent) => {
    removeClass(event.currentTarget as HTMLElement, 'is-active')
  }

  const setDimensions = () => {
    if (inkRef.current && !getHeight(inkRef.current) && !getWidth(inkRef.current)) {
      const d = Math.max(getOuterWidth(targetRef.current), getOuterHeight(targetRef.current))

      inkRef.current.style.height = `${d}px`
      inkRef.current.style.width = `${d}px`
    }
  }

  React.useImperativeHandle(ref, () => ({
    props,
    getInk: () => inkRef.current,
    getTarget: () => targetRef.current,
  }))

  useMountEffect(() => {
    if (inkRef.current) {
      targetRef.current = getTarget()
      setDimensions()
      bindEvents()
    }
  })

  useUpdateEffect(() => {
    if (inkRef.current && !targetRef.current) {
      targetRef.current = getTarget()

      setDimensions()
      bindEvents()
    }
  })

  useUnmountEffect(() => {
    if (inkRef.current) {
      targetRef.current = null

      unbindEvents()
    }
  })

  // Render
  return (
    <span
      ref={inkRef}
      aria-hidden='true'
      role='presentation'
      className={`hi-ink ${props.className || ''}`}
      onAnimationEnd={onAnimationEnd}
    ></span>
  )
})

Ripple.displayName = 'Ripple'

export default Ripple
