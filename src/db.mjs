import DatabaseSync from "better-sqlite3";

let database;
try {
    database = new DatabaseSync("todo.db");
    console.log("Connected to the SQLite database.");

    database.exec("PRAGMA foreign_keys = ON");
    console.log("Foreign keys enabled.");

    database.exec("PRAGMA journal_mode = WAL");
    console.log("Journal mode set to WAL.");

    database.exec("PRAGMA synchronous = NORMAL");
    console.log("Synchronous mode set to NORMAL.");

    database.exec("PRAGMA cache_size = 10000");
    console.log("Cache size set to 10000 pages.");
} catch (err) {
    console.error("Database error: " + err.message);
}

const createTodosTable = `
CREATE TABLE IF NOT EXISTS TODOS (
  id TEXT NOT NULL PRIMARY KEY,
  text TEXT NOT NULL,
  done BOOLEAN NOT NULL DEFAULT 0
)`;

try {
    database.exec(createTodosTable);
    console.log("Table created or already exists.");
} catch (err) {
    console.error("Error creating table: " + err.message);
}

const insertSampleData = `
  INSERT INTO TODOS (id, text, done)
    SELECT * FROM (
      SELECT 'b1a8f3e2-7c4a-4f3b-9d6e-8f2d4c9a1b3e', 'Sample Todo 1', 0
      UNION ALL
      SELECT 'd4e5c6f7-8a9b-4c2d-9e1f-7b3a6c8d5e4f', 'Sample Todo 2', 0
      UNION ALL
      SELECT 'f9e8d7c6-5b4a-3f2e-1d9c-8a7b6e5c4f3d', 'Sample Todo 3', 0
    ) AS new_data 
     WHERE NOT EXISTS (SELECT 1 FROM TODOS)
`;

try {
    database.exec(insertSampleData);
    console.log("Data inserted.");
} catch (err) {
    console.error("Error inserting data on TODOS: " + err.message);
}

const insertTodo = database.prepare(
  "INSERT INTO TODOS (id, text, done) VALUES ($id, $text, 0) RETURNING id, text, done"
);
const updateTodo = database.prepare(
  "UPDATE TODOS SET text = $text, done = $done WHERE id = $id RETURNING id, text, done"
);
const getTodo = database.prepare(
  "SELECT id, text, done FROM TODOS WHERE id = $id"
);
const getAllTodos = database.prepare("SELECT id, text, done FROM TODOS");

export { database, insertTodo, updateTodo, getTodo, getAllTodos };