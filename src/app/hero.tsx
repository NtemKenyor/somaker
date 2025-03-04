import React from "react";
import { FaGamepad, FaRocket, FaGift, FaUsers } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="text-white min-h-screen pt-20">
      {/* Hero Section */}
      <section className="text-center py-20 px-6">
        <h1 className="text-4xl font-bold mb-4">AI-Powered Game Creation</h1>
        <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
          Create games instantly using AI-generated prompts, break records, and earn rewards in a tokenized gaming ecosystem.
        </p>
        <button className="bg-white hover:bg-green-700 text-black px-6 py-3 rounded-lg text-lg font-semibold">
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="flex items-center space-x-4">
          <FaRocket className="text-green-500 text-3xl" />
          <div>
            <h3 className="text-xl font-semibold">AI-Powered Game Creation</h3>
            <p className="text-gray-400">Generate games from simple text prompts.</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <FaGamepad className="text-green-500 text-3xl" />
          <div>
            <h3 className="text-xl font-semibold">Play & Compete</h3>
            <p className="text-gray-400">Engage in thrilling gameplay and break records.</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <FaGift className="text-yellow-500 text-3xl" />
          <div>
            <h3 className="text-xl font-semibold">Token Rewards</h3>
            <p className="text-gray-400">Earn rewards for achievements and engagement.</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <FaUsers className="text-red-500 text-3xl" />
          <div>
            <h3 className="text-xl font-semibold">Community-Driven</h3>
            <p className="text-gray-400">Join a vibrant gaming community and innovate.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-16 bg-green-950">
        <h2 className="text-3xl font-bold">Ready to Create and Play?</h2>
        <p className="text-lg text-gray-100 mb-6">Join SoMaker today and be part of the AI gaming revolution.</p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg text-lg font-semibold">
          Start Now
        </button>
      </section>
    </div>
  );
};

export default Hero;
