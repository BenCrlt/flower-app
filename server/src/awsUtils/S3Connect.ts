import {
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from "@aws-sdk/client-s3";
import { Readable } from "stream";

export class S3Connect {
  private client: S3Client;
  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_DEFAULT_REGION || "",
      endpoint: process.env.AWS_ENDPOINT_URL || "",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
      },
    });
  }

  public async putFile(
    bucketName: string,
    filePath: string,
    content: Readable | string | Buffer,
    contentLength?: number | undefined,
  ): Promise<PutObjectCommandOutput> {
    try {
      const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: filePath,
        Body: content,
        ContentLength: contentLength,
      });
      return await this.client.send(command);
    } catch (e: unknown) {
      throw new Error("AWS SDK error - PutFile" + e);
    }
  }
}
