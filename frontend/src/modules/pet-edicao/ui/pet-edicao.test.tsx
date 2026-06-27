import { customRender, screen } from '@/core/utils/setup'
import { PetEdicao } from './pet-edicao'
import { usePetEdicaoForm } from '../hooks/use-pet-edicao-form'
import { useCLientesQuery } from '../hooks/use-clientes-query'
import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

vi.mock('../hooks/use-pet-edicao-form')
vi.mock('../hooks/use-clientes-query')
vi.mock('@/core/components/form-select', () => ({
  FormSelect: ({ label }: { label: string }) => <div>{label}</div>
}))
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')

  return {
    ...actual,
    useParams: () => ({
      id: '1'
    })
  }
})

const cancelar = vi.fn()
const remover = vi.fn()
const submitForm = vi.fn()

vi.mocked(useCLientesQuery).mockReturnValue({
  clientes: [{ id: '1', nome: 'Cliente 1' }],
  loading: false,
  error: null
} as never)

vi.mocked(usePetEdicaoForm).mockReturnValue({
  form: {
    register: vi.fn(() => ({})),
    handleSubmit: vi.fn(fn => fn),
    watch: vi.fn(() => 'CACHORRO'),
    formState: {
      isDirty: true
    }
  },
  submitForm,
  cancelar,
  remover,
  racas: [{ id: '1', nome: 'Golden Retriever' }],
  loadingRacas: false,
  initialValues: {
    id: '1',
    nome: 'Thor',
    especie: 'CACHORRO',
    racaId: '1',
    sexo: 'MACHO',
    porte: 'GRANDE',
    clienteId: '1',
    observacao: 'Muito energético',
    dataNascimento: '2020-05-10'
  },
  values: {}
} as never)

describe('PetEdicao', () => {
  it('should render pet name in title', async () => {
    await customRender(<PetEdicao />)

    expect(screen.getByText('Editar Thor')).toBeInTheDocument()
  })

  it('should enable remove button when id exists', async () => {
    await customRender(<PetEdicao />)

    expect(screen.getByRole('button', { name: /remover/i })).toBeEnabled()
  })

  it('should call cancelar when cancel button is clicked', async () => {
    await customRender(<PetEdicao />)

    await userEvent.click(screen.getByRole('button', { name: /cancelar/i }))

    expect(cancelar).toHaveBeenCalled()
  })

  it('should enable save button when form is dirty', async () => {
    await customRender(<PetEdicao />)

    expect(screen.getByRole('button', { name: /salvar/i })).toBeEnabled()
  })
})