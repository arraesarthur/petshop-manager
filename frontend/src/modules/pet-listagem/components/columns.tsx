import type { Pet } from '@/core/graphql/graphql'
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
import { usePetHandler } from '../hooks/use-pet-handler'

const AcoesCelulas = ({ pet }: { pet: Pet }) => {
  const { handleEditar, handleRemover } = usePetHandler()

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
            onClick={() => handleEditar(pet.id)}
            className='cursor-pointer gap-2'
          >
            <Edit2Icon className='h-3.5 w-3.5 text-muted-foreground' />
            Editar
          </DropdownMenuItem>
          <ModalConfirmacao
            titleModal='Remover Pet'
            descriptionModal={`Deseja mesmo remover o cadastro de ${pet.nome}?`}
            onConfirm={() => handleRemover(pet.id)}
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
export const columns: ColumnDef<Pet>[] = [
  {
    accessorKey: 'nome',
    header: 'Nome'
  },
  {
    accessorKey: 'especie',
    header: 'Especie'
  },
  {
    accessorFn: row => row.raca?.nome,
    id: 'raca',
    header: 'Raça'
  },
  {
    accessorKey: 'sexo',
    header: 'Sexo'
  },
  {
    accessorKey: 'porte',
    header: 'Porte'
  },
  {
    accessorFn: row => row.cliente?.nome,
    id: 'cliente',
    header: 'Cliente'
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <AcoesCelulas pet={row.original} />
  }
]
