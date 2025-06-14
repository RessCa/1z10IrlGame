import { app, BrowserWindow, ipcMain } from 'electron';
import { parsePlayers } from './parsers/parsePlayers.js';
import { parseQuestions } from './parsers/parseQuestions.js';
import { insertPlayers, insertQuestions, getPlayers, updatePlayer, getQuestions, updateQuestion } from './db/database.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//function creating window and configuring it
app.on('ready', () => {
    const mainWindow = new BrowserWindow({
        title: '1z10',
        width: 800,
        height: 600,
        fullscreen: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    })

    mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
});


// Handle IPC calls for players
ipcMain.handle('get-players', async () => {
  const players = await getPlayers();
  return players;
});


ipcMain.handle('update-player', async (_event, player) => {
  try{
    await updatePlayer(player);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
})


// Handle IPC calls for questions
ipcMain.handle('get-questions', async () => {
  const questions = await getQuestions();
  return questions;
});


ipcMain.handle('update-question', async (_event, question) => {
  try {
    await updateQuestion(question);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
});


// Handle IPC calls for importing data in JSON format
ipcMain.handle('process-json-players', async (_event, jsonData) => {
  try {
    const players = parsePlayers(jsonData);
    await insertPlayers(players);
    return { success: true };
  } catch (err) {
    console.error('Błąd importu graczy:', err);
    return { success: false, error: err.message };
  }
});


ipcMain.handle('process-json-questions', async (_event, jsonData) => {
  try {
    const questions = parseQuestions(jsonData);
    await insertQuestions(questions);
    return { success: true };
  } catch (err) {
    console.error('Błąd importu pytań:', err);
    return { success: false, error: err.message };
  }
});