import type { CeramicApi } from "@ceramicnetwork/common";
import { IDX } from "@ceramicstudio/idx";

import { definitions } from './config.json'

declare global {
  interface Window {
    idx: IDX;
  }
}

export type FileItem = {
  CID: string
  title: string
  message: string
  caip10Link: string
  uploaderAddress: string
}

export type FilesList = { files: Array<FileItem> }

function createIDX(ceramic: CeramicApi): IDX {
  const idx = new IDX({ ceramic });
  // STATE (3) => this should go in a global state instead of window
  window.idx = idx;
  return idx;
}

async function getCryptoAccount(): Promise<any> {
  if (!window.idx) {
    window.idx = new IDX({ ceramic: window.ceramic, aliases: definitions })
  }

  const ret = await window.idx.get('cryptoAccounts', window.ceramicId)

  return ret
}

export { createIDX, getCryptoAccount };
