import fastifyMultipart from "@fastify/multipart";
import { FastifyPluginAsync } from "fastify";
import { S3Connect } from "../../utils/S3Connect.js";
import { uploadImageToBucket } from "../../utils/upload.js";

export const filesRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(fastifyMultipart, {
    limits: { fileSize: 5 * 1024 * 1024 },
  });

  fastify.put("/invoices", async (req, res) => {
    const imageUrl = await uploadImageToBucket(req, res, "invoices");
    if (!imageUrl) {
      return res.status(400).send({ error: "Aucun fichier reçu" });
    }
    res.send({ url: imageUrl });
  });

  fastify.get("/invoices/:filename", async (request) => {
    const { filename } = request.params as { filename: string };
    const client = new S3Connect();
    const url = await client.getFile(
      process.env.FLOWER_FILES_BUCKET!,
      `invoices/${filename}`,
    );

    return { url };
  });
};
