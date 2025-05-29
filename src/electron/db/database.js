import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { app } from 'electron';

let dbInstance = null;

// Open the database connection (siengleton pattern)
export async function getDb() {
  if (dbInstance) return dbInstance;

  const dbPath = path.join(app.getPath('userData'), 'app.db');

  dbInstance = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  await createTables();
  return dbInstance;
}

// Create tables if they don't exist
async function createTables() {
  const db = await getDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      surname TEXT NOT NULL,
      class TEXT NOT NULL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      answerA TEXT,
      answerB TEXT,
      answerC TEXT,
      answerD TEXT
    );
  `);
}


// Players related functions

// get palyers
export async function getPlayers() {
  const db = await getDb();
  const players = await db.all('SELECT * FROM players');
  return players;
}

// Adding players
export async function insertPlayers(players) {
  const db = await getDb();
  const stmt = await db.prepare(`INSERT INTO players (
    name, surname, class
    ) VALUES (?, ?, ?)`);

  try {
    for (const player of players) {
      await stmt.run(player.name, player.surname, player.class);
    }
  } finally {
    await stmt.finalize();
  }
}

// Updating player
export async function updatePlayer(player) {
  const db = await getDb();
  const stmt = await db.prepare("UPDATE players SET name = ?, surname = ?, class = ? WHERE id = ?");
  try {
    await stmt.run(player.name, player.surname, player.class, player.id);
  } finally {
    await stmt.finalize();
  }
}


// Questions related functions

// Get questions
export async function getQuestions() {
  const db = await getDb();
  const questions = await db.all('SELECT * FROM questions');
  return questions;
}

// Adding questions
export async function insertQuestions(questions) {
  const db = await getDb();
  const stmt = await db.prepare(`
    INSERT INTO questions (
      category, question, answer, answerA, answerB, answerC, answerD
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  try {
    for (const question of questions) {
      await stmt.run(
        question.category,
        question.question,
        question.answer,
        question.answerA ?? null,
        question.answerB ?? null,
        question.answerC ?? null,
        question.answerD ?? null
      );
    }
  } finally {
    await stmt.finalize();
  }
}

// updating question
export async function updateQuestion(question) {
  const db = await getDb();
  const stmt = await db.prepare(`
    UPDATE questions SET
      category = ?,
      question = ?,
      answer = ?,
      answerA = ?,
      answerB = ?,
      answerC = ?,
      answerD = ?
    WHERE id = ?
  `);

  try {
    await stmt.run(
      question.category,
      question.question,
      question.answer,
      question.answerA ?? null,
      question.answerB ?? null,
      question.answerC ?? null,
      question.answerD ?? null,
      question.id
    );
  } finally {
    await stmt.finalize();
  }
}