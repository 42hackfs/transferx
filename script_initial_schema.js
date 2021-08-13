const { writeFile } = require('fs').promises
const Ceramic = require('@ceramicnetwork/http-client').default
const { createDefinition, publishSchema } = require('@ceramicstudio/idx-tools')
const KeyDidResolver = require('key-did-resolver').default;
const ThreeIdResolver = require('@ceramicnetwork/3id-did-resolver').default;
const { Ed25519Provider } = require('key-did-provider-ed25519')
const { randomBytes } = require('@stablelib/random')
const DID = require('dids').DID

const API_URL = "https://ceramic-clay.3boxlabs.com";

const FileSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  title: 'File',
  type: 'object',
  properties: {
    CID: {
      type: 'string',
      title: 'CID of file',
      $ref: '#/definitions/CID',
    },
    title: {
      type: 'string',
      title: 'title',
      maxLength: 100,
    },
    message: {
      type: 'string',
      title: 'message',
      maxLength: 4000,
    },
    caip10Link: {
      type: 'string',
      title: 'link a crypto account to a DID',
      $ref: '#/definitions/caip10Link',
    },
    uploaderAddress: {
      type: 'string',
      title: 'crypto address link with the caip10link',
      $ref: '#/definitions/uploaderAddress',
    }
  },
  definitions: {
    CID: {
      type: 'string',
      pattern: '^[a-zA-Z0-9]*$',
      maxLength: 65,
    },
    caip10Link: {
      type: 'string',
      pattern: "^ceramic://.+",
      maxLength: 1024,
    },
    uploaderAddress: {
      type: 'string',
      pattern: "^[a-zA-Z0-9]{1,63}@[-a-zA-Z0-9]{3,16}:[-a-zA-Z0-9]{1,47}",
      maxLength: 1024,
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

async function createSchema() {
  try {
    const seed = randomBytes(32)

    const ceramic = new Ceramic(API_URL);
    const keyDidResolver = KeyDidResolver.getResolver()

    const threeIdResolver = ThreeIdResolver.getResolver(ceramic)
    const resolverRegistry = {
      ...threeIdResolver,
      ...keyDidResolver,
    }
    const did = new DID({
      provider: new Ed25519Provider(seed),
      resolver: resolverRegistry,
    })
    await did.authenticate()
    await ceramic.setDID(did)

    const [fileSchema, filesListSchema] = await Promise.all([
      publishSchema(ceramic, { content: FileSchema }),
      publishSchema(ceramic, { content: FilesListSchema }),
    ])

    // Not sure we'll need this one
    //
    // const fileDefinition = await createDefinition(ceramic, {
    //   name: 'file',
    //   description: 'Saturn project, format for file',
    //   schema: fileSchema.commitId.toUrl(),
    // })

    const filesListDefinition = await createDefinition(ceramic, {
      name: 'List of files',
      description: 'Saturn project, format for list of files',
      schema: filesListSchema.commitId.toUrl(),
    })

    const config = {
      definitions: {
        fileListDef: filesListDefinition.commitId.toUrl(),
      },
      schemas: {
        FileSchema : fileSchema.commitId.toString(),
        FilesListSchema: filesListSchema.commitId.toString(),
      },
    }

    await writeFile('./src/ceramic/config.json', JSON.stringify(config))
  } catch (error) {
    console.error('Ceramic schema error: \n', error)
  }
}

createSchema()
