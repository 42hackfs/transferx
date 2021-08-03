import { ethers } from 'ethers';
import { Payment } from '../hooks/usePayment';
import { tokens } from './supportedTokens';

export const handleTransaction = async (payment: Payment) => {
  // thoses 4 variables have to be fetched from the founder database informations
  const { amount, requesterAddress } = payment;
  const eth = false;
  const paymentAmount = amount?.toString() || '0';

  // const token = tokens.find((tk) => tk.label === payment.token);
  const token = '0x0B6221B2AcD50173167e7840fB40EF7cBDFe31B3';

  const abi_token = [
    'function balanceOf(address owner) view returns (uint256)',
    'function decimals() view returns (uint8)',
    'function symbol() view returns (string)',
    'function approve(address spender, uint256 amount) external returns (bool)',
    'function transfer(address to, uint amount) returns (boolean)',
    'function allowance(address owner, address spender) external view returns (uint256)',
    'event Transfer(address indexed from, address indexed to, uint amount)',
    'function withdraw(uint amount_) public'
  ];

  let txn;

  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
  // Prompt user for account connections
  await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  console.log('Account:', await signer.getAddress());
  if (eth) {
    txn = await signer.sendTransaction({
      to: requesterAddress,
      value: ethers.utils.parseEther(paymentAmount.toString())
    });
    await provider.waitForTransaction(txn.hash, 1);
  } else {
    const erc20_rw = new ethers.Contract(token, abi_token, signer);
    const decimals = await erc20_rw.decimals();
    txn = await erc20_rw.transfer(
      requesterAddress,
      ethers.utils.parseUnits(paymentAmount.toString(), decimals)
    );
    await provider.waitForTransaction(txn.hash, 1);
  }
  return txn;
};

export const connectHardWallet = async () => {
  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
  await provider.send('eth_requestAccounts', []);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const network = await provider.getNetwork();
  const networkId = network.chainId;
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
  return {
    address,
    shortAddress,
    networkId
  };
};
