import { createServer, Model, Factory, Response } from 'miragejs'
import type { ModelDefinition } from 'miragejs/-types'
import type { Professional } from '~/types'
import { faker } from '@faker-js/faker'

const ProfessionalModel: ModelDefinition<Professional> = Model

const professionsList = [
  'Professional Photographer', 'Residential Electrician', 'Personal Trainer',
  'Software Developer', 'Plumber', 'Graphic Designer', 'English Teacher',
  'Makeup Artist', 'Massage Therapist', 'House Cleaner'
]

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      professional: ProfessionalModel
    },

    // 2. DEFINE A FACTORY (O Molde dos Dados)
    factories: {
      professional: Factory.extend<Partial<Professional>>({
        // O Mirage passa um index sequencial (i) automaticamente para cada registro criado
        id(i) {
          return (i + 1).toString()
        },
        name() {
          return faker.person.fullName()
        },
        profession() {
          return faker.helpers.arrayElement(professionsList)
        },
        avatar() {
          return faker.image.avatar()
        },
        serviceValue() {
          return faker.number.float({ min: 60, max: 450, multipleOf: 10 })
        },
        description() {
          return faker.lorem.paragraph({ min: 2, max: 3 })
        },
        averageRating() {
          return faker.helpers.maybe(() => faker.number.float({ min: 4.0, max: 5.0, multipleOf: 0.1 }))
        },
        distanceKm() {
          return faker.helpers.maybe(() => faker.number.float({ min: 0.5, max: 20.0, multipleOf: 0.1 }))
        },
        providedServices() {
          return Array.from({ length: 3 }, () => faker.commerce.productAdjective() + ' Service')
        },
        photoGallery() {
          return Array.from({ length: faker.number.int({ min: 1, max: 4 }) }, () =>
            faker.image.url({
              width: 300,
              height: 300
            })
          )
        },
        reviews() {
          return Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
            author: faker.person.fullName(),
            rating: faker.number.float({ min: 3.5, max: 5.0, multipleOf: 0.1 }),
            comment: faker.lorem.sentence()
          }))
        },
        location() {
          return {
            city: faker.location.city(),
            state: faker.location.state({ abbreviated: true })
          }
        },
        availability() {
          return faker.helpers.arrayElements(
            ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            { min: 3, max: 5 }
          )
        }
      })
    },

    // 3. SEEDS (Onde invocamos a Factory para criar os 500 registros)
    seeds(server) {
      // server.createList diz ao Mirage para rodar a factory "professional" 500 vezes
      const professionals = 500
      server.createList('professional', professionals)

      console.log(`🎰 [MirageJS] 500 profiles successfully generated using Factories.`)
    },

    routes() {
      this.namespace = 'api'

      this.get('/professionals/autocomplete', (schema, request) => {
        const query = typeof request.queryParams.query === 'string' ? request.queryParams.query?.toLowerCase() || '' : ''

        // Se o usuário não digitou nada, retorna uma lista vazia imediatamente
        if (!query) return []

        const allProfessionals = schema.all('professional').models

        // Filtra por nome ou profissão
        const filtered = allProfessionals.filter(p =>
          p.name.toLowerCase().includes(query)
          || p.profession.toLowerCase().includes(query)
        )

        // Retorna apenas um payload cirúrgico e extremamente leve (limite de 5 a 10 sugestões)
        return filtered.slice(0, 7).map(p => ({
          id: p.id,
          name: p.name,
          profession: p.profession
        }))
      })

      // GET /api/professionals
      this.get('/professionals', (schema, request) => {
        const page = parseInt(typeof request.queryParams.page === 'string' ? request.queryParams.page : '1')
        const limit = parseInt(typeof request.queryParams.limit === 'string' ? request.queryParams.limit : '12')
        const search = typeof request.queryParams.search === 'string' ? request.queryParams.search.toLowerCase() : ''
        const sort = String(request.queryParams.sort) || ''
        let allProfessionals = schema.all('professional').models

        // 1. Busca todos os registros do banco de dados fictício
        if (search) {
          allProfessionals = allProfessionals.filter(p =>
            p.name.toLowerCase().includes(search)
            || p.profession.toLowerCase().includes(search)
          )
        }

        // 2. Aplica a ORDENAÇÃO dinâmica
        if (sort) {
          allProfessionals.sort((a, b) => {
            switch (sort) {
              case 'price_asc':
                return a.serviceValue - b.serviceValue
              case 'price_desc':
                return b.serviceValue - a.serviceValue

              case 'rating_desc':
                // Se não tiver avaliação, assume 0 para ir para o fim
                return (b.averageRating ?? 0) - (a.averageRating ?? 0)

              case 'distance_asc':
                // Se não tiver distância, assume Infinity para ir para o fim da lista
                return (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity)

              default:
                return 0
            }
          })
        }

        // 3. Calcula os índices de corte (fatiamento) do array
        const startIndex = (page - 1) * limit
        const endIndex = startIndex + limit
        const paginatedModels = allProfessionals.slice(startIndex, endIndex)

        // 4. Calcula metadados úteis para o front-end criar os botões de paginação
        const totalRecords = allProfessionals.length
        const totalPages = Math.ceil(totalRecords / limit)

        return {
          meta: {
            totalRecords,
            totalPages,
            currentPage: page,
            limit,
            sort
          },
          data: paginatedModels.map(p => ({
            id: p.id,
            name: p.name,
            profession: p.profession,
            avatar: p.avatar,
            serviceValue: p.serviceValue,
            description: p.description,
            location: p.location,
            reviews: p.reviews
          }))
        }
      })

      // GET /api/professionals/:id
      this.get('/professionals/:id', (schema, request) => {
        const id = String(request.params.id)
        console.log('🚀 ~ makeServer ~ id:', id)

        const professional = schema.find('professional', id)

        if (!professional) {
          return new Response(404, {}, { error: 'Professional not found' })
        }

        return {
          avatar: professional.avatar,
          name: professional.name,
          profession: professional.profession,
          description: professional.description,
          serviceValue: professional.serviceValue,
          averageRating: professional.averageRating,
          distanceKm: professional.distanceKm,
          providedServices: professional.providedServices,
          photoGallery: professional.photoGallery,
          reviews: professional.reviews,
          location: professional.location,
          availability: professional.availability
        }
      })

      this.namespace = ''
      this.passthrough('/_nuxt/**')
      this.passthrough('/__nuxt_error')
      this.passthrough()
    }
  })
}
