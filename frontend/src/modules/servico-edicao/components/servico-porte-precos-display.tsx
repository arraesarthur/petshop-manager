import { FormInput } from '@/core/components/form-input'
import { PORTES } from '../utils/options'

const PORTE_ICONS: Record<string, string> = {
  PEQUENO: 'S',
  MEDIO: 'M',
  GRANDE: 'G'
}

const PORTE_FIELDS: Record<string, string> = {
  PEQUENO: 'precoPequeno',
  MEDIO: 'precoMedio',
  GRANDE: 'precoGrande'
}

export const ServicoPortePrecosInputs = () => {
  return (
    <div className='flex flex-col gap-3'>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {PORTES.map(porte => {
          const fieldName = PORTE_FIELDS[porte.value]
          const initial = PORTE_ICONS[porte.value]

          return (
            <div
              key={porte.value}
              className={`flex flex-col gap-2 rounded-xl border p-4 transition-colors`}
            >
              <div className='flex items-center gap-2'>
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-bold border`}
                >
                  {initial}
                </span>
                <span className='text-sm font-medium text-foreground'>
                  Porte {porte.label}
                </span>
              </div>
              <FormInput name={fieldName} label='Preço' type='number' />
            </div>
          )
        })}
      </div>

      <p className='text-xs text-muted-foreground text-center'>
        Informe o preço para cada porte de pet
      </p>
    </div>
  )
}
