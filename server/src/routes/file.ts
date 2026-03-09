import fastifyMultipart from "@fastify/multipart";
import { randomUUID } from "crypto";
import { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import path from "path";
import z from "zod";
import { S3Connect } from "../awsUtils/S3Connect";

export const filesRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(fastifyMultipart, {
    limits: { fileSize: 5 * 1024 * 1024 },
  });

  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: "PUT",
    url: "/invoices",
    schema: {
      response: {
        200: z.object({
          url: z.string(),
        }),
        400: z.object({
          error: z.string(),
        }),
      },
    },
    handler: async (req, res) => {
      const imageUrl = await uploadImageToBucket(req, res, "invoices");
      if (!imageUrl) {
        return res.status(400).send({ error: "Aucun fichier reçu" });
      }
      res.send({ url: imageUrl });
    },
  });
};

async function uploadImageToBucket(
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
  const filepath = path.join(process.cwd(), folder, filename);

  const client = new S3Connect();

  await client.putFile(process.env.FLOWER_FILES_BUCKET!, filepath, data.file);

  return filepath;
}
