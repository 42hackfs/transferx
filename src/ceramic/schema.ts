import type { CeramicApi } from '@ceramicnetwork/common'
import { createDefinition } from '@ceramicstudio/idx-tools'
import { TileDocument } from '@ceramicnetwork/stream-tile'

const FileSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'Transferx',
  type: 'object',
  properties: {
    file: {
      type: 'string',
      title: 'file',
      $ref: '#/definitions/CID',
      maxLength: 30,
    },
    text: {
      type: 'string',
      title: 'text',
      maxLength: 4000,
    },
  },
  definitions: {
    CID: {
      type: 'string',
      pattern: '^[a-zA-Z0-9]*$',
      maxLength: 100,
    }
  }
}

const FilesListSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'FilesList',
  type: 'object',
  properties: {
    notes: {
      type: 'array',
      title: 'files',
      items: {
        type: 'object',
        title: 'fileItem',
        properties: {
          id: {
            $ref: '#/definitions/CeramicDocId',
          },
          title: {
            type: 'string',
            title: 'title',
            maxLength: 100,
          },
        },
      },
    },
  },
  definitions: {
    CeramicDocId: {
      type: 'string',
      pattern: '^ceramic://.+(\\?version=.+)?',
      maxLength: 150,
    },
  },
}

export async function createSchema(ceramic: CeramicApi): Promise<any> {
  try {
    const [fileSchema, filesListSchema] = await Promise.all([
      TileDocument.create(ceramic, FileSchema),
      TileDocument.create(ceramic, FilesListSchema)
    ])

    const fileDefinition = await createDefinition(ceramic, {
      name: 'file',
      description: 'Transfer X project, format for file and list of files',
      schema: filesListSchema.commitId.toUrl(),
    })

    const config = {
      definitions: {
        file: fileDefinition.id.toString(),
      },
      schemas: {
        Transferx : fileSchema.commitId.toString(),
        FilesList: filesListSchema.commitId.toString(),
      },
    }

    return config
  } catch (error) {
    console.error('Ceramic schema error: \n', error)
  }
}
