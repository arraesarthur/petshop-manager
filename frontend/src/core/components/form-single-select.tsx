import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

type Option = {
  id: string | number
  nome: string
}

type FormSingleSelectProps = {
  label: string
  placeholder: string
  data: Option[]
  value?: string
  onValueChange?: (value: string) => void
  invalid?: boolean
}

const FormSingleSelect = ({
  label,
  placeholder,
  data,
  value,
  onValueChange,
  invalid
}: FormSingleSelectProps) => {
  return (
    <div className='w-full max-w-sm space-y-2'>
      {label && (
        <label className='text-sm text-muted-foreground'>{label}</label>
      )}

      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className='w-full rounded-md' aria-invalid={invalid}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent
          position='popper'
          side='bottom'
          align='start'
          sideOffset={6}
          className='p-1 rounded-md'
        >
          {data.map(item => (
            <SelectItem key={item.id} value={String(item.id)}>
              {item.nome}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default FormSingleSelect
