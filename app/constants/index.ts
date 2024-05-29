export const headerLinks = [
    {
      label: 'Home',
      route: '/',
    },
    {
      label: 'Create tournament',
      route: '/tournament/create',
    },
    {
      label: 'My Profile',
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