
async function checkDBExit() {
  const DB_URL = new URL(process.env.PG_DATA_URL || '');
  const dbName = DB_URL.pathname.split('/').pop();
  if (!dbName) {
    throw new Error('Database name is not specified in PG_DATA_URL');
  }
  const { Client } = require('pg');
  const client = new Client({
    connectionString: `postgres://${DB_URL.username}:${DB_URL.password}@${DB_URL.hostname}:${DB_URL.port}`
  });
  try {
    await client.connect();
    const
  res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [dbName]);
    if (res.rows.length === 0) {
      console.warn(`Database "${dbName}" does not exist. Please create it before starting the server.`);
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`Database "${dbName}" created successfully.`);
      return;
    }
    console.log(`Database "${dbName}" exists.`);
  } catch (error) {
    console.error('Error checking database existence:', error);
    throw error;
  } finally {
    await client.end(); 
  }

}

async function checkBeforeInit() {
  // Check if the database exists
  checkDBExit();

  // Additional checks can be added here
}

export default checkBeforeInit;