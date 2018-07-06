export interface ICategories {
  icon?: 'chevron-right' | 'messages-icon' | 'robot-icon' | 'station-icon';
  name: string;
  slug: string;
}

export const types: ICategories[] = [
  {
    icon: 'station-icon',
    name: 'Channels',
    slug: 'channels'
  },
  {
    icon: 'robot-icon',
    name: 'Bots',
    slug: 'bots'
  },
  {
    icon: 'messages-icon',
    name: 'Groups',
    slug: 'groups'
  },
];

export const categories: ICategories[] = [
  {
    name: 'Animals',
    slug: 'animals',
  },
  {
    name: 'Anime',
    slug: 'anime',
  },
  {
    name: 'Art/Design',
    slug: 'art-design',
  },
  {
    name: 'Business',
    slug: 'business',
  },
  {
    name: 'Cars/Motors',
    slug: 'cars-motors',
  },
  {
    name: 'Education',
    slug: 'education',
  },
  {
    name: 'Entertainment',
    slug: 'entertainment',
  },
  {
    name: 'Fashion/Fitness',
    slug: 'fashion-fitness',
  },
  {
    name: 'Food/Drink',
    slug: 'food-drink',
  },
  {
    name: 'Gaming',
    slug: 'gaming',
  },
  {
    name: 'Lifestyle/Health',
    slug: 'lifestyle-health',
  },
  {
    name: 'Music',
    slug: 'music',
  },
  {
    name: 'News/Magazine',
    slug: 'news-magazine',
  },
  {
    name: 'Science',
    slug: 'science',
  },
  {
    name: 'Shopping',
    slug: 'shopping',
  },
  {
    name: 'Sports',
    slug: 'sports',
  },
  {
    name: 'Tech/Computer',
    slug: 'tech-computer',
  },
  {
    name: 'Video',
    slug: 'video',
  },
  {
    name: 'Other',
    slug: 'other',
  },
];