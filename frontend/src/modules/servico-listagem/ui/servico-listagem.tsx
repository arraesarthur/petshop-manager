import { DataTable } from '@/core/components/data-table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchIcon, Loader2Icon, PlusIcon } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useServicoListagem } from '../hooks/use-servico-listagem'
import { columns } from '../components/columns'

export const ServicoListagem = () => {
  const {
    data,
    totalElements,
    pagination,
    setPagination,
    busca,
    setBusca,
    loading
  } = useServicoListagem()
  const navigate = useNavigate()

  return (
    <div className='container mx-auto py-10 max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-pink-100 pb-5'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight text-foreground'>
            Serviços
          </h1>
          <p className='text-muted-foreground mt-1'>
            Gerencie o cadastro e informações dos serviços.
          </p>
        </div>
        <Button className='bg-pink-500 hover:bg-pink-600 text-white gap-2 shadow-sm font-medium transition-colors rounded-md p-5'>
          <PlusIcon className='h-4 w-4' />
          <Link to='/servicos/novo'>Novo Serviço</Link>
        </Button>
      </div>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-pink-50/40 border border-pink-100/60 p-4 rounded-md shadow-sm'>
        <div className='relative w-full max-w-sm flex items-center'>
          <SearchIcon className='absolute left-3 h-4 w-4 text-pink-400 pointer-events-none' />
          <Input
            placeholder='Buscar por nome...'
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className='pl-9 bg-background border-pink-200/80 focus-visible:ring-pink-400 focus-visible:border-pink-400 rounded-md'
          />
          {loading && (
            <Loader2Icon className='absolute right-3 h-4 w-4 animate-spin text-muted-foreground' />
          )}
        </div>

        <div className='text-sm text-muted-foreground font-medium rounded-lg bg-background px-3 py-1.5 border border-pink-100/40 shadow-xs'>
          Total:{' '}
          <span className='text-foreground font-semibold'>{totalElements}</span>{' '}
          serviços
        </div>
      </div>
      <div className='bg-card rounded-xl border border-pink-100/80 shadow-xs overflow-hidden'>
        <DataTable
          columns={columns}
          data={data}
          rowCount={totalElements}
          pagination={pagination}
          onPaginationChange={setPagination}
          onRowClick={servico => navigate(`/editar/servicos/${servico.id}`)}
        />
      </div>
    </div>
  )
}
