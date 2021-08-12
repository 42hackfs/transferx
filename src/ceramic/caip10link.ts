import type { CeramicApi } from "@ceramicnetwork/common";
import { Caip10Link } from "@ceramicnetwork/stream-caip10-link";
import { DID } from "dids";

export async function createCaip10Link(ceramic: CeramicApi): Promise<any> {

  const accountId = await window.ethAuthProvider.accountId()
  const accountLink = await Caip10Link.fromAccount(ceramic, accountId);

  await accountLink.setDid(ceramic.did as DID, window.ethAuthProvider);

  const ethAddress = accountId.address + '@' + accountId.chainId.namespace + ':' + accountId.chainId.reference

  console.log(ethAddress)

  const content = { 
    "0x2b59fd03d176afc335fa6d4fbcdf5cf48a6844fb@eip155:1" : accountLink.id.toUrl()
  };

  console.log(content)

  window.idx.set('cryptoAccounts', content)
  window.Caip10Link = Caip10Link;

  return accountLink;
}
