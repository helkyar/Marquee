import { useSearchParams } from 'next/navigation'

type State = {
  categories: string[]
  priceRange: {
    min: number
    max: number
  }
  sortBy: 'price-asc' | 'price-desc' | 'rating'
}
export const serialize = (state: State) => {
  const params = new URLSearchParams()
  params.set('categories', state.categories.join(',')) // Comma-separated list
  params.set('minPrice', state.priceRange.min.toString())
  params.set('maxPrice', state.priceRange.max.toString())
  params.set('sortBy', state.sortBy)
  return params
}

export const parse = (params: URLSearchParams) => {
  return {
    categories: params.getAll('categories'), // Parse list
    priceRange: {
      min: Number(params.get('minPrice')),
      max: Number(params.get('maxPrice')),
    },
    sortBy: params.get('sortBy'),
  }
}

export const MyComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  console.log('🚀 ~ MyComponent ~ setSearchParams:', setSearchParams)
  console.log('🚀 ~ MyComponent ~ searchParams:', searchParams)
  // ... Use searchParams and update state ...
}
