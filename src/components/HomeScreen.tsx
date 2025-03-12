import React from 'react';
import { Rabbit, Bird, Fish, Leaf, Globe, Bug, Flag } from 'lucide-react';

interface HomeScreenProps {
  onSelectMode: (mode: string) => void;
}

const categories = [
  {
    title: 'Wildlife',
    items: [
      { id: 'mammals', name: 'Animal', icon: Rabbit, available: true },
      { id: 'birds', name: 'Birds', icon: Bird, available: true },
      { id: 'fish', name: 'Fish', icon: Fish, available: true },
      { id: 'insects', name: 'Insects', icon: Bug, available: true }
    ]
  },
  {
    title: 'Nature',
    items: [
      { id: 'plants', name: 'Plants', icon: Leaf, available: false },
      { id: 'trees', name: 'Trees', icon: Leaf, available: false }
    ]
  },
  {
    title: 'Geography',
    items: [
      { id: 'countries', name: 'Countries', icon: Globe, available: false },
      { id: 'capitals', name: 'National Flags', icon: Flag, available: false }
    ]
  }
];

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectMode }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 pt-16">
      <div className="space-y-12">
        {categories.map((category) => (
          <div key={category.title} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">{category.title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {category.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => item.available && onSelectMode(item.id)}
                  className={`
                    flex flex-col items-center p-6 rounded-xl transition-all
                    ${item.available
                      ? 'bg-white shadow-md hover:shadow-lg hover:-translate-y-1'
                      : 'bg-gray-50 cursor-not-allowed opacity-60'
                    }
                  `}
                >
                  <item.icon className="w-8 h-8 mb-3 text-blue-500" />
                  <span className="text-lg font-medium text-gray-800">{item.name}</span>
                  {!item.available && (
                    <span className="text-sm text-gray-500 mt-1">Coming Soon</span>
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
