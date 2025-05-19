import './App.css'

import UploadJson from './components/uploadJson/uploadJson'

function App() {
  return (
    <>
      <h1 style={{ textAlign: 'center', padding: '2rem' }}>Importuj dane</h1>
      <div style={{ display: 'flex', gap: '2rem', padding: '2rem' }}>
      <UploadJson
        title="Import Użytkowników"
        sendJsonFunc={window.api.sendJsonPlayers}
      />
      <UploadJson
        title="Import Pytań"
        sendJsonFunc={window.api.sendJsonQuestions}
      />
      </div>
    </>
  );
}

export default App