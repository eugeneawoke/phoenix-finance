'use client'

import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const variantClasses = {
  gold: 'btn-gold',
  ghost: 'btn-ghost',
  outline:
    'border border-phoenix-gold/30 text-phoenix-gold-light bg-transparent rounded-[var(--radius-md)] transition-all duration-250 hover:border-phoenix-gold hover:bg-phoenix-gold/10 cursor-pointer',
  link: 'text-phoenix-gold-light bg-transparent underline-offset-4 hover:underline cursor-pointer',
} as const

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
} as const

type Variant = keyof typeof variantClasses
type Size = keyof typeof sizeClasses

type ButtonBaseProps = {
  variant?: Variant
  size?: Size
  isLoading?: boolean
  className?: string
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    as?: 'button'
    href?: never
  }

type ButtonAsAnchor = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    as: 'a'
    href: string
  }

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    as?: never
    href: string
  }

export type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const {
    variant = 'gold',
    size = 'md',
    isLoading = false,
    className,
    children,
    ...rest
  } = props

  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-phoenix-gold disabled:opacity-50 disabled:pointer-events-none',
    variantClasses[variant],
    sizeClasses[size],
    isLoading && 'pointer-events-none opacity-70',
    className,
  )

  const content = (
    <>
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </>
  )

  if ('href' in rest && rest.href) {
    const { as: _as, href, ...anchorRest } = rest as ButtonAsAnchor | ButtonAsLink
    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...anchorRest}
      >
        {content}
      </a>
    )
  }

  const { as: _as, ...buttonRest } = rest as ButtonAsButton
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      className={classes}
      disabled={(rest as ButtonAsButton).disabled || isLoading}
      {...buttonRest}
    >
      {content}
    </button>
  )
})

Button.displayName = 'Button'
