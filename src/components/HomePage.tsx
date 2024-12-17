"use client";
import { WalletContext } from "@/context/WalletContext";
import { useContext, useState } from "react";

const HomePage = () => {
  const wallet = useContext(WalletContext);
  const [isRecoveryWallet, setIsRecoveryWallet] = useState(false);
  const [privateKey, setPrivateKey] = useState("");

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center text-white">
        <h1 className="text-4xl mb-2 font-bold">Saai Wallet</h1>
        <p>Connect your wallet to start using Saai</p>
        {isRecoveryWallet && (
          <div className="w-full mt-4">
            <input
              type="text"
              placeholder="Private Key"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
            />
          </div>
        )}
        <div className="mt-4 flex items-center gap-2">
          {!isRecoveryWallet && (
            <button onClick={wallet?.createWalletHandler}>Create Wallet</button>
          )}
          <button
            onClick={() =>
              isRecoveryWallet
                ? wallet?.addWalletHandler(privateKey)
                : setIsRecoveryWallet(true)
            }
          >
            Recovery
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
