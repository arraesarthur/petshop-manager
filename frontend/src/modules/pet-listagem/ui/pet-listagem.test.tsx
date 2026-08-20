import { customRender, screen } from '@/core/utils/setup'
import { describe, expect, it, vi } from 'vitest'
import { PetListagem } from './pet-listagem'
import { usePetListagem } from '../hooks/use-pet-listagem'
import userEvent from '@testing-library/user-event'

const mockNavigate = vi.fn()

vi.mock('../hooks/use-pet-listagem')
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')

  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

const noContentMock = {
  busca: '',
  data: [],
  error: null,
  loading: false,
  pagination: {
    pageIndex: 0,
    pageSize: 10
  },
  setBusca: vi.fn(),
  setPagination: vi.fn(),
  totalElements: 0,
  clientes: [],
  clienteId: undefined,
  setClienteId: vi.fn()
}

const contentMock = {
  busca: '',
  data: [
    {
      id: '1',
      nome: 'Thor',
      especie: 'CACHORRO',
      raca: { id: '1', nome: 'Golden Retriever' },
      sexo: 'MACHO',
      porte: 'GRANDE',
      cliente: { id: '1', nome: 'Cliente 1' }
    },
    {
      id: '2',
      nome: 'Luna',
      especie: 'GATO',
      raca: { id: '2', nome: 'Siamês' },
      sexo: 'FEMEA',
      porte: 'PEQUENO',
      cliente: { id: '2', nome: 'Cliente 2' }
    }
  ],
  error: null,
  loading: false,
  pagination: {
    pageIndex: 0,
    pageSize: 10
  },
  setBusca: vi.fn(),
  setPagination: vi.fn(),
  totalElements: 2,
  clientes: [
    { id: '1', nome: 'Cliente 1' },
    { id: '2', nome: 'Cliente 2' }
  ],
  clienteId: undefined,
  setClienteId: vi.fn()
}

vi.mocked(usePetListagem).mockReturnValue(contentMock)

describe('Pet Listagem', () => {
  it('should render list when data has pets', async () => {
    await customRender(<PetListagem />)

    const nomes = screen.getAllByText('Thor')
    expect(nomes.length).toBeGreaterThan(0)
  })

  it('should render new pet link', async () => {
    await customRender(<PetListagem />)

    const link = screen.getByRole('link', { name: /novo pet/i })

    expect(link).toHaveAttribute('href', '/pets/novo')
  })

  it('should navigate when row is clicked', async () => {
    await customRender(<PetListagem />)

    await userEvent.click(screen.getAllByText('Thor')[0])

    expect(mockNavigate).toHaveBeenCalledWith('/editar/pets/1')
  })

  it('should render empty list when data has no pets', async () => {
    vi.mocked(usePetListagem).mockReturnValue(noContentMock)
    await customRender(<PetListagem />)

    const texts = screen.getAllByText('Nenhum dado encontrado.')

    expect(texts.length).toBeGreaterThan(0)
  })

  it('should render total pets count', async () => {
    vi.mocked(usePetListagem).mockReturnValue(contentMock)
    await customRender(<PetListagem />)

    expect(screen.getByText('2')).toBeInTheDocument()
  })
})