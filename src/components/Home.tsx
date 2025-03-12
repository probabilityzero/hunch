import React from 'react';
import { Rabbit, Bird, Fish, Leaf, Globe, Bug, Flag } from 'lucide-react';

interface HomeProps {
  onSelectMode: (mode: string) => void;
}

const categories = [
  {
    title: 'Wildlife',
    description: 'Guess the cute animals',
    items: [
      { id: 'mammals', name: 'Animals', icon: Rabbit, available: true },
      { id: 'birds', name: 'Birds', icon: Bird, available: true },
      { id: 'fish', name: 'Fish', icon: Fish, available: true },
      { id: 'insects', name: 'Insects', icon: Bug, available: true }
    ]
  },
  {
    title: 'Nature',
    description: 'Guess the beauty of plant life',
    items: [
      { id: 'plants', name: 'Plants', icon: Leaf, available: false },
      { id: 'trees', name: 'Trees', icon: Leaf, available: false }
    ]
  },
  {
    title: 'Geography',
    description: 'Guess our world and its countries',
    items: [
      { id: 'countries', name: 'Countries', icon: Globe, available: false },
      { id: 'capitals', name: 'National Flags', icon: Flag, available: false }
    ]
  }
];

export const Home: React.FC<HomeProps> = ({ onSelectMode }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-10 pb-16">
      <div className="text-center my-16">
        <h1 className="text-4xl font-bold font-serif text-emerald-800 mb-4">Hunch</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A Guessing Game
        </p>
      </div>

      <div className="space-y-16">
        {categories.map((category) => (
          <div key={category.title} className="bg-gradient-to-br from-white to-emerald-50 rounded-2xl p-6 shadow-md">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-emerald-700">{category.title}</h2>
              <p className="text-gray-600 mt-1">{category.description}</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {category.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => item.available && onSelectMode(item.id)}
                  disabled={!item.available}
                  className={`
                    flex flex-col items-center justify-center p-6 rounded-xl transition-all duration-300
                    ${item.available
                      ? 'bg-white shadow hover:shadow-lg hover:-translate-y-1 border-2 border-transparent hover:border-emerald-300'
                      : 'bg-gray-50 cursor-not-allowed opacity-70'
                    }
                  `}
                >
                  <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center mb-4
                    ${item.available ? 'bg-emerald-100' : 'bg-gray-100'}
                  `}>
                    <item.icon 
                      className={`w-8 h-8 ${item.available ? 'text-emerald-600' : 'text-gray-500'}`} 
                    />
                  </div>
                  <span className={`text-lg font-medium ${item.available ? 'text-gray-800' : 'text-gray-500'}`}>
                    {item.name}
                  </span>
                  {!item.available && (
                    <span className="text-sm text-gray-500 mt-2 bg-gray-100 px-3 py-1 rounded-full">Coming Soon</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;