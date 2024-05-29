// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    username: string
    email: string
    photo: string
  }
  
  export type UpdateUserParams = {
    username: string
    photo: string
  }
  
  // ====== EVENT PARAMS
  export type CreateTournamentsParams = {
    userId: string
    tournament: {
      title: string
      description: string
      location: string
      imageUrl: string
      startDateTime: Date
      endDateTime: Date
      categoryId: string
      isFree: boolean
      url: string
    }
    path: string
  }
  
  export type UpdateTournamentsParams = {
    userId: string
    tournament: {
      _id: string
      title: string
      imageUrl: string
      description: string
      location: string
      startDateTime: Date
      endDateTime: Date
      categoryId: string
      isFree: boolean
      url: string
    }
    path: string
  }
  
  export type DeleteTournamentsParams = {
    tournamentId: string
    path: string
  }
  
  export type GetAllTournamentsParams = {
    query: string
    category: string
    limit: number
    page: number
  }
  
  export type GetTournamentsByUserParams = {
    userId: string
    limit?: number
    page: number
  }
  
  export type GetRelatedTournamentsByCategoryParams = {
    categoryId: string
    tournamentId: string
    limit?: number
    page: number | string
  }
  
  export type Tournament = {
    _id: string
    title: string
    description: string
    price: string
    isFree: boolean
    imageUrl: string
    location: string
    startDateTime: Date
    endDateTime: Date
    url: string
    organizer: {
      _id: string
    }
    category: {
      _id: string
      name: string
    }
  }
  
  // ====== CATEGORY PARAMS
  export type CreateCategoryParams = {
    categoryName: string
  }
  
  // ====== ORDER PARAMS
  export type CheckoutOrderParams = {
    eventTitle: string
    eventId: string
    isFree: boolean
    buyerId: string
  }
  
  export type CreateOrderParams = {
    stripeId: string
    tournamentId: string
    buyerId: string
    totalAmount: string
    createdAt: Date
  }
  
  export type GetOrdersByTournamentsParams = {
    eventId: string
    searchString: string
  }
  
  export type GetOrdersByUserParams = {
    userId: string | null
    limit?: number
    page: string | number | null
  }
  
  // ====== URL QUERY PARAMS
  export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
  }
  
  export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
  }
  
  export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }