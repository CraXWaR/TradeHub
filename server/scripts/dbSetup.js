import { Sequelize } from "sequelize";
import configFile from "../config/config.cjs";

const env = process.env.NODE_ENV || "development";
const config = configFile[env];

async function ensureDatabase() {
    const { database, username, password, host, port, dialect } = config;

    const connection = new Sequelize("", username, password, {
        host,
        port,
        dialect,
        logging: false,
    });

    try {
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
        console.log(`✅ Database '${database}' is ready.`);
    } catch (err) {
        console.error("❌ Could not create database:", err.message);
        process.exit(1);
    } finally {
        await connection.close();
    }
}

ensureDatabase();
