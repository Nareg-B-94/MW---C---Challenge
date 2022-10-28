import { Route, Routes } from 'react-router-dom';
import './App.css';
import DetailView from './components/DetailView';
import ListView from './components/ListView';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<ListView />} />
        <Route path='/detail' element={<DetailView />} />
      </Routes>
    </div>
  );
}

export default App;
