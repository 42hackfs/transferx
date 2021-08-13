import type { CeramicApi } from '@ceramicnetwork/common'
import { TileDocument } from '@ceramicnetwork/stream-tile'
import { IDX } from "@ceramicstudio/idx";
import type { FileItem, FilesList } from "./idx"

export async function createStream (
  ceramic: CeramicApi,
  content: any,
  schema: string,
  controllers: string[],
  idx: IDX,
): Promise<any> {
  try {
    // console.log(schema, content, controllers);
    const doc = await TileDocument.create(
      ceramic,
      content,
      {
        controllers,
        schema,
      }
    );

    // const listOfFiles = idx.get<FilesList>('filesList');

    const streamId = doc.id.toString();

    console.log('StreamId is : ', streamId)


    // const rest = await idx.set('fileList', {
    //   files: [content, ...listOfFiles],
    // });

    return streamId
  } catch (error) {
    console.error('Ceramic stream error: \n', error)
  }
}
