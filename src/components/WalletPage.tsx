"use client";
import { WalletContext } from "@/context/WalletContext";
import { useContext, useState } from "react";
import { FaCopy } from "react-icons/fa";

export default function WalletPage() {
  const wallet = useContext(WalletContext);
  const [isSend, setIsSend] = useState(false);
  const [address, setAddress] = useState("");

  if (!wallet?.isWallet) return null;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center text-white">
        <h1 className="text-4xl mb-2 font-bold">Your Account</h1>
        <div className="flex items-center flex-col gap-2 w-full bg-black/40 shadow-md px-1 py-2 rounded-md">
          <div className="flex items-center justify-between  w-full p-1">
            <span>Balance</span>
            <span>{wallet?.balance}</span>
          </div>
          <div className="flex items-center justify-between w-full p-1">
            <span>Total Transactions</span>
            <span>{wallet?.balance}</span>
          </div>
        </div>
        <div className="mt-2 w-full text-start">Address</div>
        <div
          onClick={wallet?.copyAddress}
          className="bg-gray-900 px-2 mt-2 text-white rounded-md shadow-md py-2 cursor-pointer"
        >
          <span>{wallet.account.address}</span>
          <FaCopy className="inline-block ml-2" />
        </div>

        {isSend && (
          <div className="w-full mt-4">
            <input
              type="text"
              placeholder="Private Key"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        )}

        <div className="flex items-center mt-4 gap-4 w-full">
          <button>Send</button>
          <button onClick={wallet?.copyAddress}>Receive</button>
        </div>
      </div>
    </div>
  );
}
