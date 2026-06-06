export interface AutocompleteItem {
  id: string
  name: string
  profession: string
}

export type FetchStatus = 'idle' | 'pending' | 'success' | 'error'

export interface FilterOptions {
  page: number
  profession: string
  search: string
  sortBy: string
}

export interface Location {
  city: string
  coordinates?: string
  state: string
}

export interface PaginatedResponse<T> {
  data: T[]
  meta: {
    totalRecords: number
    totalPages: number
    currentPage: number
    limit: number
  }
}

export interface Professional {
  availability: string[] // disponibilidade
  avatar: string // foto
  averageRating?: number // avaliação média (opcional)
  description: string
  distanceKm?: number // distância (opcional)
  id: string
  location: Location // localização
  name: string
  photoGallery: string[] // galeria de fotos
  profession: string
  providedServices: string[] // serviços prestados
  reviews: Review[] // avaliações
  serviceValue: number // valor do serviço prestado
}

export interface ProfessionalCard {
  avatar: string
  description: string
  id: string
  location: Location
  name: string
  profession: string
  reviews: Review[]
  serviceValue: number

}

export interface Review {
  author: string
  comment: string
  rating: number
}

export interface UsePaginationOptions {
  initialLimit?: number
  initialPage?: number
}
