import { DID } from "dids";
import type { CeramicApi } from '@ceramicnetwork/common'
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import KeyDidResolver from "key-did-resolver";

import { createCeramic } from "./ceramic";
import { createIDX } from "./idx";
import { getProvider } from "./wallet";
import { createSchema } from './schema'
import { createStream } from './stream'
import { createCaip10Link } from './caip10link' 
import type { ResolverRegistry } from "did-resolver";

declare global {
  interface Window {
    did?: DID;
    accountLink: any;
  }
}

const ceramicPromise = createCeramic();

const authenticate = async (): Promise<string> => {
  const [ceramic, provider] = await Promise.all([
    ceramicPromise,
    getProvider(),
  ]);
  const keyDidResolver = KeyDidResolver.getResolver();
  const threeIdResolver = ThreeIdResolver.getResolver(ceramic);
  const resolverRegistry: ResolverRegistry = {
    ...threeIdResolver,
    ...keyDidResolver,
  };
  const did = new DID({
    provider: provider,
    resolver: resolverRegistry,
  });
  await did.authenticate();
  await ceramic.setDID(did);

  window.did = ceramic.did;

  const idx = createIDX(ceramic);

  const accountLink = createCaip10Link(ceramic);

  window.accountLink = accountLink;

  
  // the createSchema will be done once in a script, our website will just need to store the ceramic id to create the stream.
  // const config = await createSchema(ceramic);

  // console.log('config is : \n', config);

  return idx.id;
};

export { authenticate };
