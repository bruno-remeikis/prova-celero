export const characters = {
  buildResponse: (results: any[]) => (
    { data: { results } }
  ),

  hero1: {
    id: 1,
    name: 'Hero 1',
    thumbnail: {
      extension: 'jpg',
      path: '...'
    }
  },

  hero2: {
    id: 2,
    name: 'Hero 2',
    thumbnail: {
      extension: 'png',
      path: '...'
    }
  },

  noImgHero: {
    id: 3,
    name: 'Hero 3',
    thumbnail: {
      extension: 'png',
      path: '.../image_not_available'
    }
  },

  gifHero: {
    id: 4,
    name: 'Hero 4',
    thumbnail: {
      extension: 'gif',
      path: '...'
    }
  },
}
