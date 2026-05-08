import dns from "node:dns";
import mongoose from "mongoose";
import { env } from "./env";

const configureDnsForAtlas = () => {
  if (!env.mongodbUri.startsWith("mongodb+srv://")) {
    return;
  }

  dns.setDefaultResultOrder("ipv4first");
  dns.setServers(env.dnsServers?.length ? env.dnsServers : ["8.8.8.8", "1.1.1.1"]);
};

export const connectDb = async () => {
  configureDnsForAtlas();
  await mongoose.connect(env.mongodbUri);
  console.log("MongoDB connected");
};
