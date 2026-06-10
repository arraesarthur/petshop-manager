import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

export type FormInputTypes = {
  name: string
  label: string
  type?: string
  maxLength?: number
}

export const FormInput = ({ name, label, type, maxLength }: FormInputTypes) => {
  const {
    register,
    formState: { errors, submitCount }
  } = useFormContext()

  const error = errors?.[name]

  return (
    <div className={'w-full'}>
      <p className='mb-2 text-sm text-gray-500'>{label}</p>
      <Input placeholder={label} {...register(name)} type={type ?? 'text'} maxLength={maxLength} className='rounded-sm h-10' />
      {submitCount > 0 && error ? (
        <ErrorMessage
          errors={errors}
          name={name}
          render={({ message }) => <p className="text-sm text-red-500">{message}</p>}
        />
      ) : null}
    </div>
  )
}
