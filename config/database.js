import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// Used CockroachDB to host the Database
const pool = new Pool({
  connectionString: process.env.connectionString || ''
})

export default pool; 