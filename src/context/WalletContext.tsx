"use client";
import Web3 from "web3";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
const web3 = new Web3("https://eth.llamarpc.com");

interface WalletContextTypes {
  account: any;
  createWalletHandler: () => void;
  addWalletHandler: (param: string) => void;
  copyAddress: () => void;
  isWallet: boolean;
  setIsWallet: Dispatch<SetStateAction<boolean>>;
  balance: number;
  totalTransactions: number;
}
export const WalletContext = createContext<WalletContextTypes | null>(null);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = useState<any>({});
  const [isWallet, setIsWallet] = useState(false);
  const [balance, setBalance] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const router = useRouter();
  const createWalletHandler = () => {
    const account = web3.eth.accounts.create();
    localStorage.setItem("account", account.privateKey);
    setAccount(account[0]);
    router.push("/wallet");
  };

  const addWalletHandler = (privateKey: string) => {
    const account = web3.eth.accounts.wallet.add(privateKey);
    setAccount(account[0]);
    router.push("/wallet");
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(account?.address);
    alert(`Address copied to clipboard : ${account.address}`);
  };

  const getBalance = async () => {
    const balance = await web3.eth.getBalance(account.address);
    setBalance(Number(web3.utils.fromWei(balance, "ether")));
  };

  const getTotalTransactions = async () => {
    const totalTransactions = await web3.eth.getTransactionCount(
      account.address
    );
    setTotalTransactions(
      Number(web3.utils.fromWei(totalTransactions.toString(), "ether"))
    );
  };

  useEffect(() => {
    const privateKey = localStorage.getItem("account");
    if (privateKey) {
      const account = web3.eth.accounts.wallet.add(privateKey);
      setAccount(account[0]);
      setIsWallet(true);
    }
  }, []);

  useEffect(() => {
    if (account.address) {
      getBalance();
      getTotalTransactions();
    }
  }, [account]);

  const values = {
    account,
    createWalletHandler,
    addWalletHandler,
    copyAddress,
    isWallet,
    setIsWallet,
    balance,
    totalTransactions,
  };
  return (
    <WalletContext.Provider value={values}>{children}</WalletContext.Provider>
  );
};
