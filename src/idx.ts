import type { CeramicApi } from "@ceramicnetwork/common";
import { IDX } from "@ceramicstudio/idx";
import { AsyncLocalStorage } from "async_hooks";

declare global {
  interface Window {
    idx?: IDX;
  }
}

export function createIDX(ceramic: CeramicApi): IDX {
  const idx = new IDX({ ceramic });
  window.idx = idx;
  console.log("IIDIXXXX", idx);
  return idx;
}
