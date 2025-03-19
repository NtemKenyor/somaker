// components/GameCard.tsx
import React from 'react';
import WalletModal from './botton';

interface GameCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onGetStarted: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ title, description, imageUrl, onGetStarted }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full md:w-1/4">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <button
        
          className="bg-orange-500 text-black px-4 py-2 rounded hover:bg-white"
        >
          <WalletModal />
        </button>
      </div>
    </div>
  );
};

export default GameCard;
