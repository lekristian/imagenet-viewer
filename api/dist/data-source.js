"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const ImageNetNode_1 = require("./entities/ImageNetNode");
dotenv_1.default.config(); // Load from .env
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.PGHOST || "localhost",
    port: Number(process.env.PGPORT) || 5432,
    username: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "postgres",
    database: process.env.PGDATABASE || "imagenet",
    entities: [ImageNetNode_1.ImageNetNode],
    synchronize: true,
    // Setting `synchronize: true` in production is risky;
    // prefer migrations. For dev, it's convenient.
    logging: false,
});
