import { ThreeIdConnect, EthereumAuthProvider } from "@3id/connect";
import type { DIDProvider } from "dids";

export const threeID = new ThreeIdConnect();

export async function getProvider(): Promise<DIDProvider> {
  const ethereum = window.ethereum;

  if (typeof ethereum == "undefined") {
    console.log("Unable to connect to Metamask, attempt fallback");
    // Show toast or something here
  }

  console.log("MetaMask is installed!");
  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  await threeID.connect(new EthereumAuthProvider(ethereum, accounts[0]));
  return threeID.getDidProvider();
}
