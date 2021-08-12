import type { CeramicApi } from '@ceramicnetwork/common'
import { TileDocument } from '@ceramicnetwork/stream-tile'

export async function createStream (
  ceramic: CeramicApi,
  content: any,
  schema: string,
): Promise<any> {
  try {
    console.log(ceramic, schema, content);
    const doc = await TileDocument.create(
      ceramic,
      content,
      { schema }
    );

    const streamId = doc.id.toString();

    console.log('StreamId is : ', streamId)

    return streamId
  } catch (error) {
    console.error('Ceramic stream error: \n', error)
  }
}
