import { useParams } from 'react-router-dom'
import { FormProvider } from 'react-hook-form'
import { useClienteEdicaoForm } from '../hooks/use-cliente-edicao-form'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/core/components/form-input'
import ModalConfirmacao from '@/core/components/modal-confirmacao'

export const ClienteEdicao = () => {
  const { id } = useParams()
  const isNew = !!id
  const { form, submitForm, cancelar, initialValues, remover } =
    useClienteEdicaoForm(id)

  const {
    handleSubmit,
    formState: { isDirty }
  } = form
  return (
    <div className='container mx-auto py-10 max-w-5xl px-4 sm:px-6 lg:px-8'>
      <div className='mb-6 border-b border-pink-100 pb-5'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>
          Editar {initialValues?.nome || 'Cliente'}
        </h1>
        <p className='text-muted-foreground mt-1 text-sm'>
          Atualize as informações do cliente abaixo
        </p>
      </div>
      <div className='bg-card border border-pink-100/70 rounded-xl shadow-sm p-6 sm:p-8'>
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(submitForm)}
            className='flex flex-col gap-6'
          >
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <FormInput name='nome' label='Nome' maxLength={60} />
              <FormInput name='telefone' label='Telefone' maxLength={11}/>
              <FormInput name='instagram' label='Instagram' maxLength={50}/>
              <FormInput name='endereco' label='Endereço'/>
            </div>
            <div className='flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-pink-100/60 mt-2'>
              <ModalConfirmacao
                titleModal='Salvar Cliente'
                descriptionModal='Deseja salvar as alterações?'
                onConfirm={handleSubmit(submitForm)}
              >
                <Button
                  type='button'
                  disabled={!isDirty}
                  className=' bg-blue-500 hover:bg-blue-600 text-white shadow-sm transition-all rounded-lg px-6 '
                >
                  Salvar
                </Button>
              </ModalConfirmacao>

              <Button
                type='button'
                variant='outline'
                onClick={e => {
                  e.preventDefault()
                  cancelar()
                }}
                className='
                  border-pink-200 text-pink-600
                  hover:bg-pink-50 hover:text-pink-700
                  transition-colors rounded-lg
                '
              >
                Cancelar
              </Button>

              <ModalConfirmacao
                titleModal='Remover Cliente'
                descriptionModal={`Deseja mesmo remover o cadastro de ${initialValues.nome}?`}
                onConfirm={() => remover(id)}
              >
                <Button
                  type='button'
                  disabled={!isNew}
                  className='
                  bg-yellow-300 text-black
                  hover:bg-yellow-400 hover:text-yellow-950
                  border border-yellow-400
                  transition-colors
                  rounded-lg
                  disabled:opacity-50 disabled:cursor-not-allowed
                '
                >
                  Remover
                </Button>
              </ModalConfirmacao>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default ClienteEdicao
