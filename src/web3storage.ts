import { Web3Storage } from "web3.storage";

// makeStorageClient returns an authorized Web3.Storage client instance
const client = makeStorageClient();

function getAccessToken() {
  // This is not safe, as it can be inspected via our app.js file.
  // We should think of a better way
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBEZkFlODM5QzllMDE0ZTVkN2VBNjQ3RkIxQ2Q3ZjZkOUEwN2M1ZTUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2MjgwMTAyOTI1OTMsIm5hbWUiOiJtYXRoaXMifQ.DKiUfTgLAUufFweDwZiJKqvS1vdBD3_-sd4c3-mUCaY";
}

function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}

async function storeWithProgress(files: File[]) {
  // show the root cid as soon as it's ready
  const onRootCidReady = (cid: string) => {
    console.log("uploading files with cid:", cid);
  };

  // when each chunk is stored, update the percentage complete and display
  const totalSize = files.map((f) => f.size).reduce((a, b) => a + b, 0);
  let uploaded = 0;

  const onStoredChunk = (size: number) => {
    uploaded += size;
    const pct = totalSize / uploaded;
    console.log(`Uploading... ${pct.toFixed(2)}% complete`);
  };

  // client.put will invoke our callbacks during the upload
  // and return the root cid when the upload completes
  return client.put(files, { onRootCidReady, onStoredChunk });
}

async function retrieve(cid: string) {
  const res = await client.get(cid);
  if (res) {
    console.log(`Got a response! [${res.status}] ${res.statusText}`);
    if (!res.ok) {
      throw new Error(`failed to get ${cid}`);
    }

    // unpack File objects from the response
    const files = await res.files();
    for (const file of files) {
      console.log(`${file.cid} -- ${file.name} -- ${file.size}`);
    }
  } else {
    // Something went wrong!
    console.log("No response");
  }
}

async function checkStatus(cid: string) {
  const client = makeStorageClient();
  const status = await client.status(cid);
  console.log(status);
  if (status) {
    // your code to do something fun with the status info here
  }
}

export { storeWithProgress, retrieve, checkStatus };