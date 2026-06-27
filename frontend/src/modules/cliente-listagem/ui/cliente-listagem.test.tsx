import { customRender, screen } from '@/core/utils/setup'
import { describe, expect, it, vi } from 'vitest'
import { ClienteListagem } from './cliente-listagem'
import { useClienteListagem } from '../hooks/use-cliente-listagem'
import userEvent from '@testing-library/user-event'

const mockNavigate = vi.fn()

vi.mock('../hooks/use-cliente-listagem')
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
  totalElements: 0
}

const contentMock = {
  busca: '',
  data: [
    {
      id: '9',
      nome: 'Cliente 1',
      telefone: '11999999999',
      instagram: '@testex',
      endereco: 'Rua X'
    },
    {
      id: '10',
      nome: 'Cliente 2',
      telefone: '11999999998',
      instagram: '@testey',
      endereco: 'Rua Y'
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
  totalElements: 2
}

vi.mocked(useClienteListagem).mockReturnValue(contentMock)

describe('Cliente Listagem', () => {
  it('should render list when data has clientes', async () => {
    await customRender(<ClienteListagem />)
    const nomes = screen.getAllByText('Cliente 1')
    const telefones = screen.getAllByText('11999999999')
    const instagrams = screen.getAllByText('@testex')
    const enderecos = screen.getAllByText('Rua X')

    expect(nomes.length).toBeGreaterThan(0)
    expect(telefones.length).toBeGreaterThan(0)
    expect(instagrams.length).toBeGreaterThan(0)
    expect(enderecos.length).toBeGreaterThan(0)
  })

  it('should render new client link', async () => {
    await customRender(<ClienteListagem />)

    const link = screen.getByRole('link', {
      name: /novo cliente/i
    })

    expect(link).toHaveAttribute('href', '/clientes/novo')
  })

  it('should navigate when row is clicked', async () => {
    await customRender(<ClienteListagem />)

    await userEvent.click(screen.getAllByText('Cliente 1')[0])

    expect(mockNavigate).toHaveBeenCalledWith('/editar/clientes/9')
  })

  it('should render empty list when data has not clientes', async () => {
    vi.mocked(useClienteListagem).mockReturnValue(noContentMock)
    await customRender(<ClienteListagem />)

    const texts = screen.getAllByText('Nenhum dado encontrado.')

    expect(texts.length).toBeGreaterThan(0)
  })
})
