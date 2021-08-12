import { DID } from "dids";
import type { CeramicApi } from '@ceramicnetwork/common'
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import KeyDidResolver from "key-did-resolver";

import { createCeramic } from "./ceramic";
import { createIDX } from "./idx";
import { getProvider } from "./wallet";
import { createSchema } from "./schema";
import { createStream } from "./stream";
import type { ResolverRegistry } from "did-resolver";

declare global {
  interface Window {
    did?: DID;
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

  await window.accountLink.setDid(ceramic.did, window.ethAuthProvider);

  const idx = createIDX(ceramic);

  window.did = ceramic.did;
  await idx.get("FilesList");
  // the createSchema will be done once in a script, our website will just need to store the ceramic id to create the stream.
  // const config = await createSchema(ceramic);

  // every user will need a stream
  // const stream = await createStream(ceramic, config);

<<<<<<< HEAD
  console.log("config is : \n", config);
=======
  // console.log('config is : \n', config);
>>>>>>> c507d151d12c7e402d00aa4bd45cf91a07cab455
  // console.log('stream final : ', stream);

  return idx.id;
};

export { authenticate };
