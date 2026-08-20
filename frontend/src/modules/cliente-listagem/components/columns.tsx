import { type ColumnDef } from '@tanstack/react-table'
import { MoreHorizontalIcon, Edit2Icon, Trash2Icon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useClienteHandler } from '../hooks/use-cliente-handler'
import ModalConfirmacao from '@/core/components/modal-confirmacao'

type ClienteRow = {
  id: string
  nome: string
  telefone: string
  instagram: string
  endereco: string
}

const AcoesCelulas = ({ cliente }: { cliente: ClienteRow }) => {
  const { handleEditar, handleRemover } = useClienteHandler()

  return (
    <div className='text-right'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0 hover:bg-muted/70'>
            <span className='sr-only'>Abrir menu</span>
            <MoreHorizontalIcon className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-40'>
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleEditar(cliente.id)}
            className='cursor-pointer gap-2'
          >
            <Edit2Icon className='h-3.5 w-3.5 text-muted-foreground' />
            Editar
          </DropdownMenuItem>
          <ModalConfirmacao
            titleModal='Remover Cliente'
            descriptionModal={`Deseja mesmo remover o cadastro de ${cliente.nome}?`}
            onConfirm={() => handleRemover(cliente.id)}
          >
            <DropdownMenuItem
              onSelect={e => e.preventDefault()}
              className='cursor-pointer gap-2 text-destructive focus:text-destructive focus:bg-destructive/10'
            >
              <Trash2Icon className='h-3.5 w-3.5' />
              Remover
            </DropdownMenuItem>
          </ModalConfirmacao>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
export const columns: ColumnDef<ClienteRow>[] = [
  {
    accessorKey: 'nome',
    header: 'Nome'
  },
  {
    accessorKey: 'telefone',
    header: 'Telefone'
  },
  {
    accessorKey: 'instagram',
    header: 'Instagram'
  },
  {
    accessorKey: 'endereco',
    header: 'Endereço'
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <AcoesCelulas cliente={row.original} />
  }
]
