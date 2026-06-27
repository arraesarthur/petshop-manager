import { useFormContext } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface Option {
  value: string
  label: string
}

interface FormSelectProps {
  name: string
  label: string
  options: Option[]
  placeholder?: string
  disabled?: boolean
  className?: string
}

export const FormSelect = ({
  name,
  label,
  options,
  placeholder = 'Selecione...',
  disabled = false,
  className
}: FormSelectProps) => {
  const {
    setValue,
    watch,
    formState: { errors }
  } = useFormContext()

  const value = watch(name)
  const error = errors[name]?.message as string | undefined

  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <p className='text-sm font-medium text-foreground'>{label}</p>
      <Select
        value={value ?? ''}
        onValueChange={val =>
          setValue(name, val, { shouldDirty: true, shouldValidate: true })
        }
        disabled={disabled}
      >
        <SelectTrigger
          id={name}
          className={cn(
            'w-full rounded-sm',
            error && 'border-red-500 focus:ring-red-500'
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(opt => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className='text-xs text-red-500'>{error}</p>}
    </div>
  )
}
