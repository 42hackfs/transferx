import type { CeramicApi } from '@ceramicnetwork/common'
import { TileDocument } from '@ceramicnetwork/stream-tile'

export async function createStream (ceramic: CeramicApi, config: any): Promise<any> {
  try {
    const doc = await TileDocument.create(
      ceramic,
      {
        text: 'test',
        file: 'ALkdjlfjkl3930',
      },
      { schema: config.schemas.Transferx }
    )

    const streamId = doc.id.toString()

    console.log('StreamId is : ', streamId)

    return streamId
  } catch (error) {
    console.error('Oups I did it again => ', error)
  }
}
