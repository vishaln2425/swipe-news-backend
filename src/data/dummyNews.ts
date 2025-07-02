const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

export const news = [
  {
    id: '1',
    title: 'Breaking News 1',
    imageUrl: `${BASE_URL}/public/news/news1.jpeg`,
    content: 'First news content'
  },
  {
    id: '2',
    title: 'Breaking News 2',
    imageUrl: `${BASE_URL}/public/news/news2.jpeg`,
    content: 'Second news content'
  },
  {
    id: '3',
    title: 'Breaking News 3',
    imageUrl: `${BASE_URL}/public/news/news3.png`,
    content: 'Third news content'
  },
  {
    id: '4',
    title: 'Breaking News 4',
    imageUrl: `${BASE_URL}/public/news/news4.webp`,
    content: 'Fourth news content'
  }
];
