import { renderHook, act } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { useClienteHandler } from '../use-cliente-handler'

const mockNavigate = vi.fn()
const mockMutate = vi.fn()

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate
}))

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({
    invalidateQueries: vi.fn(),
    refetchQueries: vi.fn()
  }),
  useMutation: () => ({
    mutate: mockMutate
  })
}))

vi.mock('@/core/hooks/use-fetcher', () => ({
  useFetcher: () => vi.fn()
}))

describe('useClienteHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should navigate to edit page', () => {
    const { result } = renderHook(() => useClienteHandler())

    act(() => {
      result.current.handleEditar('9')
    })

    expect(mockNavigate).toHaveBeenCalledWith('/editar/clientes/9')
  })

  it('should call mutate when removing client', () => {
    const { result } = renderHook(() => useClienteHandler())

    act(() => {
      result.current.handleRemover('9')
    })

    expect(mockMutate).toHaveBeenCalledWith(
      '9',
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function)
      })
    )
  })
})
