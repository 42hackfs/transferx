import type { CeramicApi } from "@ceramicnetwork/common";
import Ceramic from "@ceramicnetwork/http-client";
import { Caip10Link } from "@ceramicnetwork/stream-caip10-link";
import { TileDocument } from "@ceramicnetwork/stream-tile";

declare global {
  interface Window {
    ceramic: CeramicApi;
    [index: string]: any;
  }
}

const API_URL = "https://ceramic-clay.3boxlabs.com";
// const API_URL = "https://localhost:7007";

export async function createCeramic(): Promise<CeramicApi> {
  const ceramic = new Ceramic(API_URL);
  window.ceramic = ceramic;
  window.TileDocument = TileDocument;
  window.Caip10Link = Caip10Link;
  return Promise.resolve(ceramic as CeramicApi);
}
