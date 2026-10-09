export type DecisionOption = {
  id: string;
  category: string;
  name: string;
  description: string;
  image?: string;
  tags: string[];
};

export type CategoryDefinition = {
  key: string;
  label: string;
  options: DecisionOption[];
};

export const categoryDefinitions: CategoryDefinition[] = [
  {
    key: 'recipe',
    label: 'Recipes',
    options: [
      {
        id: 'recipe-lemon-herb-chicken-bowl',
        category: 'recipe',
        name: 'Lemon Herb Chicken Bowl',
        description: 'A bright and healthy grain bowl with lemon chicken, rice, greens, and a yogurt drizzle.',
        image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=80',
        tags: ['chicken', 'healthy', 'lemon', 'grain', 'bowl'],
      },
      {
        id: 'recipe-spicy-chicken-tacos',
        category: 'recipe',
        name: 'Spicy Chicken Tacos',
        description: 'Crispy tortillas, smoky chicken, fresh salsa, and a quick lime crema.',
        image: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?auto=format&fit=crop&w=1200&q=80',
        tags: ['chicken', 'spicy', 'tacos', 'mexican', 'quick'],
      },
      {
        id: 'recipe-coconut-chicken-curry',
        category: 'recipe',
        name: 'Coconut Chicken Curry',
        description: 'Creamy coconut curry with tender chicken, spinach, and fragrant spices.',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
        tags: ['chicken', 'curry', 'coconut', 'warm', 'comfort'],
      },
      {
        id: 'recipe-grilled-chicken-salad',
        category: 'recipe',
        name: 'Grilled Chicken Salad',
        description: 'A crisp salad with grilled chicken, avocado, and a savory vinaigrette.',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=80',
        tags: ['chicken', 'salad', 'fresh', 'healthy', 'light'],
      },
      {
        id: 'recipe-thai-chicken-noodle',
        category: 'recipe',
        name: 'Thai Chicken Noodles',
        description: 'Rice noodles tossed with chicken, garlic, chili, and lime in a savory sauce.',
        image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80',
        tags: ['chicken', 'thai', 'noodles', 'savory', 'sauce'],
      },
    ],
  },
  {
    key: 'travel',
    label: 'Travel',
    options: [
      {
        id: 'travel-kyoto-weekend',
        category: 'travel',
        name: 'Kyoto Weekend',
        description: 'A serene trip filled with temples, tea houses, and peaceful gardens.',
        image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
        tags: ['culture', 'calm', 'food', 'city', 'nature'],
      },
      {
        id: 'travel-santorini-getaway',
        category: 'travel',
        name: 'Santorini Getaway',
        description: 'Cliffside views, ocean sunsets, and slow evenings under the Mediterranean sky.',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
        tags: ['beach', 'sunset', 'romantic', 'scenic', 'coastal'],
      },
      {
        id: 'travel-iceland-roadtrip',
        category: 'travel',
        name: 'Iceland Road Trip',
        description: 'A dramatic route through waterfalls, volcanoes, and geothermal landscapes.',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
        tags: ['adventure', 'mountains', 'nature', 'roadtrip', 'outdoors'],
      },
      {
        id: 'travel-rome-food-tour',
        category: 'travel',
        name: 'Rome Food Tour',
        description: 'Historic streets, ancient landmarks, and unforgettable pasta and gelato stops.',
        image: 'https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=1200&q=80',
        tags: ['food', 'history', 'city', 'culture', 'walking'],
      },
    ],
  },
  {
    key: 'pet',
    label: 'Pet Companions',
    options: [
      {
        id: 'pet-corgi',
        category: 'pet',
        name: 'Corgi',
        description: 'Playful, affectionate, and endlessly entertaining with a cheerful personality.',
        image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1200&q=80',
        tags: ['small', 'friendly', 'energetic', 'cute', 'loving'],
      },
      {
        id: 'pet-cat',
        category: 'pet',
        name: 'Cat',
        description: 'Independent, calm, and wonderfully low-maintenance for a cozy home.',
        image: 'https://images.unsplash.com/photo-1511044568932-338cba0ad803?auto=format&fit=crop&w=1200&q=80',
        tags: ['independent', 'quiet', 'gentle', 'cute', 'small'],
      },
      {
        id: 'pet-golden-retriever',
        category: 'pet',
        name: 'Golden Retriever',
        description: 'Loyal, affectionate, and always happy to be part of family adventures.',
        image: 'https://images.unsplash.com/photo-1553322378-eb94e8f4de1a?auto=format&fit=crop&w=1200&q=80',
        tags: ['gentle', 'friendly', 'active', 'family', 'loyal'],
      },
    ],
  },
];

export const allOptions = categoryDefinitions.flatMap((category) => category.options);

export function getOptionsForCategory(categoryKey: string): DecisionOption[] {
  return categoryDefinitions.find((category) => category.key === categoryKey)?.options ?? allOptions;
}

export function getCategoryLabel(categoryKey: string): string {
  return categoryDefinitions.find((category) => category.key === categoryKey)?.label ?? 'General';
}

export function detectCategory(prompt: string): string {
  const normalized = prompt.toLowerCase();

  if (normalized.includes('recipe') || normalized.includes('meal') || normalized.includes('food') || normalized.includes('chicken')) {
    return 'recipe';
  }

  if (
    normalized.includes('travel') ||
    normalized.includes('vacation') ||
    normalized.includes('trip') ||
    normalized.includes('destination') ||
    normalized.includes('holiday')
  ) {
    return 'travel';
  }

  if (normalized.includes('pet') || normalized.includes('dog') || normalized.includes('cat') || normalized.includes('animal')) {
    return 'pet';
  }

  return 'recipe';
}

export function scoreSimilarity(a: DecisionOption, b: DecisionOption): number {
  const sharedTags = a.tags.filter((tag) => b.tags.includes(tag)).length;
  const sharedNameWords = a.name
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => b.name.toLowerCase().includes(word) && word.length > 3).length;

  return sharedTags * 2 + sharedNameWords;
}

export function chooseInitialPair(prompt: string, categoryOverride?: string): DecisionOption[] {
  const category = categoryOverride ?? detectCategory(prompt);
  const options = getOptionsForCategory(category);

  if (options.length < 2) {
    return options;
  }

  return [options[0], options[1]];
}

export function generateNextPair(
  preferred: DecisionOption,
  categoryKey: string,
  previousIds: string[] = [],
): DecisionOption[] {
  const pool = getOptionsForCategory(categoryKey).filter(
    (option) => option.id !== preferred.id && !previousIds.includes(option.id),
  );

  if (pool.length <= 1) {
    return pool.length === 0 ? [preferred] : pool;
  }

  const sorted = [...pool].sort((a, b) => scoreSimilarity(preferred, b) - scoreSimilarity(preferred, a));
  return [sorted[0], sorted[1]];
}
