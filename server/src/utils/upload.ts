import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import { S3Connect } from "./S3Connect";

export async function uploadImageToBucket(
  request: FastifyRequest,
  reply: FastifyReply,
  folder: string,
): Promise<string | null> {
  const data = await request.file();

  if (!data) {
    return null;
  }

  const allowedMimes = ["image/jpeg", "image/png", "image/webp"];
  if (!allowedMimes.includes(data.mimetype)) {
    return reply.status(400).send({ error: "Format non supporté" });
  }

  const ext = path.extname(data.filename);
  const filename = `${randomUUID()}${ext}`;
  const s3Key = `${folder}/${filename}`;
  const buffer = await data.toBuffer();

  const client = new S3Connect();

  await client.putFile(
    process.env.FLOWER_FILES_BUCKET!,
    s3Key,
    buffer,
    data.mimetype,
  );

  return s3Key;
}
