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
import ModalConfirmacao from '@/core/components/modal-confirmacao'
import { useServicoHandler } from '../hooks/use-servico-handler'

type ServicoRow = {
  id: string
  nome: string
  descricao: string
  precoPequeno: number
  precoMedio: number
  precoGrande: number
}

const AcoesCelulas = ({ servico }: { servico: ServicoRow }) => {
  const { handleEditar, handleRemover } = useServicoHandler()

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
            onClick={() => handleEditar(servico.id)}
            className='cursor-pointer gap-2'
          >
            <Edit2Icon className='h-3.5 w-3.5 text-muted-foreground' />
            Editar
          </DropdownMenuItem>
          <ModalConfirmacao
            titleModal='Remover Serviço'
            descriptionModal={`Deseja mesmo remover o cadastro de ${servico.nome}?`}
            onConfirm={() => handleRemover(servico.id)}
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

export const columns: ColumnDef<ServicoRow>[] = [
  {
    accessorKey: 'nome',
    header: 'Nome'
  },
  {
    accessorKey: 'descricao',
    header: 'Descrição'
  },
  {
    accessorKey: 'precoPequeno',
    header: 'Pequeno'
  },
  {
    accessorKey: 'precoMedio',
    header: 'Médio'
  },
  {
    accessorKey: 'precoGrande',
    header: 'Grande'
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <AcoesCelulas servico={row.original} />
  }
]
