import React, { useState, useEffect } from 'react';

interface AnimatedHintProps {
  hint: string;
}

export const AnimatedHint: React.FC<AnimatedHintProps> = ({ hint }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000); // Adjust the duration as needed
    return () => clearTimeout(timer);
  }, [hint]);

  if (!visible) return null;

  return (
    <div
      className="absolute left-1/2 transform -translate-x-1/2 -top-4 bg-mint-100 text-gray-700 px-2 py-1 rounded text-sm animate-bounce"
      style={{ animation: 'fallAndFade 2s forwards' }} // Use keyframes animation
    >
      {hint}
    </div>
  );
};
