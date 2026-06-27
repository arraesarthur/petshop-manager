import { customRender, screen } from '@/core/utils/setup'
import { ClienteEdicao } from './cliente-edicao'
import { useClienteEdicaoForm } from '../hooks/use-cliente-edicao-form'
import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

vi.mock('../hooks/use-cliente-edicao-form')
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

vi.mocked(useClienteEdicaoForm).mockReturnValue({
  form: {
    register: vi.fn(() => ({})),
    handleSubmit: vi.fn(fn => fn),
    formState: {
      isDirty: true
    }
  },
  submitForm,
  cancelar,
  remover,
  initialValues: {
    nome: 'Arthur',
    telefone: '11999999999',
    instagram: '@arthur',
    endereco: 'Rua X'
  }
} as never)

describe('ClienteEdicao', () => {
  it('should render client name', async () => {
    await customRender(<ClienteEdicao />)

    expect(screen.getByText('Editar Arthur')).toBeInTheDocument()
  })

  it('should enable remove button when id exists', async () => {
    await customRender(<ClienteEdicao />)

    expect(screen.getByRole('button', { name: /remover/i })).toBeEnabled()
  })

  it('should call cancelar when cancel button is clicked', async () => {
    await customRender(<ClienteEdicao />)

    await userEvent.click(screen.getByRole('button', { name: /cancelar/i }))

    expect(cancelar).toHaveBeenCalled()
  })

  it('should enable save button when form is dirty', async () => {
    await customRender(<ClienteEdicao />)

    expect(screen.getByRole('button', { name: /salvar/i })).toBeEnabled()
  })
})
