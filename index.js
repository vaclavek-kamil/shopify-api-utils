import { createAdminRestApiClient } from "@shopify/admin-api-client";
import { orderCreate } from "./orderCreate.js";
import dotenv from "dotenv";

dotenv.config();

const url = process.env.URL;
const token = process.env.TOKEN;
const apiVersion = process.env.API_VERSION;

const client = createAdminRestApiClient({
  storeDomain: url,
  apiVersion: apiVersion,
  accessToken: token,
});

const args = process.argv.slice(2);
const firstFlag = args.find((arg) => arg.startsWith("--"));
const choice = firstFlag ? firstFlag.replace(/^--/, "") : null;

const functions = {
  orderCreate,
};

if (choice) {
  (async () => {
    await functions[choice](client);
  })();
}
