import Image from 'next/image'

import BaseButton from '@components/BaseButton'

function Gradient({
  conic,
  className,
  small,
}: {
  small?: boolean
  conic?: boolean
  className?: string
}): JSX.Element {
  return (
    <span
      className={`absolute mix-blend-normal will-change-[filter] rounded-[100%] ${
        small ? 'blur-[32px]' : 'blur-[75px]'
      } ${conic ? 'bg-glow-conic' : ''} ${className}`}
    />
  )
}

export default function Page(): JSX.Element {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <BaseButton>Click me</BaseButton>
    </main>
  )
}
