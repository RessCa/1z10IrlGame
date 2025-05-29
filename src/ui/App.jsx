import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import PlayersPage from './pages/PlayersPage/PlayersPage';
import QuestionsPage from './pages/QuestionsPage/QuestionsPage';

import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/players' element={<PlayersPage />} /> 
        <Route path='/questions' element={<QuestionsPage />} />
      </Routes>
    </Router>
  )
}

export default App