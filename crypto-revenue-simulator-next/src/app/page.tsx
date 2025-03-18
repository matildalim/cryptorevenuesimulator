"use client";

import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "700"] });

import { useEffect, useState } from "react";
import fintechRevenueData  from "../data/fintechRevenue"; // Import revenue models

export default function Home() {
  const [prices, setPrices] = useState<Record<string, { usd: number }>>({});

  useEffect(() => {
    async function fetchPrices() {
      try {
        const response = await fetch("/api/crypto");
        const data = await response.json();
        setPrices(data);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    }
    fetchPrices();
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6 ${dmSans.className}`}>
    <h1 className="text-4xl font-bold mb-6">Crypto Revenue Simulator</h1>

      {/* Crypto Prices Section */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-96">
        <h2 className="text-2xl mb-4">Current Crypto Prices</h2>
        {Object.entries(prices).length > 0 ? (
          Object.entries(prices).map(([key, value]) => (
            <p key={key} className="text-xl mt-2">
              {key.toUpperCase()} Price:{" "}
              <span className="font-semibold text-yellow-400">${value.usd.toLocaleString()}</span>
            </p>
          ))
        ) : (
          <p className="text-xl text-gray-400">Loading prices...</p>
        )}
      </div>

      {/* Fintech Revenue Models Section */}
      <h2 className="text-2xl font-semibold mt-10">Fintech Revenue Models</h2>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {Object.entries(fintechRevenueData).map(([platform, details]) => (
          <div key={platform} className="bg-gray-700 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-center">{platform}</h3>
            <p className="mt-2 text-gray-300">Trading Fee: <span className="font-semibold">{details.tradingFee}</span></p>
            <p className="mt-2">Staking APY (BTC): <span className="font-semibold text-green-400">{details.stakingAPY.bitcoin}</span></p>
            <p className="mt-2">Staking APY (ETH): <span className="font-semibold text-green-400">{details.stakingAPY.ethereum}</span></p>
            <p className="mt-2 text-sm text-gray-400">
              Premium Perks: {details.premiumBenefits.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
