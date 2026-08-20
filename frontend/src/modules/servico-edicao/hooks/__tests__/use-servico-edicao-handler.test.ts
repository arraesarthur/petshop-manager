import { renderHook, act } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { useServicoEdicaoHandler } from '../use-servico-edicao-handler'
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

describe('useServicoEdicaoHandler', () => {
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

  it('should navigate to servicos when cancelar is called', () => {
    const { result } = renderHook(() => useServicoEdicaoHandler())

    act(() => {
      result.current.cancelar()
    })

    expect(navigate).toHaveBeenCalledWith('/servicos')
  })

  it('should remove servico and call mutate with id and callbacks', () => {
    const { result } = renderHook(() => useServicoEdicaoHandler())

    act(() => {
      result.current.remover('1')
    })

    expect(mutate).toHaveBeenCalledWith(
      '1',
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function)
      })
    )
  })

  it('should save servico calling mutateAsync with payload', async () => {
    const payload = {
      id: '1',
      nome: 'Banho Completo',
      descricao: 'Banho com shampoo e condicionador',
      precoPequeno: 35,
      precoMedio: 50,
      precoGrande: 65
    }

    mutateAsync.mockResolvedValue({
      salvarServico: { nome: 'Banho Completo' }
    })

    const { result } = renderHook(() => useServicoEdicaoHandler())

    await act(async () => {
      await result.current.salvar(payload)
    })

    expect(mutateAsync).toHaveBeenCalledWith(payload)
  })
})
