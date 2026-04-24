import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import sequelize from "./db.js";
import User from "./models/User.js";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
	console.error(
		"Please set MONGODB_URI in your .env before running this script.",
	);
	process.exit(1);
}

const run = async () => {
	let client;
	try {
		console.log("Connecting to MySQL (Sequelize)...");
		await sequelize.authenticate();
		await sequelize.sync();
		console.log("Sequelize connected and synced.");

		console.log("Connecting to MongoDB...");
		client = new MongoClient(MONGODB_URI);
		await client.connect();
		const db = client.db();
		console.log(
			"Connected to MongoDB database:",
			db.databaseName || "(default)",
		);

		const usersCol = db.collection("users");
		const docs = await usersCol.find({}).toArray();
		console.log(`Found ${docs.length} user documents in MongoDB.`);

		let migrated = 0;
		let skipped = 0;

		for (const doc of docs) {
			const email = (doc.email || doc.emailAddress || "")
				.toString()
				.toLowerCase();
			if (!email) {
				skipped++;
				continue;
			}

			const name = doc.name || doc.fullName || doc.username || "";
			const password = doc.password || doc.hashedPassword || doc.pw || "";

			try {
				const [user, created] = await User.findOrCreate({
					where: { email },
					defaults: { name, email, password },
					hooks: false,
				});

				if (created) migrated++;
				else skipped++;
			} catch (e) {
				console.error(`Failed to create user ${email}:`, e.message || e);
				skipped++;
			}
		}

		console.log(
			`Migration complete. Migrated: ${migrated}, Skipped/Existing/Failed: ${skipped}`,
		);
		await client.close();
		process.exit(0);
	} catch (error) {
		console.error("Migration error:", error);
		if (client) await client.close();
		process.exit(1);
	}
};

run();
