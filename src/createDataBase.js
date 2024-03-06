const sqlite3 = require('sqlite3').verbose();

const databaseFile = 'novo.db';

const db = new sqlite3.Database(databaseFile);


db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT,
        value REAL,
        date TEXT,
        description TEXT
    )`);
});

db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log(`Banco de dados '${databaseFile}' criado com sucesso.`);
});
