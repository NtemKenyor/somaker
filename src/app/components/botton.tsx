"use client"

import { useState } from 'react';
import { ethers } from 'ethers';

function WalletModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [wallet, setWallet] = useState<ethers.Wallet | null>(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const connectExistingWallet = async () => {
    if (window.ethereum) {
      try {
        const newProvider = new ethers.providers.Web3Provider(window.ethereum);
        await newProvider.send('eth_requestAccounts', []);
        setProvider(newProvider);
        alert('Wallet connected successfully!');
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const createNewWallet = () => {
    const randomWallet = ethers.Wallet.createRandom();
    setWallet(randomWallet);
    alert(`New wallet created! Address: ${randomWallet.address}`);
    // Optionally, store the wallet's private key securely
  };

  return (
    <>
      <button onClick={openModal}>Get Started</button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <button
              onClick={closeModal}
              className="mt-4 text-red-500 hover:underline"
            >
              Close
            </button>
            <h2 className="text-xl font-bold mb-4">
              Get a chance to win $SONIC rewards of up to $100! Try your luck now! 🎰✨
            </h2>
            <p className="mb-4">Just keep in mind:</p>
            <ul className="list-disc list-inside mb-4">
              <li>You must have at least 0.01 SOL</li>
              <li>Some $SONIC in your wallet to play</li>
            </ul>
            <button
              onClick={connectExistingWallet}
              className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
            >
              Connect Existing Wallet
            </button>
            <button
              onClick={createNewWallet}
              className="bg-green-900 text-white px-4 py-2 rounded"
            >
              Create New Wallet
            </button>
            
          </div>
        </div>
      )}
    </>
  );
}

export default WalletModal;
