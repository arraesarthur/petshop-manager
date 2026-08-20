import { renderHook, act } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { usePetHandler } from '../use-pet-handler'

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

describe('usePetHandler', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should navigate to edit page', () => {
    const { result } = renderHook(() => usePetHandler())

    act(() => {
      result.current.handleEditar('1')
    })

    expect(mockNavigate).toHaveBeenCalledWith('/editar/pets/1')
  })

  it('should call mutate when removing pet', () => {
    const { result } = renderHook(() => usePetHandler())

    act(() => {
      result.current.handleRemover('1')
    })

    expect(mockMutate).toHaveBeenCalledWith(
      '1',
      expect.objectContaining({
        onSuccess: expect.any(Function),
        onError: expect.any(Function)
      })
    )
  })
})