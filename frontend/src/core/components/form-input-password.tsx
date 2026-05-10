import { Input } from '../../components/ui/input'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { EyeIcon, EyeOffIcon } from 'lucide-react'

export type FormInputTypes = {
  name: string
  label: string
}

export const FormInputPassword = ({ name, label }: FormInputTypes) => {
  const [isVisible, setIsVisible] = useState(false)
  const {
    register,
    formState: { errors, submitCount }
  } = useFormContext()

  const error = errors?.[name]

  return (
    <div className={'w-full'}>
      <div className='relative'>
        <Input
          type={isVisible ? 'text' : 'password'}
          {...register(name)}
          placeholder={label}
          className='rounded-sm h-10'
          
        />
        <Button
          type='button'
          variant='ghost'
          size='icon'
          onClick={() => setIsVisible(prevState => !prevState)}
          className='text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none hover:bg-transparent'
        >
          {isVisible ? <EyeOffIcon /> : <EyeIcon />}
          <span className='sr-only'>
            {isVisible ? 'Hide password' : 'Show password'}
          </span>
        </Button>
        {submitCount > 0 && error ? (
          <ErrorMessage
            errors={errors}
            name={name}
            render={({ message }) => (
              <p className='text-sm text-red-500'>{message}</p>
            )}
          />
        ) : null}
      </div>
    </div>
  )
}
