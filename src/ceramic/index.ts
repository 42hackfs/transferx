import { DID } from "dids";
import type { CeramicApi } from "@ceramicnetwork/common";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";
import KeyDidResolver from "key-did-resolver";

import { createCeramic } from "./ceramic";
import { createIDX } from "./idx";
import { getProvider } from "./wallet";
import { createStream } from "./stream";
import { createCaip10Link } from "./caip10link";
import type { ResolverRegistry } from "did-resolver";
import { IDX } from "@ceramicstudio/idx";

declare global {
  interface Window {
    did?: DID;
  }
}

// STATE (2) => this is where the ceramic instance is created
const ceramicPromise = createCeramic();

const authenticate = async (): Promise<IDX> => {
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

  console.log("got resolvers");
  const did = new DID({
    provider: provider,
    resolver: resolverRegistry,
  });
  await did.authenticate();
  console.log("authed");
  await ceramic.setDID(did);
  console.log("set did");

  // STATE (2) => this is where the idx instance is created
  const idx = createIDX(ceramic);
  console.log("create IDX");

  const accountLink = createCaip10Link(ceramic);
  console.log("caip10");

  window.did = ceramic.did;
  window.ceramic = ceramic;

  return idx;
};

export { authenticate };
