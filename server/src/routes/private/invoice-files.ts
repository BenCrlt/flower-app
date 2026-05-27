import fastifyMultipart from "@fastify/multipart";
import { eq } from "drizzle-orm";
import { FastifyPluginAsync } from "fastify";
import { db } from "../../db/index.js";
import { invoiceFilesTable } from "../../db/schema/invoice-files.js";
import { invoicesTable } from "../../db/schema/invoices.js";
import { INVOICE_FILE_MAX_BYTES } from "../../modules/google-drive/constants.js";
import {
  createDriveClientFromConfig,
  getGoogleDriveConfigForEdition,
  isDriveConfigured,
} from "../../modules/google-drive/utils/getConfigForEdition.js";
import { uploadInvoiceFile } from "../../modules/google-drive/utils/uploadInvoiceFile.js";

export const invoiceFilesRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(fastifyMultipart, {
    limits: { fileSize: INVOICE_FILE_MAX_BYTES },
  });

  fastify.post("/invoices/:invoiceId", async (request, reply) => {
    const invoiceId = Number((request.params as { invoiceId: string }).invoiceId);
    if (!Number.isFinite(invoiceId) || invoiceId <= 0) {
      return reply.status(400).send({ error: "invoiceId invalide" });
    }

    const userId = request.authSession?.user?.id;
    if (!userId) {
      return reply.status(401).send({ error: "Unauthorized" });
    }

    const data = await request.file();
    if (!data) {
      return reply.status(400).send({ error: "Aucun fichier reçu" });
    }

    const buffer = await data.toBuffer();
    if (buffer.length > INVOICE_FILE_MAX_BYTES) {
      return reply.status(400).send({ error: "Fichier trop volumineux (max 10 Mo)" });
    }

    try {
      const file = await uploadInvoiceFile({
        invoiceId,
        uploadedById: userId,
        fileName: data.filename,
        mimeType: data.mimetype,
        buffer,
      });
      return reply.send({ file });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Upload échoué";
      return reply.status(400).send({ error: message });
    }
  });

  fastify.get(
    "/invoices/:invoiceId/:fileId/download",
    async (request, reply) => {
      const invoiceId = Number(
        (request.params as { invoiceId: string }).invoiceId,
      );
      const fileId = Number((request.params as { fileId: string }).fileId);
      if (!Number.isFinite(invoiceId) || !Number.isFinite(fileId)) {
        return reply.status(400).send({ error: "Paramètres invalides" });
      }

      const file = await db.query.invoiceFilesTable.findFirst({
        where: eq(invoiceFilesTable.id, fileId),
      });
      if (!file || file.invoiceId !== invoiceId) {
        return reply.status(404).send({ error: "Fichier introuvable" });
      }

      const invoice = await db.query.invoicesTable.findFirst({
        where: eq(invoicesTable.id, invoiceId),
      });
      if (!invoice) {
        return reply.status(404).send({ error: "Facture introuvable" });
      }

      const config = await getGoogleDriveConfigForEdition(invoice.editionId);
      if (!isDriveConfigured(config)) {
        return reply.status(400).send({ error: "Google Drive non configuré" });
      }

      try {
        const client = createDriveClientFromConfig(config);
        const { buffer, mimeType, fileName } = await client.downloadFile(
          file.driveFileId,
        );
        reply.header("Content-Type", mimeType);
        reply.header(
          "Content-Disposition",
          `attachment; filename="${encodeURIComponent(file.fileName || fileName)}"`,
        );
        return reply.send(buffer);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Téléchargement échoué";
        return reply.status(500).send({ error: message });
      }
    },
  );
};
