import type { CeramicApi } from "@ceramicnetwork/common";
import { Caip10Link } from "@ceramicnetwork/stream-caip10-link";
import { DID } from "dids";

export async function createCaip10Link(ceramic: CeramicApi): Promise<any> {

  const accountId = await window.ethAuthProvider.accountId()
  const accountLink = await Caip10Link.fromAccount(ceramic, accountId);

  if (!accountLink.did) {
    await accountLink.setDid(ceramic.did as DID, window.ethAuthProvider);

    const ethAddress = accountId.address + '@' + accountId.chainId.namespace + ':' + accountId.chainId.reference


    const content: { [key: string]: string; } = {};
    content[ethAddress] = accountLink.id.toUrl()

    await window.idx.set('cryptoAccounts', content)
  }

  return accountLink;
}
