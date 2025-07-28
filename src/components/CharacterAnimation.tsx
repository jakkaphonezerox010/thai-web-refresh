import { useState, useEffect } from 'react';

interface CharacterAnimationProps {
  type: 'running' | 'floating';
  size?: number;
}

export const CharacterAnimation = ({ type, size = 60 }: CharacterAnimationProps) => {
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    if (type === 'running') {
      const interval = setInterval(() => {
        setPosition(prev => {
          const newPos = prev + direction * 2;
          if (newPos > 100 || newPos < 0) {
            setDirection(prev => -prev);
            return prev;
          }
          return newPos;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [type, direction]);

  useEffect(() => {
    if (type === 'floating') {
      const interval = setInterval(() => {
        setPosition(prev => prev + 0.5);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [type]);

  const getCharacterEmoji = () => {
    const characters = ['🐱', '🐶', '🐰', '🐼', '🦄', '🐸'];
    return characters[Math.floor(Math.random() * characters.length)];
  };

  const [character] = useState(getCharacterEmoji());

  if (type === 'running') {
    return (
      <div className="relative w-full h-16 overflow-hidden">
        <div 
          className="absolute transition-all duration-75 ease-linear text-4xl"
          style={{ 
            left: `${position}%`,
            transform: direction === -1 ? 'scaleX(-1)' : 'scaleX(1)',
            top: '50%',
            marginTop: '-20px'
          }}
        >
          {character}
        </div>
      </div>
    );
  }

  if (type === 'floating') {
    return (
      <div 
        className="absolute text-3xl animate-bounce"
        style={{
          top: `${20 + Math.sin(position * 0.1) * 10}px`,
          right: '20px',
          animation: 'bounce 2s infinite, float 3s ease-in-out infinite'
        }}
      >
        {character}
      </div>
    );
  }

  return null;
};