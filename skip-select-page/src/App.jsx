import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import SkipOptionsComponent from './SkipOptionsComponent';
import MenuComponent from './MenuComponent';
import PlaceholderPage from './PlaceholderPage';



function App() {
  return (
    <Router>
      <div className=".main-container">
        <MenuComponent />
      <Routes>
        <Route path="/waste-type" element={<PlaceholderPage />} />
        <Route path="/" element={<SkipOptionsComponent />} />
        <Route path="/permit-check" element={<PlaceholderPage />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
