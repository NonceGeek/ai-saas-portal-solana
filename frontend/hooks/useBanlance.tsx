"use client";

import React, { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

const BalanceWrapper = () => {
  const { publicKey } = useWallet(); // Assuming you have a wallet context or hook to get the public key
  const [balance, setBalance] = React.useState<number | null>(null);
  const connection = new Connection("https://api.devnet.solana.com");

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        try {
          const balance = await connection.getBalance(publicKey);
          console.log("Balance in lamports:", balance);
          setBalance(balance / LAMPORTS_PER_SOL); // Convert lamports to SOL
        } catch (error) {
          console.error("Error fetching balance:", error);
          setBalance(null);
        }
      } else {
        setBalance(null);
      }
    };

    fetchBalance();
  }, [publicKey]);

  return balance && <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text text-center">{balance} </div>;
};

export default BalanceWrapper;
