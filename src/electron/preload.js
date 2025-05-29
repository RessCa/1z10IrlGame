// eslint-disable-next-line no-undef
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Importing data in Json format
  sendJsonPlayers: (json) => ipcRenderer.invoke('process-json-players', json),
  sendJsonQuestions: (json) => ipcRenderer.invoke('process-json-questions', json),

  // Players related
  getPlayers: () => ipcRenderer.invoke('get-players'),
  updatePlayer: (player) => ipcRenderer.invoke('update-player', player),

  // Questions related
  getQuestions: () => ipcRenderer.invoke('get-questions'),
  updateQuestion: (question) => ipcRenderer.invoke('update-question', question),
});
