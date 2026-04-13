import cron from "node-cron";
import { dailySynchroHelloAsso } from "./dailySynchroHelloAsso.js";

export function startCronJobs(): void {
  cron.schedule(process.env.DAILY_SYNCHRO_HELLO_ASSO_CRON!, () => {
    dailySynchroHelloAsso().catch((error) => {
      console.error("[DailySynchroHelloAsso]: Error", error);
    });
  });
}
