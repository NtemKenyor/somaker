import React from "react";
import { FaGamepad, FaRocket, FaGift, FaUsers } from "react-icons/fa";
import WalletModal from "./components/botton";
import GameCard from "./components/gamecard";

const games = [
  {
    title: 'Game 1',
    description: 'Experience the thrill of Game 1.',
    imageUrl: '/game4.jpeg',
  },
  {
    title: 'Game 2',
    description: 'Dive into the adventure of Game 2.',
    imageUrl: '/game2.jpeg',
  },
  {
    title: 'Game 3',
    description: 'Challenge yourself with Game 3.',
    imageUrl: '/game1.jpeg',
  },
  // {
  //   title: 'Game 4',
  //   description: 'Enjoy the excitement of Game 4.',
  //   imageUrl: '/images/game4.jpg',
  // },
];

// const handleGetStarted = (gameTitle: string) => {
//   // Implement navigation to the game's page or initiate the game
//   console.log(`Get started with ${gameTitle}`);
// };

const Hero = () => {
  return (
    <div className="text-white min-h-screen pt-20">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-4xl font-bold mb-4">Your next big win is just a click away!
        </h1>
        <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
        Loading... $SONIC games, Play, Compete, and Win Up to $100 in $SONIC Rewards!, a tokenized gaming ecosystem.
        </p>
        <button  className="bg-white hover:bg-green-700 text-black px-6 py-3 rounded-lg text-lg font-semibold">
          
          <WalletModal />
        </button>
      </section>

      <section className="flex flex-wrap justify-between gap-4">
        {games.map((game) => (
          <GameCard
            key={game.title}
            title={game.title}
            description={game.description}
            imageUrl={game.imageUrl}
           
          />
        ))}
      </section>

      
    </div>
  );
};

export default Hero;
