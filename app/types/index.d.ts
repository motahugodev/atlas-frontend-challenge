export interface FilterOptions {
  search: string
  profession: string
  sortBy: string
  page: number
}

export interface Review {
  author: string
  rating: number
  comment: string
}

export interface Location {
  city: string
  state: string
  coordinates?: string
}

export interface Professional {
  id: string
  name: string
  profession: string
  avatar: string // foto
  serviceValue: number // valor do serviço prestado
  description: string
  averageRating?: number // avaliação média (opcional)
  distanceKm?: number // distância (opcional)
  providedServices: string[] // serviços prestados
  photoGallery: string[] // galeria de fotos
  reviews: Review[] // avaliações
  location: Location // localização
  availability: string[] // disponibilidade
}

export interface ProfessionalCard {
  id: string
  name: string
  profession: string
  avatar: string
  serviceValue: number
}

export interface PaginatedResponse<T> {
  meta: {
    totalRecords: number
    totalPages: number
    currentPage: number
    limit: number
  }
  data: T[]
}

export interface UsePaginationOptions {
  initialPage?: number
  initialLimit?: number
}

export interface AutocompleteItem {
  id: string
  name: string
  profession: string
}
