import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { randomUUID } from 'crypto'

import { env } from './env'

function getClient() {
  return new S3Client({
    endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    region: 'auto',
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    },
  })
}

export async function upload({
  fileName,
  fileType,
  body,
}: {
  fileName: string
  fileType: string
  body: Uint8Array
}) {
  const client = getClient()

  const uploadId = randomUUID()
  const uniqueFileName = `${uploadId}-${fileName}`

  await client.send(
    new PutObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: uniqueFileName,
      ContentType: fileType,
      Body: body,
    })
  )

  return {
    url: uniqueFileName,
  }
}

export async function deleteUpload({ url }: { url: string }) {
  const client = getClient()

  await client.send(
    new DeleteObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: url,
    })
  )
}
