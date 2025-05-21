// eslint-disable-next-line no-undef
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  sendJsonPlayers: (json) => ipcRenderer.invoke('process-json-players', json),
  sendJsonQuestions: (json) => ipcRenderer.invoke('process-json-questions', json),

  getPlayers: () => ipcRenderer.invoke('get-players'),
  updatePlayer: (player) => ipcRenderer.invoke('update-player', player),
});
