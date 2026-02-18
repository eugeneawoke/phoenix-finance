'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface SelectOption {
  value: string
  label: string
}

interface CustomSelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  label?: string
  id?: string
  name?: string
  placeholder?: string
}

export function CustomSelect({
  options,
  value,
  onChange,
  label,
  id,
  name,
  placeholder,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Scroll selected option into view when dropdown opens
  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      const selectedOption = dropdownRef.current.querySelector(
        '[data-selected="true"]'
      ) as HTMLElement | null
      if (selectedOption) {
        selectedOption.scrollIntoView({ block: 'nearest' })
      }
    }
  }, [isOpen])

  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-phoenix-gray-300 mb-2 pl-4"
        >
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full bg-phoenix-navy-800 border border-white/10 rounded-xl px-4 py-3 text-phoenix-white',
          'focus:border-phoenix-gold focus:outline-none transition-colors cursor-pointer',
          'flex items-center justify-between',
          isOpen && 'border-phoenix-gold'
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        id={id}
      >
        <span className={selectedOption ? 'text-phoenix-white' : 'text-phoenix-gray-600'}>
          {selectedOption?.label || placeholder || 'Select an option'}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            'text-phoenix-gold transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Hidden select for form submission */}
      <select
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setIsOpen(false)
        }}
        className="sr-only"
        aria-hidden="true"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 right-0 mt-1 bg-phoenix-navy-800 border border-white/10 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto"
          role="listbox"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className={cn(
                'w-full px-4 py-3 text-left text-sm transition-colors',
                value === option.value
                  ? 'bg-gradient-to-r from-phoenix-gold/20 via-phoenix-gold/10 to-phoenix-gold/20 text-phoenix-gold font-medium'
                  : 'text-phoenix-gray-300 hover:bg-phoenix-navy-700 hover:text-phoenix-white'
              )}
              role="option"
              aria-selected={value === option.value}
              data-selected={value === option.value}
            >
              <span className="flex items-center gap-2">
                {value === option.value && (
                  <span className="text-phoenix-gold">✓</span>
                )}
                {option.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
