import { renderHook, act } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { usePetEdicaoHandler } from '../use-pet-edicao-handler'
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

describe('usePetEdicaoHandler', () => {
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

  it('should navigate to pets when cancelar is called', () => {
    const { result } = renderHook(() => usePetEdicaoHandler())

    act(() => {
      result.current.cancelar()
    })

    expect(navigate).toHaveBeenCalledWith('/pets')
  })

  it('should remove pet and call mutate with id and callbacks', () => {
    const { result } = renderHook(() => usePetEdicaoHandler())

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

  it('should save pet calling mutateAsync with payload', async () => {
    const payload = {
      id: '1',
      nome: 'Thor',
      especie: 'CACHORRO',
      racaId: '1',
      sexo: 'MACHO',
      porte: 'GRANDE',
      clienteId: '1',
      observacao: 'Muito energético',
      dataNascimento: '2020-05-10'
    }

    mutateAsync.mockResolvedValue({ salvarPet: { nome: 'Thor' } })

    const { result } = renderHook(() => usePetEdicaoHandler())

    await act(async () => {
      await result.current.salvar(payload)
    })

    expect(mutateAsync).toHaveBeenCalledWith(payload)
  })
})