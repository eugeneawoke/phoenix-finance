import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

const paddingClasses = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
} as const

type Padding = keyof typeof paddingClasses

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  padding?: Padding
}

export function Card({
  hover = false,
  padding = 'md',
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'clay-card',
        hover && 'clay-card-hover',
        paddingClasses[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
