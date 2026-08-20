import { customRender, screen } from '@/core/utils/setup'
import { ServicoEdicao } from './servico-edicao'
import { useServicoEdicaoForm } from '../hooks/use-servico-edicao-form'
import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

vi.mock('../hooks/use-servico-edicao-form')
vi.mock('./components/servico-porte-precos-display', () => ({
  ServicoPortePrecosInputs: () => <div>Preços por Porte</div>
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

vi.mocked(useServicoEdicaoForm).mockReturnValue({
  form: {
    register: vi.fn(() => ({})),
    handleSubmit: vi.fn(fn => fn),
    watch: vi.fn(() => ''),
    control: {},
    formState: {
      isDirty: true
    }
  },
  submitForm,
  cancelar,
  remover,
  initialValues: {
    id: '1',
    nome: 'Banho Completo',
    descricao: 'Banho com shampoo e condicionador',
    precoPequeno: 35,
    precoMedio: 50,
    precoGrande: 65
  },
  values: {}
} as never)

describe('ServicoEdicao', () => {
  it('should render servico name in title', async () => {
    await customRender(<ServicoEdicao />)

    expect(screen.getByText('Editar Banho Completo')).toBeInTheDocument()
  })

  it('should enable remove button when id exists', async () => {
    await customRender(<ServicoEdicao />)

    expect(screen.getByRole('button', { name: /remover/i })).toBeEnabled()
  })

  it('should call cancelar when cancel button is clicked', async () => {
    await customRender(<ServicoEdicao />)

    await userEvent.click(screen.getByRole('button', { name: /cancelar/i }))

    expect(cancelar).toHaveBeenCalled()
  })

  it('should enable save button when form is dirty', async () => {
    await customRender(<ServicoEdicao />)

    expect(screen.getByRole('button', { name: /salvar/i })).toBeEnabled()
  })
})
