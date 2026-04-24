import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const {
	DB_HOST = "127.0.0.1",
	DB_PORT = 3306,
	DB_NAME = "mini_product_dashboard",
	DB_USER = "root",
	DB_PASSWORD = "",
} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
	host: DB_HOST,
	port: DB_PORT,
	dialect: "mysql",
	logging: false,
	pool: {
		max: 10,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
});

export default sequelize;
