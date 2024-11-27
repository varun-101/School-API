import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// Used CockroachDB to host the Database
const pool = new Pool({
  connectionString: process.env.connectionString || 'postgresql://varun:gfVjUSct2X-HvE1W0YvLig@yeti-molerat-8089.8nk.gcp-asia-southeast1.cockroachlabs.cloud:26257/school_management?sslmode=verify-full'
})

export default pool; 