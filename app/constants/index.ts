export const headerLinks = [
    {
      label: 'Главная',
      route: '/',
    },
    {
      label: 'Создать турнир',
      route: '/tournaments/create',
    },
    {
      label: 'Мой профиль',
      route: '/profile',
    },
  ]
  
  export const tournamentDefaultValues = {
    title: '',
    description: '',
    location: '',
    imageUrl: '',
    startDateTime: new Date(),
    endDateTime: new Date(),
    categoryId: '',
    price: '',
    isFree: false,
    url: '',
  }