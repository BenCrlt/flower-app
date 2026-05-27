import { FastifyPluginAsync } from "fastify";
import { invoiceFilesRoutes } from "./invoice-files.js";

export const filesRoutes: FastifyPluginAsync = async (fastify) => {
  await fastify.register(invoiceFilesRoutes);
};
