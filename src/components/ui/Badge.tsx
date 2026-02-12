import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

const variantClasses = {
  gold: 'bg-phoenix-gold/15 text-phoenix-gold-light border-phoenix-gold/30',
  success: 'bg-success/15 text-success border-success/30',
  warning: 'bg-warning/15 text-warning border-warning/30',
  error: 'bg-error/15 text-error border-error/30',
  info: 'bg-info/15 text-info border-info/30',
  neutral: 'bg-white/10 text-phoenix-gray-300 border-white/15',
} as const

type Variant = keyof typeof variantClasses

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: Variant
}

export function Badge({
  variant = 'gold',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
