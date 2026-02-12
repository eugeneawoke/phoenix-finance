import { type HTMLAttributes, type ElementType } from 'react'
import { cn } from '@/lib/utils/cn'

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
}

export function Container({
  as: Tag = 'div',
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <Tag
      className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)}
      {...props}
    >
      {children}
    </Tag>
  )
}
