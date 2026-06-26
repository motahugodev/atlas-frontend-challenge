import { faker } from '@faker-js/faker'

const professionsList = [
  'Professional Photographer', 'Residential Electrician', 'Personal Trainer',
  'Software Developer', 'Plumber', 'Graphic Designer', 'English Teacher',
  'Makeup Artist', 'Massage Therapist', 'House Cleaner'
]

export interface ServerProfessional {
  availability: string[]
  avatar: string
  averageRating: number
  description: string
  distanceKm?: number
  id: string
  location: { city: string, state: string }
  name: string
  photoGallery: string[]
  profession: string
  providedServices: string[]
  reviews: { author: string, comment: string, rating: number }[]
  serviceValue: number
}

function generateProfessionals(count: number): ServerProfessional[] {
  return Array.from({ length: count }, (_, i) => ({
    availability: faker.helpers.arrayElements(
      ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      { max: 5, min: 3 }
    ),
    avatar: faker.image.avatar(),
    averageRating: faker.number.float({ max: 5.0, min: 4.0, multipleOf: 0.1 }),
    description: faker.lorem.paragraph({ max: 3, min: 2 }),
    distanceKm: faker.helpers.maybe(() =>
      faker.number.float({ max: 20.0, min: 0.5, multipleOf: 0.1 })
    ),
    id: String(i + 1),
    location: {
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true })
    },
    name: faker.person.fullName(),
    photoGallery: Array.from(
      { length: faker.number.int({ max: 2, min: 1 }) },
      () => faker.image.avatar()
    ),
    profession: faker.helpers.arrayElement(professionsList),
    providedServices: Array.from({ length: 3 }, () =>
      faker.commerce.productAdjective() + ' Service'
    ),
    reviews: Array.from(
      { length: faker.number.int({ max: 3, min: 1 }) },
      () => ({
        author: faker.person.fullName(),
        comment: faker.lorem.sentence(),
        rating: faker.number.float({ max: 5.0, min: 3.5, multipleOf: 0.1 })
      })
    ),
    serviceValue: faker.number.float({ max: 450, min: 60, multipleOf: 10 })
  }))
}

const count = process.env.MOCK_COUNT ? parseInt(process.env.MOCK_COUNT) : 100

export const professionals = generateProfessionals(count)
