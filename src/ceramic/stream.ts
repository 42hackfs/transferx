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


    const streamId = doc.id.toString();

    console.log('StreamId is : ', streamId)

    const listOfFiles = await idx.get<FilesList>('fileListDef');
    console.log('array file ', listOfFiles)
    const list = listOfFiles ? listOfFiles.files : []

    const rest = await idx.set('fileListDef', {
      files: [content, ...list],
    });


    return streamId
  } catch (error) {
    console.error('Ceramic stream error: \n', error)
  }
}
