import { Input } from '../../components/ui/input'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

export type FormInputTypes = {
  name: string
  label: string
  type?: string
}

export const FormInput = ({ name, label, type }: FormInputTypes) => {
  const {
    register,
    formState: { errors, submitCount }
  } = useFormContext()

  const error = errors?.[name]

  return (
    <div className={'w-full'}>
      <Input placeholder={label} {...register(name)} type={type ?? 'text'} className='rounded-sm h-10' />
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
