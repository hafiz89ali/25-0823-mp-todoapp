import { queryOne } from "./helper";

async function testConnectionAndLog() {
  try {
    const timeRow = await queryOne("SELECT NOW()");
    const dbRow = await queryOne("SELECT current_database()");

    // Tanpa queryOne (custom helper) kena tambah dua baris di bawah
    // const currentTime = queryTime.rows[0].now;
    // const currentDatabase = databaseName.rows[0].current_database;

    console.log(`Connected to ${dbRow.current_database} at ${timeRow.now}`);
  } catch (err) {
    console.error("Error connecting to database", err);
  }
}

testConnectionAndLog();
