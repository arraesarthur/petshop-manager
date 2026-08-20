import { useParams } from 'react-router-dom'
import { FormProvider } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { FormInput } from '@/core/components/form-input'
import ModalConfirmacao from '@/core/components/modal-confirmacao'
import { useServicoEdicaoForm } from '../hooks/use-servico-edicao-form'
import { ServicoPortePrecosInputs } from '../components/servico-porte-precos-display'

export const ServicoEdicao = () => {
  const { id } = useParams()
  const isNew = !!id
  const { form, submitForm, cancelar, initialValues, remover } =
    useServicoEdicaoForm(id)

  const {
    handleSubmit,
    formState: { isDirty }
  } = form

  if (id && !initialValues.id) return null

  return (
    <div className='container mx-auto py-10 max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6'>
      <div className='mb-6 border-b border-pink-100 pb-5'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>
          {id ? `Editar ${initialValues?.nome || 'Serviço'}` : 'Novo Serviço'}
        </h1>
        <p className='text-muted-foreground mt-1 text-sm'>
          {id
            ? 'Atualize as informações do serviço abaixo'
            : 'Preencha as informações do novo serviço'}
        </p>
      </div>

      <div className='bg-card border border-pink-100/70 rounded-xl shadow-sm p-6 sm:p-8'>
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(submitForm)}
            className='flex flex-col gap-8'
          >
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <FormInput name='nome' label='Nome do Serviço' maxLength={60} />
              <FormInput
                name='descricao'
                label='Descrição (opcional)'
                maxLength={200}
              />
            </div>

            <ServicoPortePrecosInputs />

            <div className='flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-pink-100/60 mt-2'>
              <ModalConfirmacao
                titleModal='Salvar Serviço'
                descriptionModal='Deseja salvar as alterações?'
                onConfirm={handleSubmit(submitForm)}
              >
                <Button
                  type='button'
                  disabled={!isDirty}
                  className='bg-blue-500 hover:bg-blue-600 text-white shadow-sm transition-all rounded-lg px-6'
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
                className='border-pink-200 text-pink-600 hover:bg-pink-50 hover:text-pink-700 transition-colors rounded-lg'
              >
                Cancelar
              </Button>

              <ModalConfirmacao
                titleModal='Remover Serviço'
                descriptionModal={`Deseja mesmo remover o cadastro de ${initialValues.nome}?`}
                onConfirm={() => remover(id)}
              >
                <Button
                  type='button'
                  disabled={!isNew}
                  className='bg-yellow-300/80 text-yellow-900 hover:bg-yellow-400/80 hover:text-yellow-950 border border-yellow-400/60 transition-colors rounded-lg disabled:opacity-50 disabled:cursor-not-allowed'
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

export default ServicoEdicao
