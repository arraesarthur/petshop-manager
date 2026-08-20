import { customRender, screen } from '@/core/utils/setup'
import { describe, expect, it, vi } from 'vitest'
import { ServicoListagem } from './servico-listagem'
import { useServicoListagem } from '../hooks/use-servico-listagem'
import userEvent from '@testing-library/user-event'

const mockNavigate = vi.fn()

vi.mock('../hooks/use-servico-listagem')
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
      id: '1',
      nome: 'Banho Completo',
      descricao: 'Banho com shampoo e condicionador',
      precoPequeno: 35,
      precoMedio: 50,
      precoGrande: 65
    },
    {
      id: '2',
      nome: 'Tosa Higiênica',
      descricao: 'Tosa nas regiões íntimas',
      precoPequeno: 20,
      precoMedio: 30,
      precoGrande: 40
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

vi.mocked(useServicoListagem).mockReturnValue(contentMock)

describe('Servico Listagem', () => {
  it('should render list when data has servicos', async () => {
    await customRender(<ServicoListagem />)

    const nomes = screen.getAllByText('Banho Completo')
    expect(nomes.length).toBeGreaterThan(0)
  })

  it('should render new servico link', async () => {
    await customRender(<ServicoListagem />)

    const link = screen.getByRole('link', { name: /novo serviço/i })

    expect(link).toHaveAttribute('href', '/servicos/novo')
  })

  it('should navigate when row is clicked', async () => {
    await customRender(<ServicoListagem />)

    await userEvent.click(screen.getAllByText('Banho Completo')[0])

    expect(mockNavigate).toHaveBeenCalledWith('/editar/servicos/1')
  })

  it('should render empty list when data has no servicos', async () => {
    vi.mocked(useServicoListagem).mockReturnValue(noContentMock)
    await customRender(<ServicoListagem />)

    const texts = screen.getAllByText('Nenhum dado encontrado.')

    expect(texts.length).toBeGreaterThan(0)
  })

  it('should render total servicos count', async () => {
    vi.mocked(useServicoListagem).mockReturnValue(contentMock)
    await customRender(<ServicoListagem />)

    expect(screen.getByText('2')).toBeInTheDocument()
  })
})
