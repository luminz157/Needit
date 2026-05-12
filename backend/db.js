const Database = require('better-sqlite3');
const path = require('path');

// Create or connect to the SQLite database file
// Render requires a persistent disk for SQLite. We allow overriding the path via environment variable.
const defaultDbPath = path.join(__dirname, 'database.sqlite');
const dbPath = process.env.DB_PATH || defaultDbPath;
const db = new Database(dbPath, { verbose: console.log });

// Initialize the database table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

console.log('Database initialized successfully.');

module.exports = db;
