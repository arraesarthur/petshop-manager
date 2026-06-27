import { renderHook, act } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { useClienteEdicaoHandler } from '../use-cliente-edicao-handler'
import { useMutation } from '@tanstack/react-query'

const navigate = vi.fn()
const mutate = vi.fn()
const mutateAsync = vi.fn()

vi.mock('react-router-dom', () => ({
  useNavigate: () => navigate
}))

vi.mock('@/core/hooks/use-fetcher', () => ({
  useFetcher: () => vi.fn()
}))

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({
    invalidateQueries: vi.fn()
  }),
  useMutation: vi.fn()
}))

describe('useClienteEdicaoHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    vi.mocked(useMutation)
      .mockReturnValueOnce({
        mutate
      } as never)
      .mockReturnValueOnce({
        mutateAsync
      } as never)
  })

  it('should navigate to clientes when cancelar is called', () => {
    const { result } = renderHook(() => useClienteEdicaoHandler())

    act(() => {
      result.current.cancelar()
    })

    expect(navigate).toHaveBeenCalledWith('/clientes')
  })

  it('should remove client and navigate', () => {
    const { result } = renderHook(() => useClienteEdicaoHandler())

    act(() => {
      result.current.remover('1')
    })

    expect(mutate).toHaveBeenCalledWith('1')
    expect(navigate).toHaveBeenCalledWith('/clientes')
  })

  it('should save client', async () => {
    const payload = {
      nome: 'Arthur',
      telefone: '11999999999',
      instagram: '@arthur',
      endereco: 'Rua X'
    }

    mutateAsync.mockResolvedValue({})

    const { result } = renderHook(() => useClienteEdicaoHandler())

    await act(async () => {
      await result.current.salvar(payload)
    })

    expect(mutateAsync).toHaveBeenCalledWith(payload)
  })
})
