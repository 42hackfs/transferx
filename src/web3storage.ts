import { CidString } from "@ceramicnetwork/common";
import { Web3Storage } from "web3.storage";

// makeStorageClient returns an authorized Web3.Storage client instance
const client = makeStorageClient();

function getAccessToken(): string {
  // This is not safe, as it can be inspected via our app.js file.
  // We should think of a better way
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBEZkFlODM5QzllMDE0ZTVkN2VBNjQ3RkIxQ2Q3ZjZkOUEwN2M1ZTUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MjgwMTAyOTI1OTMsIm5hbWUiOiJtYXRoaXMifQ.DKiUfTgLAUufFweDwZiJKqvS1vdBD3_-sd4c3-mUCaY";
}

function makeStorageClient(): Web3Storage {
  return new Web3Storage({ token: getAccessToken() });
}

async function storeWithProgress(files: File[], callbackFn: (pct: string) => void): Promise<CidString> {
  // show the root cid as soon as it's ready
  const onRootCidReady = (cid: string) => {
    console.log("uploading files with cid:", cid);
  };

  // when each chunk is stored, update the percentage complete and display
  const totalSize = files.map((f) => f.size).reduce((a, b) => a + b, 0);
  let uploaded = 0;

  const onStoredChunk = (size: number) => {
    uploaded += size;
    const pct = (uploaded / totalSize ) * 100;
    callbackFn(`Uploading... ${pct.toFixed(2)}% complete`)
  };

  // client.put will invoke our callbacks during the upload
  // and return the root cid when the upload completes
  return client.put(files, { onRootCidReady, onStoredChunk });
}

async function retrieve(cid: string): Promise<any> {
  const res = await client.get(cid);
  if (res) {
    console.log(`Got a response! [${res.status}] ${res.statusText}`);
    if (!res.ok) {
      throw new Error(`failed to get ${cid}`);
    }

    return res;
  } else {
    // Something went wrong!
    console.log("No response");
    return null;
  }
}

async function checkStatus(cid: string): Promise<any> {
  const status = await client.status(cid);
  return status;
}

export { storeWithProgress, retrieve, checkStatus };
