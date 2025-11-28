import mongoose from "mongoose";

const OLD_DB_URI = "mongodb://localhost:27017/old_database";
const NEW_DB_URI = "mongodb://localhost:27017/new_database";

async function migrate() {
  console.log("🚀 Starting MongoDB → MongoDB migration...");

  // connect to old database
  const oldDb = await mongoose.createConnection(OLD_DB_URI).asPromise();
  console.log("📌 Connected to OLD database");

  // connect to new database
  const newDb = await mongoose.createConnection(NEW_DB_URI).asPromise();
  console.log("📌 Connected to NEW database");

  // OLD collections
  const OldUsers = oldDb.collection("users");
  const OldContent = oldDb.collection("content");
  const OldMessages = oldDb.collection("messages");

  // MIGRATE USERS
  const oldUsers = await OldUsers.find().toArray();
  console.log(`👤 Users found: ${oldUsers.length}`);
  
  for (const u of oldUsers) {
    await newDb.collection("users").insertOne({
      ...u,
      migratedAt: new Date()
    });
  }
  console.log("✅ Users migrated");

  // MIGRATE CONTENT
  const oldContentDocs = await OldContent.find().toArray();
  console.log(`📚 Content found: ${oldContentDocs.length}`);

  for (const c of oldContentDocs) {
    await newDb.collection("content").insertOne({
      ...c,
      migratedAt: new Date()
    });
  }
  console.log("✅ Content migrated");

  // MIGRATE MESSAGES
  const oldMessages = await OldMessages.find().toArray();
  console.log(`💬 Messages found: ${oldMessages.length}`);

  for (const m of oldMessages) {
    await newDb.collection("messages").insertOne({
      ...m,
      migratedAt: new Date()
    });
  }
  console.log("✅ Messages migrated");

  console.log("🎉 Migration Complete!");
  process.exit(0);
}

migrate().catch(console.error);
