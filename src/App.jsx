import { useMemo, useState } from 'react';

const DEFAULT_PROMPT = 'recipe ideas using chicken';

const categoryDefinitions = [
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

const allOptions = categoryDefinitions.flatMap((category) => category.options);

function getOptionsForCategory(categoryKey) {
  return categoryDefinitions.find((category) => category.key === categoryKey)?.options ?? allOptions;
}

function getCategoryLabel(categoryKey) {
  return categoryDefinitions.find((category) => category.key === categoryKey)?.label ?? 'General';
}

function detectCategory(prompt) {
  const normalized = prompt.toLowerCase();

  if (
    normalized.includes('recipe') ||
    normalized.includes('meal') ||
    normalized.includes('food') ||
    normalized.includes('chicken')
  ) {
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

function scoreSimilarity(a, b) {
  const sharedTags = a.tags.filter((tag) => b.tags.includes(tag)).length;
  const sharedNameWords = a.name
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => b.name.toLowerCase().includes(word) && word.length > 3).length;

  return sharedTags * 2 + sharedNameWords;
}

function chooseInitialPair(prompt, categoryOverride) {
  const category = categoryOverride ?? detectCategory(prompt);
  const options = getOptionsForCategory(category);

  if (options.length < 2) {
    return options;
  }

  return [options[0], options[1]];
}

function generateNextPair(preferred, categoryKey, previousIds = []) {
  const pool = getOptionsForCategory(categoryKey).filter(
    (option) => option.id !== preferred.id && !previousIds.includes(option.id),
  );

  if (pool.length <= 1) {
    return pool.length === 0 ? [preferred] : pool;
  }

  const sorted = [...pool].sort((a, b) => scoreSimilarity(preferred, b) - scoreSimilarity(preferred, a));
  return [sorted[0], sorted[1]];
}

export default function App() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [category, setCategory] = useState('recipe');
  const [currentPair, setCurrentPair] = useState(() => chooseInitialPair(DEFAULT_PROMPT));
  const [history, setHistory] = useState([]);
  const [finalChoice, setFinalChoice] = useState(null);

  const promptHint = useMemo(() => {
    if (!prompt.trim()) {
      return 'Type a category or preference to begin.';
    }

    return `Category: ${getCategoryLabel(detectCategory(prompt))}`;
  }, [prompt]);

  const handleGenerate = () => {
    const detectedCategory = detectCategory(prompt);
    const pair = chooseInitialPair(prompt, detectedCategory);

    setCategory(detectedCategory);
    setCurrentPair(pair);
    setHistory([]);
    setFinalChoice(null);
  };

  const handleChoose = (option, isFinal) => {
    if (isFinal) {
      setFinalChoice(option);
      return;
    }

    const nextPair = generateNextPair(option, category, history);
    setCurrentPair(nextPair);
    setHistory((prev) => [...new Set([...prev, option.id])]);
  };

  const resetApp = () => {
    setPrompt(DEFAULT_PROMPT);
    setCategory('recipe');
    setCurrentPair(chooseInitialPair(DEFAULT_PROMPT));
    setHistory([]);
    setFinalChoice(null);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <span className="eyebrow">Decision Maker</span>
        <h1>Find the choice that feels right</h1>
      </header>

      <section className="prompt-panel card">
        <label htmlFor="decision-prompt">What do you want help deciding?</label>
        <input
          id="decision-prompt"
          type="text"
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder="recipe ideas using chicken"
        />
        <p className="hint">{promptHint}</p>
        <button className="primary-button" onClick={handleGenerate} disabled={!prompt.trim()}>
          Generate options
        </button>
      </section>

      {finalChoice ? (
        <section className="card final-card">
          <h2>Your final pick</h2>
          <h3>{finalChoice.name}</h3>
          <p>{finalChoice.description}</p>
          {finalChoice.image ? <img src={finalChoice.image} alt={finalChoice.name} className="hero-image" /> : null}
          <button className="primary-button" onClick={resetApp}>Start over</button>
        </section>
      ) : (
        <>
          <section className="options-header">
            <h2>Pick your preferred option</h2>
          </section>

          <div className="options-grid">
            {currentPair.map((option) => (
              <article key={option.id} className="card option-card">
                {option.image ? <img src={option.image} alt={option.name} className="option-image" loading="lazy" /> : null}
                <div className="option-body">
                  <h3>{option.name}</h3>
                  <p>{option.description}</p>
                  <div className="tag-row">
                    {option.tags.slice(0, 3).map((tag) => (
                      <span key={`${option.id}-${tag}`} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="actions">
                  <button className="primary-button" onClick={() => handleChoose(option, false)}>
                    Choose this
                  </button>
                  <button className="secondary-button" onClick={() => handleChoose(option, true)}>
                    Final pick
                  </button>
                </div>
              </article>
            ))}
          </div>

          <section className="card summary-panel">
            <div className="summary-label">Current category</div>
            <div className="summary-value">{getCategoryLabel(category)}</div>
            <div className="summary-meta">Selections tracked: {history.length}</div>
          </section>
        </>
      )}
    </div>
  );
}
