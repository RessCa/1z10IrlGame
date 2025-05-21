import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import PlayersPage from './pages/PlayersPage/PlayersPage';

import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/players' element={<PlayersPage />} /> 
      </Routes>
    </Router>
  )
}

export default App