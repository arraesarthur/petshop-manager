import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import type { ReactNode } from 'react'

type ModalConfirmacaoProps = {
  children: ReactNode
  onConfirm: () => void
  titleModal?: string
  descriptionModal?: string
}

const ModalConfirmacao = ({
  children,
  onConfirm,
  titleModal = 'Você tem certeza?',
  descriptionModal = 'Esta ação não pode ser desfeita.'
}: ModalConfirmacaoProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className='p-6 rounded-xl border border-pink-100/80 shadow-xl max-w-md bg-background space-y-6'>
        <AlertDialogHeader className='flex flex-col items-center text-center justify-center space-y-2 w-full'>
          <AlertDialogTitle className='text-center text-xl font-bold tracking-tight text-foreground w-full'>
            {titleModal}
          </AlertDialogTitle>

          <AlertDialogDescription className='text-center text-sm text-muted-foreground leading-relaxed w-full'>
            {descriptionModal}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='flex flex-col sm:flex-row justify-center sm:justify-center gap-2 w-full'>
          <AlertDialogCancel asChild>
            <Button
              variant='outline'
              className='border-pink-200/60 hover:bg-pink-50/50 hover:text-pink-700 text-muted-foreground font-medium rounded-lg transition-colors w-full sm:w-auto'
            >
              Cancelar
            </Button>
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              onClick={onConfirm}
              className='bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-lg shadow-sm transition-colors w-full sm:w-auto'
            >
              Continuar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ModalConfirmacao
