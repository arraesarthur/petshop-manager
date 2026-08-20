import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { CheckIcon, XIcon, ChevronDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'

interface Option {
  value: string
  label: string
}

interface FormMultiSelectProps {
  name: string
  label: string
  options: Option[]
  placeholder?: string
  disabled?: boolean
  className?: string
}

export const FormMultiSelect = ({
  name,
  label,
  options,
  placeholder = 'Selecione...',
  disabled = false,
  className
}: FormMultiSelectProps) => {
  const {
    setValue,
    watch,
    formState: { errors }
  } = useFormContext()

  const value: string[] = watch(name) ?? []
  const error = errors[name]?.message as string | undefined
  const [open, setOpen] = useState(false)

  const selectedLabels = options
    .filter(opt => value.includes(opt.value))
    .map(opt => opt.label)

  const toggleOption = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue]
    setValue(name, newValue, { shouldDirty: true, shouldValidate: true })
  }

  const removeOption = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newValue = value.filter(v => v !== optionValue)
    setValue(name, newValue, { shouldDirty: true, shouldValidate: true })
  }

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <p className='text-sm font-medium text-foreground'>{label}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type='button'
            variant='outline'
            disabled={disabled}
            className={cn(
              'w-full justify-start rounded-sm h-10 font-normal text-left px-3',
              !value.length && 'text-muted-foreground',
              error && 'border-red-500 focus:ring-red-500'
            )}
          >
            <span className='flex-1 truncate'>
              {selectedLabels.length > 0
                ? selectedLabels.join(', ')
                : placeholder}
            </span>
            <ChevronDownIcon className='h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-full p-1' align='start'>
          <div className='max-h-60 overflow-auto'>
            {options.map(opt => {
              const isSelected = value.includes(opt.value)
              return (
                <button
                  key={opt.value}
                  type='button'
                  onClick={() => toggleOption(opt.value)}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground cursor-pointer',
                    isSelected && 'bg-accent'
                  )}
                >
                  <div
                    className={cn(
                      'flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'opacity-50'
                    )}
                  >
                    {isSelected && <CheckIcon className='h-3 w-3' />}
                  </div>
                  <span>{opt.label}</span>
                </button>
              )
            })}
          </div>
        </PopoverContent>
      </Popover>
      {selectedLabels.length > 0 && (
        <div className='flex flex-wrap gap-1 mt-1'>
          {options
            .filter(opt => value.includes(opt.value))
            .map(opt => (
              <Badge
                key={opt.value}
                variant='secondary'
                className='gap-1 pr-1'
              >
                {opt.label}
                <button
                  type='button'
                  onClick={e => removeOption(opt.value, e)}
                  className='rounded-full hover:bg-muted/80 p-0.5'
                >
                  <XIcon className='h-2.5 w-2.5' />
                </button>
              </Badge>
            ))}
        </div>
      )}
      {error && <p className='text-xs text-red-500'>{error}</p>}
    </div>
  )
}
