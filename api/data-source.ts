import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { ImageNetNode } from "./entities/ImageNetNode";

dotenv.config(); // Load from .env

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT) || 5432,
  username: process.env.PGUSER || "postgres",
  password: process.env.PGPASSWORD || "postgres",
  database: process.env.PGDATABASE || "imagenet",
  entities: [ImageNetNode],
  synchronize: true,
  // Setting `synchronize: true` in production is risky;
  // prefer migrations. For dev, it's convenient.
  logging: false,
});
